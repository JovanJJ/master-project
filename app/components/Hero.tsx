import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
      
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop" 
          alt="Workers on site"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      
      

      
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto mt-[-4rem]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Find Trusted Local Professionals for Any Job.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Connect with skilled professionals in your area. From quick repairs to major projects, we have the right experts ready to help.
        </p>
        <a href="#categories" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition md:hidden">
            Explore Categories
        </a>
      </div>
    </section>
  );
}