"use client"

import Image from "next/image";
import burgerMenu from "../../../public/burger-menu.svg";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
    const [click, setClick] = useState(false);
    return (
        <>
            <div className='md:hidden'>
                <Image src={burgerMenu} alt={"img"} width={30} height={30} className='md:hidden cursor-pointer  sticky z-50' onClick={() => setClick(prev => !prev)} />
            </div>
            {click && 
            <div className="absolute md:hidden right-0 left-0 top-0 h-[450px] bg-white flex flex-col items-center pt-17 pb-5 justify-around">
                <Link href="/account" className="text-xl w-full text-center py-4 active:bg-blue-300">Nalog</Link>
                <Link href="/register/worker" className="text-xl w-full text-center py-4 active:bg-blue-300">Registruj se</Link>
                <Link href="/settings" className="text-xl w-full text-center py-4 active:bg-blue-300">Podešavanja / Profil</Link>
                <Link href="/" className="text-xl w-full text-center py-4 active:bg-blue-300">Početna</Link>
                <Link href="/about" className="text-xl w-full text-center py-4 active:bg-blue-300">O nama</Link>
                <Link href="/contact" className="text-xl w-full text-center py-4 active:bg-blue-300">Kontakt</Link>
            </div>
            }
        </>
    );
}