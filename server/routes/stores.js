import express from 'express';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Connect Shopify store
router.post('/connect/shopify', async (req, res, next) => {
  try {
    const { shopUrl, accessToken } = req.body;
    const userId = req.user.id;

    // Validate Shopify connection
    const shopResponse = await axios.get(
      `https://${shopUrl}/admin/api/2023-10/shop.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken
        }
      }
    );

    // Store connection details
    const { data: store, error } = await supabase
      .from('connected_stores')
      .insert([
        {
          user_id: userId,
          platform: 'shopify',
          shop_url: shopUrl,
          access_token: accessToken,
          store_name: shopResponse.data.shop.name,
          connected_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'Shopify store connected successfully',
      store: {
        id: store.id,
        platform: store.platform,
        name: store.store_name
      }
    });
  } catch (error) {
    next(error);
  }
});

// Connect WooCommerce store
router.post('/connect/woocommerce', async (req, res, next) => {
  try {
    const { storeUrl, consumerKey, consumerSecret } = req.body;
    const userId = req.user.id;

    // Validate WooCommerce connection
    const response = await axios.get(
      `${storeUrl}/wp-json/wc/v3/system_status`,
      {
        auth: {
          username: consumerKey,
          password: consumerSecret
        }
      }
    );

    // Store connection details
    const { data: store, error } = await supabase
      .from('connected_stores')
      .insert([
        {
          user_id: userId,
          platform: 'woocommerce',
          store_url: storeUrl,
          consumer_key: consumerKey,
          consumer_secret: consumerSecret,
          store_name: response.data.settings.title,
          connected_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'WooCommerce store connected successfully',
      store: {
        id: store.id,
        platform: store.platform,
        name: store.store_name
      }
    });
  } catch (error) {
    next(error);
  }
});

// Connect Magento store
router.post('/connect/magento', async (req, res, next) => {
  try {
    const { storeUrl, apiKey } = req.body;
    const userId = req.user.id;

    // Validate Magento connection
    const response = await axios.get(
      `${storeUrl}/rest/V1/store/storeConfigs`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // Store connection details
    const { data: store, error } = await supabase
      .from('connected_stores')
      .insert([
        {
          user_id: userId,
          platform: 'magento',
          store_url: storeUrl,
          api_key: apiKey,
          store_name: response.data[0]?.base_url || 'Magento Store',
          connected_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'Magento store connected successfully',
      store: {
        id: store.id,
        platform: store.platform,
        name: store.store_name
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get connected stores
router.get('/', async (req, res, next) => {
  try {
    const { data: stores, error } = await supabase
      .from('connected_stores')
      .select('id, platform, store_name, connected_at')
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({ stores });
  } catch (error) {
    next(error);
  }
});

// Disconnect store
router.delete('/:storeId', async (req, res, next) => {
  try {
    const { storeId } = req.params;

    const { error } = await supabase
      .from('connected_stores')
      .delete()
      .eq('id', storeId)
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.json({ message: 'Store disconnected successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;