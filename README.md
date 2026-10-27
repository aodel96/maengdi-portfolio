# MAENGDI — Personal Portfolio

게임 UI/UX & 비주얼 디자이너의 개인 브랜드 포트폴리오입니다. Home과 공통 레이아웃을 중심으로 구현했으며 Work, 프로젝트 상세, About, Playground, Contact 기본 화면을 제공합니다.

## 실행

Node.js **24.x** 권장 (`.node-version`: 24.19.0). 별도 API 키, DB, 환경 변수 없이 실행합니다. 폰트와 그래픽도 로컬에서 제공하므로 페이지 렌더링에 외부 서비스가 필요하지 않습니다.

```sh
cd /workspace/maengdi-portfolio
npm ci
npm run dev
```

개발 서버는 3000 포트를 사용합니다. 프로덕션 실행:

```sh
npm run build
npm run start
```

다른 포트는 `npm run dev -- --port 3001`처럼 지정합니다. `.npmrc`의 `/tmp/maengdi-npm-cache`는 클라우드 환경에서 쓰기 가능한 npm 캐시 경로이며 삭제되어도 설치에 문제가 없습니다.

## 기술 및 구조

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4를 사용합니다. 페이지는 정적으로 미리 렌더링하고, 필터·모바일 메뉴·갤러리·이메일 복사만 클라이언트 컴포넌트로 제공합니다.

```text
src/
  app/
    page.tsx                 # Home
    layout.tsx               # 공통 Header / Footer / 메타데이터
    globals.css              # 공통 디자인 토큰과 반응형 스타일
    work/page.tsx            # 카테고리 필터 + 프로젝트 그리드
    work/[slug]/page.tsx     # 5개 섹션의 프로젝트 상세 템플릿
    about/page.tsx           # 소개 / 경력 / 도구 / 이력서
    playground/page.tsx      # 이미지 갤러리
    contact/page.tsx         # 이메일과 외부 채널
    opengraph-image.tsx      # 공유용 브랜드 이미지
    robots.ts / sitemap.ts   # 검색 엔진 설정
  components/                # 공통 UI, 카드, 필터, 갤러리 등
  content/
    site.ts                  # 소개, 경력, 도구, 연락처, 내비게이션
    projects.ts              # 프로젝트와 상세 페이지 콘텐츠
    playground.ts            # 갤러리 데이터
public/images/               # 직접 제작한 SVG 예시 그래픽
tests/portfolio.spec.ts       # 브라우저 기능·반응형·접근성 테스트
```

콘텐츠 데이터와 표현 컴포넌트를 분리했습니다. 추후 CMS를 도입할 때 `Project` / `Artwork` 타입을 반환하는 데이터 접근 계층으로 교체할 수 있습니다. 현재 기본 언어는 한국어(`lang="ko"`)이며 번역과 언어 라우팅은 아직 구현하지 않았습니다.

## 실제 콘텐츠 교체

**현재 프로젝트와 갤러리 이미지는 실제 포트폴리오 작업물이 아닙니다.** 모든 예시 그래픽은 사이트 구성을 위해 직접 만든 SVG입니다. 회사·클라이언트 자료, 경력, 수치 성과, 주소를 임의로 추가하지 않았습니다. 소개 문구는 편집 가능한 브랜드 초안이며 공개 전 본인의 표현으로 검토해 주세요.

### 프로젝트

1. 공개 및 사용 권한이 확인된 이미지를 `public/images/projects/`에 넣습니다. 사진·화면 캡처는 WebP, AVIF, JPEG, PNG를 권장합니다.
2. `src/content/projects.ts`의 `projects` 항목을 수정하거나 추가합니다. `slug`는 URL에서 사용하므로 중복 없이 지정합니다.
3. `title`, `subtitle`, `category`, `tags`, `year`, `role`, `cover`, `coverAlt`, `sections`를 실제 정보로 교체합니다. `cover`는 `/images/projects/cover.webp`처럼 `public` 이하 경로를 씁니다.
4. 실제 콘텐츠가 준비되면 `isPlaceholder: false`로 설정합니다. `featured: true`인 항목이 Home에 표시됩니다. 기본 Home은 3개 프로젝트 슬롯에 맞춰져 있습니다.
5. 상세 섹션의 `images` 배열로 여러 이미지를 추가할 수 있습니다. `src`, `alt`, 원본 `width` / `height`와 선택적인 `caption`을 지정합니다. 프로젝트를 추가한 뒤 다시 빌드하면 상세 경로가 생성됩니다.

