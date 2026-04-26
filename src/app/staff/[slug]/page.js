import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { staffList } from "../../../data/staff";

export function generateStaticParams() {
  return staffList.map((member) => ({
    slug: member.slug,
  }));
}

export default async function StaffBiographyPage({ params }) {
  const { slug } = await params;
  const member = staffList.find((item) => item.slug === slug);

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-4xl px-4 md:px-8">
        <Link
          href="/#staff"
          className="mb-8 inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          Volver al staff
        </Link>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-8 md:grid-cols-[260px_1fr]">
            <div>
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-72 w-full rounded-xl object-cover object-top"
                />
              ) : (
                <div className="flex h-72 w-full items-center justify-center rounded-xl bg-teal-100 text-4xl font-bold text-teal-700">
                  {member.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")}
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-teal-700">{member.role}</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{member.name}</h1>
              <p className="mt-2 text-sm text-slate-500">{member.shift}</p>

              <section className="mt-6">
                <h2 className="text-lg font-semibold text-slate-900">Biografía</h2>
                <p className="mt-3 leading-relaxed text-slate-700">{member.biography}</p>
              </section>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
