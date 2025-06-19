import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import SignInClient from '@/components/signin-client';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (token && process.env.JWT_SECRET) {
    redirect('/dashboard');
  }

  return <SignInClient />;
}
