import { useCallback } from 'react'
import { useLanguageStore } from '@store/languageStore'
import { Language } from '@utils/translations'
import './LanguageSwitch.scss'

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguageStore()

  const handleLanguageChange = useCallback(
    (newLang: Language) => {
      setLanguage(newLang)
    },
    [setLanguage]
  )

  return (
    <div className='language-switch'>
      <button
        className={`language-switch__button language-switch__button--en ${
          language === 'en' ? 'language-switch__button--active' : ''
        }`}
        onClick={() => handleLanguageChange('en')}
        aria-label='Switch to English'
        type='button'
      ></button>
      <button
        className={`language-switch__button language-switch__button--pl ${
          language === 'pl' ? 'language-switch__button--active' : ''
        }`}
        onClick={() => handleLanguageChange('pl')}
        aria-label='Switch to Polish'
        type='button'
      />
    </div>
  )
}

export default LanguageSwitch
