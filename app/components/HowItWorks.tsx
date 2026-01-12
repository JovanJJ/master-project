export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Pretraži",
      desc: "Pretraga se vrši pomoću dve ključne reči — grad i profesija — kako bi se brzo pronašli dostupni radnici."
    },
    {
      id: 2,
      title: "Pregledaj profile",
      desc: "Proveri kvalifikacije radnika i pročitaj verifikovane recenzije prethodnih klijenata."
    },
    {
      id: 3,
      title: "Završi posao",
      desc: "Izaberi najboljeg kandidata, i obavi posao efikasno."
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Šta je MasterHub platforma</h2>
          <p className="mt-4 text-lg text-gray-600">Iako smo na početku svog puta, naša misija je da postanemo najpouzdaniji most između onih koji nude svoje veštine i onih kojima su te veštine potrebne. Svaki profil i svaka pretraga na ovom sajtu doprinose stvaranju uređenijeg tržišta gde se kvalitet ceni, a potrebe brzo rešavaju. Pozivamo vas da budete deo rasta ove platforme – bilo da nudite usluge ili ih tražite, vi gradite sistem koji će sutra služiti svima nama.
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