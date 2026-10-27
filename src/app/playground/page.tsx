import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro, PlaceholderNote, Spark } from "@/components/ui";
import { Gallery } from "@/components/gallery";
import { artworks } from "@/content/playground";
import { ContactBand } from "@/components/footer";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "그림, 개인 창작물, 실험적 디자인을 담는 MAENGDI의 작은 놀이터. 현재 콘텐츠 등록을 준비하고 있습니다.",
};

export default function PlaygroundPage() {
  return (
    <>
      <PageIntro
        label="NO BRIEF. JUST CURIOSITY."
        title="Playground"
        description="작업의 바깥에서도 호기심은 계속됩니다. 자유롭게 그린 그림, 작은 실험, 뜻밖의 발견을 모아둘 공간입니다."
      />
      <section className="container page-content">
        {artworks.some((artwork) => artwork.isPlaceholder) && (
          <PlaceholderNote>
            이미지를 누르면 크게 볼 수 있습니다. Placeholder로 표시된 이미지는
            사이트 구성을 위한 예시 그래픽입니다.
          </PlaceholderNote>
        )}
        <Suspense
          fallback={<p className="empty-copy">갤러리를 불러오는 중입니다.</p>}
        >
          <Gallery artworks={artworks} />
        </Suspense>
        <p className="gallery-end">
          <span aria-hidden="true">
            <Spark />
          </span>{" "}
          A little more room for the unexpected.
        </p>
      </section>
      <ContactBand />
    </>
  );
}
