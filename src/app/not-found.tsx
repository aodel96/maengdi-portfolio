import Link from "next/link";
import { Arrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="eyebrow">404 / A LITTLE OFF THE GRID</p>
      <h1>
        Lost in play<span className="accent">?</span>
      </h1>
      <p>찾으시는 페이지가 없거나 주소가 변경되었습니다.</p>
      <Link className="button button-dark" href="/">
        Back to Home
        <Arrow diagonal />
      </Link>
    </section>
  );
}
