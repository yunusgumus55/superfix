"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

interface ServiceFAQProps {
  data: FAQItem[]
}

export default function ServiceFAQ({ data }: ServiceFAQProps) {
  return (
    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
      {data.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left font-medium">{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
