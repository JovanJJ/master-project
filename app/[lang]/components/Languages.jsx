"use client"

import globe from "../../../public/globe.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Languages() {
    const pathname = usePathname();
    const router = useRouter();

    const switchLanguage = (newLang) => {
        if (!pathname) return;

        const segments = pathname.split('/');
        // segments[0] is empty, segments[1] is the current locale (e.g. 'en' or 'sr')
        segments[1] = newLang;

        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <div className='relative h-full flex justify-center text-xs items-center gap-2 mr-5'>
            <div><Image src={globe} width={27} height={27} alt="globe-image" /></div>
            <div
                onClick={() => switchLanguage('en')}
                className={`px-2 py-1 border border-gray-400 rounded-[5px] cursor-pointer hover:bg-blue-200 transition ${pathname.startsWith('/en') ? 'bg-blue-100 font-bold' : ''}`}
            >
                ENG
            </div>
            <div
                onClick={() => switchLanguage('sr')}
                className={`px-2 py-1 border border-gray-400 rounded-[5px] cursor-pointer hover:bg-blue-200 transition ${pathname.startsWith('/sr') ? 'bg-blue-100 font-bold' : ''}`}
            >
                SRB
            </div>
        </div>
    );
}