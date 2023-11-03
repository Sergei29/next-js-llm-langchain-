import type { Metadata } from 'next'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { instrumentSans } from '@/styles/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Langchain JavaScript',
  description: 'Learn  the latest AI technologies from Shawn Esquivel.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className} `}>
        <Navbar />
        <main className="flex flex-col pt-20 px-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
