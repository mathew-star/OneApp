import { SmoothCursor } from "@/components/ui/smooth-cursor";
import ParallaxHero from "@/components/sections/ParallexHero";
import OurVision from "@/components/sections/OurVision";
import ScrollProgress from "@/components/sections/ScrollProgress"
import Mission from "@/components/sections/Mission";
import MissionScrollStack from "@/components/sections/Missions";
import ContactSection from "@/components/sections/ContactUs";

import Survery from "@/components/sections/SurveryCategories";

import PillNav from "@/components/sections/Header";


export default function Home() {
  return (
    <>
      <SmoothCursor/>

      <ScrollProgress />
      <main>
         <section id="home">
          <ParallaxHero/>
         </section>

          <section id="vision">
            <OurVision/>
          </section>

          <section id="mission">
            <Mission/>
          </section>
          
          {/* <MissionScrollStack/> */}

          <section id="contact">
              <ContactSection/>
          </section>

          <section id="survey">
            <Survery/>
          </section>

          
          
      </main>
    </>
     );
}
