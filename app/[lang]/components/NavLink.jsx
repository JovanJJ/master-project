"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function NavLink({ href, children }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    const [isPending, startTransition] = useTransition();
    return (
        <>
            <Link href={href} className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium">
                {children}
            </Link>
            {isPending && <div className="absolute inset-0 bg-black/50">Loading...</div>}
        </>
    );
}