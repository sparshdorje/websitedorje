'use client';
import { useAuth } from '@/hooks/useAuth';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const UserAccountNav = () => {
  const { signOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible outline-none">
        <Button variant={'ghost'} size={'sm'} className="relative">
          <UserRound className="h-6 w-6 flex-shrink-0 text-gray-400 hover:text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-60" align="end">
        <DropdownMenuItem asChild>
          <Link href="/account" className="cursor-pointer">
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
