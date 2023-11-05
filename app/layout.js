import Navbar from "@/components/layout/Navbar/Navbar";
import localFont from "next/font/local";
import "@/assets/scss/global.scss";

const ppNeueMachina = localFont({
  src: [
    {
      path: "../assets/fonts/PPNeueMachina-PlainRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/PPNeueMachina-PlainRegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/PPNeueMachina-PlainUltraBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/PPNeueMachina-PlainUltraBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});
export const metadata = {
  title: "Brieuc",
  description: "Développeur Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={ppNeueMachina.className}>{children}</body>
    </html>
  );
}
