import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { Cormorant_Garamond, Marhey, Manrope, Noto_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import Script from "next/script";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap'
})


const manrope = Manrope({
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

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap'
})

const saleha = localFont({
  src: './utils/fonts/saleha.regular.ttf',
  variable: '--font-saleha',
  display: 'swap'
})

export const metadata = {
  title: "Hema Bakes",
  description: "Fresh Homemade Brownies",
  icons: {
    icon: "/images/for-tab-icon.png",
    shortcut: "/images/for-tab-icon.png",
    apple: "/images/for-tab-icon.png",
  },
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QS22E4C8MY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-QS22E4C8MY');
        `}
        </Script>
      </head>
      <body className={`${manrope.variable} ${cormorantGaramond.variable} ${marhey.variable} ${notoSans.variable} ${saleha.variable}`}>
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
