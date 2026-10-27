export const categories = ["All", "Game UI/UX", "Visual Design"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: Exclude<Category, "All">;
  tags: string[];
  cover: string;
  coverAlt: string;
  isPlaceholder: boolean;
  featured: boolean;
  year: string | null;
  role: string | null;
  sections: {
    id: string;
    title: string;
    text: string;
    images?: {
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    }[];
  }[];
};

const placeholderSections: Project["sections"] = [
  {
    id: "overview",
    title: "Overview",
    text: "프로젝트명, 기간, 플랫폼, 팀 구성과 작업 범위를 소개할 공간입니다. 실제 프로젝트 정보를 등록해 주세요.",
  },
  {
    id: "context",
    title: "Context & Problem",
    text: "어떤 맥락에서 시작된 작업인지, 누구의 어떤 문제를 해결하려 했는지 기록해 주세요. 공개 가능한 리서치와 근거 자료를 함께 소개할 수 있습니다.",
  },
  {
    id: "process",
    title: "My Role & Process",
    text: "직접 담당한 역할과 협업 범위를 구분하고, 문제 정의부터 탐색·설계·검증까지의 과정을 추가해 주세요.",
  },
  {
    id: "final",
    title: "Final Design",
    text: "공개 권한이 확인된 최종 화면과 디자인 시스템을 등록해 주세요. 아래 이미지는 레이아웃 확인을 위해 직접 제작한 추상 그래픽이며 실제 작업물이 아닙니다.",
  },
  {
    id: "outcome",
    title: "Outcome & Reflection",
    text: "검증 가능한 결과와 배운 점을 기록해 주세요. 수치가 있다면 측정 기간과 본인의 기여 범위를 함께 설명해 주세요.",
  },
];

// These are explicitly marked content slots, not invented portfolio projects.
export const projects: Project[] = [
  {
    slug: "game-interface",
    number: "01",
    title: "Game interface & experience",
    subtitle: "플레이어의 경험을 담을 첫 번째 프로젝트 공간입니다.",
    category: "Game UI/UX",
    tags: ["UI/UX", "Interface design"],
    cover: "/images/work-interface.svg",
    coverAlt:
      "딥 블루 배경 위 궤도와 인터페이스 패널을 조합한 추상 플레이스홀더 그래픽",
    isPlaceholder: true,
    featured: true,
    year: null,
    role: null,
    sections: placeholderSections,
  },
  {
    slug: "visual-system",
    number: "02",
    title: "A distinctive visual language",
    subtitle: "비주얼 디자인과 시스템을 소개할 프로젝트 공간입니다.",
    category: "Visual Design",
    tags: ["Visual design", "Art direction"],
    cover: "/images/work-visual.svg",
    coverAlt:
      "버터 옐로 배경 위 오렌지 원과 검은 타이포그래피를 배치한 추상 플레이스홀더 그래픽",
    isPlaceholder: true,
    featured: true,
    year: null,
    role: null,
    sections: placeholderSections,
  },
  {
    slug: "interaction-system",
    number: "03",
    title: "Details that make a difference",
    subtitle: "인터랙션과 디자인 시스템의 과정을 담을 프로젝트 공간입니다.",
    category: "Game UI/UX",
    tags: ["Design system", "Interaction"],
    cover: "/images/work-system.svg",
    coverAlt:
      "세이지 그린 배경 위 모듈형 카드와 기하학적 심벌을 조합한 추상 플레이스홀더 그래픽",
    isPlaceholder: true,
    featured: true,
    year: null,
    role: null,
    sections: placeholderSections,
  },
];
