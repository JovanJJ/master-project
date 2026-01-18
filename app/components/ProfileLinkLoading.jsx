"use client";

import { useState } from "react";
import Loading from "./ui/Loading";
import Link from "next/link";
export default function ProfileLinkLoading(workerId) {
    const [loading, setLoading] = useState(false);
    console.log(workerId);

    return (
        loading ? (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                <p className="ml-4">Učitava se...</p>
            </div>
        ) : (
            <Link onClick={() => setLoading(true)} href={`/profile/${workerId.workerId}`} className="mt-auto bg-[#0077b6] text-white py-2 rounded-lg text-center hover:bg-[#48cae4] transition">
                Pogledaj profil
            </Link>
        )
    );
}