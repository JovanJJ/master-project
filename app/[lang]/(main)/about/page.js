export default async function AboutPage({ params }) {
  const { lang } = await params;
  return (
    <main className="bg-gray-50">

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          {lang === 'en' ? 'Connecting people and masters' : 'Povezujemo ljude i majstore'}
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          {lang === 'en' ? 'We help people find reliable masters easily, and we help masters find work — quickly, simply, and without complications.' : 'Pomažemo ljudima da lako pronađu pouzdane majstore,  i pomažemo majstorima da pronađu posao — brzo, jednostavno i bez komplikacija.'}
        </p>

        <p className="mt-4 text-xl font-medium text-gray-800">
          {lang === 'en' ? 'We help people find masters and help masters find work.' : 'Pomažemo ljudima da pronađu majstora  i pomažemo majstorima da pronađu posao.'}
        </p>
      </section>


      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            {lang === 'en' ? 'How the platform works' : 'Kako platforma funkcioniše'}
          </h2>

          <div className="mt-16 grid gap-10 md:grid-cols-3">

            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-bold text-indigo-600">1</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {lang === 'en' ? 'Choose a city and profession' : 'Izaberite grad i profesiju'}
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'Enter the city and type of service you need (e.g., electrician, plumber, painter).' : 'Unesite grad i vrstu usluge koja vam je potrebna  (npr. električar, vodoinstalater, moler).'}
              </p>
            </div>


            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-bold text-indigo-600">2</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {lang === 'en' ? 'Browse available masters' : 'Pregledajte dostupne majstore'}
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'View the list of masters, their basic information, and decide who suits you best.' : 'Pogledajte listu majstora, njihove osnovne informacije  i odlučite ko vam najviše odgovara.'}
              </p>
            </div>


            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-bold text-indigo-600">3</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {lang === 'en' ? 'Contact directly' : 'Kontaktirajte direktno'}
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'No intermediaries — contact the master directly and arrange the job.' : 'Bez posrednika — kontaktirajte majstora direktno  i dogovorite posao.'}
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-blue-50">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            {lang === 'en' ? 'Are you a master?' : 'Da li ste majstor?'}
          </h2>

          <p className="mt-6 text-lg text-gray-700">
            {lang === 'en' ? 'Platform is just starting — this is your chance to be among the first.' : 'Platforma je tek na početku — ovo je vaša prilika da budete među prvima.'}
            {lang === 'en' ? 'First masters get more visibility and easier access to new clients.' : 'Prvi majstori dobijaju veću vidljivost i lakše dolaze do novih klijenata.'}
          </p>

          <p className="mt-4 text-lg text-gray-700">
            {lang === 'en' ? 'Registration is simple, and your profile serves as your online recommendation.' : 'Registracija je jednostavna, a vaš profil služi kao vaša online preporuka.'}
          </p>

          <div className="mt-10">
            <a
              href={`/${lang}/register/worker`}
              className="inline-block rounded-xl bg-white px-8 py-4 text-indigo-600 font-semibold shadow hover:bg-gray-100 transition"
            >
              {lang === 'en' ? 'Become a part of the platform' : 'Postani deo platforme'}
            </a>
          </div>
        </div>
      </section>


      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {lang === 'en' ? 'Why this platform?' : 'Zašto ova platforma?'}
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {lang === 'en' ? 'Simple' : 'Jednostavno'}
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'No complex forms and unnecessary steps.' : 'Bez komplikovanih formulara i nepotrebnih koraka.'}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {lang === 'en' ? 'Direct contact' : 'Direktan kontakt'}
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'No intermediaries — you directly contact the master.' : 'Nema posrednika — vi se dogovarate direktno.'}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {lang === 'en' ? 'Local' : 'Lokalno'}
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'Find masters in your city, quickly and easily.' : 'Pronađite majstore u svom gradu, brzo i lako.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
