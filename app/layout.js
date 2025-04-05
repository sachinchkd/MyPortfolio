import { Arimo, Courier_Prime, Karla, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisScrollProvider from "./providers/lenisprovider";



export const courier_prime_init = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier',
  
})

export const space_grotesk_init = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space',
  
})
export const arimo_init = Arimo({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-arimo',
  
})

export const karla_init = Karla({
  subsets: ['latin'],
  weight: ['200','300','400', '700'],
  variable: '--font-karla',
  
})

export const metadata = {
  title: "Who is Sachin Chakradhar?",
  description: "Sachin Chakradhar Portfolio",
  siteName: "Sachin Chakradhar",
    images: [
      {
        url: "/og-image.png", // should be placed in the /public folder
        width: 1200,
        height: 630,
        alt: "Sachin's Portfolio Preview",
      },
    ],
    type: "website",
  
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${courier_prime_init.variable} ${space_grotesk_init.variable} ${arimo_init.variable} ${karla_init.variable} antialiased`}
      >
        <LenisScrollProvider>
        {children}

        </LenisScrollProvider>
      </body>
    </html>
  );
}
