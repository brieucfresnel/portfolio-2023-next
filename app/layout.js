import Navbar from "@/components/layout/Navbar/Navbar";
import { Rubik } from "next/font/google";
import "@/assets/scss/global.scss";

const inter = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Brieuc",
  description: "Développeur Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
