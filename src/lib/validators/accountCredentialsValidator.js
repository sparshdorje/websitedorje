import { z } from 'zod';

export const AuthCredentialValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 characters long' }),
});

export const SignUpValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be 8 characters long' }),
  firstName: z.string().min(1, { message: 'First Name is Required' }),
  lastName: z.string().min(1, { message: 'Last Name is Required' }),
});
