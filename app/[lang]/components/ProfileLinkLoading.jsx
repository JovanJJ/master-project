"use client";

import { useState } from "react";
import Loading from "./ui/Loading";
import Link from "next/link";
export default function ProfileLinkLoading({ workerId, lang }) {
    const [loading, setLoading] = useState(false);
    console.log(workerId);

    return (


        <Link onClick={() => setLoading(true)} href={`/${lang}/profile/${workerId}`} className="mt-auto bg-[#0077b6] text-white py-2 rounded-lg text-center hover:bg-[#48cae4] transition">
            {lang === 'en' ? 'View profile' : 'Pogledaj profil'}
        </Link>
    );
}