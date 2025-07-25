import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ReactECharts from 'echarts-for-react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';

const { FiTrendingUp, FiDollarSign, FiShoppingBag, FiPercent } = FiIcons;

const AnalyticsPage = () => {
  const { t } = useTranslation();

  const stats = [
    {
      name: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      changeType: 'positive',
      icon: FiDollarSign
    },
    {
      name: 'Products Optimized',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive',
      icon: FiShoppingBag
    },
    {
      name: 'Avg. Profit Increase',
      value: '18.7%',
      change: '+2.1%',
      changeType: 'positive',
      icon: FiPercent
    },
    {
      name: 'Conversion Rate',
      value: '4.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: FiTrendingUp
    }
  ];

  const revenueChartOption = {
    title: {
      text: 'Revenue Trend',
      textStyle: {
        color: '#374151',
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Before Optimization', 'After Optimization']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Before Optimization',
        type: 'line',
        data: [12000, 13200, 14100, 13800, 15200, 16100, 15800],
        itemStyle: {
          color: '#94A3B8'
        }
      },
      {
        name: 'After Optimization',
        type: 'line',
        data: [12000, 14500, 16800, 17200, 19500, 21300, 22100],
        itemStyle: {
          color: '#0EA5E9'
        }
      }
    ]
  };

  const categoryChartOption = {
    title: {
      text: 'Revenue by Category',
      textStyle: {
        color: '#374151',
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Revenue',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 35, name: 'Electronics' },
          { value: 25, name: 'Clothing' },
          { value: 20, name: 'Home & Garden' },
          { value: 12, name: 'Sports' },
          { value: 8, name: 'Books' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{t('analytics')} - Autoprofitor</title>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('analytics')}
            </h1>
            <p className="text-gray-600">
              Track your pricing optimization performance and revenue growth.
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

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <ReactECharts option={revenueChartOption} style={{ height: '400px' }} />
            </motion.div>

            {/* Category Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <ReactECharts option={categoryChartOption} style={{ height: '400px' }} />
            </motion.div>
          </div>

          {/* Recent Optimizations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Optimizations</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Old Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">New Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Change</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Revenue Impact</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      product: 'Wireless Headphones',
                      oldPrice: '$99.99',
                      newPrice: '$119.99',
                      change: '+20.0%',
                      impact: '+$2,340',
                      date: '2024-01-15'
                    },
                    {
                      product: 'Smart Watch',
                      oldPrice: '$299.99',
                      newPrice: '$279.99',
                      change: '-6.7%',
                      impact: '+$1,890',
                      date: '2024-01-14'
                    },
                    {
                      product: 'Laptop Stand',
                      oldPrice: '$49.99',
                      newPrice: '$59.99',
                      change: '+20.0%',
                      impact: '+$1,250',
                      date: '2024-01-13'
                    }
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.product}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.oldPrice}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.newPrice}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`font-medium ${
                          item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-green-600">{item.impact}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;