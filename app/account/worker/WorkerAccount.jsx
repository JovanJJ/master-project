import Image from "next/image";
import Star from "../../../public/stars.avif";
import Link from "next/link";
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth-config';
import { headers } from 'next/headers';

const noImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg';
const profileImage = "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"

export default async function WorkerAccount () {
    const session = await getServerSession(authOptions);
    const role = session?.user.role;
    const id = session?.user.id;
    
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;
    
    const res = await fetch(`${baseUrl}/api/current-user?role=${role}&id=${id}`, { 
      cache: 'no-store',
      headers: {
        'Cookie': headersList.get('cookie') || '',
      }
    });
    const data = await res.json();
    const profileImage = data.data.profileImage;
    
    return (
        <section className="w-full flex justify-center pb-15 pt-7">
            <div className="mx-auto max-w-[1200px] flex flex-col xl:flex-row gap-7 mt-[30px] w-full px-4">


                <div className="mx-auto w-full max-w-[1000px] p-6 rounded-3xl shadow-2xl bg-blue-50">
                    <h1 className="text-3xl pb-3">Nalog</h1>
                    <Link href="settings">Klikni <span className="underline">Ovde</span> za podešavanje naloga</Link>

                    <div className="w-full flex justify-center pt-7">
                        <div className="w-2/3 max-w-48 aspect-square rounded-full relative border-3 border-blue-200">
                            <Image
                                src={profileImage === null ? noImage : profileImage}
                                fill
                                alt="Profile Image"
                                className="w-full rounded-full object-cover"
                            />
                            <div className="absolute -bottom-6 -right-6 z-30 sm:-bottom-5 sm:-right-5 md:-bottom-1 md:-right-5 lg:bottom-1 lg:right-1">
                                <Image src={Star} alt="star" className="w-[50px] h-[50px]" />
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col gap-4 mx-auto max-w-[600px] text-[18px] sm:text-xl pt-10">
                        <div className="flex justify-between items-end border-b border-gray-100 pb-1">
                            <span className="italic text text-base">Ime:</span>
                            <span>{data.data.firstName}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-100 pb-1">
                            <span className="italic text text-base">Prezime:</span>
                            <span>{data.data.lastName}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-100 pb-1">
                            <span className="italic text text-base">Profesija:</span>
                            <span>{data.data.profession}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-100 pb-1">
                            <span className="italic text text-base">Lokacija:</span>
                            <span>{data.data.location}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-100 pb-1">
                            <span className="italic text text-base">Godina rodjenja:</span>
                            <span>{data.data.birthYear}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-100 pb-1">
                            <span className="italic text text-base">E-mail:</span>
                            <span>{data.data.email}</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-gray-100 pb-1">
                            <span className="italic text text-base">Telefon:</span>
                            <span>{data.data.phone}</span>
                        </div>
                    </div>


                    <div className="border border-blue-200 mt-8 p-3 rounded-2xl mx-auto max-w-[600px] min-h-[150px] shadow-xl">
                        <span>
                            <span className="font-bold">Opis:</span> {data.data.description}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}