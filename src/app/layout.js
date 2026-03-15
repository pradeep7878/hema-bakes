import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { Cormorant_Garamond, Noto_Sans, Marhey } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap'
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
})

const marhey = Marhey({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-arabic',
  display: 'swap'
})

export const metadata = {
  title: "HEMA BAKES",
  description: "Fresh Homemade Brownies"
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${cormorantGaramond.variable} ${marhey.variable}`}>
        <div className="bg-hearts" aria-hidden="true">
          <span className="bg-heart heart-1"></span>
          <span className="bg-heart heart-2"></span>
          <span className="bg-square square-1"></span>
          <span className="bg-square square-2"></span>
        </div>
        <Providers>
          <div className="app-shell">
            <Navbar />
            <main className="app-main">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
