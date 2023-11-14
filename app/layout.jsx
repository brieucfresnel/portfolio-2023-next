import { ReactLenis } from "@/components/LenisScroller"
import Script from "next/script"

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
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-EVDQVZGMWB"
      ></Script>
      <Script id="google-analytics">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EVDQVZGMWB');
`}
      </Script>
      <body className="bg-noise">
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  )
}
