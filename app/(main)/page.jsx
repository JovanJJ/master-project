import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import FeaturedWorkers from "../components/FeaturedWorkers";

export const metadata = {
  title: "Početna",
  description: "Potreban vam je majstor, pomocu nase platforme pronadjite majstora",
};

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Hero />
      <SearchBar />
      
      <HowItWorks />
      <FeaturedWorkers />
    </main>
  );
}