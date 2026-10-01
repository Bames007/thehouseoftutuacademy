// components/Sections/CoursesShowcase.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  Play,
  ChevronRight,
  ChevronDown,
  Lock,
  X,
  Volume2,
  VolumeX,
  Pause,
  Maximize2,
  Minimize2,
  Layers,
  Beaker,
  GraduationCap,
  Briefcase,
  FlaskRound,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const CoursesShowcase = () => {
  const [activeTrack, setActiveTrack] = useState<"art" | "commercial">("art");
  const [activeLevel, setActiveLevel] = useState(0);
  const [openWeek, setOpenWeek] = useState<number | null>(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // ─── ART OF PERFUMERY — 3 programs ─────────────────────
  const artPrograms = [
    {
      level: "6 Weeks",
      title: "Beginner Perfumery Program",
      duration: "6 Weeks · 1 class per week",
      badge: "Popular",
      description:
        "A complete introduction to perfumery. Meets once a week, builds from first principles to a finished scent you make, name, and present yourself.",
      icon: BookOpen,
      status: "available",
      previewImage: "/preview-image-one.jpeg",
      video: "/video/preview-video-one.mp4",
      videoDescription: "See what your 6 weeks look like",
      weeks: [
        {
          week: "Week 1",
          title: "Discovering Your Nose",
          topics: [
            "What perfumery is — art meets science",
            "How the sense of smell works and why it's tied to memory",
            "Begin training the nose to notice and describe scent",
          ],
          practical: "First Smelling Session — bergamot, lavender, sandalwood",
        },
        {
          week: "Week 2",
          title: "The Story of Scent & Fragrance Families",
          topics: [
            "Brief history — Ancient Egypt to the spice trade",
            "Africa's contribution: Dukhan, Bakhoor, Northern Nigerian oils",
            "The 8 main fragrance families",
            "Avoiding olfactory fatigue",
          ],
          practical: "Family Sorting & Pyramid Mapping",
        },
        {
          week: "Week 3",
          title: "Raw Materials & Where Scent Comes From",
          topics: [
            "Natural vs synthetic materials",
            "The 5 extraction methods",
            "Adulteration risks and safe storage",
          ],
          practical: "Natural vs Synthetic Comparison",
        },
        {
          week: "Week 4",
          title: "The Art of Blending",
          topics: [
            "What an accord is and how materials unify",
            "The Rule of Three for building blends",
            "Introduction to the 5 classic accord families",
            "Writing a formula sheet",
          ],
          practical: "Build Your First 3-Note Accord",
        },
        {
          week: "Week 5",
          title: "Formulation, Measuring & Safety",
          topics: [
            "The percentage formula for oil and diluent",
            "Concentration ranges: Body Spray, EDT, EDP, Extrait",
            "Core safety: dilution, patch testing, IFRA basics",
          ],
          practical: "Measure & Dilute Your Blend",
        },
        {
          week: "Week 6",
          title: "Bringing It All Together",
          topics: [
            "Maceration — why resting improves a blend",
            "Simple pricing: Cost × Markup",
            "Naming a scent and telling its story",
          ],
          practical: "Mini Showcase — Present Your First Fragrance",
        },
      ],
      deliverables: [
        "Full student handbook & worksheets",
        "Blotter strip starter kit",
        "Your own compounded sample bottle",
        "Certificate of Completion — Beginner",
        "WhatsApp class group access",
      ],
    },
    {
      level: "12 Weeks",
      title: "Intermediate & Advanced Program",
      duration: "12 Weeks · 1 class per week",
      badge: "Pro Track",
      description:
        "Our full artistic program. Twelve weeks from foundations to a commercial-grade launch. Includes advanced formulation, safety standards, branding, and a capstone pitch.",
      icon: GraduationCap,
      status: "available",
      previewImage: "/preview-image-two.jpeg",
      video: "/video/preview-video-two.mp4",
      videoDescription: "See the full 12-week journey",
      weeks: [
        {
          week: "Week 1",
          title: "Foundations of Perfumery",
          topics: [
            "What perfumery is — art and science blended",
            "How the human nose detects scent",
            "The 3-layer fragrance pyramid and its timing",
            "Natural vs synthetic raw materials",
          ],
          practical: "First Smelling Session on blotters",
        },
        {
          week: "Week 2",
          title: "History of Perfumery",
          topics: [
            "Ancient Egypt and the origins of modern perfumery",
            "The spice trade across Africa, Middle East, Asia, Europe",
            "Africa's scent traditions — Dukhan and Bakhoor",
          ],
          practical: "Historical Smelling Session",
        },
        {
          week: "Week 3",
          title: "Olfactory System & Sensory Training",
          topics: [
            "Why smell is the sense most tied to emotion and memory",
            "The 8 main fragrance families",
            "The 4 stages of nose training",
            "Avoiding and recovering from olfactory fatigue",
          ],
          practical: "Sensory identification exercises",
        },
        {
          week: "Week 4",
          title: "Raw Materials & Extraction Methods",
          topics: [
            "The 5 ways raw materials are extracted",
            "Essential oils, absolutes, resins, tinctures",
            "Spotting good quality vs adulterated materials",
            "Storing and organising a raw material library",
          ],
          practical: "Match-the-Method exercise",
        },
        {
          week: "Week 5",
          title: "Blending, Accords & Fragrance Composition",
          topics: [
            "What an accord is and how materials unify",
            "The Rule of Three for building a simple accord",
            "5 classic accord families: Chypre, Fougère, Oriental, Aldehydic, Gourmand",
            "Writing a proper formula sheet",
          ],
          practical: "Build a 3-Note Accord in groups",
        },
        {
          week: "Week 6",
          title: "Perfume Formulation, Math & Maceration",
          topics: [
            "Calculating oil and alcohol for any batch size",
            "Concentration ranges: Body Spray, EDT, EDP, Extrait",
            "Why perfume needs to rest (maceration) before it's finished",
            "Extending a perfume's shelf life",
          ],
          practical: "Dilution math + maceration observation",
        },
        {
          week: "Week 7",
          title: "Perfume Types, Equipment & The Lab",
          topics: [
            "Concentration types from Attar to Extrait",
            "Essential equipment for a perfumer's lab",
            "Setting up a safe, organised workspace",
            "Matching bottle type to concentration",
          ],
          practical: "Equipment Scavenger Hunt",
        },
        {
          week: "Week 8",
          title: "Safety Protocols & IFRA Standards",
          topics: [
            "Why materials must be diluted before skin use",
            "How to patch test safely",
            "What IFRA is and why Category 4 matters",
            "Photosensitisers and irritants to watch for",
          ],
          practical: "Make a 10% dilution safely",
        },
        {
          week: "Week 9",
          title: "Commercial Perfumery",
          topics: [
            "The 4 business models available to a perfumer",
            "How to price: Cost × Markup",
            "What makes a strong perfume brand",
            "Where and how to sell what you make",
          ],
          practical: "Create Your Perfume Brand exercise",
        },
        {
          week: "Week 10",
          title: "Scent Marketing & Experience Design",
          topics: [
            "How scent shapes emotion, behaviour, and buying",
            "Emotional effects of each scent family",
            "Creating a signature scent for a space",
            "The House of Tutu Experience Model",
          ],
          practical: "Design a diffuser blend",
        },
        {
          week: "Week 11",
          title: "Final Capstone Project",
          topics: [
            "Write a full formula sheet with materials and percentages",
            "Compound and macerate your own fragrance",
            "Run a safety and IFRA compliance check",
            "Build a one-page brand concept",
          ],
          practical: "5-minute pitch tying scent to story",
        },
        {
          week: "Week 12",
          title: "Graduation & Presentation",
          topics: [
            "Present your finished fragrance to the cohort",
            "Receive feedback from instructors and peers",
            "Portfolio review and next steps",
            "Networking with the THT alumni community",
          ],
          practical: "Graduation Showcase & Certificate Ceremony",
        },
      ],
      deliverables: [
        "Complete workbook & formula sheets",
        "Your compounded and macerated fragrance bottle",
        "One-page brand concept for your scent",
        "IFRA compliance documentation",
        "Recorded 5-minute capstone pitch",
        "Certificate of Completion — Intermediate & Advanced",
        "Direct instructor support + lifetime updates",
      ],
    },
    {
      level: "Mastery",
      title: "Master Perfumer Program",
      duration: "Coming Soon",
      badge: "Invitation Only",
      description:
        "Our most advanced artistic track. Reserved for graduates who want to specialise in advanced formulation, mentor others, and produce at commercial scale.",
      icon: Award,
      status: "coming_soon",
      previewImage: "/commercial.jpeg",
      video: "/video/commercial.mp4",
      videoDescription: "A glimpse of the Mastery track",
      weeks: [
        {
          week: "Module 1",
          title: "Advanced Perfume Chemistry",
          topics: [
            "Deep dive into aroma molecules and families",
            "Advanced accord construction and modification",
            "Building complex, layered signature fragrances",
          ],
          practical: "Blind-recreate a classic accord",
        },
        {
          week: "Module 2",
          title: "Commercial-Scale Production",
          topics: [
            "Scaling formulas from 30ml to 3,000 bottles",
            "Sourcing raw materials at volume",
            "Quality control and batch consistency",
          ],
          practical: "Batch production simulation",
        },
        {
          week: "Module 3",
          title: "Export & International Standards",
          topics: [
            "Export regulations and IFRA compliance at scale",
            "White-labelling and manufacturing partnerships",
            "Licensing your fragrances to brands",
          ],
          practical: "Draft an export-ready product plan",
        },
        {
          week: "Module 4",
          title: "Teaching & Mentorship",
          topics: [
            "How to train junior perfumers",
            "Building a fragrance education practice",
            "Publishing and thought leadership",
          ],
          practical: "Teach a mini masterclass",
        },
      ],
      deliverables: [
        "Advanced perfumer certification",
        "Licensed fragrance portfolio",
        "Manufacturing partnership access",
        "Teaching and mentorship license",
        "Invitation to the THT Master Perfumers Guild",
      ],
    },
  ];

  // ─── COMMERCIAL PERFUMERY — 2 weeks ────────────────────
  const commercialProgram = {
    level: "2 Weeks",
    title: "Commercial Perfumery Masterclass",
    duration: "2 Weeks · 1 class per week",
    badge: "Business Track",
    description:
      "Transform your perfumery skills into a profitable business. Learn branding, pricing, packaging, marketing, and how to actually sell what you make.",
    icon: Briefcase,
    status: "available",
    price: "₦500,000",
    previewImage: "/commercial.jpeg",
    video: "/video/commercial.mp4",
    videoDescription: "Watch a sample lesson from this course",
    weeks: [
      {
        week: "Week 1",
        title: "Building Your Perfume Brand",
        topics: [
          "The 4 business models available to a perfumer",
          "Positioning your brand in a crowded market",
          "Naming, storytelling, and visual identity",
          "Cost × Markup — pricing your product for profit",
        ],
        practical: "Create your one-page brand concept",
      },
      {
        week: "Week 2",
        title: "Marketing, Sales & Launch",
        topics: [
          "Where to sell: online, retail, wholesale, export",
          "Digital marketing strategies for perfume brands",
          "Packaging and the unboxing experience",
          "Launching your first commercial batch",
        ],
        practical: "Build and pitch your launch plan",
      },
    ],
    deliverables: [
      "Complete Business Blueprint workbook",
      "One-page brand concept",
      "Pricing model & profit calculator",
      "Marketing & launch plan",
      "Supplier & packaging contacts list",
      "Certificate of Completion — Commercial Perfumery",
      "Direct instructor support + lifetime updates",
    ],
  };

  // Derived
  const currentArt = artPrograms[activeLevel];
  const current = activeTrack === "art" ? currentArt : commercialProgram;

  // Reset openWeek when switching track or level
  useEffect(() => {
    setOpenWeek(0);
  }, [activeTrack, activeLevel]);

  const toggleWeek = (idx: number) => {
    setOpenWeek(openWeek === idx ? null : idx);
  };

  // ─── Video Controls ─────────────────────────────────────
  const handleOpenVideo = () => setShowVideoModal(true);

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setIsVideoPlaying(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  };

  const toggleVideoPlay = () => {
    if (!modalVideoRef.current) return;
    if (isVideoPlaying) {
      modalVideoRef.current.pause();
    } else {
      modalVideoRef.current.play().catch(console.error);
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setIsVideoMuted(!isVideoMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  };

  const handleVideoEnd = () => setIsVideoPlaying(false);

  useEffect(() => {
    if (showVideoModal && modalVideoRef.current) {
      modalVideoRef.current.play().catch(console.error);
      setIsVideoPlaying(true);
    }
  }, [showVideoModal]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
    };
    if (showVideoModal) {
      document.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "auto";
    };
  }, [showVideoModal]);

  return (
    <section
      id="courses"
      className="relative overflow-hidden py-14 md:py-24"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Section-level pattern */}
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
            <div className="w-2 h-2 rounded-full bg-[#691C33]" />
            <span
              className={`text-xs md:text-sm font-semibold text-[#691C33] tracking-wider ${gothamOffice.className}`}
            >
              YOUR LEARNING PATH
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 leading-tight ${italiana.className}`}
          >
            Choose Your Track
          </h2>

          <p
            className={`text-base md:text-lg text-[#691C33] max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Two tracks: the{" "}
            <strong className="font-bold">Art of Perfumery</strong> for
            mastering the craft, and{" "}
            <strong className="font-bold">Commercial Perfumery</strong> for
            building a business. Start wherever you are.
          </p>
        </motion.div>

        {/* ─── Top-level Track Tabs ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 max-w-2xl mx-auto"
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

        {/* ─── Sub-level Tabs (Art only) ─────────────────────── */}
        <AnimatePresence mode="wait">
          {activeTrack === "art" && (
            <motion.div
              key="art-levels"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-8 md:mb-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                {artPrograms.map((course, index) => {
                  const isActive = activeLevel === index;
                  return (
                    <button
                      key={course.level}
                      onClick={() => setActiveLevel(index)}
                      className={`px-4 py-3.5 rounded-xl font-semibold transition-all border-2 flex items-center gap-3 ${
                        isActive
                          ? "bg-[#691C33]/10 text-[#691C33] border-[#691C33]"
                          : "bg-white text-[#691C33] border-[#691C33]/15 hover:border-[#691C33]/50"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-[#691C33]" : "bg-[#691C33]/10"
                        }`}
                      >
                        {course.status === "coming_soon" ? (
                          <Lock
                            className={`w-4 h-4 ${
                              isActive ? "text-white" : "text-[#691C33]"
                            }`}
                          />
                        ) : (
                          <course.icon
                            className={`w-4 h-4 ${
                              isActive ? "text-white" : "text-[#691C33]"
                            }`}
                          />
                        )}
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <div
                          className={`text-[10px] uppercase tracking-wider font-bold ${
                            isActive ? "text-[#691C33]" : "text-[#691C33]/60"
                          }`}
                        >
                          {course.status === "coming_soon"
                            ? "Invitation"
                            : "Level"}
                        </div>
                        <div className="text-sm md:text-base truncate font-bold">
                          {course.level}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Active Course Display ─────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTrack}-${activeLevel}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-14 md:mb-20"
          >
            {/* Left column */}
            <div className="space-y-5 md:space-y-6">
              {/* Video Preview */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-video bg-[#2b0a15]">
                  <Image
                    src={current.previewImage}
                    alt={`${current.title} preview`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-black/40" />

                  <button
                    onClick={handleOpenVideo}
                    className="absolute inset-0 flex items-center justify-center group"
                    aria-label={`Play ${current.title} preview`}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/30 animate-ping group-hover:animate-none" />
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/25 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-6 h-6 md:w-7 md:h-7 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <current.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      <span className="text-white text-sm md:text-base font-semibold">
                        {current.title}
                      </span>
                    </div>
                    <p className="text-white/90 text-xs md:text-sm">
                      {current.videoDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Info Card */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-7 border-2 border-[#691C33]/10 shadow-lg">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-white bg-[#691C33] px-3 py-1 rounded-full uppercase tracking-wider">
                    {current.badge}
                  </span>
                  {current.status === "coming_soon" && (
                    <span className="text-xs font-bold text-[#691C33] bg-[#691C33]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      Coming Soon
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#691C33] flex items-center justify-center flex-shrink-0">
                    <current.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] md:text-xs font-bold text-[#691C33]/70 uppercase tracking-wider mb-0.5">
                      {current.level}
                    </div>
                    <h3
                      className={`text-xl md:text-2xl font-bold text-[#691C33] leading-tight ${gothamOffice.className}`}
                    >
                      {current.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[#691C33] text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">{current.duration}</span>
                  </div>
                  <span className="text-[#691C33]/30">·</span>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span className="font-semibold">
                      {current.weeks.length} Modules
                    </span>
                  </div>
                </div>

                <p className="text-[#691C33] text-sm md:text-base leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* What You Get */}
              <div className="bg-[#691C33] rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-lg">
                <h4
                  className={`text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2 ${gothamOffice.className}`}
                >
                  <Award className="w-5 h-5" />
                  What You Get
                </h4>
                <div className="space-y-3">
                  {current.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-white text-sm md:text-base leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — Curriculum Accordion */}
            <div>
              <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-7 border-2 border-[#691C33]/10 shadow-lg">
                {/* Curriculum Header */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#691C33]/10 flex items-center justify-center flex-shrink-0">
                      <Beaker className="w-5 h-5 text-[#691C33]" />
                    </div>
                    <div>
                      <h4
                        className={`text-lg md:text-xl font-bold text-[#691C33] ${gothamOffice.className}`}
                      >
                        What You'll Learn
                      </h4>
                      <p className="text-xs md:text-sm text-[#691C33]/70 mt-0.5">
                        {current.weeks.length} modules · tap to expand
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpenWeek(openWeek === null ? 0 : null)}
                    className="text-xs font-semibold text-[#691C33] hover:text-[#691C33]/70 transition-colors whitespace-nowrap flex-shrink-0 px-2 py-1"
                  >
                    {openWeek === null ? "Expand" : "Collapse"}
                  </button>
                </div>

                {/* Accordion */}
                <div className="space-y-2">
                  {current.weeks.map((wk, idx) => {
                    const isOpen = openWeek === idx;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className={`rounded-2xl border-2 transition-all overflow-hidden ${
                          isOpen
                            ? "border-[#691C33] bg-[#691C33]/5"
                            : "border-[#691C33]/15 bg-white hover:border-[#691C33]/40"
                        }`}
                      >
                        <button
                          onClick={() => toggleWeek(idx)}
                          className="w-full flex items-center gap-3 p-3.5 md:p-4 text-left"
                          aria-expanded={isOpen}
                        >
                          <div
                            className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base transition-colors ${
                              isOpen
                                ? "bg-[#691C33] text-white"
                                : "bg-[#691C33]/10 text-[#691C33]"
                            }`}
                          >
                            {idx + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-0.5 ${
                                isOpen ? "text-[#691C33]" : "text-[#691C33]/60"
                              }`}
                            >
                              {wk.week}
                            </div>
                            <div className="text-sm md:text-base font-bold leading-snug text-[#691C33]">
                              {wk.title}
                            </div>
                          </div>

                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                              isOpen
                                ? "bg-[#691C33] text-white rotate-180"
                                : "bg-[#691C33]/10 text-[#691C33]"
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3.5 md:px-4 pb-4 pt-1 border-t border-[#691C33]/15">
                                <ul className="space-y-2 pt-3 mb-3">
                                  {wk.topics.map((topic, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2.5 text-sm md:text-[15px]"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#691C33] mt-2 flex-shrink-0" />
                                      <span className="text-[#691C33] leading-relaxed">
                                        {topic}
                                      </span>
                                    </li>
                                  ))}
                                </ul>

                                {wk.practical && (
                                  <div className="bg-white border-l-4 border-[#691C33] rounded-r-lg p-3">
                                    <div className="text-[10px] font-bold text-[#691C33] uppercase tracking-wider mb-1">
                                      Practical
                                    </div>
                                    <div className="text-sm text-[#691C33] font-medium leading-relaxed">
                                      {wk.practical}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA */}
                <div className="mt-6">
                  {current.status === "available" ? (
                    <button
                      onClick={() => (window.location.href = "/enrollment")}
                      className="w-full bg-[#691C33] text-white py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-[#691C33]/90 transition-colors shadow-md"
                    >
                      <span>START THIS PROGRAM</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="bg-[#691C33]/5 border-2 border-[#691C33]/20 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#691C33] flex items-center justify-center flex-shrink-0">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#691C33] text-sm md:text-base mb-1">
                            Coming Soon
                          </h4>
                          <p className="text-[#691C33] text-xs md:text-sm">
                            Open to 12-Week graduates. Join the waitlist.
                          </p>
                        </div>
                      </div>
                      <button className="w-full bg-[#691C33] text-white py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-[#691C33]/90 transition-colors">
                        JOIN WAITLIST
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ─── Full Journey Overview ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8 md:mb-10">
            <h3
              className={`text-2xl md:text-3xl lg:text-4xl font-black text-[#691C33] mb-3 ${italiana.className}`}
            >
              The Full Journey
            </h3>
            <p className="text-[#691C33] text-sm md:text-base">
              Tap any card to explore
            </p>
          </div>

          {/* Art of Perfumery row */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#691C33] flex items-center justify-center">
                <FlaskRound className="w-4 h-4 text-white" />
              </div>
              <h4
                className={`text-base md:text-lg font-bold text-[#691C33] ${gothamOffice.className}`}
              >
                Art of Perfumery
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {artPrograms.map((course, index) => {
                const isActive = activeTrack === "art" && activeLevel === index;
                return (
                  <motion.button
                    key={course.level}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => {
                      setActiveTrack("art");
                      setActiveLevel(index);
                      document
                        .getElementById("courses")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`bg-white rounded-2xl p-5 border-2 text-left transition-all ${
                      isActive
                        ? "border-[#691C33] shadow-lg"
                        : "border-[#691C33]/15 hover:border-[#691C33]/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#691C33] flex items-center justify-center">
                        {course.status === "coming_soon" ? (
                          <Lock className="w-5 h-5 text-white" />
                        ) : (
                          <course.icon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      {course.status === "coming_soon" ? (
                        <span className="text-[10px] font-bold text-[#691C33] bg-[#691C33]/10 px-2 py-1 rounded-full uppercase">
                          Soon
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-white bg-[#691C33] px-2 py-1 rounded-full uppercase">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <div className="text-[10px] font-bold text-[#691C33]/70 uppercase tracking-wider mb-1">
                      {course.level}
                    </div>
                    <h4 className="font-bold text-[#691C33] text-base mb-2 leading-tight">
                      {course.title}
                    </h4>

                    <div className="flex items-center gap-2 text-[#691C33] text-xs mb-3 font-medium">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {course.weeks.slice(0, 2).map((wk, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#691C33]/8 text-[#691C33] px-2 py-0.5 rounded-full truncate max-w-[110px] font-medium"
                        >
                          {wk.title}
                        </span>
                      ))}
                      {course.weeks.length > 2 && (
                        <span className="text-[10px] bg-[#691C33]/8 text-[#691C33] px-2 py-0.5 rounded-full font-medium">
                          +{course.weeks.length - 2} more
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Commercial Perfumery row */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#691C33] flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <h4
                className={`text-base md:text-lg font-bold text-[#691C33] ${gothamOffice.className}`}
              >
                Commercial Perfumery
              </h4>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => {
                setActiveTrack("commercial");
                document
                  .getElementById("courses")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`bg-white rounded-2xl p-5 border-2 text-left transition-all w-full sm:max-w-md ${
                activeTrack === "commercial"
                  ? "border-[#691C33] shadow-lg"
                  : "border-[#691C33]/15 hover:border-[#691C33]/50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#691C33] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold text-white bg-[#691C33] px-2 py-1 rounded-full uppercase">
                  {commercialProgram.badge}
                </span>
              </div>

              <div className="text-[10px] font-bold text-[#691C33]/70 uppercase tracking-wider mb-1">
                {commercialProgram.level}
              </div>
              <h4 className="font-bold text-[#691C33] text-base mb-2 leading-tight">
                {commercialProgram.title}
              </h4>

              <div className="flex items-center gap-2 text-[#691C33] text-xs mb-3 font-medium">
                <Clock className="w-3 h-3" />
                {commercialProgram.duration}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {commercialProgram.weeks.map((wk, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#691C33]/8 text-[#691C33] px-2 py-0.5 rounded-full truncate max-w-[110px] font-medium"
                  >
                    {wk.title}
                  </span>
                ))}
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ─── Video Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-0 md:p-4"
          >
            <div
              ref={videoContainerRef}
              className="relative w-full h-full md:w-full md:h-auto md:max-w-6xl bg-black md:rounded-2xl overflow-hidden"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="relative w-full h-full">
                <video
                  ref={modalVideoRef}
                  className="w-full h-full object-contain"
                  controls={false}
                  onEnded={handleVideoEnd}
                  playsInline
                  muted={isVideoMuted}
                >
                  <source src={current.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 md:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 md:gap-4">
                      <button
                        onClick={toggleVideoPlay}
                        className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#691C33] flex items-center justify-center hover:bg-[#691C33]/90 transition-colors flex-shrink-0"
                        aria-label={isVideoPlaying ? "Pause" : "Play"}
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-5 h-5 text-white fill-white" />
                        ) : (
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        )}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors flex-shrink-0"
                        aria-label={isVideoMuted ? "Unmute" : "Mute"}
                      >
                        {isVideoMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>

                      <div className="hidden md:block ml-2 min-w-0">
                        <h3 className="text-white font-semibold text-lg truncate">
                          {current.title}
                        </h3>
                        <p className="text-white/75 text-sm truncate">
                          {current.videoDescription}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors flex-shrink-0"
                      aria-label="Fullscreen"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-5 h-5 text-white" />
                      ) : (
                        <Maximize2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>

                  <div className="md:hidden mt-3">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {current.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CoursesShowcase;
