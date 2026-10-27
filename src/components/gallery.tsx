"use client";

import Image from "@/components/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";
import type { Artwork } from "@/content/playground";

export function Gallery({ artworks }: { artworks: Artwork[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = artworks.find(
    (artwork) => artwork.id === params.get("view"),
  );
  const index = selected ? artworks.indexOf(selected) : -1;
  const isOpen = Boolean(selected);
  const open = (id: string) =>
    router.replace(`/playground?view=${encodeURIComponent(id)}`, {
      scroll: false,
    });
  const close = () => router.replace("/playground", { scroll: false });
  const change = (direction: number) =>
    open(artworks[(index + direction + artworks.length) % artworks.length].id);

  useEffect(() => {
    if (isOpen) {
      if (!dialog.current?.open) dialog.current?.showModal();
    } else dialog.current?.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <>
      <div className="gallery-grid">
        {artworks.map((artwork, i) => (
          <button
            key={artwork.id}
            type="button"
            className="gallery-card"
            onClick={() => open(artwork.id)}
          >
            <div className="gallery-image">
              <Image
                src={artwork.image}
                alt={artwork.alt}
                fill
                sizes="(max-width: 767px) 100vw, 33vw"
              />
              <span className="gallery-expand" aria-hidden="true">
                <Expand size={20} />
              </span>
              <span className="gallery-index mono" aria-hidden="true">
                0{i + 1}
              </span>
            </div>
            <div className="gallery-meta">
              <h2>
                {artwork.title}
                <span className="sr-only"> 크게 보기</span>
              </h2>
              <p>{artwork.medium}</p>
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-labelledby="artwork-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            change(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            change(1);
          }
        }}
      >
        <div className="lightbox-inner">
          {selected && (
            <>
              <div className="lightbox-top">
                <span className="mono">
                  PLAYGROUND / {String(index + 1).padStart(2, "0")} OF{" "}
                  {String(artworks.length).padStart(2, "0")}
                </span>
                <button
                  className="icon-button"
                  onClick={close}
                  aria-label="상세 보기 닫기"
                  autoFocus
                >
                  <X size={23} />
                </button>
              </div>
              <div className="lightbox-image">
                <Image
                  src={selected.image}
                  alt={selected.alt}
                  fill
                  sizes="(max-width: 767px) 95vw, 75vw"
                />
              </div>
              <div className="lightbox-caption">
                <div aria-live="polite">
                  <h2 id="artwork-title">{selected.title}</h2>
                  <p>{selected.description}</p>
                </div>
                <div className="lightbox-controls">
                  <button
                    className="icon-button"
                    onClick={() => change(-1)}
                    aria-label="이전 이미지"
                  >
                    <ArrowLeft size={21} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => change(1)}
                    aria-label="다음 이미지"
                  >
                    <ArrowRight size={21} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
