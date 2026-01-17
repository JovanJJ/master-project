import Image from "next/image";
import Globe from "../../../../public/JJ.jpg";
import Star from "../../../../public/stars.avif";
import { fetchWorkerById } from "../../../../lib/actions/worker";
import { addComments } from "../../../../lib/actions/worker";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth-config";
import { redirect } from "next/navigation";
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { fetchComments } from "../../../../lib/actions/worker";
import User from "../../../../lib/models/User";
import { fetchWorkers } from "../../../../lib/actions/worker";
import React, { Fragment } from 'react';
import Link from "next/link";
import Comments from "@/app/components/Comments";


export default async function ProfilePage({ params }) {

    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login/user");
    }

    const workerData = await fetchWorkerById(id);

    if (!workerData) {
        notFound();
    }

    const { _id, firstName, lastName, profession, location, birthYear, email, phone, profileImage, description } = workerData;

    const comments = await fetchComments(_id);
    console.log(comments);

    const noImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg';

    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/workers`, { 
      cache: 'no-store',
      headers: {
        'Cookie': headersList.get('cookie') || '',
      }
    });
    const { workers } = await res.json();
   


    return (
        <section className="w-full pt-15 pb-30">
            <div className="mx-auto max-w-[1100px] flex flex-col xl:flex-row gap-7 mt-[30px]">
                <div className="mx-auto w-full p-3 rounded-3xl shadow-2xl">
                    <div className="w-full flex justify-center sm:justify-start pt-7">
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

                    <div className="flex flex-col gap-4  max-w-[300px] text-[18px] sm:text-xl pt-7">
                        <div><span className="italic text text-base">Ime:</span> {firstName}</div>
                        <div><span className="italic text text-base">Prezime:</span> {lastName}</div>
                        <div><span className="italic text text-base">Profesija:</span> {profession}</div>
                        <div><span className="italic text text-base">Lokacija:</span> {location}</div>
                        <div><span className="italic text text-base">Godina rodjenja:</span> {birthYear}</div>
                        <div><span className="italic text text-base">E-mail:</span> {email}</div>
                        <div><span className="italic text text-base">Telefon:</span> {phone}</div>
                    </div>

                    <div className="border border-blue-200 mt-4  p-3 rounded-2xl sm:w-full shadow-xl">
                        <span><span className="font-bold">Opis:</span> {description}
                        </span>
                    </div>

                    <div className="max-w-[1100px] p-4 mt-7">
                        <form action={addComments}>
                            <input type="hidden" name="workerId" value={_id} />
                            <h2 className="text-xl font-semibold mb-4">Komentari</h2>
                            <textarea name="text" placeholder="Dodaj svoj komentar" className="resize-none w-full md:w-full min-h-[100px] 
                                                     focus:outline-none border border-blue-200 p-4 rounded-xl shadow-xl"></textarea>
                            <button type="submit" className="px-2 py-1 rounded-xl bg-blue-400 block text-white hover:bg-blue-500 active:bg-blue-300 cursor-pointer">Pošalji</button>
                        </form>

                    </div>

                    <Comments comments={comments} />

                    <aside className="xl:hidden p-4 mt-7 md:max-w-[1100px] h-auto border border-blue-200 rounded-xl">
                        <h2 className="w-fit mx-auto text-xl pb-4">Pogledajte i nase ostale majstore</h2>
                        <div className="overflow-y-auto h-[300px] grid grid-cols gap-4 p-4 sm:grid-cols-2 ">
                            {workers && workers.filter((worker) => worker._id.toString() !== _id.toString()).map((worker) => {
                                return (
                                    <Fragment key={worker._id}>
                                        <div className="flex w-2/3 sm:w-full max-h-[120px]  gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                                            <div>
                                                <Image
                                                    src={worker.profileImage || noImage}
                                                    alt="Profile"
                                                    className="w-24 h-24 rounded-xl "
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>


                                            <div className="flex flex-col justify-between min-w-0">
                                                <div className="space-y-1">
                                                    <div className="font-semibold text-sm truncate">
                                                        {worker.firstName} {worker.lastName}
                                                    </div>
                                                    <div className="text-xs text-gray-600">
                                                        {worker.profession}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {worker.city}
                                                    </div>
                                                </div>

                                                <Link href={`/profile/${worker._id}`} className="text-xs text-blue-600 hover:underline self-start">
                                                    Pogledaj profil →
                                                </Link>
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </aside>

                </div>

                <aside className="hidden mt-4 xl:block w-[300px] space-y-6 h-[500px]">
                    <h2 className="w-fit mx-auto text-xl">Pogledajte ostale majstore</h2>
                    {workers && workers.filter((worker) => worker._id.toString() !== _id.toString()).map((worker) => {
                        return (
                            <div key={worker._id} className="flex gap-3 p-3 rounded-xl border border-blue-100 bg-white hover:shadow-md transition">

                                <div className="">
                                    <Image
                                        src={worker.profileImage || noImage}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-xl"
                                        width={50}
                                        height={50}
                                        
                                    />
                                </div>


                                <div className="flex flex-col justify-between min-w-0">
                                    <div className="space-y-1">
                                        <div className="font-semibold text-sm truncate">
                                            {worker.firstName} {worker.lastName}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {worker.profession}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {worker.city}
                                        </div>
                                    </div>

                                    <Link href={`/profile/${worker._id}`} className="text-xs text-blue-600 hover:underline self-start">
                                        Pogledaj profil →
                                    </Link>
                                </div>
                            </div>
                            
                        );
                    })}
                </aside>
            </div>
        </section>
    );
}