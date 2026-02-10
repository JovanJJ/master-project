import Image from 'next/image';
import TypeWriterComponent from './ui/TypeWriter';
import heroImage from "../../../public/hero-3.png";

export default function Hero({ lang }) {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">

      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt="Workers on site"
          fill
          className="object-cover"
          priority
        />
      </div>


      <div className='w-full h-full absolute left-0 right-0 bg-black/50'></div>


      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto mt-[-4rem]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight ">
          MasterHub  
        </h1> 
        <h2 className='text-xl font-bold sm:text-2xl lg:text-3xl'>
          <TypeWriterComponent lang={lang} />
        </h2>
      </div>
    </section>
  );
}