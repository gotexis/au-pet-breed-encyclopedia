import cats from "@/data/cats.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Cat = (typeof cats)[number];

export function generateStaticParams() {
  return cats.filter(c => c.name).map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const cat = cats.find((c) => c.slug === slug);
    return cat
      ? { title: `${cat.name} — Cat Breed Info | AU Pet Encyclopedia`, description: `Learn about the ${cat.name} cat breed. Origin: ${cat.origin || "Unknown"}. Coat: ${cat.coat || "Various"}.` }
      : { title: "Breed Not Found" };
  });
}

export default async function CatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: cat.name,
    description: `${cat.name} cat breed — origin: ${cat.origin || "Unknown"}, coat: ${cat.coat || "Various"}.`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/cats">Cats</Link></li>
          <li>{cat.name}</li>
        </ul>
      </div>
      <h1 className="text-3xl font-bold mb-4">{cat.name}</h1>
      <div className="badge badge-secondary mb-4">Cat Breed</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 p-6">
          <h2 className="text-xl font-semibold mb-3">Breed Details</h2>
          <div className="space-y-2">
            <p><strong>Origin:</strong> {cat.origin || "Unknown"}</p>
            <p><strong>Country:</strong> {cat.country || "Unknown"}</p>
            <p><strong>Coat:</strong> {cat.coat || "Various"}</p>
            <p><strong>Pattern:</strong> {cat.pattern || "Various"}</p>
          </div>
        </div>
        <div className="card bg-base-200 p-6">
          <h2 className="text-xl font-semibold mb-3">About the {cat.name}</h2>
          <p className="opacity-80">
            The {cat.name} is a {cat.coat ? cat.coat.toLowerCase() + "-coated" : ""} cat breed
            {cat.origin ? ` originating from ${cat.origin}` : ""}.
            Browse our full collection of {cats.length} cat breeds.
          </p>
        </div>
      </div>
    </>
  );
}
