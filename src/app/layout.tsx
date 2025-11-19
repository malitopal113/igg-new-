import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Oswald } from 'next/font/google';
import { Bebas_Neue } from "next/font/google";
import { Work_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});


export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const worksans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-worksans",
});


const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-oswald',
});

export const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"], // tek weight ama çok güçlü
  variable: "--font-bebas",
});




const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cabin",
});
export const metadata: Metadata = {
  title: "IGG",
  description: "IGG kurumsal web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabin.variable} ${oswald.variable} ${bebas.variable} ${montserrat.variable} ${poppins.variable} ${worksans.variable}`}>
      <body
        className="font-sans overflow-x-hidden" style={{ fontFamily: "'Cabin', sans-serif" }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
