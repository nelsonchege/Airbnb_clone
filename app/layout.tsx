import ClientOnly from "./clientOnly";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Inter, Nunito } from "next/font/google";
import { ToasterProvider } from "./providers/ToasterProvider";
import NextAuthSessionProvider from "./providers/sessionProvider";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb Clone",
  description: "A Nextjs Airbnb clone",
};
const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthSessionProvider>
          <ClientOnly>
            <ToasterProvider />
            <RentModal />
            <RegisterModal />
            <LoginModal />
            <Navbar />
          </ClientOnly>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
