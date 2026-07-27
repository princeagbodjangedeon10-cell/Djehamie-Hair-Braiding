import Image from "next/image";
import { gallery, type GalleryItem } from "@/lib/site";
import { Reveal } from "./ui";

export function GalleryGrid({
  items = gallery,
  limit,
}: {
  items?: GalleryItem[];
  limit?: number;
}) {
  const shown = limit ? items.slice(0, limit) : items;
  return (
    <div className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] lg:grid-cols-4 lg:gap-4">
      {shown.map((item, i) => (
        <Reveal
          key={item.src}
          delay={(i % 4) * 70}
          className={item.span ? "row-span-2" : ""}
        >
          <figure className="group relative h-full w-full overflow-hidden rounded-2xl bg-brown-deep/20">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brown-deep/80 via-brown-deep/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
                Our work
              </span>
              <p className="font-display text-lg leading-tight text-cream">{item.style}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
