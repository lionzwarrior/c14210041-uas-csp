import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import DashboardClient from '../../components/dashboard-client';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token || !process.env.JWT_SECRET) {
        redirect('/signin');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
        return <DashboardClient id={decoded.id} />;
    } catch (err) {
        redirect('/signin');
    }
}
