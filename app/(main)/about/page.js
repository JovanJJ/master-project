export default function AboutPage() {
  return (
    <main className="bg-gray-50">
      
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Povezujemo ljude i majstore
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Pomažemo ljudima da lako pronađu pouzdane majstore,  
          i pomažemo majstorima da pronađu posao — brzo, jednostavno i bez komplikacija.
        </p>

        <p className="mt-4 text-xl font-medium text-gray-800">
          „Pomažemo ljudima da pronađu majstora  
          i pomažemo majstorima da pronađu posao.“
        </p>
      </section>

      
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Kako platforma funkcioniše
          </h2>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
           
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-bold text-indigo-600">1</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Izaberite grad i profesiju
              </h3>
              <p className="mt-3 text-gray-600">
                Unesite grad i vrstu usluge koja vam je potrebna  
                (npr. električar, vodoinstalater, moler).
              </p>
            </div>

           
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-bold text-indigo-600">2</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Pregledajte dostupne majstore
              </h3>
              <p className="mt-3 text-gray-600">
                Pogledajte listu majstora, njihove osnovne informacije  
                i odlučite ko vam najviše odgovara.
              </p>
            </div>

            
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl font-bold text-indigo-600">3</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Kontaktirajte direktno
              </h3>
              <p className="mt-3 text-gray-600">
                Bez posrednika — kontaktirajte majstora direktno  
                i dogovorite posao.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-blue-50">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Da li ste majstor?
          </h2>

          <p className="mt-6 text-lg text-gray-700">
            Platforma je tek na početku — ovo je vaša prilika da budete među prvima.
            Prvi majstori dobijaju veću vidljivost i lakše dolaze do novih klijenata.
          </p>

          <p className="mt-4 text-lg text-gray-700">
            Registracija je jednostavna, a vaš profil služi kao vaša online preporuka.
          </p>

          <div className="mt-10">
            <a
              href="/register/worker"
              className="inline-block rounded-xl bg-white px-8 py-4 text-indigo-600 font-semibold shadow hover:bg-gray-100 transition"
            >
              Postani deo platforme
            </a>
          </div>
        </div>
      </section>

      
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Zašto ova platforma?
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Jednostavno
              </h3>
              <p className="mt-3 text-gray-600">
                Bez komplikovanih formulara i nepotrebnih koraka.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Direktan kontakt
              </h3>
              <p className="mt-3 text-gray-600">
                Nema posrednika — vi se dogovarate direktno.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Lokalno
              </h3>
              <p className="mt-3 text-gray-600">
                Pronađite majstore u svom gradu, brzo i lako.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
