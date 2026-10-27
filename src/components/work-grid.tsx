"use client";

import { useState } from "react";
import { categories, type Category, type Project } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<Category>("All");
  const visible = projects.filter(
    (project) => category === "All" || project.category === category,
  );
  return (
    <div>
      <div className="work-toolbar">
        <div className="filters" role="group" aria-label="프로젝트 카테고리">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
              <span>
                {
                  projects.filter(
                    (project) => item === "All" || project.category === item,
                  ).length
                }
              </span>
            </button>
          ))}
        </div>
        <p className="mono" role="status" aria-live="polite">
          {visible.length} PROJECT {visible.length === 1 ? "SLOT" : "SLOTS"}
        </p>
      </div>
      <div className="work-grid">
        {visible.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
            headingLevel={2}
          />
        ))}
      </div>
    </div>
  );
}
