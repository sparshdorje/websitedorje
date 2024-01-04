'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthCredentialValidator } from '../../../lib/validators/accountCredentialsValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn, setCookie } from '../../../lib/utils';
import DorjeLogo from '../../../../public/assets/icons/dorje-logo.png';
import Image from 'next/image';
import { toast } from 'sonner';

import UserService from '@/services/user';

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get('origin');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AuthCredentialValidator),
  });

  const signIn = async ({ email, password }) => {
    try {
      const res = await UserService.getAccessToken({
        email,
        password,
      });

      const accessTokenData =
        res?.data?.data?.customerAccessTokenCreate?.customerAccessToken || {};

      const accessTokenError =
        res?.data?.data?.customerAccessTokenCreate?.customerUserErrors?.[0] ||
        {};

      if (accessTokenData && Object.keys(accessTokenData).length > 0) {
        toast.success('Signed in successfully');

        setCookie({
          name: 'access_token',
          value: accessTokenData.accessToken,
          expiresAt: accessTokenData.expiresAt,
        });

        if (origin) {
          router.push(`/${origin}`);
          return;
        }

        router.push('/');
        router.refresh();
      } else {
        console.log(accessTokenError, ' accessTokenError');
        if (accessTokenError.code === 'UNIDENTIFIED_CUSTOMER') {
          toast.error('User does not exist or verified');
        } else {
          toast.error('Something Went Wrong');
        }
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const onsubmit = ({ email, password }) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className="container relative flex flex-col items-center pt-20 min-h-screen lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src={DorjeLogo}
              className="h-20 w-20"
              alt="Dorje Teas Logo"
            />
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </h1>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register('password')}
                    type="password"
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button>Sign in</Button>
              </div>
            </form>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href="/sign-up"
            >
              Don't have an account? Sign-up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
