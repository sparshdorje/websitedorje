import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteCookie } from '../lib/utils';

export const useAuth = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      deleteCookie('access_token');

      toast.success('Signed out successfully');

      router.push('/sign-in');
      router.refresh();
    } catch (e) {
      toast.error("Couldn't sign out, please try again.");
    }
  };

  return { signOut };
};
