import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Apply admin middleware to all routes
router.use(requireAdmin);

// Get platform statistics
router.get('/stats', async (req, res, next) => {
  try {
    // Get user count
    const { count: userCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Get active subscriptions
    const { count: activeSubscriptions } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .in('subscription_status', ['active', 'trialing']);

    // Get total revenue (mock calculation)
    const { data: users } = await supabase
      .from('users')
      .select('subscription_plan')
      .eq('subscription_status', 'active');

    const revenue = users?.reduce((total, user) => {
      const planPrices = { professional: 29, enterprise: 99 };
      return total + (planPrices[user.subscription_plan] || 0);
    }, 0) || 0;

    // Get products count
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    res.json({
      stats: {
        totalUsers: userCount || 0,
        activeSubscriptions: activeSubscriptions || 0,
        monthlyRevenue: revenue,
        totalProducts: productCount || 0,
        growthRate: 24.7 // Mock data
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get('/users', async (req, res, next) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, name, subscription_plan, subscription_status, created_at, last_login')
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ users });
  } catch (error) {
    next(error);
  }
});

// Update user subscription
router.patch('/users/:userId/subscription', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { plan, status } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .update({ 
        subscription_plan: plan,
        subscription_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json({ 
      message: 'User subscription updated',
      user 
    });
  } catch (error) {
    next(error);
  }
});

// Get platform analytics
router.get('/analytics', async (req, res, next) => {
  try {
    // User growth data (mock)
    const userGrowth = [
      { month: 'Jan', users: 2340 },
      { month: 'Feb', users: 3210 },
      { month: 'Mar', users: 4560 },
      { month: 'Apr', users: 5890 },
      { month: 'May', users: 7230 },
      { month: 'Jun', users: 8940 },
      { month: 'Jul', users: 12847 }
    ];

    // Revenue by plan (mock)
    const revenueByPlan = [
      { plan: 'Professional', percentage: 65, revenue: 161355 },
      { plan: 'Enterprise', percentage: 25, revenue: 62140 },
      { plan: 'Starter', percentage: 10, revenue: 0 }
    ];

    res.json({
      userGrowth,
      revenueByPlan
    });
  } catch (error) {
    next(error);
  }
});

// Get recent activity
router.get('/activity', async (req, res, next) => {
  try {
    const { limit = 20 } = req.query;

    // This would typically come from an activity log table
    // For now, returning mock data
    const activities = [
      {
        id: 1,
        user_email: 'john@example.com',
        action: 'Upgraded to Professional',
        plan: 'Professional',
        revenue: 29.00,
        date: '2024-01-15'
      },
      {
        id: 2,
        user_email: 'sarah@store.com',
        action: 'New Registration',
        plan: 'Starter',
        revenue: 0.00,
        date: '2024-01-15'
      },
      {
        id: 3,
        user_email: 'mike@shop.com',
        action: 'Upgraded to Enterprise',
        plan: 'Enterprise',
        revenue: 99.00,
        date: '2024-01-14'
      }
    ];

    res.json({ activities });
  } catch (error) {
    next(error);
  }
});

export default router;