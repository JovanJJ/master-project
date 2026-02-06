"use client"

import globe from "../../public/globe.png";
import Image from "next/image";

export default function Languages(){
    return(
        <div className='h-full  flex justify-center text-xs items-center gap-2'>
            <div><Image src={globe} width={27} height={27} alt="globe-image" /></div>
                  <div className="px-2 py-1 border border-gray-400 rounded-[5px] cursor-pointer hover:bg-blue-200 transition">ENG</div>
                  <div className="px-2 py-1 border border-gray-400 rounded-[5px] cursor-pointer hover:bg-blue-200 transition">SRB</div>
                </div>
    );
}