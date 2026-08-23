import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"

// Mismo contenido que el JSON-LD FAQPage en app/layout.tsx. Si cambiás una
// respuesta acá, actualizá también ese schema para que no queden
// desalineados (Google exige que el FAQPage tenga contenido visible
// equivalente en la página).
const faqs = [
  {
    value: "faq-1",
    question: "¿SIMONA necesita internet para funcionar?",
    answer:
      "No. El ESP32 levanta su propia red WiFi local (Access Point en 192.168.4.1) y toda la lógica de riego automático corre en el propio dispositivo. Internet solo se usa, de forma opcional, para pedirle un diagnóstico agronómico a la IA.",
  },
  {
    value: "faq-2",
    question: "¿Cuánto cuesta el Kit SIMONA?",
    answer:
      "SIMONA es un pago único por kit, sin cánones ni cobros por hectárea. El precio final depende de la cantidad de nodos y el segmento (huerta urbana, vivero, escuela técnica o proyecto municipal); se cotiza a medida desde el formulario de contacto.",
  },
  {
    value: "faq-3",
    question: "¿SIMONA funciona en Morón y el oeste del conurbano bonaerense?",
    answer:
      "Sí. SIMONA nació recorriendo quintas y huertas de Morón y la zona oeste del Gran Buenos Aires, y está pensado específicamente para las condiciones del cordón periurbano bonaerense.",
  },
  {
    value: "faq-4",
    question: "¿Qué variables mide el kit?",
    answer:
      "Humedad de suelo, temperatura y humedad ambiente, pH de suelo (por muestra manual) y luminosidad, además de un relé que acciona automáticamente la bomba de riego según el perfil de cultivo elegido.",
  },
  {
    value: "faq-5",
    question: "¿Puedo manejar más de una huerta o invernadero con la misma app?",
    answer:
      "Sí, la app Android de SIMONA permite gestión multi-huerta: cada huerta se administra por separado, con su propio nodo ESP32 y su propio perfil de cultivo.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="border-b border-border py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Preguntas Frecuentes"
          title="Lo que más nos preguntan antes de pedir un kit."
          description="Si tenés otra duda puntual sobre tu caso, contanos en el formulario y te respondemos directo."
          align="center"
          className="mx-auto"
        />

        <Card>
          <CardContent>
            <Accordion defaultValue={["faq-1"]}>
              {faqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
