import { LenisScroller } from "@/components/LenisScroller"
import { ppNeueMachina } from "@/common/utils/fonts"
import "./global.scss"

export const metadata = {
  title: "Brieuc",
  description: "Développeur Web",
}

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
  )
}
