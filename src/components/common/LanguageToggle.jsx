import React from 'react';
import { useLanguageStore } from '../../stores/languageStore';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './SafeIcon';

const { FiGlobe } = FiIcons;

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="relative">
      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <SafeIcon icon={FiGlobe} className="w-4 h-4" />
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </button>
    </div>
  );
};

export default LanguageToggle;