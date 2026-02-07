export default async function ContactPage({ params }) {
  const { lang } = await params;

  return (
    <main className="bg-gray-50">

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          {lang === 'en' ? 'Contact Us' : 'Kontaktirajte nas'}
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          {lang === 'en' ? 'Have a question, suggestion, or need help?  ' : 'Imate pitanje, predlog ili vam je potrebna pomoć?  '}
          {lang === 'en' ? 'Feel free to contact us - we are here to help.' : 'Slobodno nas kontaktirajte — tu smo da pomognemo.'}
        </p>

        <p className="mt-4 text-xl font-medium text-gray-800">
          {lang === 'en' ? 'Contact us via email, phone, WhatsApp, or Viber,  ' : 'Kontaktirajte nas putem emaila, telefona ili poruke,  '}
          {lang === 'en' ? 'and you can find us on social media.' : 'a možete nas pronaći i na društvenim mrežama.'}
        </p>
      </section>


      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-gray-50 p-8 text-center shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">
                Email
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'Write to us at any time' : 'Pišite nam u bilo koje vreme'}
              </p>
              <a
                href="mailto:support@platforma.rs"
                className="mt-4 inline-block font-medium text-green-700 hover:underline"
              >
                jovanjj99@gmail.com
              </a>
            </div>


            <div className="rounded-2xl bg-gray-50 p-8 text-center shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">
                {lang === 'en' ? 'Phone' : 'Telefon'}
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'Call, WhatsApp, or Viber' : 'Poziv, WhatsApp ili Viber'}
              </p>
              <a
                href="tel:+381601234567"
                className="mt-4 inline-block font-medium text-green-700 hover:underline"
              >
                +381 616315603
              </a>
            </div>


            <div className="rounded-2xl bg-gray-50 p-8 text-center shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">
                {lang === 'en' ? 'Instagram' : 'Instagram'}
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'Follow us and write to us' : 'Pratite nas i pišite nam'}
              </p>
              <a

                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-medium text-green-700 hover:underline"
              >
                MasterHub
              </a>
            </div>


            <div className="rounded-2xl bg-gray-50 p-8 text-center shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">
                {lang === 'en' ? 'Facebook' : 'Facebook'}
              </h3>
              <p className="mt-3 text-gray-600">
                {lang === 'en' ? 'Find us on Facebook' : 'Pronađite nas na Facebook-u'}
              </p>
              <a

                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-medium text-green-700 hover:underline"
              >
                facebook.com/MasterHub
              </a>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-700">
          <h2 className="text-3xl md:text-4xl font-bold">
            {lang === 'en' ? 'We are here for you' : 'Tu smo za vas'}
          </h2>

          <p className="mt-6 text-lg text-gray-700">
            {lang === 'en' ? 'Contact us via email, phone, WhatsApp, or Viber,  ' : 'Kontaktirajte nas putem emaila, telefona, WhatsApp-a ili Vibera,  '}
            {lang === 'en' ? 'and you can find us on social media.' : 'a možete nas pronaći i na društvenim mrežama.'}
          </p>

          <p className="mt-4 text-gray-700">
            {lang === 'en' ? 'We respond as quickly as possible.' : 'Odgovaramo u najkraćem mogućem roku.'}
          </p>
        </div>
      </section>
    </main>
  );
}
