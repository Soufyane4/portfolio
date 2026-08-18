import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CursorGlow from '@/animations/CursorGlow'
import ConsoleEasterEgg from '@/animations/ConsoleEasterEgg'

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CursorGlow />
      <ConsoleEasterEgg />
      <Nav />
      {children}
      <Footer />
    </NextIntlClientProvider>
  )
}