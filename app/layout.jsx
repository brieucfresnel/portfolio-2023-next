import { LenisScroller } from "@/components/LenisScroller"
import { trispace } from "@/common/utils/fonts"
import "./global.scss"

export const metadata = {
  title: "Brieuc",
  description: "Développeur Web",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${trispace.className}`}>
      <body className="bg-noise">
        {children}
        <LenisScroller />
      </body>
    </html>
  )
}
