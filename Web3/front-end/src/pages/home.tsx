import { Footer } from "../components/layout/footer"
import { Layout } from "../components/layout/layout"
import { EcosystemSection } from "../components/sections/eco-system-section"
import { FeaturesSection } from "../components/sections/features-section"
import { FutureEconomySection } from "../components/sections/future-economy-section"
import { HedronSection } from "../components/sections/hedron-section"
import { Hero } from "../components/sections/hero-section"
import { TechnologySection } from "../components/sections/technology-section"

export function HomePage() {
  return (
    <Layout>
      <Hero />
      <EcosystemSection />
      <FeaturesSection />
      <HedronSection />
      <FutureEconomySection />
      <TechnologySection />
      <Footer />
    </Layout>
  )
}
