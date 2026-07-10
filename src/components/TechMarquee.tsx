import Image from "next/image";

const STACK = [
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "react", name: "React" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "nodedotjs", name: "Node.js" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "docker", name: "Docker" },
  { slug: "github", name: "GitHub" },
  { slug: "vercel", name: "Vercel" },
  { slug: "tailwindcss", name: "Tailwind CSS" },
  { slug: "supabase", name: "Supabase" },
];

export function TechMarquee() {
  const track = [...STACK, ...STACK];

  return (
    <section
      aria-label="Tecnologias que utilizamos"
      className="border-y border-white/[0.06] bg-white/[0.02] py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
    >
      <div className="marquee-track mx-auto max-w-7xl overflow-hidden px-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:px-6 lg:px-8">
        <div className="flex w-max animate-marquee items-center gap-16">
          {track.map((tech, i) => (
            <Image
              key={`${tech.slug}-${i}`}
              src={`https://cdn.simpleicons.org/${tech.slug}/7d828a`}
              alt={tech.name}
              width={28}
              height={28}
              unoptimized
              className="h-7 w-7 shrink-0 opacity-70 transition-all duration-300 hover:scale-110 hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
