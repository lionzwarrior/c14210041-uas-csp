'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post('/api/logout');
    router.push('/signin');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors shadow"
    >
      Logout
    </button>
  );

}
