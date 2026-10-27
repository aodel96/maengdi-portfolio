import Image from "@/components/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { Arrow } from "./ui";

export function ProjectCard({
  project,
  index = 0,
  wide = false,
  headingLevel = 3,
}: {
  project: Project;
  index?: number;
  wide?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`project-card ${wide ? "project-card-wide" : ""}`}
    >
      <div className="project-image">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes={
            wide
              ? "(max-width: 767px) 100vw, 1200px"
              : "(max-width: 767px) 100vw, 50vw"
          }
        />
        <div className="project-image-top">
          <span className="image-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.isPlaceholder && (
            <span className="image-status">CONTENT PLACEHOLDER</span>
          )}
        </div>
        <span className="project-open" aria-hidden="true">
          <Arrow diagonal />
        </span>
      </div>
      <div className="project-meta">
        <div>
          <p className="project-category">
            {project.category}
            <span> / </span>
            {project.year ?? "프로젝트 등록 예정"}
          </p>
          <Heading>{project.title}</Heading>
        </div>
        <span className="project-meta-arrow">
          <Arrow diagonal />
        </span>
      </div>
      <p className="project-description">{project.subtitle}</p>
    </Link>
  );
}
