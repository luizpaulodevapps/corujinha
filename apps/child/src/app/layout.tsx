import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Corujinha Play',
    template: '%s | Corujinha',
  },
  description: 'Suas missões te esperam! Complete tarefas, ganhe moedas e evolua seu avatar.',
  applicationName: 'Corujinha Play',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'Corujinha Play', statusBarStyle: 'black-translucent' },
}

export const viewport: Viewport = {
  themeColor: '#4B9C7A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={nunito.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
