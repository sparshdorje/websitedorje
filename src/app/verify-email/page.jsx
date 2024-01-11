import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import DorjeLogo from '../../../public/assets/icons/dorje-logo.png';

const page = ({ searchParams }) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  return (
    <div className="container relative flex py-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === 'string' ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <div className="relative mb-4 h-40 w-40 text-muted-foreground">
              <Image
                loading="lazy"
                src={DorjeLogo}
                fill
                alt="hippo email sent image"
              />
            </div>

            <h3 className="font-semibold text-2xl">Check your email</h3>

            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{' '}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            )}

            <p className="text-muted-foreground text-center my-2">
              Sign in after verifying your email
            </p>

            <Link
              className={buttonVariants({ className: 'mt-1' })}
              href="/sign-in"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
