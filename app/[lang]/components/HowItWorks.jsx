export default function HowItWorks({ lang }) {
  const steps = [
    {
      id: 1,
      title: lang === 'en' ? 'Search' : "Pretraži",
      desc: lang === 'en' ? 'Search is performed using two keywords - city and profession - to quickly find available workers.' : "Pretraga se vrši pomoću dve ključne reči — grad i profesija — kako bi se brzo pronašli dostupni radnici."
    },
    {
      id: 2,
      title: lang === 'en' ? 'Review profiles' : "Pregledaj profile",
      desc: lang === 'en' ? 'Check the qualifications of the worker and read verified reviews from previous clients.' : "Proveri kvalifikacije radnika i pročitaj verifikovane recenzije prethodnih klijenata."
    },
    {
      id: 3,
      title: lang === 'en' ? 'Finish the job' : "Završi posao",
      desc: lang === 'en' ? 'Choose the best candidate and get the job done efficiently.' : "Izaberi najboljeg kandidata, i obavi posao efikasno."
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl"> {lang === 'en' ? 'What is MasterHub platform' : 'Šta je MasterHub platforma'}</h2>
          <p className="mt-4 text-lg text-gray-600">{lang === 'en' ? 'Although we are at the beginning of our journey, our mission is to become the most reliable bridge between those who offer their skills and those who need those skills. Every profile and every search on this site contributes to the creation of a more organized market where quality is valued and needs are quickly resolved. We invite you to be a part of the growth of this platform - whether you offer services or look for them, you are building a system that will serve us all tomorrow.' : 'Iako smo na početku svog puta, naša misija je da postanemo najpouzdaniji most između onih koji nude svoje veštine i onih kojima su te veštine potrebne. Svaki profil i svaka pretraga na ovom sajtu doprinose stvaranju uređenijeg tržišta gde se kvalitet ceni, a potrebe brzo rešavaju. Pozivamo vas da budete deo rasta ove platforme – bilo da nudite usluge ili ih tražite, vi gradite sistem koji će sutra služiti svima nama.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                {step.id}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}