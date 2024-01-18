'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { motion } from 'framer-motion';
import Link from 'next/link';
import COLLECTIONS from '../config/Collections';

import Image from 'next/image';

const CollectionsBox = ({ collectionHandle = '', showTransition = true }) => {
  const sendViewCategoryEvent = ({ href }) => {
    sendGTMEvent({
      event: 'ViewCategory',
      content_category: href,
      eventID: parseInt(Math.random() * 10000000000),
    });
  };

  const renderContent = () => (
    <div className="flex items-start px-4 lg:items-center overflow-x-scroll justify-start lg:justify-center gap-8">
      {COLLECTIONS.map((collection, idx) => (
        <Link
          href={collection.href}
          key={collection.handle}
          onClick={() => sendViewCategoryEvent({ href: collection.href })}
          className="flex flex-col items-center gap-2 lg:gap-4"
        >
          <div
            className="relative aspect-square h-20 w-20 lg:h-28 lg:w-28 overflow-hidden rounded-full group-hover:opacity-75"
            style={{
              border:
                collectionHandle === collection.handle && '2px solid #40733E',
            }}
          >
            <Image
              loading="eager"
              src={collection.imageSrc}
              alt="product category image"
              fill
              className="object-contain object-center"
            />
          </div>
          <div
            className="font-questrial text-center text-xs lg:text-base text-primary font-bold"
            style={{
              color: collectionHandle === collection.handle && '#40733E',
            }}
          >
            {collection.name}
          </div>
        </Link>
      ))}
    </div>
  );
  return showTransition ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      {renderContent()}
    </motion.div>
  ) : (
    renderContent()
  );
};

export default CollectionsBox;
