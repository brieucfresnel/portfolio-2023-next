import localFont from "next/font/local"
import { Trispace } from "next/font/google"

export const trispace = Trispace({ subsets: ["latin"] })

export const chivo = localFont({
  variable: "--chivo",
  src: [
    {
      path: "../../assets/fonts/Chivo/Chivo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Chivo/Chivo-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Chivo/Chivo-Thin.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Chivo/Chivo-Bold.woff2",
      weight: "700",
      style: "italic",
    },
  ],
})
