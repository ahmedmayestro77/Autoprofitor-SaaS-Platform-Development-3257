import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Shopify webhook
router.post('/shopify', async (req, res) => {
  try {
    const { topic } = req.headers;
    const data = req.body;

    switch (topic) {
      case 'products/create':
        await handleProductCreate(data, 'shopify');
        break;
      case 'products/update':
        await handleProductUpdate(data, 'shopify');
        break;
      case 'products/delete':
        await handleProductDelete(data, 'shopify');
        break;
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Shopify webhook error:', error);
    res.status(500).send('Error');
  }
});

// WooCommerce webhook
router.post('/woocommerce', async (req, res) => {
  try {
    const { action } = req.headers;
    const data = req.body;

    switch (action) {
      case 'product.created':
        await handleProductCreate(data, 'woocommerce');
        break;
      case 'product.updated':
        await handleProductUpdate(data, 'woocommerce');
        break;
      case 'product.deleted':
        await handleProductDelete(data, 'woocommerce');
        break;
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('WooCommerce webhook error:', error);
    res.status(500).send('Error');
  }
});

// Stripe webhook
router.post('/stripe', async (req, res) => {
  try {
    const event = req.body;

    switch (event.type) {
      case 'invoice.payment_succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object);
        break;
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Stripe webhook error:', error);
    res.status(500).send('Error');
  }
});

// Helper functions
const handleProductCreate = async (productData, platform) => {
  // Find the store this product belongs to
  const { data: store } = await supabase
    .from('connected_stores')
    .select('user_id')
    .eq('platform', platform)
    .single();

  if (store) {
    await supabase
      .from('products')
      .insert([
        {
          user_id: store.user_id,
          external_id: productData.id.toString(),
          platform,
          name: productData.title || productData.name,
          current_price: parseFloat(productData.price || productData.regular_price),
          sku: productData.sku,
          category: productData.product_type || productData.categories?.[0]?.name,
          optimization_status: 'pending',
          created_at: new Date().toISOString()
        }
      ]);
  }
};

const handleProductUpdate = async (productData, platform) => {
  await supabase
    .from('products')
    .update({
      name: productData.title || productData.name,
      current_price: parseFloat(productData.price || productData.regular_price),
      updated_at: new Date().toISOString()
    })
    .eq('external_id', productData.id.toString())
    .eq('platform', platform);
};

const handleProductDelete = async (productData, platform) => {
  await supabase
    .from('products')
    .delete()
    .eq('external_id', productData.id.toString())
    .eq('platform', platform);
};

const handlePaymentSuccess = async (invoice) => {
  const customerId = invoice.customer;
  
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (user) {
    await supabase
      .from('users')
      .update({ subscription_status: 'active' })
      .eq('id', user.id);
  }
};

const handlePaymentFailed = async (invoice) => {
  const customerId = invoice.customer;
  
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (user) {
    await supabase
      .from('users')
      .update({ subscription_status: 'past_due' })
      .eq('id', user.id);
  }
};

const handleSubscriptionCanceled = async (subscription) => {
  const customerId = subscription.customer;
  
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (user) {
    await supabase
      .from('users')
      .update({ 
        subscription_status: 'canceled',
        subscription_plan: 'starter'
      })
      .eq('id', user.id);
  }
};

export default router;