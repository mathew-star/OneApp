import { SmoothCursor } from "@/components/ui/smooth-cursor";
import ParallaxHero from "@/components/sections/ParallexHero";
import OurVision from "@/components/sections/OurVision";
import ScrollProgress from "@/components/sections/ScrollProgress"
import Mission from "@/components/sections/Mission";
import MissionScrollStack from "@/components/sections/Missions";
import ContactSection from "@/components/sections/ContactUs";
import Footer from "@/components/sections/Footer";

import Survery from "@/components/sections/SurveryCategories";


export default function Home() {
  return (
    <>
      <SmoothCursor/>

      <ScrollProgress />
      <main>
          <ParallaxHero/>

          <OurVision/>

          <Mission/>
          
          {/* <MissionScrollStack/> */}

          <section>
              <ContactSection/>
          </section>

          <section>
            <Survery/>
          </section>

          <Footer/>
          
      </main>
    </>
     );
}
