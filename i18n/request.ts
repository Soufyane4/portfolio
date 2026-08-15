import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'

const locales = ['en', 'fr']

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(locales, requested) ? requested : 'en'

  const messages = locale === 'fr' 
    ? (await import('../locales/fr.json')).default
    : (await import('../locales/en.json')).default

  return {
    locale,
    messages
  }
})