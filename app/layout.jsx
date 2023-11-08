import { LenisScroller } from "@/components/LenisScroller";
// import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { ppNeueMachina } from "./fonts";
import "./global.scss";

export const metadata = {
  title: "Brieuc",
  description: "Développeur Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${ppNeueMachina.className}`}>
      <body>
        {/* <PageWrapper> */}
        {children}
        {/* </PageWrapper> */}
        <LenisScroller />
      </body>
    </html>
  );
}
