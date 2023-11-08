import localFont from "next/font/local"

export const ppNeueMachina = localFont({
  variable: "--pp-neue-machina",
  src: [
    {
      path: "assets/fonts/PPNeueMachina-PlainRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "assets/fonts/PPNeueMachina-PlainRegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "assets/fonts/PPNeueMachina-PlainUltraBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "assets/fonts/PPNeueMachina-PlainUltraBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
})

export const ppNeueMachinaInktrap = localFont({
  variable: "--pp-neue-machina-inktrap",
  src: [
    {
      path: "assets/fonts/PPNeueMachina-InktrapRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "assets/fonts/PPNeueMachina-InktrapUltraBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
})
