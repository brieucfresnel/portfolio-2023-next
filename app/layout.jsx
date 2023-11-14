import { ReactLenis, useLenis } from "@/components/LenisScroller"

import { trispace } from "@/common/utils/fonts"
import "./global.scss"

export const metadata = {
  title: "Brieuc Fresnel",
  description: "Développeur front-end & WordPress",
  metadataBase: new URL("https://brieuc.tech"),
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${trispace.className}`}>
      <body className="bg-noise">
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  )
}
