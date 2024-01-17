'use client';
import { ASSETS } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import WhatsappLogo from '../../public/assets/svg/WhatsappLogo.svg';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const WhatsappChat = () => {
  const [showChatBox, setShowChatBox] = useState(false);

  const pathName = usePathname();

  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };
  return (
    <>
      <div
        className={cn(
          'fixed bottom-4 right-4 lg:bottom-10 lg:right-10 z-30 flex flex-col items-end gap-4',
          pathName.includes('/products') && 'bottom-20',
          pathName.includes('/make-your-own-blend/start') && 'bottom-36'
        )}
      >
        {showChatBox && (
          <div
            className="flex flex-col animate-in items-start gap-5 min-w-[300px] bg-white rounded-lg p-6 border-primary border-2"
            style={{ boxShadow: '4px 6px 0px #00E785' }}
          >
            <Image
              src={`${ASSETS.ICONS}/dorje-logo.png`}
              width={45}
              height={45}
              alt="Dorje Logo"
            />

            <div className="font-questrial text-lg font-semibold">
              Hi, How can we help you today?
            </div>

            <Link
              target="_blank"
              href={'https://wa.me/7679660664'}
              style={{ boxShadow: '2px 3px 0px #00E785' }}
              className="flex items-center justify-between gap-2 bg-primary text-white rounded-lg p-4 w-full"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={WhatsappLogo}
                  width={20}
                  height={20}
                  alt="Whatsapp Logo"
                />

                <div className="wa-chat-box-content-send-btn-text">
                  Chat With Us
                </div>
              </div>

              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                ></path>
              </svg>
            </Link>
          </div>
        )}

        <div
          onClick={toggleChatBox}
          className="bg-[#00e785] flex items-center justify-center rounded-full p-1 h-12 w-12 lg:h-16 lg:w-16 shadow-secondary shadow-md cursor-pointer"
        >
          <Image
            src={WhatsappLogo}
            width={30}
            height={30}
            alt="Whatsapp Logo"
            className="h-6 w-6 lg:h-8 lg:w-8 object-contain"
          />
        </div>
      </div>

      {showChatBox && (
        <div
          onClick={toggleChatBox}
          className="fixed top-0 right-0 bottom-0 left-0 z-10 h-screen w-screen bg-black bg-opacity-50"
        ></div>
      )}
    </>
  );
};

export default WhatsappChat;
