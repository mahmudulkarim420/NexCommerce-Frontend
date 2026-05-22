import ReduxProvider from "@/src/components/providers/ReduxProvider";
import { Lato, Roboto } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import ToasterClient from "./ToasterClient";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "NexCommerce",
  description: "Your one-stop online shop for everything you need.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${roboto.variable} antialiased`}>
        <ReduxProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ReduxProvider>
        <ToasterClient />
      </body>
    </html>
  );
}
