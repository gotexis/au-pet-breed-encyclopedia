import cats from "@/data/cats.json";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat Breeds A-Z — AU Pet Breed Encyclopedia",
  description: `Browse ${cats.length} cat breeds with details on coat, origin, and patterns.`,
};

export default function CatsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">🐱 All Cat Breeds ({cats.length})</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Breed</th>
              <th>Origin</th>
              <th>Coat</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {cats.filter(c => c.name).map((c) => (
              <tr key={c.slug}>
                <td><Link href={`/cats/${c.slug}`} className="link link-primary">{c.name}</Link></td>
                <td>{c.origin || "—"}</td>
                <td>{c.coat || "—"}</td>
                <td>{c.country || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
