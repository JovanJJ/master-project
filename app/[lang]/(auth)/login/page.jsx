"use client"
import Image from "next/image";
import BlueWorker from "../../../../public/blue-worker.svg"
import BlueUser from "../../../../public/blue-user.svg";
import Link from 'next/link';



import { useParams } from "next/navigation";

const LoginSelection = () => {
  const { lang } = useParams();
  console.log(lang);
  return (
    <section className="w-full min-h-screen py-12 px-4 flex items-center">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">


        <Link
          href={`/${lang}/login/user`}
          className="group pt-5 flex-1 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
        >
          <div className="relative h-48 w-full bg-blue-50">
            <Image
              src={BlueUser}
              alt="User Login"
              fill
              className="group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-8 flex flex-col flex-grow items-center text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{lang === 'en' ? 'Looking for a service' : 'Tražim uslugu'}</h2>
            <p className="text-gray-600 mb-6 flex-grow">
              {lang === 'en' ? 'Sign in as a user to find the best workers for your projects.' : 'Prijavite se kao korisnik kako biste pronašli najbolje radnike za vaše projekte.'}
            </p>
            <button className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl group-hover:bg-blue-700 transition-colors">
              {lang === 'en' ? 'Login as User' : 'Prijavi se kao Korisnik'}
            </button>
          </div>
        </Link>


        <Link
          href={`/${lang}/login/worker`}
          className="group flex-1  pt-5 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
        >
          <div className="relative h-48 w-full bg-green-50">
            <Image
              src={BlueWorker}
              alt="Worker Login"
              fill
              className="group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-8 flex flex-col flex-grow items-center text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{lang === 'en' ? 'Looking for a job' : 'Tražim posao'}</h2>
            <p className="text-gray-600 mb-6 flex-grow">
              {lang === 'en' ? 'Register as a worker, create a profile and offer your skills to clients.' : 'Prijavite se kao radnik, kreirajte profil i ponudite svoje veštine klijentima.'}
            </p>
            <button className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-xl group-hover:bg-blue-700 transition">
              {lang === 'en' ? 'Login as Worker' : 'Prijavi se kao Radnik'}
            </button>
          </div>
        </Link>

      </div>
    </section>
  );
};

export default LoginSelection;