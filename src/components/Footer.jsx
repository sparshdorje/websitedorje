import { APP_CONSTATNTS } from '@/config';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';

const Footer = () => {
  return (
    <div className="w-full bg-primary pb-24 lg:pb-0 mt-auto">
      <MaxWidthWrapper
        className={'py-12 flex flex-col lg:flex-row justify-between gap-12'}
      >
        <div className="flex flex-col text-center lg:text-left items-start gap-12">
          <div>
            <div className=" font-questrial text-white font-bold text-base mb-3">
              About us
            </div>
            <div className="max-w-lg font-questrial text-white font-medium text-sm ">
              Dorje Teas is based out of the heritage Selim Hill Tea Garden in
              Darjeeling. Our mission is to revive Darjeeling. Join our Tea
              Club, and become a supporter of our mission.
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start w-full">
            <div className="font-questrial text-white font-bold text-base mb-3">
              Follow us on social media
            </div>
            <div className="text-white flex items-center gap-3">
              <Link
                target="_blank"
                href={'https://www.instagram.com/dorjeteas/'}
              >
                <Instagram />
              </Link>
              <Link
                target="_blank"
                href={
                  'https://www.youtube.com/channel/UCUNwm8vKpYm3tmrrnHrqiCw'
                }
              >
                <Youtube />
              </Link>
              <Link
                target="_blank"
                href={'https://www.facebook.com/dorjeteas/'}
              >
                <Facebook />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start gap-12">
          <div>
            <div className=" font-questrial text-white font-bold text-base mb-3">
              Info
            </div>
            <div className="flex flex-col items-start gap-3">
              <Link
                href={`/policies/privacy-policy`}
                className="font-questrial text-white font-medium text-sm "
              >
                Privacy Policy
              </Link>
              <Link
                href={`/policies/refund-policy`}
                className="font-questrial text-white font-medium text-sm "
              >
                Refund Policy
              </Link>
              <Link
                href={`/policies/terms-of-service`}
                className="font-questrial text-white font-medium text-sm "
              >
                Terms of Service
              </Link>
              <Link
                href={`/policies/shipping-policy`}
                className="font-questrial text-white font-medium text-sm "
              >
                Shipping Policy
              </Link>
              <Link
                href={`/policies/subscription-policy`}
                className="font-questrial text-white font-medium text-sm "
              >
                Subscription Policy
              </Link>
              <Link
                href={`/pages/offline-presence`}
                className="font-questrial text-white font-medium text-sm "
              >
                Offline Presence
              </Link>
            </div>
          </div>
          <div>
            <div className=" font-questrial text-white font-bold text-base mb-3">
              Quick Links
            </div>
            <div className="flex flex-col items-start gap-3">
              {/* <Link
                href={''}
                className="font-questrial text-white font-medium text-sm"
              >
                Tea Club
              </Link> */}
              <Link
                href={'/collections/black-tea'}
                className="font-questrial text-white font-medium text-sm "
              >
                Shop
              </Link>
              <Link
                href={'/blogs/posts'}
                className="font-questrial text-white font-medium text-sm "
              >
                Blogs
              </Link>
              {/* <Link
                target="_blank"
                href={`${APP_CONSTATNTS.SHOPYFY_URL}/pages/selim-hill-collective`}
                className="font-questrial text-white font-medium text-sm "
              >
                Selim Hill Collective
              </Link>
              <Link
                target="_blank"
                href={`${APP_CONSTATNTS.SHOPYFY_URL}/pages/our-farms`}
                className="font-questrial text-white font-medium text-sm "
              >
                Our Farms
              </Link> */}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
