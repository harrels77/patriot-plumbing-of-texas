import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A record of plumbing work across Wilson, Guadalupe, Hays, and Comal counties. Family-owned since 1983.",
};

// Map a project's serviceSlug back to its full Service entry so each card
// can display the canonical service title.
const findService = (slug: string) =>
  services.find((s) => s.href === `/services/${slug}`);

export default function WorkPage() {
  // Newest-first. The array may be empty today; the grid stays inert until
  // real projects are added to src/data/projects.ts.
  const sortedProjects = [...projects].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <>
      {/* 01 — Hero (minimal, no photo, left-aligned) */}
      <section aria-label="Our work hero" className="bg-cream py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          {/* Editorial eyebrow row */}
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
              OUR WORK
            </span>
            <span aria-hidden className="h-px flex-1 bg-tan" />
          </div>

          <h1
            className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-6xl lg:text-7xl"
            style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
          >
            Our work.
          </h1>

          <p className="mt-8 max-w-xl font-sans text-lg text-navy sm:text-xl">
            A record of work done across Wilson, Guadalupe, Hays, and Comal
            counties. Some recent, some over forty years old, all done the same
            way.
          </p>
        </div>
      </section>

      {/* 02 — Empty state OR project grid */}
      {sortedProjects.length === 0 ? (
        <section
          aria-label="Coming soon"
          className="bg-cream py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
            {/* Thin decorative line */}
            <span aria-hidden className="mx-auto mb-10 block h-px w-16 bg-tan" />

            <p
              className="mb-12 font-serif text-2xl font-medium leading-relaxed text-navy sm:text-3xl lg:text-4xl"
              style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
            >
              <span className="text-tan text-[1.2em]">&ldquo;</span>Our recent
              work is being added here. In the meantime, call us to see it in
              person or to discuss your project.
              <span className="text-tan text-[1.2em]">&rdquo;</span>
            </p>

            <a
              href="tel:+12108571727"
              className="inline-flex items-center justify-center rounded-full bg-rust px-8 py-4 font-sans text-base font-medium text-cream transition-colors hover:bg-rust/90 sm:text-lg"
            >
              Call (210) 857-1727
            </a>
          </div>
        </section>
      ) : (
        <section aria-label="Recent projects" className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {sortedProjects.map((project) => (
                <article key={project.id} className="flex flex-col gap-4">
                  {/* Photo area — charcoal placeholder until a real photo exists */}
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-charcoal">
                    {project.mainPhoto && (
                      <Image
                        src={project.mainPhoto}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-rust">
                    {findService(project.serviceSlug)?.title ||
                      project.serviceSlug}
                  </span>

                  <h2
                    className="font-serif text-xl font-semibold text-navy"
                    style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 50" }}
                  >
                    {project.title}
                  </h2>

                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-tan">
                    {project.location} · {project.date}
                  </p>

                  <p className="font-sans text-base leading-relaxed text-navy/80">
                    {project.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 03 — Footer */}
      <Footer services={services} />
    </>
  );
}
