import dogs from "@/data/dogs.json";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Breeds A-Z — AU Pet Breed Encyclopedia",
  description: `Browse ${dogs.length} dog breeds with photos. Find the perfect dog breed for your Australian lifestyle.`,
};

export default function DogsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">🐕 All Dog Breeds ({dogs.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {dogs.map((d) => (
          <Link key={d.slug} href={`/dogs/${d.slug}`} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
            {d.image_url && (
              <figure className="h-40 overflow-hidden">
                <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" loading="lazy" />
              </figure>
            )}
            <div className="card-body p-3">
              <h3 className="card-title text-sm">{d.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
