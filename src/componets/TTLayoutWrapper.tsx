'use client';

import * as React from 'react';
import { useSession, signOut } from 'next-auth/react';
import TTAppLayout from '@/componets/TTAppLayout';

export default function TTLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  // ⭐️ Define the function that calls NextAuth's signOut with a redirect
  const handleSignOut = async () => {
    // Redirects to '/login' after successful sign out
    await signOut({ callbackUrl: '/login' }); 
  };
  
  // NOTE: If you need a Spinner/Loading state check here, you can add it before the return.

  return (
    <>
      {/* ⭐️ TTAppLayout receives the required user and onSignOut props */}
      <TTAppLayout user={session?.user} onSignOut={handleSignOut} />
      {children}
    </>
  );
}