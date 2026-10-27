import Image from "@/components/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Arrow, PlaceholderNote, TextLink } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project?.title ?? "Project not found",
    description: project?.subtitle,
    robots: project?.isPlaceholder ? { index: false, follow: true } : undefined,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <div className="container case-intro">
        <Link href="/work" className="case-back">
          <Arrow />
          All work
        </Link>
        <p className="eyebrow">
          PROJECT {project.number} / {project.category.toUpperCase()}
        </p>
        <h1>
          {project.title}
          <span className="accent">.</span>
        </h1>
        <p className="case-subtitle">{project.subtitle}</p>
        {project.isPlaceholder && (
          <PlaceholderNote>
            콘텐츠 준비 중 · 실제 프로젝트가 아닌 상세 페이지 템플릿입니다.
          </PlaceholderNote>
        )}
        <dl className="case-facts">
          <div>
            <dt>DISCIPLINE</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>ROLE</dt>
            <dd>{project.role ?? "담당 역할 등록 예정"}</dd>
          </div>
          <div>
            <dt>YEAR</dt>
            <dd>{project.year ?? "기간 등록 예정"}</dd>
          </div>
          <div>
            <dt>FOCUS</dt>
            <dd>{project.tags.join(" · ")}</dd>
          </div>
        </dl>
      </div>
      <div className="container">
        <div className="case-cover">
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
        <div className="case-body">
          <nav className="case-nav" aria-label="프로젝트 목차">
            {project.sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                <span>0{index + 1}</span>
                {section.title}
              </a>
            ))}
          </nav>
          <div>
            {project.sections.map((section, index) => (
              <section
                id={section.id}
                key={section.id}
                className="case-section"
              >
                <p className="eyebrow">0{index + 1} / THE PROJECT</p>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.images?.map((image) => (
                  <figure className="case-final-image" key={image.src}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 767px) 100vw, 65vw"
                    />
                    {image.caption && <figcaption>{image.caption}</figcaption>}
                  </figure>
                ))}
                {section.id === "final" &&
                  project.isPlaceholder &&
                  !section.images?.length && (
                    <div className="case-final-image">
                      <Image
                        src={project.cover}
                        alt={project.coverAlt}
                        width={1200}
                        height={800}
                        sizes="(max-width: 767px) 100vw, 65vw"
                      />
                    </div>
                  )}
              </section>
            ))}
          </div>
        </div>
        <div className="next-project">
          <span className="eyebrow">NEXT PROJECT SLOT</span>
          <TextLink href={`/work/${next.slug}`}>{next.title}</TextLink>
        </div>
      </div>
    </>
  );
}
