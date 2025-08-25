import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
