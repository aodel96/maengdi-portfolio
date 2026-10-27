// Editorial content lives here, independently of page components.
// Only add verified information. null means the information is not yet supplied.
export const site = {
  name: "MAENGDI",
  role: "Game UI/UX & Visual Designer",
  description:
    "MAENGDI의 게임 UI/UX 및 비주얼 디자인 포트폴리오. 프로젝트와 디자인의 과정을 소개합니다.",
  introduction:
    "게임의 경험과 비주얼의 가능성을 잇는 디자이너. 플레이에 자연스럽게 스며드는 명확한 경험을 지향합니다.",
  email: null as string | null,
  resumeUrl: null as string | null,
  // Set the verified production origin to enable canonical URLs and sitemap.
  url: (process.env.NEXT_PUBLIC_SITE_URL || null) as string | null,
  channels: [
    { name: "Behance", url: null as string | null },
    { name: "LinkedIn", url: null as string | null },
    { name: "Instagram", url: null as string | null },
  ],
  career: [] as {
    period: string;
    company: string;
    role: string;
    description: string;
  }[],
  tools: [] as string[],
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "/contact" },
];

// Brand positioning, not claims of employment or completed client work.
export const disciplines = [
  {
    number: "01",
    title: "Game UI/UX",
    text: "플레이어의 흐름을 생각하는 인터페이스와 사용자 경험.",
    tags: "User flow · Interface · Interaction",
  },
  {
    number: "02",
    title: "Visual Design",
    text: "분명한 시각 언어로 전하는 게임과 브랜드의 개성.",
    tags: "Art direction · Graphic · System",
  },
];
