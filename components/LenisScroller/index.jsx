"use client"
import Lenis from "@studio-freight/lenis"
import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { gsap, ScrollTrigger } from "common/utils/gsap"

export const LenisScroller = () => {
  const lenis = useRef(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true })
  }, [pathname, searchParams, lenis])

  useEffect(() => {
    lenis.current = new Lenis({})

    lenis.current.on("scroll", ScrollTrigger.update)

    lenis.current.on("scroll", (e) => {})

    gsap.ticker.add((time) => {
      lenis.current.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.current.destroy()
      lenis.current = null
    }
  }, [])
  return <></>
}
