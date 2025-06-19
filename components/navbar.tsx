'use client';

import React from 'react';
import LogoutButton from './logout-button';
import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link href="/dashboard">
                <h1 className="text-xl font-semibold text-gray-800 cursor-pointer hover:underline">
                    Dashboard
                </h1>
            </Link>
            <LogoutButton />
        </header>
    );
}
