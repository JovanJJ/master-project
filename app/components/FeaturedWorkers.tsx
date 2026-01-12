import Image from "next/image";
import Link from "next/link";
import Star from "../../public/rating-0.png";

const noImage = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg';

export default function FeaturedWorkers() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">MasterHub članovi </h2>
          <p className="mt-4 text-lg text-gray-600">⭐ SPECIJALNA PONUDA ZA NOVE KORISNIKE:
            Svesni smo da je svaki početak izazovan. Zato svaki novi radnik koji sada kreira i popuni svoj profil dobija POTPUNO BESPLATNO REKLAMIRANJE na našoj platformi. Istaknite se na glavnoj stranici. Iskoristite priliku da vas potencijalni klijenti vide dok gradimo ovu mrežu zajedno.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col`}>
            <div className="p-6 flex-grow">
              <div className="flex items-center mb-4">
                <Image
                  src={noImage}
                  alt="img"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Mesto za vas</h3>
                  <p className="text-blue-600 font-medium"></p>
                </div>
              </div>
              <div className="flex items-center mb-4">

                <div className="flex text-yellow-400">
                  <Image src={Star} alt="img" width={100} height={15} />
                </div>
                <span className="text-gray-600 ml-2 text-sm">(0 Reviews)</span>
              </div>

            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <Link href={`/worker/`} className="block w-full text-center bg-white border-2 border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition">
                Idi na profil
              </Link>
            </div>
          </div>
          <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col`}>
            <div className="p-6 flex-grow">
              <div className="flex items-center mb-4">
                <Image
                  src={noImage}
                  alt="img"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Mesto za vas</h3>
                  <p className="text-blue-600 font-medium"></p>
                </div>
              </div>
              <div className="flex items-center mb-4">

                <div className="flex text-yellow-400">
                  <Image src={Star} alt="img" width={100} height={15} />
                </div>
                <span className="text-gray-600 ml-2 text-sm">(0 Reviews)</span>
              </div>

            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <Link href={`/worker/`} className="block w-full text-center bg-white border-2 border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition">
                Idi na profil
              </Link>
            </div>
          </div>
          <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col`}>
            <div className="p-6 flex-grow">
              <div className="flex items-center mb-4">
                <Image
                  src={noImage}
                  alt="img"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Mesto za vas</h3>
                  <p className="text-blue-600 font-medium"></p>
                </div>
              </div>
              <div className="flex items-center mb-4">

                <div className="flex text-yellow-400">
                  <Image src={Star} alt="img" width={100} height={15} />
                </div>
                <span className="text-gray-600 ml-2 text-sm">(0 Reviews)</span>
              </div>

            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <Link href={`/worker/`} className="block w-full text-center bg-white border-2 border-blue-600 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition">
                Idi na profil
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">

        </div>
      </div>
    </section>
  );
}