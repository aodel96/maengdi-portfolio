"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/content/site";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" className={`brand ${footer ? "brand-footer" : ""}`}>
      <span className="brand-symbol" aria-hidden="true">
        m<span>↗</span>
      </span>
      <span>
        MAENGDI<span className="brand-period">.</span>
      </span>
      <span className="sr-only"> 홈</span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (media.matches) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const elements = [
          toggleRef.current,
          ...(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []),
        ].filter(Boolean) as HTMLElement[];
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    media.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", onKey);
    menuRef.current?.querySelector("a")?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="주 내비게이션">
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={active ? "active" : ""}
              >
                {item.label}
                {item.label === "Contact" && <span aria-hidden="true">↗</span>}
              </Link>
            );
          })}
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div ref={menuRef} id="mobile-navigation" className="mobile-menu">
          <nav aria-label="모바일 내비게이션">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={
                  (
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)
                  )
                    ? "page"
                    : undefined
                }
              >
                <span className="mono">0{index + 1}</span>
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <p className="eyebrow">GAME UI/UX & VISUAL DESIGN</p>
        </div>
      )}
    </header>
  );
}