```ts
{
  id: "final",
  title: "Final Design",
  text: "공개 가능한 최종 화면 설명",
  images: [{
    src: "/images/projects/final.webp",
    alt: "화면 구성과 주요 정보를 설명하는 대체 텍스트",
    width: 1600,
    height: 1000,
    caption: "이미지 설명 / 본인 담당 범위",
  }],
}
```

카테고리를 늘리려면 같은 파일의 `categories`도 수정합니다. 기본 상세 페이지에는 Overview, Context & Problem, My Role & Process, Final Design, Outcome & Reflection 섹션이 있습니다. 실제 프로젝트에는 각 항목에 맞는 내용과 근거를 입력해 주세요.

### 소개와 연락처

`src/content/site.ts`를 편집합니다.

- `career`: 확인된 회사명, 기간, 담당 역할과 설명만 추가합니다.
- `tools`: 실제 사용하는 도구만 추가합니다. 현재 숙련도나 도구는 가정하지 않았습니다.
- `resumeUrl`: 이력서를 `public/files/resume.pdf`에 넣고 `/files/resume.pdf`로 설정하면 다운로드가 활성화됩니다.
- `email`: 본인 이메일을 설정하면 Contact의 메일 링크와 주소 복사가 활성화됩니다.
- `channels[].url`: 본인의 검증된 외부 채널 URL을 설정합니다. `null`일 때는 링크를 만들지 않습니다.
- `url`: 실제 배포 주소를 설정하면 사이트맵과 메타데이터 기준 URL이 활성화됩니다. 존재하지 않는 도메인은 기본값으로 만들지 않았습니다.

### Playground

`src/content/playground.ts`에서 `image`, `alt`, `title`, `medium`, `description`을 교체합니다. 직접 만든 작품이고 공개 권한이 확인되면 `isPlaceholder: false`로 설정합니다. 갤러리는 클릭, 이전/다음 버튼, 좌우 방향키, Esc 닫기를 지원합니다. `?view=작품id`로 특정 이미지에 직접 접근할 수 있습니다.

### 디자인

`src/app/globals.css`의 `:root` 및 Tailwind `@theme`가 공통 색상과 폰트 토큰입니다. Manrope와 Noto Sans KR을 로컬 번들로 제공합니다. 포인트 컬러를 변경할 때 작은 텍스트의 WCAG AA 색 대비도 함께 확인해 주세요. 일반 이미지는 `next/image`로 처리하고, SVG는 벡터 원본을 사용합니다.

## 검증

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

E2E는 빌드된 앱을 실행하고 Chromium에서 데스크톱·모바일 두 환경을 검증합니다. 이 클라우드에서는 `/usr/bin/chromium`을 사용합니다. 다른 환경에서는 시스템 Chromium 경로를 `CHROMIUM_PATH`로 지정하세요. 또는 `npx playwright install chromium`으로 설치한 뒤 `playwright.config.ts`의 `launchOptions.executablePath`를 제거해 Playwright 번들 브라우저를 사용할 수 있습니다.

검증 범위는 CTA·내비게이션, 필터, 상세 섹션, 404, 미등록 정보 표시, 갤러리 키보드와 초점 복귀, 가로 넘침, axe WCAG A/AA 검사입니다. 자동 접근성 검사는 수동 스크린리더 검증을 대체하지 않습니다. Home 스크린샷은 테스트 후 `artifacts/`에 생성되며 Git에는 포함하지 않습니다.

## 현재 범위

GitHub Pages용 정적 빌드와 자동 배포 설정은 [DEPLOYMENT.md](DEPLOYMENT.md)를 참고하세요. `npm run build:pages`로 배포 파일을 만들고 `npm run test:pages`로 실제 정적 파일을 검증할 수 있습니다. 이 설정과 공개 사이트의 배포 완료 여부는 별개입니다.

- Home과 공통 레이아웃은 상세 구현, 나머지 페이지는 확장 가능한 기본 화면입니다.
- 실제 경력·성과·프로젝트·연락처·이력서 등록이 필요합니다.
- 문의 폼 백엔드, CMS, 다국어 전환은 포함하지 않습니다.
- 플레이스홀더 프로젝트 상세는 검색 색인을 막고, 실제 콘텐츠만 사이트맵에 포함합니다.
- 배포와 실제 도메인 연결은 수행하지 않았습니다.
