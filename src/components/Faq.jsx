'use client';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { motion } from 'framer-motion';

const FAQs = [
  {
    question: 'Where does my tea come from?',
    answer:
      'We are based out of Second Chance House at Selim Hill Tea Garden. Selim Hill is a 1,000 acre heritage tea estate bordering the town of Kurseong. Established in 1871, tea is grown at an altitude of 500-4,000ft.',
  },
  {
    question: 'What are the conditions of the people growing my tea?',
    answer:
      'We are based out of Second Chance House at Selim Hill Tea Garden. Selim Hill is a 1,000 acre heritage tea estate bordering the town of Kurseong. Established in 1871, tea is grown at an altitude of 500-4,000ft.',
  },
  {
    question: 'How fresh is my tea?',
    answer:
      'We are based out of Second Chance House at Selim Hill Tea Garden. Selim Hill is a 1,000 acre heritage tea estate bordering the town of Kurseong. Established in 1871, tea is grown at an altitude of 500-4,000ft.',
  },
  {
    question: 'Is my tea organic?',
    answer:
      'We are based out of Second Chance House at Selim Hill Tea Garden. Selim Hill is a 1,000 acre heritage tea estate bordering the town of Kurseong. Established in 1871, tea is grown at an altitude of 500-4,000ft.',
  },
];

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
