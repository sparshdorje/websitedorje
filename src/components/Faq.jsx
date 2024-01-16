'use client';
import { motion } from 'framer-motion';
import { FAQs } from '../config/FAQs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const Faq = () => {
  return (
    <div>
      {FAQs.map((faq, idx) => (
        <Accordion key={idx} type="single" collapsible>
          <AccordionItem value={faq.question}>
            <AccordionTrigger>
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="border-transparent text-left font-questrial text-primary border-b-2 text-base font-bold"
              >
                {faq.question}
              </motion.div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="border-transparent font-questrial text-primary text-base font-medium">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default Faq;
