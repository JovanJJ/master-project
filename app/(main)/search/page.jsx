

import Image from "next/image";
import globe from '../../../public/globe.svg';
import { fetchWorkers } from '../../../lib/actions/worker'; 
import Link from "next/link";
import Pagination from "../../components/ui/Pagination";
import ProfileLinkLoading from "../../components/ProfileLinkLoading";



export default async function SearchPage({ searchParams }) {
    const params = await searchParams;
    const p = params.p;
    const loc = params.loc;
    const page = params.page;

    const data = await fetchWorkers({ p, loc, page });
    const { workers, totalItems, totalPages, currentPage } = data;
    
    const noImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg';




    return (
        <>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto  px-6 max-w-[1100px] pb-12 pt-20">

            {workers.map((worker) => {
                return (
                    <div key={worker._id} className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">

                        <div className="aspect-4/3 bg-gray-200 relative">
                            <Image src={!worker.profileImage ? noImage : worker.profileImage} fill alt="123" className="w-full h-full object-cover" />
                        </div>

                        <div className="p-4 flex flex-col gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {worker.firstName} {worker.lastName}
                            </h3>
                            <h2>{worker.profession}</h2>

                            <div className="flex items-center gap-1 text-yellow-500">
                                <span>⭐</span>
                                <span>⭐</span>
                                <span>⭐</span>
                                <span>⭐</span>
                                <span className="ml-2 text-sm text-gray-600">(128)</span>
                            </div>

                            <ProfileLinkLoading workerId={worker._id} />
                        </div>
                    </div>
                );
            })}

        </div>
        <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
         />
</>

    );
}