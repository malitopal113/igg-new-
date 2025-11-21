"use client";
import type { ReactNode } from "react";

import React, { useEffect, useRef, useState } from "react";

interface HomePageItemProps {
  image: string;
  titleLeft: string;
  titleRight: string;
  desc?: ReactNode;
  scale?: number; // initial scale (0..1)
  titleTranslateX?: number; // percent (şu an sadece ince ayar için)
  pinDurationMultiplier?: number;

  imageTargetScale?: number;  // final zoom
  imageGrowthStart?: number;  // 0..1
  imageGrowthEnd?: number;    // 0..1
  imageGrowthCurve?: number;  // eğri
  imageOffsetY?: number;      // px
  leftFinalOffset?: string;   // varsayılan "51%"
  rightFinalOffset?: string;  // varsayılan "51%"
  descBottomOffset?: string;
}

const clamp = (v: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3); // easing

export default function HomePageItem({
  image,
  titleLeft,
  titleRight,
  desc = "",
  scale = 0.5,
  titleTranslateX = 44,
  pinDurationMultiplier = 1.6,
  imageTargetScale,
  imageGrowthStart,
  imageGrowthEnd,
  imageGrowthCurve,
  imageOffsetY,
  leftFinalOffset = "51%",
  rightFinalOffset = "51%",
  descBottomOffset = "-10rem",
}: HomePageItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0); // 0 → 1

  /** Scroll hesaplama */
  const tick = () => {
    const container = containerRef.current;
    if (!container) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const rect = container.getBoundingClientRect();
    const winH = window.innerHeight;
    const sectionHeight = Math.max(container.offsetHeight, 1);

    const scrollY = window.scrollY;
    const sectionTop = scrollY + rect.top;
    const stickyOffsetTop = 110;

    // bileşen görünmeye başlamadan önce animasyon başlasın
    const appearStart = sectionTop - winH;
    const pinStart = sectionTop - stickyOffsetTop;
    const pinEnd = pinStart + winH * pinDurationMultiplier;

    const totalRangeStart = appearStart;
    const totalRangeEnd = pinEnd;
    const totalRange = Math.max(totalRangeEnd - totalRangeStart, 1);

    const scrolled = scrollY - totalRangeStart;
    const rawProgress = clamp(scrolled / totalRange);

    setProgress((prev) =>
      Math.abs(prev - rawProgress) > 0.001 ? rawProgress : prev
    );

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pinDurationMultiplier]);

  const eased = easeOutCubic(progress);

  /** IMAGE ZOOM */
  const targetScale = imageTargetScale ?? 1.12;
  const growthStart = imageGrowthStart ?? 0.0;
  const growthEnd = imageGrowthEnd ?? 0.9;
  const growthCurve = imageGrowthCurve ?? 1.25;

  let imgT = clamp(
    (eased - growthStart) / Math.max(growthEnd - growthStart, 0.0001)
  );
  if (growthCurve !== 1) {
    imgT = Math.pow(imgT, growthCurve);
  }

  const imageScale = scale + imgT * (targetScale - scale);
  const offsetY = imageOffsetY ?? -20;

  const imageStyle: React.CSSProperties = {
    transform: `scale(${imageScale}) translateY(${offsetY}px)`,
    willChange: "transform",
    transition: "transform 0s",
  };

  /** BAŞLIKLAR (TRANSFER / SERVICES) */
  const startOffset = 170; // kenarlardan başlasın
  const leftX = -startOffset * (1 - eased);
  const rightX = startOffset * (1 - eased);

  const titleFontSize = "clamp(32px, 7vw, 80px)";

  const leftStyle: React.CSSProperties = {
    transform: `translateX(${leftX}%)`,
    fontSize: titleFontSize,
    whiteSpace: "nowrap",
    letterSpacing: "-0.02em",
  };

  const rightStyle: React.CSSProperties = {
    transform: `translateX(${rightX}%)`,
    fontSize: titleFontSize,
    whiteSpace: "nowrap",
    letterSpacing: "-0.02em",
  };

  /** DESCRIPTION (resmin altında, sticky içinde, alttan kayarak) */
  const descThreshold = 0.55;
  const descProgress = clamp((eased - descThreshold) / (1 - descThreshold));
  const descAnimated = easeOutCubic(descProgress);

  // Başlangıçta daha aşağıda, sonra yukarı kayıyor.
  const descBaseOffset = 80; // px – istersen 60/100 ile oynayabilirsin
  const descStyle: React.CSSProperties = {
    transform: `translateY(${(1 - descAnimated) * descBaseOffset}px)`,
    transition: "transform 0s",
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#000] text-white"
      style={{ height: "320vh" }}
    >
      {/* STICKY ANİMASYON ALANI */}
      <div
        ref={stickyRef}
        className="sticky top-[110px] h-[calc(100vh-110px)] flex items-center justify-center overflow-visible"
      >
        <div className="relative w-full max-w-[1400px] px-6">
          {/* IMAGE */}
          <div className="w-full flex justify-center pointer-events-none">
            <div
              className="relative overflow-visible"
              style={{
                width: "900px",
                maxWidth: "82vw",
                maxHeight: "52vh",
              }}
            >
              <img
                src={image}
                alt={`${titleLeft} ${titleRight}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transformOrigin: "center center",
                  ...imageStyle,
                }}
              />
              {/* GRADIENT OVERLAY */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: "scale(1.6)",
                  transformOrigin: "center",
                  background: `
                    radial-gradient(
                      ellipse at center,
                      rgba(0,0,0,0.0) 40%,
                      rgba(0,0,0,0.28) 60%,
                      rgba(0,0,0,0.55) 78%,
                      rgba(0,0,0,0.75) 100%
                    )
                  `,
                }}
              />
            </div>
          </div>

          {/* LEFT TITLE */}
          <div
            className="absolute top-1/2 -translate-y-[95%] pointer-events-none"
            style={{
              right: leftFinalOffset,
              top: `calc(60% + ${offsetY}px)`,
              fontFamily: "var(--font-Work_Sans)",
              fontWeight: 700,
              letterSpacing: "0.09em",
            }}
          >
            <div
              className="text-white font-normal leading-none text-right"
              style={{
                ...leftStyle,
                textShadow: `
                  0 0 6px rgba(0,0,0,0.8),
                  0 0 12px rgba(0,0,0,0.7),
                  0 0 18px rgba(0,0,0,0.6)
                `,
              }}
            >
              {titleLeft}
            </div>
          </div>

          {/* RIGHT TITLE */}
          <div
            className="absolute top-1/2 -translate-y-[95%] pointer-events-none"
            style={{
              left: rightFinalOffset,
              top: `calc(60% + ${offsetY}px)`,
              fontFamily: "var(--font-Work_Sans)",
              fontWeight: 700,
              letterSpacing: "0.09em",
            }}
          >
            <div
              className="text-white font-normal leading-none text-left"
              style={{
                ...rightStyle,
                textShadow: `
                  0 0 6px rgba(0,0,0,0.8),
                  0 0 12px rgba(0,0,0,0.7),
                  0 0 18px rgba(0,0,0,0.6)
                `,
              }}
            >
              {titleRight}
            </div>
          </div>

          {/* ✅ DESCRIPTION – resmin ALTINDA, sticky sahnenin içinde, alttan scroll ile kayarak geliyor */}
          <div
            className="pointer-events-none absolute left-1/2 transform -translate-x-1/2"
            style={{
              bottom: descBottomOffset, // final konum: resmin altında, her bileşende sabit
              width: "min(1000px, 85vw)",
              paddingBottom: "3rem",
              ...descStyle,
            }}
          >
            <div className="pointer-events-auto text-center px-6">
              {desc}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
