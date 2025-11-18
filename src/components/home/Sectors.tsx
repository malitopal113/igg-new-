"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface SlideItem {
  title: string;
  description: string;
  image: string;
  href: string;
}

const slides: SlideItem[] = [
  {
    title: "Textile",
    description:
      "IGG provides end-to-end textile solutions from design and sourcing to production and global delivery. With a strong supplier network and a focus on quality assurance, we ensure competitive advantage and reliability for our partners in the fashion and home textile industries.",
    image: "/assets/sectors/textile.png",
    href: "/sectors/textile",
  },
  {
    title: "Sports Management",
    description:
      "IGG operates in the sports industry with a global perspective, offering athlete representation, event organization, and sponsorship management. By combining international experience with innovative strategies, we support athletes, clubs, and brands to achieve sustainable success.",
    image: "/assets/sectors/sport.png",
    href: "/sectors/sports-management",
  },
  {
    title: "Trading",
    description:
      "IGG engages in international trading operations across multiple sectors, delivering raw materials, consumer goods, and industrial products. Our agile approach, global connections, and trust-based business model ensure efficiency and long-term partnerships worldwide.",
    image: "/assets/sectors/trading.png",
    href: "/sectors/trading",
  },
  {
    title: "EPCM",
    description:
      "IGG provides comprehensive EPCM (Engineering, Procurement, Construction Management) services for large-scale industrial projects. From feasibility to commissioning, we manage every stage with technical expertise, cost efficiency, and international standards in mind.",
    image: "/assets/sectors/epcm.png",
    href: "/sectors/epcm",
  },
];

export default function Sector() {
  const [current, setCurrent] = useState(0);

  // Window width takibi
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sliding indicator (desktop)
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  const computePos = (idx: number) => {
    const el = itemRefs.current[idx];
    if (!listRef.current || !el) return { top: 0, height: 0 };
    return { top: el.offsetTop, height: el.offsetHeight };
  };

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      setIndicator(computePos(current));
    });
    return () => cancelAnimationFrame(id);
  }, [current]);

  useEffect(() => {
    const onResize = () => setIndicator(computePos(current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [current]);

  const goTo = (idx: number) => setCurrent(idx);

  // Oklar ile ileri - geri slide
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section id="sectors" className="relative w-screen min-h-screen h-[100dvh] font-roboto text-white overflow-hidden">
      {/* Background slides */}
      <div className="relative w-screen h-full min-h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              width: "100vw",
              height: "100vh"
            }}
          />
        ))}

        {/* blue overlay */}
        <div className="absolute inset-0 bg-[#0a2340]/60 z-10 w-screen h-screen" />

        {/* Sol title list (responsive) */}
        {windowWidth > 976 ? (
          <div className="absolute z-20 left-12 md:left-28 top-16 md:top-30 text-white max-w-md">
            <div className="text-3xl md:text-5xl font-semibold opacity-90 mb-10">Our Activity Fields</div>
            <div className="relative pl-8 md:pl-10 border-l-[3px] border-white" ref={listRef}>
              <span
                className="absolute -left-[3px] top-0 w-[7px] bg-white transition-all duration-300 ease-out"
                style={{ top: indicator.top, height: indicator.height }}
                aria-hidden
              />
              <div className="space-y-3 md:space-y-3.5">
                {slides.map((s, i) => {
                  const active = i === current;
                  return (
                    <button
                      key={s.title}
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      onClick={() => goTo(i)}
                      className={`text-left block w-full transition cursor-pointer ${
                        active
                          ? "text-white font-semibold text-2xl md:text-5xl whitespace-nowrap"
                          : "text-white/80 font-semibold text-xl md:text-4xl hover:text-white whitespace-nowrap"
                      }`}
                    >
                      {s.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // 976px altı için başlık ortada büyük ve aşağıda
          <div className="absolute inset-x-0 mt-10 z-20 flex justify-center">
            <span className="text-white text-4xl sm:text-5xl font-semibold">
              Our Activity Fields
            </span>
          </div>
        )}

        {/* Sağ içerik (responsive ve full genişlik) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className={`
              absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen 
              flex flex-col items-center
              px-6
              ${windowWidth <= 976 ? 'text-center pt-24 max-w-[88vw]' : 'md:right-16 md:left-auto max-w-3xl text-right items-end'}
              will-change-transform will-change-opacity
            `}
            style={windowWidth <= 976 ? {paddingLeft: "7vw", paddingRight: "7vw"} : {}}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 drop-shadow text-white">
              {slides[current].title}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 opacity-95 max-w-2xl mx-auto md:mx-0 text-white">
              {slides[current].description}
            </p>
            <Link
              href={slides[current].href}
              className="inline-block bg-[#0C1C8C] hover:bg-white hover:text-[#0C1C8C] text-white px-10 py-4 font-bold text-lg sm:text-xl transition-colors duration-500 text-center"
            >
              Discover
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* 976px altı için sağ-sol SVG oklar */}
        {windowWidth <= 976 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30"
              style={{border: "none", background: "none", padding: 0}}
            >
              {/* Büyük beyaz SVG sol ok */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path d="M40 48L20 28L40 8" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30"
              style={{border: "none", background: "none", padding: 0}}
            >
              {/* Büyük beyaz SVG sağ ok */}
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path d="M16 8L36 28L16 48" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
