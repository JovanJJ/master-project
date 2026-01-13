import Link from "next/link";

const categories = [
  { icon: "🏗️", title: "Construction" },
  { icon: "🔧", title: "Plumbing & Electrical" },
  { icon: "🧹", title: "Cleaning Services" },
  { icon: "💻", title: "IT Professionals" },
  { icon: "🚚", title: "Drivers & Movers" },
  { icon: "🚚", title: "Drivers & Movers" },
  { icon: "🚚", title: "Drivers & Movers" },
  { icon: "🚚", title: "Drivers & Movers" },
  { icon: "🚚", title: "Drivers & Movers" },
  { icon: "🧹", title: "Cleaning Services" },
  { icon: "🧹", title: "Cleaning Services" },
  { icon: "🧹", title: "Cleaning Services" },
];

export default function Categories() {
  return (
    <section id="categories" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Profesije</h2>
          <p className="mt-4 text-lg text-gray-600">Pronadjite radnika za vase potrebe</p>
        </div>

        <div className="flex flex-row gap-4 md:gap-6 overflow-auto w-auto">
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              href={`/category/${cat.title.toLowerCase().replace(/ /g, '-')}`} 
              className=" bg-gray-50 rounded-xl px-12 text-center hover:bg-blue-50 hover:shadow-md transition border border-gray-100 hover:border-blue-200"
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">{cat.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}