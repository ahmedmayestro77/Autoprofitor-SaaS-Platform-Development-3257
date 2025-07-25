import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { useAuthStore } from '../stores/authStore';

const { FiTrendingUp, FiShoppingBag, FiDollarSign, FiStore } = FiIcons;

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const stats = [
    {
      name: t('dashboard.total_products'),
      value: '1,234',
      icon: FiShoppingBag,
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: t('dashboard.optimized_products'),
      value: '856',
      icon: FiTrendingUp,
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: t('dashboard.revenue_increase'),
      value: '23.5%',
      icon: FiDollarSign,
      change: '+2.1%',
      changeType: 'positive'
    },
    {
      name: t('dashboard.stores_connected'),
      value: '3',
      icon: FiStore,
      change: '+1',
      changeType: 'positive'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('dashboard')} - Autoprofitor</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">
              {t('dashboard.welcome')}, {user?.name}!
            </h1>
            <p className="mt-2 text-gray-600">
              Here's an overview of your store performance and pricing optimization.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={stat.icon} className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      <p className={`ml-2 text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Pricing Updates</h3>
              <div className="space-y-4">
                {[
                  { product: 'Wireless Headphones', oldPrice: '$99', newPrice: '$119', change: '+20%' },
                  { product: 'Smart Watch', oldPrice: '$299', newPrice: '$279', change: '-7%' },
                  { product: 'Laptop Stand', oldPrice: '$49', newPrice: '$59', change: '+20%' },
                  { product: 'USB Cable', oldPrice: '$15', newPrice: '$18', change: '+20%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.product}</p>
                      <p className="text-sm text-gray-600">
                        {item.oldPrice} → {item.newPrice}
                      </p>
                    </div>
                    <span className={`text-sm font-medium ${
                      item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-gray-900">Optimize All Products</p>
                  <p className="text-sm text-gray-600">Run AI optimization on all products</p>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-gray-900">Connect New Store</p>
                  <p className="text-sm text-gray-600">Add another e-commerce platform</p>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-gray-900">View Analytics</p>
                  <p className="text-sm text-gray-600">See detailed performance reports</p>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;