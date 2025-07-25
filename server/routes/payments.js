import express from 'express';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Get subscription plans
router.get('/plans', async (req, res, next) => {
  try {
    const plans = [
      {
        id: 'starter',
        name: 'Starter',
        price: 0,
        currency: 'USD',
        interval: 'month',
        features: [
          'Up to 100 products',
          'Basic pricing optimization',
          'Email support',
          '1 store connection'
        ]
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 2900, // $29.00 in cents
        currency: 'USD',
        interval: 'month',
        features: [
          'Up to 1,000 products',
          'Advanced AI optimization',
          'Real-time analytics',
          '3 store connections',
          'Priority support',
          'Custom pricing rules'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 9900, // $99.00 in cents
        currency: 'USD',
        interval: 'month',
        features: [
          'Unlimited products',
          'Advanced AI + ML optimization',
          'Advanced analytics & reporting',
          'Unlimited store connections',
          '24/7 dedicated support',
          'Custom integrations',
          'White-label options'
        ]
      }
    ];

    res.json({ plans });
  } catch (error) {
    next(error);
  }
});

// Create subscription
router.post('/subscribe', async (req, res, next) => {
  try {
    const { planId, paymentMethodId } = req.body;
    const userId = req.user.id;

    // Get plan details
    const plans = {
      professional: { price: 2900, name: 'Professional' },
      enterprise: { price: 9900, name: 'Enterprise' }
    };

    const plan = plans[planId];
    if (!plan) {
      return res.status(400).json({ message: 'Invalid plan' });
    }

    // Create Stripe customer if doesn't exist
    let { data: user } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    let customerId = user.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        metadata: { userId }
      });
      customerId = customer.id;

      // Update user with customer ID
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price_data: {
        currency: 'usd',
        product_data: { name: plan.name },
        unit_amount: plan.price,
        recurring: { interval: 'month' }
      }}],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent']
    });

    // Update user subscription
    await supabase
      .from('users')
      .update({ 
        subscription_plan: planId,
        subscription_status: 'active',
        subscription_id: subscription.id
      })
      .eq('id', userId);

    res.json({
      message: 'Subscription created successfully',
      subscription: {
        id: subscription.id,
        status: subscription.status,
        plan: planId
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get current subscription
router.get('/subscription', async (req, res, next) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('subscription_plan, subscription_status, subscription_id')
      .eq('id', req.user.id)
      .single();

    res.json({ subscription: user });
  } catch (error) {
    next(error);
  }
});

// Cancel subscription
router.post('/cancel-subscription', async (req, res, next) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('subscription_id')
      .eq('id', req.user.id)
      .single();

    if (user.subscription_id) {
      await stripe.subscriptions.update(user.subscription_id, {
        cancel_at_period_end: true
      });

      await supabase
        .from('users')
        .update({ subscription_status: 'canceling' })
        .eq('id', req.user.id);
    }

    res.json({ message: 'Subscription will be canceled at the end of the billing period' });
  } catch (error) {
    next(error);
  }
});

// Get payment methods by country
router.get('/methods', async (req, res, next) => {
  try {
    const { country } = req.query;

    // Payment methods by region
    const paymentMethods = {
      'US': ['stripe', 'paypal'],
      'CA': ['stripe', 'paypal'],
      'GB': ['stripe', 'paypal'],
      'SA': ['stripe', 'tap', 'moyasar', 'paytabs'],
      'AE': ['stripe', 'tap', 'paytabs'],
      'EG': ['stripe', 'paymob', 'fawry'],
      'IN': ['stripe', 'razorpay'],
      'NG': ['stripe', 'flutterwave'],
      'default': ['stripe', 'paypal']
    };

    const methods = paymentMethods[country] || paymentMethods.default;

    res.json({ paymentMethods: methods });
  } catch (error) {
    next(error);
  }
});

// Create payment intent
router.post('/create-intent', async (req, res, next) => {
  try {
    const { amount, currency, paymentMethod } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: [paymentMethod],
      metadata: { userId: req.user.id }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    next(error);
  }
});

export default router;