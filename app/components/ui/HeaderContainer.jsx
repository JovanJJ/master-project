"use client"

import { useState } from "react";
import logOut from "../../../public/log-out.svg";
import Image from "next/image";
import Link from "next/link";
import LogOut from "../LogOut";

export default function HeaderContainer({ profilePicture }) {
    
    const [click, setClick] = useState(false);
    const noImage = "https://www.unhcr.org/innovation/innovation-fellow-profile-edward-benson/";
    return (
        <>
            <div onClick={() => setClick(prev => !prev)} className='hidden lg:block w-[50px] h-[50px] rounded-full hover:ring-2 hover:ring-blue-400 right-5 ml-[100px] cursor-pointer relative'>
                {profilePicture && <Image src={profilePicture ? profilePicture : noImage} alt="img" width={50} height={50} className="w-full h-full rounded-full object-cover" />}
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
                        Podešavanja / Profil
                    </Link>
                    <div onClick={LogOut} className="text-gray-700 flex justify-between w-2/3 cursor-pointer hover:text-gray-950">
                        Odjavi se
                        <Image src={logOut} alt="img" height={25} width={25} />
                    </div>
                </div>
            }
        </>
    );
}