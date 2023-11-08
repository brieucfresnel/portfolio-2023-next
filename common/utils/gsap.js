import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import Observer from "gsap/Observer"

gsap.registerPlugin(ScrollTrigger, Observer)

ScrollTrigger.addEventListener("refresh", function () {
  if (document.body.getAttribute("style") === "") {
    document.body.removeAttribute("style")
  }
})

export { gsap, ScrollTrigger, Observer }
