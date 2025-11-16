import { redirect } from 'next/navigation';

export default function RootPage() {
  // Immediately redirect the user to the /tt path
  redirect('/Form');
}