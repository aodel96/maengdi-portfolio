import type { Metadata } from "next";
import { PageIntro, PlaceholderNote } from "@/components/ui";
import { WorkGrid } from "@/components/work-grid";
import { ContactBand } from "@/components/footer";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "MAENGDI의 게임 UI/UX와 비주얼 디자인 프로젝트. 현재 실제 작업물 등록을 준비하고 있습니다.",
};

export default function WorkPage() {
  return (
    <>
      <PageIntro
        label="SELECTED & COLLECTED"
        title="Work"
        description="플레이의 흐름을 설계하고, 고유한 시각 언어를 만듭니다. 프로젝트의 결과와 그 안의 생각을 소개할 공간입니다."
      />
      <section className="container page-content">
        {projects.some((project) => project.isPlaceholder) && (
          <PlaceholderNote />
        )}
        <WorkGrid projects={projects} />
      </section>
      <ContactBand />
    </>
  );
}
