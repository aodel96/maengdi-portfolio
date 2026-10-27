import type { Metadata } from "next";
import { PageIntro, Arrow, Spark } from "@/components/ui";
import { EmailContact } from "@/components/contact-methods";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "MAENGDI의 채용·프로젝트·협업 문의를 위한 연락 페이지. 확인된 연락처는 추후 등록됩니다.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        label="LET’S MAKE SOMETHING MEANINGFUL"
        title="Get in touch"
        description="좋은 디자인은 좋은 대화에서 시작된다고 믿습니다. 채용, 프로젝트, 협업에 관한 이야기를 나눌 공간입니다."
      />
      <section className="container contact-page">
        <EmailContact email={site.email} />
        <div className="contact-aside">
          <p className="eyebrow">ELSEWHERE ON THE INTERNET</p>
          <div className="channel-list">
            {site.channels.map((channel) =>
              channel.url ? (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {channel.name}
                  <span className="sr-only"> (새 탭)</span>
                  <Arrow diagonal />
                </a>
              ) : (
                <div key={channel.name}>
                  <span>{channel.name}</span>
                  <span className="channel-pending">링크 등록 예정</span>
                </div>
              ),
            )}
          </div>
          <p className="field-note">외부 채널은 확인된 주소만 연결합니다.</p>
          <div className="contact-topics">
            <span className="small-star" aria-hidden="true">
              <Spark />
            </span>
            <h2>A conversation about…</h2>
            <ul>
              <li>채용 및 커리어 기회</li>
              <li>게임 UI/UX & 비주얼 디자인</li>
              <li>크리에이티브 프로젝트와 협업</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
