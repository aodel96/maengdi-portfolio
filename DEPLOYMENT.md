# MAENGDI 웹사이트 배포

이 저장소는 GitHub Pages용 정적 빌드와 자동 배포 워크플로를 포함합니다. **설정 파일이 있다는 것만으로 공개 사이트가 생성된 것은 아닙니다.** 실제 배포 성공과 HTTP 응답을 확인해야 합니다.

## GitHub Pages

저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다. Pages 사용 가능 여부는 저장소의 공개 범위와 GitHub 요금제에 따라 달라질 수 있습니다. 저장소의 공개 범위는 자동으로 변경하지 않습니다.

사이트 소스와 `.github/workflows/pages.yml`이 `main`에 반영되면 Actions가 정적 파일을 빌드하고 Pages에 배포합니다. 수동 재실행은 **Actions → Deploy MAENGDI to GitHub Pages → Run workflow**에서 할 수 있습니다.

기본 배포 대상은 `https://aodel96.github.io/maengdi-portfolio/`입니다. 이는 설정된 배포 대상이며, 배포와 접속 검증 전에는 활성 주소로 간주하지 않습니다. 유료 도메인 구매나 별도 호스팅 계정은 이 경로에 필요하지 않습니다.

## 로컬에서 배포 파일 검증

```sh
npm ci
npm run build:pages
npm run test:pages
```

`out/`가 실제 업로드되는 사이트 파일입니다. `npm run preview:pages`로 정적 파일 확인 서버를 실행할 수도 있습니다. `test:pages`는 이 서버를 자동으로 띄워 저장소 하위 경로에서 이미지·폰트·메뉴·프로젝트 필터·상세 페이지 새로고침·갤러리·404·접근성을 검증합니다.

기본 개발 명령 `npm run dev`, `npm run build`, `npm run start`는 기존 Next.js 서버 방식을 유지합니다. `build:pages` 이후 Next.js 서버 방식으로 다시 실행하려면 `npm run build`로 일반 빌드를 다시 생성합니다.

## 다른 도메인이나 저장소로 변경

빌드 전에 다음 값을 설정합니다. GitHub Actions에서는 저장소 이름과 소유자를 바탕으로 자동 지정합니다.

- `NEXT_PUBLIC_BASE_PATH`: 사이트를 호스팅하는 하위 경로, 예: `/maengdi-portfolio`. 루트 도메인이면 빈 문자열.
- `NEXT_PUBLIC_SITE_URL`: 하위 경로까지 포함한 실제 사이트 URL.

공개 이미지와 로컬 이력서 링크는 공통 경로 함수에서 하위 경로를 적용합니다. 사이트맵도 이 경로를 보존합니다. 정적 호스팅에서는 Next.js 이미지 최적화 서버가 없으므로 이미지 원본을 제공합니다. 실제 래스터 이미지는 업로드 전에 크기와 WebP/AVIF 압축을 조정해 주세요.

## 이 클라우드에서 배포를 진행할 때

GitHub API를 통해 Pages를 설정하고 배포 결과를 확인하려면 환경 네트워크에서 `api.github.com` 접근이 필요합니다. 실제 사이트 검증에는 `aodel96.github.io` 접근이 필요합니다. Git 저장소 읽기 인증만으로 GitHub API의 관리 권한까지 확인된 것은 아닙니다. 기존 인증을 먼저 재검증하며, 토큰을 채팅에 입력하지 않습니다.

배포 후 Home과 모든 하위 페이지, 정적 이미지, 모바일 내비게이션을 확인합니다. 실제 경력·성과·연락처와 작업물은 아직 플레이스홀더이며 이 배포 설정은 해당 내용을 바꾸지 않습니다.
