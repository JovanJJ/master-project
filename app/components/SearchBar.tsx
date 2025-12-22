'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [profession, setProfession] = useState('Programer'); 
  const [location, setLocation] = useState('Jagodina');
  const page = '1';

  const params = new URLSearchParams();
  if(profession)  params.set('p', profession);
  if(location) params.set('loc', location);
  if(page) params.set('page', page);
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="relative z-20 px-4 -mt-12 md:-mt-16 mb-16">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Profesija" 
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
              />
            </div>
            
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Lokacija" 
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
              />
            </div>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition w-full md:w-auto flex items-center justify-center">
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}