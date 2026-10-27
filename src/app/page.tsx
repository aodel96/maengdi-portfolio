import Image from "@/components/image";
import Link from "next/link";
import {
  Arrow,
  PlaceholderNote,
  SectionLabel,
  TextLink,
  Spark,
} from "@/components/ui";
import { ProjectCard } from "@/components/project-card";
import { ContactBand } from "@/components/footer";
import { projects } from "@/content/projects";
import { artworks } from "@/content/playground";
import { disciplines, site } from "@/content/site";

export default function Home() {
  const selected = projects.filter((project) => project.featured);
  return (
    <>
      <section className="hero container" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-star" aria-hidden="true">
              <Spark />
            </span>{" "}
            A THOUGHTFUL MIND. A PLAYFUL EYE.
          </p>
          <h1 id="hero-heading">
            Hello, I’m
            <br />
            <span>
              MAENGDI<span className="accent">.</span>
            </span>
          </h1>
          <p className="hero-role">
            Game UI/UX &<br className="mobile-only" /> Visual Designer.
          </p>
          <p className="hero-description">{site.introduction}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/work">
              View My Work
              <Arrow diagonal />
            </Link>
            <Link className="button button-plain" href="/about">
              About Me
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-art-top">
            <span className="mono">DESIGN WITH A DIFFERENT ANGLE</span>
            <span aria-hidden="true">↗</span>
          </div>
          <Image
            src="/images/hero-sculpture.svg"
            alt="서로 다른 방향으로 뻗는 오렌지색 입체 별 모양의 MAENGDI 브랜드 그래픽"
            width={620}
            height={560}
            priority
            className="hero-sculpture"
          />
          <div className="hero-art-caption">
            <span className="hero-art-cross" aria-hidden="true">
              +
            </span>
            <p>
              A little structure.
              <br />A little unexpected.
            </p>
            <span className="mono">FIG. 01</span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>Clarity in design. Character in every detail.</span>
          <a href="#selected-work">
            SCROLL TO EXPLORE
            <Arrow down />
          </a>
        </div>
      </section>

      <section
        id="selected-work"
        className="work-section container"
        aria-labelledby="work-heading"
      >
        <SectionLabel number="01">SELECTED WORK</SectionLabel>
        <div className="section-heading">
          <h2 id="work-heading">
            Designed for
            <br />
            <span className="muted-heading">the way we play.</span>
          </h2>
          <div className="section-heading-aside">
            <p>
              경험의 흐름부터 시각적인 디테일까지.
              <br />
              게임 UI/UX와 비주얼 디자인 작업을 소개합니다.
            </p>
            <TextLink href="/work">
              Explore all work{" "}
              <span className="link-count">
                ({String(projects.length).padStart(2, "0")})
              </span>
            </TextLink>
          </div>
        </div>
        {selected.some((project) => project.isPlaceholder) && (
          <PlaceholderNote />
        )}
        <div className="selected-grid">
          {selected.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              wide={index === 2}
            />
          ))}
        </div>
      </section>

      <section className="about-preview" aria-labelledby="about-heading">
        <div className="container about-preview-grid">
          <div>
            <SectionLabel number="02">
              THE PERSON BEHIND THE PIXELS
            </SectionLabel>
            <h2 id="about-heading">
              A designer.
              <br />A curious mind.
              <br />
              <span className="serif-accent">Always a player.</span>
            </h2>
            <p className="about-preview-description">
              디자인의 중심에는 언제나 사람이 있습니다.
              <br />
              게임 UI/UX와 비주얼 디자인, 그 사이의 다양한
              <br className="desktop-only" /> 가능성을 MAENGDI만의 시선으로
              탐색합니다.
            </p>
            <TextLink href="/about">A little more about me</TextLink>
          </div>
          <div className="discipline-list">
            {disciplines.map((item) => (
              <article key={item.number} className="discipline">
                <span className="mono">/{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="discipline-tags">{item.tags}</span>
                </div>
                <Arrow diagonal />
              </article>
            ))}
            <div className="career-note">
              <span className="small-star" aria-hidden="true">
                <Spark />
              </span>
              <p>경력과 상세 역량은 About에서 소개할 예정입니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="play-preview container"
        aria-labelledby="play-heading"
      >
        <SectionLabel number="03">OFF THE GRID</SectionLabel>
        <div className="section-heading">
          <div className="play-heading">
            <h2 id="play-heading">
              Room to <span className="serif-accent">play.</span>
            </h2>
            <p>
              목적 없이 시작해, 뜻밖의 발견으로.
              <br />
              그림, 작은 실험, 그리고 좋아하는 것들.
            </p>
          </div>
          <TextLink href="/playground">Visit the playground</TextLink>
        </div>
        <div className="play-preview-grid">
          {artworks.map((artwork, index) => (
            <Link
              key={artwork.id}
              href={`/playground?view=${artwork.id}`}
              className="play-preview-card"
            >
              <div className={`play-preview-image play-preview-image-${index}`}>
                <Image
                  src={artwork.image}
                  alt={artwork.alt}
                  fill
                  sizes="(max-width: 767px) 85vw, 33vw"
                />
                <span className="play-arrow">
                  <Arrow diagonal />
                </span>
              </div>
              <div>
                <h3>{artwork.title}</h3>
                <span>{artwork.medium}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
