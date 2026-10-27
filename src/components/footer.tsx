import Link from "next/link";
import { Brand } from "./header";
import { navigation, site } from "@/content/site";
import { Arrow, SectionLabel, TextLink } from "./ui";

export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container">
        <SectionLabel number="04">LET’S CONNECT</SectionLabel>
        <div className="contact-band-main">
          <h2>
            Good things start
            <br />
            with a <span>conversation.</span>
          </h2>
          <Link
            href="/contact"
            className="round-link"
            aria-label="Contact 페이지에서 연락 방법 확인"
          >
            <Arrow diagonal />
          </Link>
        </div>
        <div className="contact-band-bottom">
          <p>새로운 기회와 흥미로운 이야기를 기다립니다.</p>
          {site.email ? (
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
              <Arrow diagonal />
            </a>
          ) : (
            <TextLink href="/contact">Get in touch</TextLink>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand footer />
            <p>Thoughtful design. Playful perspective.</p>
          </div>
          <nav aria-label="푸터 내비게이션">
            {navigation
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MAENGDI</p>
          <p>Made with intention, and a little play.</p>
          <a href="#top" className="back-top">
            Back to top <Arrow down />
          </a>
        </div>
      </div>
    </footer>
  );
}
