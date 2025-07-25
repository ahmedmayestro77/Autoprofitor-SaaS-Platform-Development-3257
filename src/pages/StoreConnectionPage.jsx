import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { storeService } from '../services/storeService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const { FiShoppingCart, FiLink, FiCheck } = FiIcons;

const StoreConnectionPage = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shopUrl: '',
    accessToken: '',
    storeUrl: '',
    consumerKey: '',
    consumerSecret: '',
    apiKey: ''
  });

  const platforms = [
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store for automatic pricing optimization',
      logo: '🛍️'
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      description: 'Integrate with your WordPress WooCommerce store',
      logo: '🛒'
    },
    {
      id: 'magento',
      name: 'Magento',
      description: 'Connect your Magento e-commerce platform',
      logo: '🏪'
    }
  ];

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setFormData({
      shopUrl: '',
      accessToken: '',
      storeUrl: '',
      consumerKey: '',
      consumerSecret: '',
      apiKey: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      switch (selectedPlatform) {
        case 'shopify':
          result = await storeService.connectShopify(formData.shopUrl, formData.accessToken);
          break;
        case 'woocommerce':
          result = await storeService.connectWooCommerce(
            formData.storeUrl,
            formData.consumerKey,
            formData.consumerSecret
          );
          break;
        case 'magento':
          result = await storeService.connectMagento(formData.storeUrl, formData.apiKey);
          break;
        default:
          throw new Error('Please select a platform');
      }

      toast.success('Store connected successfully!');
      setSelectedPlatform('');
      setFormData({
        shopUrl: '',
        accessToken: '',
        storeUrl: '',
        consumerKey: '',
        consumerSecret: '',
        apiKey: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to connect store');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (selectedPlatform) {
      case 'shopify':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop URL
              </label>
              <input
                type="url"
                name="shopUrl"
                value={formData.shopUrl}
                onChange={handleInputChange}
                placeholder="https://yourstore.myshopify.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Token
              </label>
              <input
                type="text"
                name="accessToken"
                value={formData.accessToken}
                onChange={handleInputChange}
                placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>
        );

      case 'woocommerce':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store URL
              </label>
              <input
                type="url"
                name="storeUrl"
                value={formData.storeUrl}
                onChange={handleInputChange}
                placeholder="https://yourstore.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consumer Key
              </label>
              <input
                type="text"
                name="consumerKey"
                value={formData.consumerKey}
                onChange={handleInputChange}
                placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consumer Secret
              </label>
              <input
                type="text"
                name="consumerSecret"
                value={formData.consumerSecret}
                onChange={handleInputChange}
                placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>
        );

      case 'magento':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store URL
              </label>
              <input
                type="url"
                name="storeUrl"
                value={formData.storeUrl}
                onChange={handleInputChange}
                placeholder="https://yourstore.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="text"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Connect Store - Autoprofitor</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Connect Your Store
            </h1>
            <p className="text-gray-600">
              Choose your e-commerce platform to start optimizing your product pricing automatically.
            </p>
          </motion.div>

          {!selectedPlatform ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onClick={() => handlePlatformSelect(platform.id)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all duration-300 hover:border-primary-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{platform.logo}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {platform.description}
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-center space-x-2 text-primary-600">
                        <SafeIcon icon={FiLink} className="w-4 h-4" />
                        <span className="text-sm font-medium">Connect</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => setSelectedPlatform('')}
                    className="text-gray-400 hover:text-gray-600 mr-4"
                  >
                    ←
                  </button>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Connect {platforms.find(p => p.id === selectedPlatform)?.name}
                  </h2>
                </div>

                <form onSubmit={handleSubmit}>
                  {renderForm()}
                  
                  <div className="mt-6 flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPlatform('')}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                      {loading ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <>
                          <SafeIcon icon={FiCheck} className="mr-2 w-4 h-4" />
                          Connect Store
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default StoreConnectionPage;