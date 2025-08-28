import React from 'react';
import Select from 'components/ui/Select';
import Icon from 'components/AppIcon';

const LanguageSelector = ({ 
  sourceLanguage, 
  targetLanguage, 
  onSourceLanguageChange, 
  onTargetLanguageChange,
  disabled = false 
}) => {
  const languages = [
    { value: 'en', label: 'English', flag: '🇺🇸', native: 'English' },
    { value: 'es', label: 'Spanish', flag: '🇪🇸', native: 'Español' },
    { value: 'fr', label: 'French', flag: '🇫🇷', native: 'Français' },
    { value: 'de', label: 'German', flag: '🇩🇪', native: 'Deutsch' },
    { value: 'it', label: 'Italian', flag: '🇮🇹', native: 'Italiano' },
    { value: 'pt', label: 'Portuguese', flag: '🇵🇹', native: 'Português' },
    { value: 'ru', label: 'Russian', flag: '🇷🇺', native: 'Русский' },
    { value: 'ja', label: 'Japanese', flag: '🇯🇵', native: '日本語' },
    { value: 'ko', label: 'Korean', flag: '🇰🇷', native: '한국어' },
    { value: 'zh', label: 'Chinese (Mandarin)', flag: '🇨🇳', native: '中文' },
    { value: 'ar', label: 'Arabic', flag: '🇸🇦', native: 'العربية' },
    { value: 'hi', label: 'Hindi', flag: '🇮🇳', native: 'हिन्दी' },
    { value: 'th', label: 'Thai', flag: '🇹🇭', native: 'ไทย' },
    { value: 'vi', label: 'Vietnamese', flag: '🇻🇳', native: 'Tiếng Việt' },
    { value: 'nl', label: 'Dutch', flag: '🇳🇱', native: 'Nederlands' },
    { value: 'sv', label: 'Swedish', flag: '🇸🇪', native: 'Svenska' },
    { value: 'no', label: 'Norwegian', flag: '🇳🇴', native: 'Norsk' },
    { value: 'da', label: 'Danish', flag: '🇩🇰', native: 'Dansk' },
    { value: 'fi', label: 'Finnish', flag: '🇫🇮', native: 'Suomi' },
    { value: 'pl', label: 'Polish', flag: '🇵🇱', native: 'Polski' }
  ];

  const formatLanguageOption = (language) => ({
    value: language?.value,
    label: (
      <div className="flex items-center space-x-3">
        <span className="text-lg">{language?.flag}</span>
        <div>
          <div className="font-medium">{language?.label}</div>
          <div className="text-xs text-muted-foreground">{language?.native}</div>
        </div>
      </div>
    ),
    searchText: `${language?.label} ${language?.native}`
  });

  const languageOptions = languages?.map(formatLanguageOption);

  const handleSwapLanguages = () => {
    if (sourceLanguage && targetLanguage && !disabled) {
      onSourceLanguageChange(targetLanguage);
      onTargetLanguageChange(sourceLanguage);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Language Selection</h3>
        <p className="text-sm text-muted-foreground">
          Choose source and target languages for translation
        </p>
      </div>
      <div className="space-y-6">
        {/* Source Language */}
        <div>
          <Select
            label="Source Language"
            description="Language of the original video"
            placeholder="Select source language..."
            options={languageOptions}
            value={sourceLanguage}
            onChange={onSourceLanguageChange}
            disabled={disabled}
            searchable
            className="mb-4"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapLanguages}
            disabled={disabled || !sourceLanguage || !targetLanguage}
            className="p-2 rounded-full border border-border hover:bg-muted transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Swap languages"
          >
            <Icon name="ArrowUpDown" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Target Language */}
        <div>
          <Select
            label="Target Language"
            description="Language to translate the video to"
            placeholder="Select target language..."
            options={languageOptions}
            value={targetLanguage}
            onChange={onTargetLanguageChange}
            disabled={disabled}
            searchable
            className="mb-4"
          />
        </div>
      </div>
      {/* Language Info */}
      {sourceLanguage && targetLanguage && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Translation Direction:</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-foreground">
                {languages?.find(l => l?.value === sourceLanguage)?.native}
              </span>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
              <span className="font-medium text-foreground">
                {languages?.find(l => l?.value === targetLanguage)?.native}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;