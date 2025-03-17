import enTranslations from '../translations/en.json'
import plTranslations from '../translations/pl.json'

export type TranslationKey = keyof typeof enTranslations

export type Language = 'en' | 'pl'

export type Translations = Record<Language, Record<TranslationKey, string>>

export const translations: Translations = {
  en: enTranslations,
  pl: plTranslations,
}
