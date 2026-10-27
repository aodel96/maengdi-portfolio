export type Artwork = {
  id: string;
  title: string;
  medium: string;
  image: string;
  alt: string;
  description: string;
  isPlaceholder: boolean;
};

export const artworks: Artwork[] = [
  {
    id: "form",
    title: "Studies in form",
    medium: "형태 실험 · Placeholder",
    image: "/images/play-form.svg",
    alt: "라일락색 배경 위 연결된 오렌지 고리의 추상 그래픽",
    description:
      "형태와 균형을 탐색하는 갤러리 공간입니다. 사이트 구성을 위해 제작한 예시 그래픽이며, MAENGDI의 실제 작업물이 아닙니다.",
    isPlaceholder: true,
  },
  {
    id: "rhythm",
    title: "A little rhythm",
    medium: "그래픽 실험 · Placeholder",
    image: "/images/play-rhythm.svg",
    alt: "크림색 배경에 검정과 파랑의 리듬감 있는 줄무늬 그래픽",
    description:
      "선과 반복을 탐색하는 갤러리 공간입니다. 실제 개인 창작물을 등록하면 이 이미지와 설명을 교체할 수 있습니다.",
    isPlaceholder: true,
  },
  {
    id: "color",
    title: "Color, in between",
    medium: "컬러 실험 · Placeholder",
    image: "/images/play-color.svg",
    alt: "딥 그린과 옐로, 핑크의 기하학적 컬러 조합",
    description:
      "색의 관계를 탐색하는 갤러리 공간입니다. 사이트 구성을 위해 제작한 예시 그래픽이며, 실제 작업물이 아닙니다.",
    isPlaceholder: true,
  },
];
