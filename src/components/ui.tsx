import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Spark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7"
        stroke="currentColor"
        strokeWidth="3.7"
      />
    </svg>
  );
}

export function Arrow({
  diagonal = false,
  down = false,
  className = "",
}: {
  diagonal?: boolean;
  down?: boolean;
  className?: string;
}) {
  const Icon = diagonal ? ArrowUpRight : down ? ArrowDown : ArrowRight;
  return (
    <Icon
      className={className}
      size={19}
      strokeWidth={1.6}
      aria-hidden="true"
    />
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
      <Arrow diagonal />
    </Link>
  );
}

export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

export function PlaceholderNote({
  children = "콘텐츠 준비 중으로 표시된 그래픽은 실제 프로젝트가 아닌 플레이스홀더입니다.",
}: {
  children?: ReactNode;
}) {
  return (
    <p className="placeholder-note">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

export function PageIntro({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">{label}</p>
      <h1>
        {title}
        <span className="accent">.</span>
      </h1>
      <div className="page-intro-bottom">
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}
