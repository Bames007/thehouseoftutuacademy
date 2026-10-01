// components/Sections/Curriculum.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  CheckCircle,
  BookOpen,
  Target,
  BarChart,
  Package,
  Globe,
  Award,
  Users,
  Clock,
  Mail,
  Briefcase,
  FlaskRound,
  GraduationCap,
  Lock,
  Layers,
} from "lucide-react";

type Track = "art" | "commercial";

const Curriculum = () => {
  const [activeTrack, setActiveTrack] = useState<Track>("art");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // ─── Art of Perfumery Programs ──────────────────────────
  const artPrograms = [
    {
      label: "6 Weeks",
      badge: "Popular",
      price: "₦600,000",
      original: "₦750,000",
      discount: "20% OFF",
      desc: "Beginner Perfumery Program",
      highlight: true,
      status: "available" as const,
    },
    {
      label: "12 Weeks",
      badge: "Pro",
      price: "₦800,000",
      original: null,
      discount: null,
      desc: "Intermediate & Advanced",
      highlight: false,
      status: "available" as const,
    },
    {
      label: "Mastery",
      badge: "Invitation",
      price: "Coming Soon",
      original: null,
      discount: null,
      desc: "Master Perfumer Track",
      highlight: false,
      status: "coming_soon" as const,
    },
  ];

  // ─── Commercial Perfumery Program ───────────────────────
  const commercialPrograms = [
    {
      label: "2 Weeks",
      badge: "Business Track",
      price: "₦350,000",
      original: null,
      discount: null,
      desc: "Commercial Perfumery Masterclass",
      highlight: true,
      status: "available" as const,
    },
  ];

  // ─── Modules per Track ──────────────────────────────────
  const artModules = [
    {
      title: "Foundations of Perfumery",
      description:
        "What perfumery is, how the nose works, and the fragrance pyramid",
      icon: BookOpen,
    },
    {
      title: "Fragrance Families & History",
      description: "The 8 families and Africa's role in the story of scent",
      icon: Target,
    },
    {
      title: "Raw Materials & Extraction",
      description: "Natural vs synthetic, plus the 5 extraction methods",
      icon: Package,
    },
    {
      title: "The Art of Blending",
      description: "Accords, the Rule of Three, and building your first blend",
      icon: FlaskRound,
    },
    {
      title: "Formulation & Safety",
      description: "Percentages, concentrations, IFRA, and patch testing",
      icon: BarChart,
    },
    {
      title: "Launch & Certification",
      description: "Maceration, basic pricing, and a Mini Showcase",
      icon: Award,
    },
  ];

  const commercialModules = [
    {
      title: "Business Models",
      description:
        "The 4 paths available to a perfumer — from home studio to export",
      icon: Briefcase,
    },
    {
      title: "Brand Identity",
      description: "Naming, storytelling, and visual packaging that sells",
      icon: Package,
    },
    {
      title: "Pricing Strategy",
      description: "Cost × Markup — pricing your product for real profit",
      icon: BarChart,
    },
    {
      title: "Digital Marketing",
      description: "Content, ads, and selling fragrance online",
      icon: Globe,
    },
    {
      title: "Retail & Wholesale",
      description: "Selling to stores, hotels, and corporate clients",
      icon: Users,
    },
    {
      title: "First Commercial Batch",
      description: "Production, packaging, and your public launch",
      icon: Award,
    },
  ];

  const modules = activeTrack === "art" ? artModules : commercialModules;
  const programs = activeTrack === "art" ? artPrograms : commercialPrograms;

  return (
    <section
      id="curriculum"
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
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-[#691C33] rounded-full" />
            <span
              className={`text-[#691C33] font-semibold tracking-wider text-xs md:text-sm ${gothamOffice.className}`}
            >
              CURRICULUM OVERVIEW
            </span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-black text-[#691C33] mb-4 leading-tight ${italiana.className}`}
          >
            What You Will Learn
          </h2>

          <p
            className={`text-[#691C33] text-base md:text-lg max-w-2xl mx-auto ${gothamOffice.className} leading-relaxed`}
          >
            A comprehensive curriculum across two tracks — the{" "}
            <strong className="font-bold">Art of Perfumery</strong> for
            mastering the craft and{" "}
            <strong className="font-bold">Commercial Perfumery</strong> for
            building a business.
          </p>
        </motion.div>

        {/* Track Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:gap-4 mb-10 md:mb-14 max-w-2xl mx-auto"
        >
          <button
            onClick={() => setActiveTrack("art")}
            className={`rounded-2xl p-4 md:p-5 border-2 transition-all flex flex-col md:flex-row items-center gap-2 md:gap-3 ${
              activeTrack === "art"
                ? "bg-[#691C33] text-white border-[#691C33] shadow-lg"
                : "bg-white text-[#691C33] border-[#691C33]/20 hover:border-[#691C33]/60"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                activeTrack === "art" ? "bg-white/15" : "bg-[#691C33]/10"
              }`}
            >
              <FlaskRound
                className={`w-5 h-5 ${
                  activeTrack === "art" ? "text-white" : "text-[#691C33]"
                }`}
              />
            </div>
            <div className="text-center md:text-left">
              <div
                className={`text-[10px] uppercase tracking-wider font-bold ${
                  activeTrack === "art" ? "text-white/70" : "text-[#691C33]/60"
                }`}
              >
                The Craft
              </div>
              <div className="text-sm md:text-base font-bold">
                Art of Perfumery
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTrack("commercial")}
            className={`rounded-2xl p-4 md:p-5 border-2 transition-all flex flex-col md:flex-row items-center gap-2 md:gap-3 ${
              activeTrack === "commercial"
                ? "bg-[#691C33] text-white border-[#691C33] shadow-lg"
                : "bg-white text-[#691C33] border-[#691C33]/20 hover:border-[#691C33]/60"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                activeTrack === "commercial" ? "bg-white/15" : "bg-[#691C33]/10"
              }`}
            >
              <Briefcase
                className={`w-5 h-5 ${
                  activeTrack === "commercial" ? "text-white" : "text-[#691C33]"
                }`}
              />
            </div>
            <div className="text-center md:text-left">
              <div
                className={`text-[10px] uppercase tracking-wider font-bold ${
                  activeTrack === "commercial"
                    ? "text-white/70"
                    : "text-[#691C33]/60"
                }`}
              >
                The Business
              </div>
              <div className="text-sm md:text-base font-bold">
                Commercial Perfumery
              </div>
            </div>
          </button>
        </motion.div>

        {/* Program Options */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-12 md:mb-16"
          >
            <div className="text-center mb-6">
              <h3
                className={`text-lg md:text-2xl font-bold text-[#691C33] mb-1 ${gothamOffice.className}`}
              >
                {activeTrack === "art"
                  ? "Choose Your Level"
                  : "The 2-Week Masterclass"}
              </h3>
              <p className="text-[#691C33] text-sm md:text-base">
                Registration is <span className="font-bold">FREE</span> — pay
                only your course fee
              </p>
            </div>

            <div
              className={`grid gap-4 mx-auto ${
                activeTrack === "art"
                  ? "grid-cols-1 sm:grid-cols-3 max-w-4xl"
                  : "grid-cols-1 max-w-md"
              }`}
            >
              {programs.map((program) => {
                const isComingSoon = program.status === "coming_soon";
                return (
                  <div
                    key={program.label}
                    className={`rounded-2xl p-5 text-center border-2 transition-all ${
                      program.highlight
                        ? "bg-[#691C33] text-white border-[#691C33] shadow-xl"
                        : "bg-white border-[#691C33]/20"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-3 ${
                        program.highlight
                          ? "bg-white text-[#691C33]"
                          : "bg-[#691C33]/10 text-[#691C33]"
                      }`}
                    >
                      {isComingSoon && <Lock className="w-3 h-3" />}
                      {program.badge}
                    </div>

                    <div
                      className={`font-bold text-lg md:text-xl mb-2 ${
                        program.highlight ? "text-white" : "text-[#691C33]"
                      }`}
                    >
                      {program.label}
                    </div>

                    <div
                      className={`text-xl md:text-2xl font-bold mb-1 ${
                        program.highlight ? "text-white" : "text-[#691C33]"
                      }`}
                    >
                      {program.price}
                    </div>

                    {program.original && (
                      <div
                        className={`text-xs md:text-sm line-through mb-1 ${
                          program.highlight
                            ? "text-white/60"
                            : "text-[#691C33]/50"
                        }`}
                      >
                        {program.original}
                      </div>
                    )}

                    {program.discount && (
                      <div
                        className={`text-[10px] font-bold mb-2 ${
                          program.highlight ? "text-white" : "text-[#691C33]"
                        }`}
                      >
                        {program.discount}
                      </div>
                    )}

                    <div
                      className={`text-xs md:text-sm mt-2 leading-snug ${
                        program.highlight
                          ? "text-white/85"
                          : "text-[#691C33]/80"
                      }`}
                    >
                      {program.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Modules Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <div className="text-center mb-6 md:mb-8">
            <h3
              className={`text-lg md:text-2xl font-bold text-[#691C33] mb-1 ${gothamOffice.className}`}
            >
              {activeTrack === "art"
                ? "Core Modules — Art of Perfumery"
                : "Core Modules — Commercial Perfumery"}
            </h3>
            <p className="text-[#691C33] text-sm md:text-base">
              {activeTrack === "art"
                ? "Everything you'll cover across 6 and 12 weeks"
                : "Everything you'll cover in 2 weeks"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const isHovered = hoveredCard === index;
              return (
                <div
                  key={module.title}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className={`relative rounded-2xl p-5 md:p-6 border-2 h-full transition-all ${
                      isHovered
                        ? "bg-[#691C33] border-[#691C33] shadow-lg"
                        : "bg-white border-[#691C33]/12 hover:border-[#691C33]/40"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                        isHovered ? "bg-white/15" : "bg-[#691C33]"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 md:w-7 md:h-7 ${
                          isHovered ? "text-white" : "text-white"
                        }`}
                      />
                    </div>

                    <h3
                      className={`text-base md:text-lg font-bold mb-2 leading-snug ${
                        isHovered ? "text-white" : "text-[#691C33]"
                      } ${gothamOffice.className}`}
                    >
                      {module.title}
                    </h3>

                    <p
                      className={`text-sm md:text-base leading-relaxed mb-4 ${
                        isHovered ? "text-white/90" : "text-[#691C33]"
                      }`}
                    >
                      {module.description}
                    </p>

                    <div
                      className={`flex items-center gap-2 ${
                        isHovered ? "text-white" : "text-[#691C33]"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="font-medium text-xs md:text-sm">
                        Included
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Included Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <div className="bg-[#691C33] rounded-2xl md:rounded-3xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3
                className={`text-lg md:text-2xl lg:text-3xl font-bold text-white ${italiana.className}`}
              >
                What's Included
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { text: "Student Handbook", icon: BookOpen },
                { text: "Class Calendar", icon: Clock },
                { text: "Certificate", icon: Award },
                { text: "Instructor Support", icon: Users },
                { text: "WhatsApp Group", icon: Mail },
                { text: "Supplier Contacts", icon: Globe },
                { text: "Branding Templates", icon: Package },
                { text: "Capstone Project", icon: Layers },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-xl p-3 md:p-4 hover:bg-white/15 transition-colors"
                  >
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <span className="text-white text-xs md:text-sm font-medium leading-snug">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Info row */}
            <div className="mt-8 pt-6 md:pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm md:text-base">
                    Flexible Duration
                  </div>
                  <div className="text-white/75 text-xs md:text-sm">
                    6, 12 weeks, or 2 weeks
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm md:text-base">
                    In-Person Format
                  </div>
                  <div className="text-white/75 text-xs md:text-sm">
                    Hands-on training in Abuja
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm md:text-base">
                    Lifetime Access
                  </div>
                  <div className="text-white/75 text-xs md:text-sm">
                    Community & resources
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => (window.location.href = "/enrollment")}
            className="bg-[#691C33] text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base inline-flex items-center justify-center gap-2 hover:bg-[#691C33]/90 transition-colors shadow-md"
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            <span>ENROLL NOW</span>
          </button>
          <p className="text-[#691C33] text-xs md:text-sm mt-3">
            Limited spots available for the next cohort
          </p>
        </motion.div>

        {/* Mobile quick stats */}
        <div className="mt-8 md:hidden bg-[#691C33] text-white rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-lg font-bold mb-0.5">
                {activeTrack === "art" ? "3" : "1"}
              </div>
              <div className="text-white/85 text-[10px] leading-tight">
                {activeTrack === "art" ? "Levels" : "Program"}
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border-x border-white/15">
              <div className="text-lg font-bold mb-0.5">100%</div>
              <div className="text-white/85 text-[10px] leading-tight">
                Practical
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-lg font-bold mb-0.5">FREE</div>
              <div className="text-white/85 text-[10px] leading-tight">
                Registration
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
