import type { Metadata } from "next";
import { withBasePath } from "@/lib/paths";
import { Download } from "lucide-react";
import { PageIntro, SectionLabel } from "@/components/ui";
import { ContactBand } from "@/components/footer";
import { site, disciplines } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "게임 UI/UX & 비주얼 디자이너 MAENGDI 소개. 경력, 역량, 디자인에 대한 생각을 담을 공간입니다.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="BEYOND THE INTERFACE"
        title="About me"
        description={site.introduction}
      />
      <div className="container about-page">
        <section className="about-statement">
          <div className="about-monogram" aria-hidden="true">
            <span>
              m<span className="accent">.</span>
            </span>
            <p>
              A CURIOUS MIND
              <br />A PLAYFUL PERSPECTIVE
            </p>
          </div>
          <div>
            <p className="eyebrow">HELLO, I’M MAENGDI</p>
            <h2>
              명확한 경험,
              <br />
              오래 남는 인상.
            </h2>
            <p>
              게임 UI/UX와 비주얼 디자인을 중심으로 작업을 소개합니다.
              플레이하는 순간의 작은 디테일부터 전체 경험의 일관성까지, 디자인에
              담긴 생각과 과정을 전하고자 합니다.
            </p>
            <p className="muted">
              상세 자기소개와 경력 정보는 준비 중입니다. 확인된 내용을 바탕으로
              업데이트할 예정입니다.
            </p>
            {site.resumeUrl ? (
              <a
                href={withBasePath(site.resumeUrl)}
                download
                className="button button-dark"
              >
                Download résumé
                <Download size={17} />
              </a>
            ) : (
              <div>
                <button
                  className="button button-disabled"
                  disabled
                  aria-describedby="resume-status"
                >
                  Download résumé
                  <Download size={17} />
                </button>
                <p id="resume-status" className="field-note">
                  이력서 파일 등록 예정
                </p>
              </div>
            )}
          </div>
        </section>
        <section className="about-detail-section">
          <SectionLabel number="01">AREAS OF FOCUS</SectionLabel>
          <div className="about-focus-grid">
            {disciplines.map((item) => (
              <article key={item.title}>
                <span className="mono">/{item.number}</span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <p className="discipline-tags">{item.tags}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="about-detail-section">
          <SectionLabel number="02">CAREER TIMELINE</SectionLabel>
          <h2 className="subpage-heading">The journey so far.</h2>
          {site.career.length ? (
            <ol className="timeline">
              {site.career.map((item) => (
                <li key={`${item.period}-${item.company}`}>
                  <span className="mono">{item.period}</span>
                  <div>
                    <h3>{item.company}</h3>
                    <p>{item.role}</p>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="empty-content">
              <span className="empty-mark" aria-hidden="true">
                ↗
              </span>
              <div>
                <h3>다음 이야기를 준비하고 있습니다.</h3>
                <p>
                  회사명, 재직 기간, 담당 역할은 확인된 정보로만 등록합니다.
                  <br />
                  현재 공개된 경력 정보가 없습니다.
                </p>
              </div>
              <span className="status-label">TO BE ADDED</span>
            </div>
          )}
        </section>
        <section className="about-detail-section">
          <SectionLabel number="03">SKILLS & TOOLS</SectionLabel>
          <h2 className="subpage-heading">The creative toolkit.</h2>
          {site.tools.length ? (
            <ul className="tools-list">
              {site.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-copy">
              실제 사용하는 도구와 상세 역량을 등록할 공간입니다. 확인되지 않은
              숙련도는 표시하지 않습니다.
            </p>
          )}
        </section>
        <section className="about-detail-section design-values">
          <SectionLabel number="04">DESIGN PERSPECTIVE</SectionLabel>
          <h2>
            Clarity. Character.
            <br />
            <span className="serif-accent">A sense of play.</span>
          </h2>
          <p>
            분명한 정보, 일관된 시각 언어, 그리고 즐거운 경험.
            <br />이 포트폴리오가 지향하는 디자인의 방향입니다.
          </p>
        </section>
      </div>
      <ContactBand />
    </>
  );
}
