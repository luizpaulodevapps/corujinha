import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Importando estilos globais
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Corujinha Admin | Command Center',
  description: 'Painel de administração da plataforma Corujinha.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
