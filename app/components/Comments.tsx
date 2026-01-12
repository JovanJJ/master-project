import Globe from "../../public/JJ.jpg";
import Image from "next/image";
import React from "react";



export default function Comments({comments} : string) {
    
    return (
        <>
            <div className="w-full mt-6 pl-3  overflow-y-auto max-h-[300px]">   
                {comments.map((comment) => {
                    
                    return (
                        <React.Fragment key={comment.id}>
                            <div  className="border p-2 rounded-2xl border-blue-200 relative w-[97%] md:w-full shadow-xl mb-3">
                                <div className="flex items-center gap-2">
                                    <Image src={comment.author.profileImage} width={50} height={50} alt="userImage" className="w-[50px] rounded-full"></Image>
                                    <div className="font-bold italic">{comment.author.name}</div>
                                </div>

                                <div className="mt-2 pb-2.5 text-[14px]">
                                    {comment.text}
                                </div>
                                <div className="absolute bottom-0 right-2 text-[12px] text-gray-500 italic">12.12.1999, 15:45</div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    );
}