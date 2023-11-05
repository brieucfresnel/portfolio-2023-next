import { ppNeueMachina, ppNeueMachinaInktrap } from "./fonts";
import "@/assets/scss/global.scss";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

export const metadata = {
  title: "Brieuc",
  description: "Développeur Web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${ppNeueMachina.className}`}>
      <body>
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
