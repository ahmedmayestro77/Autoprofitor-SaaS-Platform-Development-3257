import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ReactECharts from 'echarts-for-react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';

const { FiUsers, FiDollarSign, FiActivity, FiTrendingUp } = FiIcons;

const AdminDashboard = () => {
  const stats = [
    {
      name: 'Total Users',
      value: '12,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: FiUsers
    },
    {
      name: 'Monthly Revenue',
      value: '$248,563',
      change: '+12.5%',
      changeType: 'positive',
      icon: FiDollarSign
    },
    {
      name: 'Active Subscriptions',
      value: '8,234',
      change: '+5.8%',
      changeType: 'positive',
      icon: FiActivity
    },
    {
      name: 'Growth Rate',
      value: '24.7%',
      change: '+2.1%',
      changeType: 'positive',
      icon: FiTrendingUp
    }
  ];

  const userGrowthOption = {
    title: {
      text: 'User Growth',
      textStyle: {
        color: '#374151',
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis'
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
        name: 'Users',
        type: 'line',
        data: [2340, 3210, 4560, 5890, 7230, 8940, 12847],
        itemStyle: {
          color: '#0EA5E9'
        },
        areaStyle: {
          color: 'rgba(14, 165, 233, 0.1)'
        }
      }
    ]
  };

  const revenueOption = {
    title: {
      text: 'Revenue by Plan',
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
          { value: 65, name: 'Professional ($29)' },
          { value: 25, name: 'Enterprise ($99)' },
          { value: 10, name: 'Starter (Free)' }
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
        <title>Admin Dashboard - Autoprofitor</title>
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
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor platform performance, user activity, and revenue metrics.
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

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <ReactECharts option={userGrowthOption} style={{ height: '400px' }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <ReactECharts option={revenueOption} style={{ height: '400px' }} />
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent User Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">User</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Action</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Plan</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Revenue</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      user: 'john@example.com',
                      action: 'Upgraded to Professional',
                      plan: 'Professional',
                      revenue: '$29.00',
                      date: '2024-01-15'
                    },
                    {
                      user: 'sarah@store.com',
                      action: 'New Registration',
                      plan: 'Starter',
                      revenue: '$0.00',
                      date: '2024-01-15'
                    },
                    {
                      user: 'mike@shop.com',
                      action: 'Upgraded to Enterprise',
                      plan: 'Enterprise',
                      revenue: '$99.00',
                      date: '2024-01-14'
                    },
                    {
                      user: 'anna@boutique.com',
                      action: 'Connected Shopify Store',
                      plan: 'Professional',
                      revenue: '$0.00',
                      date: '2024-01-14'
                    }
                  ].map((activity, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">{activity.user}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{activity.action}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          activity.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                          activity.plan === 'Professional' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-green-600">{activity.revenue}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{activity.date}</td>
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

export default AdminDashboard;