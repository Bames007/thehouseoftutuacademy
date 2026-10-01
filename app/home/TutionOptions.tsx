// components/Sections/TuitionOptions.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  Shield,
  BookOpen,
  FlaskRound,
  Briefcase,
  Lock,
  ChevronRight,
  Play,
  X,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Pause,
  GraduationCap,
  Layers,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Track = "art" | "commercial";

const TuitionOptions = () => {
  const [activeTrack, setActiveTrack] = useState<Track>("art");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    src: string;
    poster: string;
  } | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // ─── ART OF PERFUMERY PROGRAMS ─────────────────────────
  const artPrograms = [
    {
      level: "6 Weeks",
      title: "Beginner Perfumery Program",
      duration: "6 Weeks · 1 class per week",
      price: "₦600,000",
      originalPrice: "₦750,000",
      discount: "20% OFF",
      badge: "Popular",
      description:
        "A complete introduction to perfumery. Builds from first principles to a finished scent you make, name, and present yourself.",
      icon: BookOpen,
      status: "available" as const,
      video: "/video/preview-video-one.mp4",
      thumbnail: "/preview-image-one.jpeg",
      features: [
        "Discovering Your Nose",
        "Fragrance Families & History",
        "Raw Materials & Extraction",
        "The Art of Blending",
        "Formulation, Measuring & Safety",
        "Mini Showcase & Certificate",
      ],
    },
    {
      level: "12 Weeks",
      title: "Intermediate & Advanced Program",
      duration: "12 Weeks · 1 class per week",
      price: "₦800,000",
      originalPrice: null,
      discount: null,
      badge: "Pro Track",
      description:
        "Our full artistic program. Twelve weeks from foundations to a commercial-grade capstone — advanced formulation, safety standards, branding, and a recorded pitch.",
      icon: GraduationCap,
      status: "available" as const,
      video: "/video/preview-video-two.mp4",
      thumbnail: "/preview-image-two.jpeg",
      features: [
        "Advanced Accord Construction",
        "Full Formula Development",
        "IFRA Safety & Compliance",
        "Perfumer's Lab Setup",
        "Commercial Branding & Pricing",
        "Scent Marketing & Capstone Pitch",
      ],
    },
    {
      level: "Mastery",
      title: "Master Perfumer Program",
      duration: "Coming Soon",
      price: null,
      originalPrice: null,
      discount: null,
      badge: "Invitation Only",
      description:
        "Our most advanced track. Reserved for graduates who want to specialise in advanced formulation, mentor others, and produce at commercial scale.",
      icon: Award,
      status: "coming_soon" as const,
      video: "/video/commercial.mp4",
      thumbnail: "/commercial.jpeg",
      features: [
        "Advanced Perfume Chemistry",
        "Commercial-Scale Production",
        "Export & International Standards",
        "Teaching & Mentorship",
      ],
    },
  ];

  // ─── COMMERCIAL PERFUMERY PROGRAMS ─────────────────────
  const commercialPrograms = [
    {
      level: "2 Weeks",
      title: "Commercial Perfumery Masterclass",
      duration: "2 Weeks · 1 class per week",
      price: "₦500,000",
      originalPrice: null,
      discount: null,
      badge: "Business Track",
      description:
        "Transform your perfumery skills into a profitable business. Learn branding, pricing, packaging, marketing, and how to actually sell what you make.",
      icon: Briefcase,
      status: "available" as const,
      video: "/video/commercial.mp4",
      thumbnail: "/commercial.jpeg",
      features: [
        "Building Your Perfume Brand",
        "Cost × Markup Pricing Strategy",
        "Packaging & Unboxing Experience",
        "Digital Marketing for Fragrance",
        "Where to Sell — Online, Retail, Export",
        "Launching Your First Commercial Batch",
      ],
    },
  ];

  const currentPrograms =
    activeTrack === "art" ? artPrograms : commercialPrograms;

  // ─── Video Controls ─────────────────────────────────────
  const openVideo = (title: string, src: string, poster: string) => {
    setActiveVideo({ title, src, poster });
    setShowVideoModal(true);
  };

  const closeVideo = () => {
    setShowVideoModal(false);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(console.error);
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
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
    if (showVideoModal && videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsVideoPlaying(true);
    }
  }, [showVideoModal, activeVideo]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
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
      id="tuition"
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
              TUITION & PROGRAMS
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 leading-tight ${italiana.className}`}
          >
            Choose Your Investment
          </h2>

          <p
            className={`text-base md:text-lg text-[#691C33] max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Two tracks, clear pricing, and{" "}
            <strong className="font-bold">free registration</strong> on every
            program. Pay only your course fee.
          </p>
        </motion.div>

        {/* Track Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12 max-w-2xl mx-auto"
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

        {/* Program Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-5 md:gap-6 mb-10 md:mb-14 ${
              activeTrack === "art"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 max-w-2xl mx-auto"
            }`}
          >
            {currentPrograms.map((program, index) => {
              const Icon = program.icon;
              const isLocked = program.status === "coming_soon";

              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative rounded-2xl overflow-hidden border-2 shadow-lg flex flex-col ${
                    isLocked
                      ? "bg-white border-[#691C33]/15"
                      : "bg-white border-[#691C33]/10"
                  }`}
                >
                  {/* Video Preview */}
                  <button
                    onClick={() =>
                      openVideo(program.title, program.video, program.thumbnail)
                    }
                    className="relative aspect-video w-full group overflow-hidden bg-[#2b0a15]"
                    aria-label={`Play ${program.title} preview`}
                  >
                    <Image
                      src={program.thumbnail}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />

                    {/* Badge top-left */}
                    {program.badge && (
                      <div
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10 ${
                          isLocked
                            ? "bg-[#691C33]/10 text-[#691C33]"
                            : "bg-[#691C33] text-white"
                        }`}
                      >
                        {program.badge}
                      </div>
                    )}

                    {/* Discount badge top-right */}
                    {program.discount && !isLocked && (
                      <div className="absolute top-3 right-3 bg-white text-[#691C33] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10">
                        {program.discount}
                      </div>
                    )}

                    {/* Lock overlay */}
                    {isLocked && (
                      <div className="absolute top-3 right-3 bg-[#691C33] text-white p-2 rounded-full z-10">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/25 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 md:w-7 md:h-7 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom info strip */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 md:p-4 text-left">
                      <div className="flex items-center gap-2 text-white">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-semibold truncate">
                          {program.level} · {program.duration}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Card Body */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <h3
                      className={`text-lg md:text-xl font-bold text-[#691C33] mb-3 leading-snug ${gothamOffice.className}`}
                    >
                      {program.title}
                    </h3>

                    <p className="text-sm md:text-base text-[#691C33] leading-relaxed mb-5">
                      {program.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-5 flex-1">
                      {program.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-[#691C33] flex-shrink-0 mt-0.5" />
                          <span className="text-[#691C33] leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price row */}
                    <div className="pt-4 border-t border-[#691C33]/10">
                      {!isLocked && program.price ? (
                        <>
                          <div className="flex items-end justify-between gap-3 mb-4">
                            <div>
                              <div className="text-[10px] font-bold text-[#691C33]/70 uppercase tracking-wider mb-0.5">
                                Course Fee
                              </div>
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-2xl md:text-3xl font-bold text-[#691C33]">
                                  {program.price}
                                </span>
                                {program.originalPrice && (
                                  <span className="text-sm text-[#691C33]/50 line-through">
                                    {program.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] font-bold text-[#691C33]/70 uppercase tracking-wider mb-0.5">
                                Registration
                              </div>
                              <div className="text-base font-bold text-[#691C33]">
                                FREE
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              (window.location.href = "/enrollment")
                            }
                            className="w-full bg-[#691C33] text-white py-3.5 rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-[#691C33]/90 transition-colors"
                          >
                            <span>ENROLL NOW</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-[10px] font-bold text-[#691C33]/70 uppercase tracking-wider mb-0.5">
                                Availability
                              </div>
                              <div className="text-base font-bold text-[#691C33]">
                                Coming Soon
                              </div>
                            </div>
                            <Lock className="w-5 h-5 text-[#691C33]" />
                          </div>
                          <button className="w-full bg-[#691C33]/10 text-[#691C33] py-3.5 rounded-xl font-semibold text-sm md:text-base hover:bg-[#691C33]/20 transition-colors">
                            JOIN WAITLIST
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* What's Included — every program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <div className="bg-[#691C33] rounded-2xl md:rounded-3xl p-6 md:p-10">
            <div className="text-center mb-6 md:mb-8">
              <h3
                className={`text-xl md:text-3xl font-bold text-white mb-2 ${italiana.className}`}
              >
                Included With Every Program
              </h3>
              <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Regardless of which program you choose, these are always part of
                your enrollment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                {
                  icon: BookOpen,
                  title: "Student Workbook",
                  desc: "Full handbook & worksheets",
                },
                {
                  icon: Award,
                  title: "Certificate",
                  desc: "Of completion & recognition",
                },
                {
                  icon: Users,
                  title: "Class Group",
                  desc: "WhatsApp community & support",
                },
                {
                  icon: Layers,
                  title: "Lifetime Access",
                  desc: "Updates & resource library",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/20 rounded-2xl p-4 md:p-5"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-white font-bold text-sm md:text-base mb-1">
                    {item.title}
                  </div>
                  <div className="text-white/85 text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm md:text-base">
                    No Hidden Fees
                  </div>
                  <div className="text-white/85 text-xs md:text-sm">
                    One-time course payment · registration always free
                  </div>
                </div>
              </div>
              <button
                onClick={() => (window.location.href = "/enrollment")}
                className="w-full sm:w-auto bg-white text-[#691C33] px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base hover:bg-white/95 transition-colors whitespace-nowrap"
              >
                START ENROLLMENT
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-0 md:p-4"
          >
            <div
              ref={videoContainerRef}
              className="relative w-full h-full md:w-full md:h-auto md:max-w-5xl bg-black md:rounded-2xl overflow-hidden"
            >
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  controls={false}
                  poster={activeVideo.poster}
                  onEnded={handleVideoEnd}
                  playsInline
                  muted={isVideoMuted}
                >
                  <source src={activeVideo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Controls */}
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
                        <h3 className="text-white font-semibold text-base truncate">
                          {activeVideo.title}
                        </h3>
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
                      {activeVideo.title}
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

export default TuitionOptions;
