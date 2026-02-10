"use client"

import Image from "next/image";
import burgerMenu from "../../../../public/burger-menu.svg";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MobileMenu() {
    const [click, setClick] = useState(false);
    const { lang } = useParams();
    return (
        <>
            <div className='lg:hidden'>
                <Image src={burgerMenu} alt={"img"} width={30} height={30} className='lg:hidden cursor-pointer  sticky z-50' onClick={() => setClick(prev => !prev)} />
            </div>
            {click &&
                <div className="absolute lg:hidden right-0 left-0 top-0 h-[450px] bg-white/90 border-b border-gray-400 rounded-bl-4xl rounded-br-4xl flex flex-col items-center pt-17 pb-5 justify-around">
                    <Link href={`/${lang}/account`} className="text-xl w-full text-center py-4 active:bg-blue-300">{lang === 'en' ? 'Account' : 'Nalog'}</Link>
                    <Link href={`/${lang}/register/worker`} className="text-xl w-full text-center py-4 active:bg-blue-300">{lang === 'en' ? 'Register' : 'Registruj se'}</Link>
                    <Link href={`/${lang}/settings`} className="text-xl w-full text-center py-4 active:bg-blue-300">{lang === 'en' ? 'Settings / Profile' : 'Podešavanja / Profil'}</Link>
                    <Link href={`/${lang}`} className="text-xl w-full text-center py-4 active:bg-blue-300">{lang === 'en' ? 'Home' : 'Početna'}</Link>
                    <Link href={`/${lang}/about`} className="text-xl w-full text-center py-4 active:bg-blue-300">{lang === 'en' ? 'About' : 'O nama'}</Link>
                    <Link href={`/${lang}/contact`} className="text-xl w-full text-center py-4 active:bg-blue-300">{lang === 'en' ? 'Contact' : 'Kontakt'}</Link>
                </div>
            }
        </>
    );
}