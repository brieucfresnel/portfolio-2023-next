import Navbar from "@/components/Navbar/Navbar"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Projects from "@/components/Projects/Projects"

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Header></Header>
      {/* <ThreeScene></ThreeScene> */}
      <Projects></Projects>
      <Footer></Footer>
    </>
  )
}
