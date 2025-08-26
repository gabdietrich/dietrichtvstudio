import { useTranslation } from 'react-i18next';
import { analytics } from '../utils/analytics';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    // Track language switch
    analytics.switchLanguage(lng, i18n.language);
    
    // Change the language in i18next
    i18n.changeLanguage(lng);
    
    // Set cookie to persist language choice
    document.cookie = `lang=${lng}; path=/; max-age=${365 * 24 * 60 * 60}`; // 1 year
    
    // Update URL with new locale
    const currentPath = window.location.pathname;
    let newPath = '';
    
    // Check if current path has locale prefix
    const localeMatch = currentPath.match(/^\/(pt|en)(.*)/);
    if (localeMatch) {
      // Replace existing locale with new one
      const remainingPath = localeMatch[2] || '/';
      newPath = `/${lng}${remainingPath === '/' ? '/' : remainingPath}`;
    } else {
      // Add locale prefix to current path
      newPath = `/${lng}${currentPath === '/' ? '/' : currentPath}`;
    }
    
    // Navigate to new URL
    window.history.pushState({}, '', newPath);
    
    // Trigger a popstate event to update the app state
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 text-sm transition-all duration-200 ${
          i18n.language === 'en'
            ? 'text-black font-medium border-b border-black'
            : 'text-gray-500 hover:text-black'
        }`}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => changeLanguage('pt')}
        className={`px-2 py-1 text-sm transition-all duration-200 ${
          i18n.language === 'pt'
            ? 'text-black font-medium border-b border-black'
            : 'text-gray-500 hover:text-black'
        }`}
      >
        PT
      </button>
    </div>
  );
}
