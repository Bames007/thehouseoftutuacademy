// components/Sections/PerfumeFunFacts.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Flower,
  Brain,
  History,
  Beaker,
  Globe,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
} from "lucide-react";

const PerfumeFunFacts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const funFacts = [
    {
      id: 1,
      title: "The Rose's Secret",
      short: "10,000 roses per ounce",
      fact: "It takes approximately 10,000 hand-picked roses (about 60 lbs) to produce just one ounce of pure rose otto essential oil — making it one of the most precious materials in all of perfumery.",
      icon: Flower,
    },
    {
      id: 2,
      title: "Scent & Memory",
      short: "The brain's shortcut",
      fact: "The sense of smell is directly wired to the brain's limbic system — the area responsible for emotion and memory. This is why a fragrance can instantly trigger a vivid memory, more powerfully than any other sense.",
      icon: Brain,
    },
    {
      id: 3,
      title: "Ancient Perfumers",
      short: "The first chemist",
      fact: "The world's first recorded chemist was a woman named Tapputi, a Babylonian perfume-maker mentioned on a cuneiform tablet from 1200 BC. She used flowers, oils, and distillation techniques.",
      icon: History,
    },
    {
      id: 4,
      title: "The 3,000 Note Brain",
      short: "A trained nose",
      fact: "A professional 'nose' (perfumer) can distinguish and memorize over 3,000 different scent notes. Creating a single fragrance often involves blending 50 to 300 different ingredients.",
      icon: Beaker,
    },
    {
      id: 5,
      title: "A Global Language",
      short: "Through smoke",
      fact: "The word 'perfume' comes from the Latin 'per fumum,' meaning 'through smoke' — referring to the original use of burning incense. Every major civilization independently developed its own rich perfume traditions.",
      icon: Globe,
    },
  ];

  const current = funFacts[activeIndex];

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % funFacts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, funFacts.length]);

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % funFacts.length);
  const goToPrev = () =>
    setActiveIndex((prev) => (prev - 1 + funFacts.length) % funFacts.length);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) goToNext();
      else goToPrev();
    }
    touchStartX.current = null;
  };

  const CurrentIcon = current.icon;

  return (
    <section
      id="fun-facts"
      className="relative overflow-hidden py-14 md:py-24"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Section pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/pattern.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.04,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-[#691C33]" />
            <span
              className={`text-xs md:text-sm font-semibold text-[#691C33] tracking-wider ${gothamOffice.className}`}
            >
              DID YOU KNOW?
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 leading-tight ${italiana.className}`}
          >
            The Secret World of Scent
          </h2>

          <p
            className={`text-base md:text-lg text-[#691C33] max-w-2xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Fascinating, little-known facts about perfumes that will change how
            you think about fragrance forever.
          </p>
        </motion.div>

        {/* Featured Fact Card */}
        <div
          className="max-w-5xl mx-auto mb-8 md:mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="bg-white rounded-3xl border-2 border-[#691C33]/10 shadow-xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-5">
                {/* Left: Icon block */}
                <div className="lg:col-span-2 bg-[#691C33] p-6 md:p-8 flex flex-col justify-between min-h-[240px] lg:min-h-[360px]">
                  <div>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                      <CurrentIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>

                    <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                      Fun Fact #{current.id}
                    </div>

                    <h3
                      className={`text-2xl md:text-3xl font-bold text-white leading-tight ${italiana.className}`}
                    >
                      {current.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/20">
                    <div className="text-white/80 text-xs md:text-sm italic">
                      {current.short}
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-3 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-[#691C33]" />
                    <span
                      className={`text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#691C33] ${gothamOffice.className}`}
                    >
                      Did you know
                    </span>
                  </div>

                  <p className="text-[#691C33] text-base md:text-lg lg:text-xl leading-relaxed">
                    {current.fact}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={goToPrev}
              aria-label="Previous fact"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#691C33]/15 hover:border-[#691C33] flex items-center justify-center transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-[#691C33]" />
            </button>

            {/* Dots */}
            <div className="flex gap-2 justify-center flex-1">
              {funFacts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to fact ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeIndex
                      ? "w-8 bg-[#691C33]"
                      : "w-2 bg-[#691C33]/20 hover:bg-[#691C33]/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              aria-label="Next fact"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#691C33]/15 hover:border-[#691C33] flex items-center justify-center transition-colors flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5 text-[#691C33]" />
            </button>
          </div>
        </div>

        {/* Fact Thumbnails Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {funFacts.map((fact, idx) => {
              const Icon = fact.icon;
              const isActive = idx === activeIndex;
              return (
                <button
                  key={fact.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-2xl p-3.5 md:p-4 border-2 text-left transition-all ${
                    isActive
                      ? "bg-[#691C33] border-[#691C33] shadow-md"
                      : "bg-white border-[#691C33]/15 hover:border-[#691C33]/40"
                  }`}
                >
                  <div
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center mb-3 ${
                      isActive ? "bg-white/15" : "bg-[#691C33]/10"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        isActive ? "text-white" : "text-[#691C33]"
                      }`}
                    />
                  </div>

                  <div
                    className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                      isActive ? "text-white/60" : "text-[#691C33]/60"
                    }`}
                  >
                    Fact #{fact.id}
                  </div>

                  <div
                    className={`text-xs md:text-sm font-bold leading-snug ${
                      isActive ? "text-white" : "text-[#691C33]"
                    }`}
                  >
                    {fact.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Hint */}
          <p className="text-center text-[#691C33]/60 text-xs md:text-sm mt-6">
            Swipe or tap a card to explore more
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PerfumeFunFacts;
