import cron from 'node-cron';
import { createClient } from '@supabase/supabase-js';
import { optimizeProductPrices } from './pricingService.js';
import { sendEmail } from './emailService.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const startCronJobs = () => {
  // Run pricing optimization every hour
  cron.schedule('0 * * * *', async () => {
    console.log('🔄 Running hourly pricing optimization...');
    
    try {
      // Get all users with auto-optimization enabled
      const { data: users } = await supabase
        .from('users')
        .select('id, email, name')
        .eq('auto_optimize', true);

      for (const user of users || []) {
        await optimizeProductPrices(user.id);
      }
      
      console.log('✅ Pricing optimization completed');
    } catch (error) {
      console.error('❌ Pricing optimization failed:', error);
    }
  });

  // Send weekly reports every Monday at 9 AM
  cron.schedule('0 9 * * 1', async () => {
    console.log('📊 Sending weekly reports...');
    
    try {
      const { data: users } = await supabase
        .from('users')
        .select('id, email, name')
        .eq('weekly_reports', true);

      for (const user of users || []) {
        // Get user's performance data
        const performanceData = await getUserPerformanceData(user.id);
        
        await sendEmail({
          to: user.email,
          template: 'weekly-report',
          data: {
            name: user.name,
            ...performanceData
          }
        });
      }
      
      console.log('✅ Weekly reports sent');
    } catch (error) {
      console.error('❌ Weekly reports failed:', error);
    }
  });

  // Cleanup old data every day at midnight
  cron.schedule('0 0 * * *', async () => {
    console.log('🧹 Cleaning up old data...');
    
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Delete old pricing history
      await supabase
        .from('pricing_history')
        .delete()
        .lt('created_at', thirtyDaysAgo.toISOString());

      console.log('✅ Data cleanup completed');
    } catch (error) {
      console.error('❌ Data cleanup failed:', error);
    }
  });

  console.log('📅 Cron jobs started successfully');
};

const getUserPerformanceData = async (userId) => {
  // This would fetch actual performance data from the database
  // For now, returning mock data
  return {
    totalProducts: 150,
    optimizedProducts: 120,
    revenueIncrease: '18.5%',
    profitImprovement: '22.3%'
  };
};