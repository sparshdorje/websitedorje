'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignUpValidator } from '../../../lib/validators/accountCredentialsValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '../../../lib/utils';
import DorjeLogo from '../../../../public/assets/icons/dorje-logo.png';
import Image from 'next/image';
import UserService from '@/services/user';
import { toast } from 'sonner';

const page = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpValidator),
  });

  const signUp = async ({ email, password, firstName, lastName }) => {
    try {
      setIsLoading(true);
      const res = await UserService.createUser({
        email,
        password,
        firstName,
        lastName,
        acceptsMarketing: true,
      });

      const customerData = res?.data?.data?.customerCreate?.customer || {};

      const customerError =
        res?.data?.data?.customerCreate?.customerUserErrors?.[0] || {};

      if (customerData && Object.keys(customerData).length > 0) {
        toast.success(`Verification email sent to ${email}.`);
        router.push('/verify-email?to=' + email);
      } else {
        toast.error(customerError.message);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);

      toast.error(e);
    }
  };

  const onsubmit = ({ email, password, firstName, lastName }) => {
    signUp({ email, password, firstName, lastName });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center min-h-screen lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src={DorjeLogo}
              className="h-20 w-20"
              alt="Dorje Teas Logo"
              loading="lazy"
            />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    className={cn('bg-white', {
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
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    {...register('firstName')}
                    type="text"
                    className={cn('bg-white', {
                      'focus-visible:ring-red-500': errors.firstName,
                    })}
                    placeholder="First Name"
                  />
                  {errors?.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    {...register('lastName')}
                    type="text"
                    className={cn('bg-white', {
                      'focus-visible:ring-red-500': errors.lastName,
                    })}
                    placeholder="Last Name"
                  />
                  {errors?.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register('password')}
                    type="password"
                    className={cn('bg-white', {
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

                <Button>
                  {isLoading ? 'Verifying Details...' : 'Sign Up'}
                </Button>
              </div>
            </form>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href="/sign-in"
            >
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
