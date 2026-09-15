import "./globals.css";
import { Geist, Libre_Caslon_Text } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-caslon-text",
});

export const metadata = {
  title: "CareSync",
  description: "Transforming Healthcare with CareSync",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${libreCaslon.variable}`}>
      <body>{children}</body>
    </html>
  );
}
