import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import FeaturedWorkers from "../components/FeaturedWorkers";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: lang === 'en' ? 'Home' : 'Početna',
    description: lang === 'en' ? 'Need a master? Find one using our platform.' : 'Potreban vam je majstor, pomocu nase platforme pronadjite majstora',
  };
}

export default async function Home({ params }) {
  const { lang } = await params;

  return (
    <main className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Hero lang={lang} />
      <SearchBar lang={lang} />
      <HowItWorks lang={lang} />
      <FeaturedWorkers lang={lang} />
    </main>
  );
}