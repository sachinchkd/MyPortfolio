import { Arimo, Courier_Prime, Space_Grotesk } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "Who is Sachin ?",
  description: "Sachin Chakradhar Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${courier_prime_init.variable} ${space_grotesk_init.variable} ${arimo_init.variable} antialiased`}
      >
        {children}

        
      </body>
    </html>
  );
}
