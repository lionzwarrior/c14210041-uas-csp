import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth_token')?.value;

  if (token) {
    redirect('/dashboard');
  } else {
    redirect('/signin');
  }
}
