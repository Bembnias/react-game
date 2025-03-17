import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Language, TranslationKey, translations } from '@utils/translations'

// ===== Local storage key =====
const LANGUAGE_STORAGE_KEY = 'memory-game-language'

const getStoredLanguage = (): Language => {
  try {
    const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return (storedLang as Language) || 'en'
  } catch (error) {
    console.error('Error retrieving language setting:', error)
    return 'en'
  }
}

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

export const useLanguageStore = create<LanguageState>()(
  immer((set, get) => ({
    language: getStoredLanguage(),

    setLanguage: (lang: Language) => {
      set((state) => {
        state.language = lang
      })

      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
      } catch (error) {
        console.error('Error saving language setting:', error)
      }
    },

    t: (key: TranslationKey) => {
      const { language } = get()
      return translations[language][key]
    },
  }))
)
