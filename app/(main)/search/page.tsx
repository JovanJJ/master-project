'use server'

import Image from "next/image";
import globe from '../../../public/globe.svg';
import { fetchWorkers } from '@/lib/actions/worker'; // Import the new function
import Link from "next/link";

type SearchParams = {
    p?: string
    loc?: string
    page?: string
}

type SearchPageProps = {
 searchParams: Promise<SearchParams>;
}

export default async function SearchPage({searchParams}: SearchPageProps) {
  const params = await searchParams;
  const p = params.p;
  const loc = params.loc;
  const page = '1';

  const data = await fetchWorkers({p, loc, page});
  const { workers, totalItems, totalPages, currentPage } = data;
  
    return (
        
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto py-6 px-6 max-w-[1100px]">

            {workers.map((worker) => {
                return(
                    <div key={worker._id} className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">

                <div className="aspect-4/3 bg-gray-200 relative">
                    <Image src={worker.profileImage} fill  alt="123" className="w-full h-full object-cover"/>
                </div>

                <div className="p-4 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {worker.firstName}
                    </h3>
                    <h2>{worker.profession}</h2>

                    <div className="flex items-center gap-1 text-yellow-500">
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>
                        <span className="ml-2 text-sm text-gray-600">(128)</span>
                    </div>

                    <Link href={`/profile/${worker._id}`} className="mt-auto bg-[#0077b6] text-white py-2 rounded-lg text-center hover:bg-[#48cae4] transition">
                        Pogledaj profil
                    </Link>
                </div>
            </div>
                );
            })}
        
        </div>
        

    );
}