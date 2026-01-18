'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./ui/Loading";
import arrowDown from "../../public/arrow-down.svg";
import Image from "next/image";

export default function SearchBar() {
  const router = useRouter();
  const [profession, setProfession] = useState('Programer');
  const [location, setLocation] = useState('Jagodina');
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const page = '1';

  const params = new URLSearchParams();
  if (search) {
    params.set("p", "all");
    params.set("loc", "all");
    params.set("page", page);
  } else {
    if (profession) params.set('p', profession);
    if (location) params.set('loc', location);
    if (page) params.set('page', page);
  }



  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="relative z-20 px-4 -mt-12 md:-mt-16 mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col md:flex-row gap-4">
              {search ? (
                <div className="sm:h-[50px] flex-1 relative z-20 flex items-center justify-center">
                  <span className="flex justify-center sm:text-xl">Trenutno možete pretražiti sve dostupne majstore</span>
                </div>
              ) : (
                <>
                  <div className="relative flex-1" onClick={() => { setSearch(prev => !prev) }}>
                    <div className="flex border border-blue-400 px-4 py-3 rounded-xl justify-between cursor-pointer">
                      <span className="text-gray-400">Profesija</span>
                      <Image src={arrowDown} alt="arrow" width={15} height={15}></Image>
                    </div>
                  </div>

                  <div className="flex-1 relative" onClick={() => { setSearch(prev => !prev) }}>
                    <div className="flex border border-blue-400 px-4 py-3 rounded-xl justify-between cursor-pointer">
                      <span className="text-gray-400">Lokacija</span>
                      <Image src={arrowDown} alt="arrow" width={15} height={15}></Image>
                    </div>
                  </div>
                </>
              )}


              {search ?
                <button type="submit" className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition w-full md:w-auto flex items-center justify-center cursor-pointer">
                  <span>Pretraži</span>
                </button>
                :
                <button disabled type="submit" className="bg-gray-400  text-white font-bold py-3 px-8 rounded-lg w-full md:w-auto flex items-center justify-center">
                  <span>Pretraži</span>
                </button>
              }

            </div>
          )}
        </div>
      </div>
    </form>
  );
}