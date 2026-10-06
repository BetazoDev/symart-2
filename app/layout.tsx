import type { Metadata } from "next";
import { Kumbh_Sans, Marcellus } from "next/font/google";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuickView } from "@/components/QuickView";
import { SearchModal } from "@/components/SearchModal";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-kumbh",
});

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

export const metadata: Metadata = {
  title: {
    default: "Symart | Muebles de oficina a tu medida",
    template: "%s | Symart",
  },
  description:
    "Diseñamos, fabricamos e instalamos escritorios, sillas y estaciones de trabajo en Aguascalientes.",
  icons: {
    icon: "https://symart.com.mx/wp-content/uploads/2025/09/cropped-logo-symart-1-32x32.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${kumbh.variable} ${marcellus.variable}`}>
      <head>
        <link rel="stylesheet" href="/css/site.css" />
      </head>
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <QuickView />
        </StoreProvider>
      </body>
    </html>
  );
}
