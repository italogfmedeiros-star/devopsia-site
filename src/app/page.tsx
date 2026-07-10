import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <TechMarquee />
        <Services />
        <About />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
