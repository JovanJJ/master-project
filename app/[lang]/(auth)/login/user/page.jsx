"use client"

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function GoogleLogin() {
  const { lang } = useParams();
  return (
    <section className='w-full h-screen flex items-center justify-center '>
      <form
        action={async () => {
          await signIn("google", { callbackUrl: `/${lang}` })
        }}
        className='border border-blue-200 max-w-90 flex flex-col items-center p-4 rounded-2xl'
      >
        <div className='p-4 flex flex-col gap-3 text-xl '>
          <h1 className='w-fit mx-auto text-xl pb-6 text-gray-700'>{lang === 'en' ? 'All the best starts with login' : 'Sve najbolje počinje prijavom'}</h1>
          <span className='text-xl text-gray-700'>{lang === 'en' ? 'Log in to have:' : 'Uloguj se da bi imao:'}</span>
          <span className='text-gray-700'>{lang === 'en' ? '-Full control' : '-Potpunu kontrolu'}</span>
          <span className='text-gray-700'>{lang === 'en' ? '-Personalized experience' : '-Personalizovano iskustvo'}</span>
          <span className='text-gray-700'>{lang === 'en' ? '-Access to all features' : '-Pristup svim funkcijama'}</span>
        </div>

        <button
          type="submit"
          className="flex items-center mt-5 gap-3 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg shadow-sm hover:bg-gray-100 transition cursor-pointer font-medium"
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            width={20}
            height={20}
          />
          <span>{lang === 'en' ? 'Log in with Google account' : 'Uloguj se pomoću Google naloga'}</span>
        </button>


      </form>
    </section>
  )
}