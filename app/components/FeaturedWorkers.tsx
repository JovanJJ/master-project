import Image from "next/image";
import Link from "next/link";

// Mock Data
const workers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Master Electrician",
    rate: "$65/hr",
    reviews: 48,
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Mike Davis",
    role: "General Contractor",
    rate: "Call for Quote",
    reviews: 24,
    image: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 3,
    name: "Anita Sharma",
    role: "IT Specialist",
    rate: "$90/hr",
    reviews: 62,
    image: "https://i.pravatar.cc/150?img=47",
    className: "hidden md:hidden lg:flex" // Responsive helper from original code
  },
];

export default function FeaturedWorkers() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">MasterHub članovi </h2>
          <p className="mt-4 text-lg text-gray-600">Pregledajte neke od naših proverenih majstora</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workers.map((worker) => (
            <div key={worker.id} className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col ${worker.className || ''}`}>
              <div className="p-6 flex-grow">
                <div className="flex items-center mb-4">
                  <Image 
                    src={worker.image} 
                    alt={worker.name} 
                    width={64} 
                    height={64} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{worker.name}</h3>
                    <p className="text-blue-600 font-medium">{worker.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                       <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.1 2.032-1.1 2.48 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2 text-sm">({worker.reviews} Reviews)</span>
                </div>
                <div className="text-gray-700 font-medium mb-4">
                  Rate: <span className="text-gray-900 font-bold">{worker.rate}</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <Link href={`/worker/${worker.id}`} className="block w-full text-center bg-white border-2 border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition">
                  Idi na profil
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/workers" className="inline-block bg-white border-2 border-blue-600 text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition">
            Pogledatje ostale članove
          </Link>
        </div>
      </div>
    </section>
  );
}