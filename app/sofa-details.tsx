'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const details = [
  { id: 'dimensions', title: 'Dimensions & proportions', content: 'The Sunday chaise measures 298 cm wide × 168 cm deep × 78 cm high. A 44 cm seat height and 68 cm seat depth make space to settle in. Allow at least 80 cm around your sofa for an easy walkway.' },
  { id: 'construction', title: 'Comfort, from the inside out', content: 'A supportive timber frame gives Sunday its structure. Layered foam cushions soften the landing, while generously rounded arms make every corner a comfortable one. Modules connect beneath the seat to keep the silhouette clean.' },
  { id: 'care', title: 'A little everyday care', content: 'Vacuum upholstery gently with a soft brush attachment. Blot spills promptly with a clean, dry cloth and avoid rubbing. Keep your sofa away from prolonged direct sunlight, and rotate loose cushions regularly for even wear.' },
];

export default function SofaDetails() {
  return <Accordion className="spec-accordion" defaultValue={['dimensions']}>
    {details.map(detail => <AccordionItem key={detail.id} value={detail.id}>
      <AccordionTrigger className="spec-trigger">{detail.title}</AccordionTrigger>
      <AccordionContent className="spec-content"><p>{detail.content}</p></AccordionContent>
    </AccordionItem>)}
  </Accordion>;
}
