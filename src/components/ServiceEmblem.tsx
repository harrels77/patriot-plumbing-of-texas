import { readFileSync } from "fs";
import { join } from "path";

// Renders a pre-made service emblem (or its label-less icon variant) as inline SVG.
// Server component — reads from public/emblems at build time (pages are static).
export default function ServiceEmblem({
  slug,
  icon = false,
  className = "w-full max-w-[400px]",
}: {
  slug: string;
  icon?: boolean;
  className?: string;
}) {
  let svg: string;
  try {
    const file = icon ? `${slug}-icon.svg` : `${slug}.svg`;
    svg = readFileSync(join(process.cwd(), "public", "emblems", file), "utf-8");
  } catch {
    return null; // emblem missing → render nothing, never crash the page
  }
  return (
    <div
      aria-hidden="true"
      className={`${className} [&>svg]:h-auto [&>svg]:w-full`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
