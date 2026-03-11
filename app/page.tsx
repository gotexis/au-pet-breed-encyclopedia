import dogs from "@/data/dogs.json";
import cats from "@/data/cats.json";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="hero bg-base-200 rounded-box p-8 mb-8">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-4xl font-bold">🐾 AU Pet Breed Encyclopedia</h1>
            <p className="py-4 text-lg">
              Discover {dogs.length} dog breeds and {cats.length} cat breeds.
              Your comprehensive guide to choosing the perfect pet in Australia.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/dogs" className="btn btn-primary">🐕 Browse Dogs ({dogs.length})</Link>
              <Link href="/cats" className="btn btn-secondary">🐱 Browse Cats ({cats.length})</Link>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Featured Dog Breeds</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {dogs.slice(0, 12).map((d) => (
          <Link key={d.slug} href={`/dogs/${d.slug}`} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            {d.image_url && (
              <figure className="h-32 overflow-hidden">
                <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
              </figure>
            )}
            <div className="card-body p-3">
              <h3 className="card-title text-sm">{d.name}</h3>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Featured Cat Breeds</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cats.filter(c => c.name).slice(0, 12).map((c) => (
          <Link key={c.slug} href={`/cats/${c.slug}`} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="card-body p-3">
              <h3 className="card-title text-sm">{c.name}</h3>
              {c.origin && <p className="text-xs opacity-70">{c.origin}</p>}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
