import "./globals.css";
import { Inter, Nunito } from "next/font/google";

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
      <body className={font.className}>{children}</body>
    </html>
  );
}
