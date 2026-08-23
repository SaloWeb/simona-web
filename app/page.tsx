import { AboutSection } from "@/components/about-section"
import { AiSection } from "@/components/ai-section"
import { ComparisonSection } from "@/components/comparison-section"
import { ContactSection } from "@/components/contact-section"
import { DownloadSection } from "@/components/download-section"
import { HardwareSection } from "@/components/hardware-section"
import { HeroSection } from "@/components/hero-section"
import { IotSimulator } from "@/components/iot-simulator"
import { ProfilesSection } from "@/components/profiles-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <HardwareSection />
        <ComparisonSection />
        <ProfilesSection />
        <IotSimulator />
        <AiSection />
        <DownloadSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
