"use client"

import { useState } from "react";
import logOut from "../../../../public/log-out.svg";
import Image from "next/image";
import Link from "next/link";
import LogOut from "../LogOut";
import { useParams } from "next/navigation";
import noImage from "../../../../public/noImage.svg";

export default function HeaderContainer({ profilePicture }) {
    const [click, setClick] = useState(false);
    const { lang } = useParams();
    return (
        <>
            <div onClick={() => setClick(prev => !prev)} className='hidden  w-[50px] h-[50px]  rounded-full hover:ring-2 hover:ring-blue-400 right-5 ml-[100px] cursor-pointer relative lg:flex justify-center items-center border border-blue-200'>
                <Image src={profilePicture?.startsWith("http") ? profilePicture : noImage} alt="img" width={50} height={50} className=" rounded-full object-cover" />
                <div className="absolute w-3 h-3 bg-green-400 rounded-full bottom-1 right-0">
                </div>
            </div>
            {click &&
                <div
                    className={`
    fixed top-20 right-2
    w-[200px] h-[250px]
    bg-white shadow-xl rounded-xl
    p-4 flex flex-col justify-between
    ${click
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0 hidden"
                        }
  `}
                >
                    <Link href={"settings"} className="text-gray-700 hover:text-gray-950">
                        {lang === 'en' ? 'Settings / Profile' : 'Podešavanja / Profil'}
                    </Link>
                    <div onClick={LogOut} className="text-gray-700 flex justify-between w-2/3 cursor-pointer hover:text-gray-950">
                        {lang === 'en' ? 'Log out' : 'Odjavi se'}
                        <Image src={logOut} alt="img" height={25} width={25} />
                    </div>
                </div>
            }
        </>
    );
}