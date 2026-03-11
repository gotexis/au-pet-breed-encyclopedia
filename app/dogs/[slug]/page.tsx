import dogs from "@/data/dogs.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Dog = (typeof dogs)[number];

export function generateStaticParams() {
  return dogs.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const dog = dogs.find((d) => d.slug === slug);
    return dog
      ? { title: `${dog.name} — Dog Breed Info | AU Pet Encyclopedia`, description: `Learn about the ${dog.name} dog breed. Photos, traits, and care tips for Australian dog owners.` }
      : { title: "Breed Not Found" };
  });
}

export default async function DogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dog = dogs.find((d) => d.slug === slug);
  if (!dog) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: dog.name,
    image: dog.image_url || undefined,
    description: `${dog.name} dog breed information and photos.`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/dogs">Dogs</Link></li>
          <li>{dog.name}</li>
        </ul>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {dog.image_url && (
          <div className="md:w-1/3">
            <img src={dog.image_url} alt={dog.name} className="rounded-box w-full" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{dog.name}</h1>
          <div className="badge badge-primary mb-4">Dog Breed</div>
          <div className="card bg-base-200 p-6">
            <h2 className="text-xl font-semibold mb-2">About the {dog.name}</h2>
            <p className="opacity-80">
              The {dog.name} is a popular dog breed in Australia. Browse our full collection
              of {dogs.length} dog breeds to find the perfect companion.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
