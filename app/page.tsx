import { AboutSection } from "@/components/about-section"
import { AiSection } from "@/components/ai-section"
import { ComparisonSection } from "@/components/comparison-section"
import { ContactSection } from "@/components/contact-section"
import { DownloadSection } from "@/components/download-section"
import { FaqSection } from "@/components/faq-section"
import { HardwareSection } from "@/components/hardware-section"
import { HeroSection } from "@/components/hero-section"
import { IotSimulator } from "@/components/iot-simulator"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import { ProfilesSection } from "@/components/profiles-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      {/*
        Skip link: invisible hasta recibir foco por teclado (primer Tab al
        entrar a la página). Va ANTES del header a propósito: si quedara
        después, el primer Tab caería en el logo/nav del header y habría
        que tabular por los 8 links del índice antes de llegar acá,
        anulando el propósito del skip link.
      */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-lg focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-medium focus-visible:text-primary-foreground focus-visible:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ProblemSolutionSection />
        <AboutSection />
        <HardwareSection />
        <ComparisonSection />
        <ProfilesSection />
        <IotSimulator />
        <AiSection />
        <DownloadSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
