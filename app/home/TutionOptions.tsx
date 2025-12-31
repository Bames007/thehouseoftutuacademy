"use client";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  CheckCircle,
  Zap,
  Clock,
  Users,
  Award,
  Sparkles,
  Shield,
  Gift,
  BookOpen,
  Palette,
  FlaskRound,
  Briefcase,
  Lock,
  ChevronRight,
  Play,
  X,
  Maximize2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const TuitionOptions = () => {
  const [selectedOption, setSelectedOption] = useState<"commercial" | "art">(
    "commercial"
  );
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const commercialCourse = {
    title: "Commercial Masterclass",
    price: "₦500,000",
    duration: "2 Weeks Intensive",
    description:
      "Transform your perfumery skills into a profitable business with branding, marketing, and sales strategies.",
    status: "available",
    features: [
      "Complete Business Blueprint",
      "Brand Development Mastery",
      "Pricing & Profit Margins",
      "Marketing & Sales Strategies",
      "Supplier Sourcing Secrets",
      "Legal & Regulatory Compliance",
      "Packaging & Branding Design",
      "Digital Marketing Strategy",
    ],
    included: [
      "Student Handbook & Workbook",
      "Academy Calendar & Schedule",
      "Assignments & Final Project",
      "Certificate of Completion",
      "WhatsApp Support Group",
      "Industry Templates & Tools",
      "Supplier Directory (Local & Intl)",
      "Lifetime Alumni Network Access",
      "Branding & Packaging Templates",
      "Pricing Calculator Tool",
      "Launch Strategy Blueprint",
      "Ongoing Business Support",
    ],
    levels: [
      {
        title: "Business Foundation",
        duration: "Week 1",
        description: "Build your business structure and strategy",
        features: ["Business Model", "Legal Setup", "Brand Identity"],
        video: "/video/commercial.mp4",
        thumbnail: "/commercial.jpeg",
      },
      {
        title: "Operations & Production",
        duration: "Week 2",
        description: "Master production and quality control",
        features: ["Production Setup", "Quality Control", "Packaging Design"],
        video: "/video/commercial.mp4",
        thumbnail: "/commercial.jpeg",
      },
      {
        title: "Marketing & Sales",
        duration: "Week 2",
        description: "Learn marketing strategies and sales techniques",
        features: ["Digital Marketing", "Sales Funnel", "Customer Retention"],
        video: "/video/commercial.mp4",
        thumbnail: "/commercial.jpeg",
      },
      {
        title: "Growth & Scaling",
        duration: "Week 2",
        description: "Scale your business and explore new markets",
        features: ["Business Scaling", "Market Expansion", "Team Building"],
        video: "/video/commercial.mp4",
        thumbnail: "/commercial.jpeg",
      },
    ],
  };

  const artSeries = {
    title: "Art of Perfumery Series",
    description:
      "Complete artistic training in perfumery, from foundation to mastery.",
    status: "coming_soon",
    levels: [
      {
        level: "Level 1",
        title: "Foundation of Scent",
        duration: "4 Weeks",
        price: "Coming Soon",
        description:
          "Introduction to fragrance theory, basic scent composition, and understanding essential perfume ingredients.",
        features: [
          "Fragrance Families & Notes",
          "Basic Scent Blending",
          "Essential Ingredients",
          "Introduction to Equipment",
          "Safety Protocols",
        ],
        icon: Palette,
        status: "coming_soon",
        video: "/video/preview-video-one.mp4",
        thumbnail: "/preview-image-one.jpeg",
      },
      {
        level: "Level 2",
        title: "Advanced Composition",
        duration: "6 Weeks",
        price: "Coming Soon",
        description:
          "Master advanced scent structures, complex accords, and professional formulation techniques.",
        features: [
          "Advanced Accord Building",
          "Complex Scent Structures",
          "Professional Formulation",
          "Aging & Maturation",
          "Quality Control",
        ],
        icon: FlaskRound,
        status: "coming_soon",
        video: "/video/preview-video-two.mp4",
        thumbnail: "/preview-image-two.jpeg",
      },
      {
        level: "Level 3",
        title: "Master Perfumer",
        duration: "8 Weeks",
        price: "Coming Soon",
        description:
          "Create signature scents, understand commercial formulation, and develop professional perfumery skills.",
        features: [
          "Signature Scent Creation",
          "Commercial Formulation",
          "Industry Standards",
          "Professional Certification",
          "Portfolio Development",
        ],
        icon: Award,
        status: "coming_soon",
        video: "/video/preview-video-three.mp4",
        thumbnail: "/preview-image-three.jpeg",
      },
    ],
    included: [
      "Comprehensive Workbooks",
      "Hands-on Projects",
      "Professional Certificate",
      "Industry Resources",
      "Mentorship Sessions",
      "Lifetime Access to Updates",
      "Portfolio Development",
      "Graduation Showcase",
    ],
  };

  const handlePlayVideo = (videoSrc: string) => {
    if (videoRef.current) {
      videoRef.current.src = videoSrc;
      setShowVideoModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  useEffect(() => {
    if (showVideoModal && videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsVideoPlaying(true);
    }
  }, [showVideoModal]);

  return (
    <section
      className="py-12 md:py-24 bg-white relative overflow-hidden"
      id="tuition"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.03]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 rounded-full mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-[#691C33]" />
            <span
              className={`text-xs md:text-sm font-semibold text-[#691C33] tracking-wider ${gothamOffice.className}`}
            >
              FLEXIBLE LEARNING PATHS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 md:mb-6 ${italiana.className}`}
          >
            Choose Your Learning Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-base md:text-xl text-[#691C33]/80 max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Start your fragrance journey with our available Commercial
            Masterclass or prepare for the complete Art of Perfumery series.
          </motion.p>
        </motion.div>

        {/* Option Selection */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl md:max-w-3xl mx-auto mb-6 md:mb-12">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedOption("commercial")}
            className={`flex-1 p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all ${
              selectedOption === "commercial"
                ? "border-[#691C33] bg-[#691C33]/5 shadow-lg"
                : "border-[#691C33]/20 bg-white hover:border-[#691C33]/40"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 md:gap-3">
                <Briefcase
                  className={`w-4 h-4 md:w-5 md:h-5 ${
                    selectedOption === "commercial"
                      ? "text-[#691C33]"
                      : "text-[#691C33]/60"
                  }`}
                />
                <h3
                  className={`text-base md:text-xl font-bold ${
                    selectedOption === "commercial"
                      ? "text-[#691C33]"
                      : "text-[#691C33]/70"
                  }`}
                >
                  Commercial Masterclass
                </h3>
              </div>
              {selectedOption === "commercial" && (
                <div className="bg-[#691C33] text-white text-xs px-2 md:px-3 py-1 rounded-full">
                  AVAILABLE
                </div>
              )}
            </div>
            <p className="text-[#691C33]/70 text-xs md:text-base text-left">
              Business-focused training to launch your perfume brand
            </p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedOption("art")}
            className={`flex-1 p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all ${
              selectedOption === "art"
                ? "border-[#691C33] bg-[#691C33]/5 shadow-lg"
                : "border-[#691C33]/20 bg-white hover:border-[#691C33]/40"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 md:gap-3">
                <Palette
                  className={`w-4 h-4 md:w-5 md:h-5 ${
                    selectedOption === "art"
                      ? "text-[#691C33]"
                      : "text-[#691C33]/60"
                  }`}
                />
                <h3
                  className={`text-base md:text-xl font-bold ${
                    selectedOption === "art"
                      ? "text-[#691C33]"
                      : "text-[#691C33]/70"
                  }`}
                >
                  Art of Perfumery
                </h3>
              </div>
              {selectedOption === "art" && (
                <div className="bg-[#691C33]/20 text-[#691C33] text-xs px-2 md:px-3 py-1 rounded-full">
                  COMING SOON
                </div>
              )}
            </div>
            <p className="text-[#691C33]/70 text-xs md:text-base text-left">
              Complete artistic training in perfume creation
            </p>
          </motion.button>
        </div>

        {/* Main Content Area */}
        {selectedOption === "commercial" ? (
          <motion.div
            key="commercial"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 md:space-y-12"
          >
            {/* Commercial Course Details */}
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
              {/* Course Summary */}
              <div className="bg-white rounded-xl md:rounded-3xl p-4 md:p-8 border border-[#691C33]/10 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.03]"></div>

                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 md:mb-8 gap-3 md:gap-4 relative z-10">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#691C33]"></div>
                      <span className="text-xs font-semibold text-[#691C33] bg-[#691C33]/10 px-2 py-1 rounded-full">
                        AVAILABLE NOW
                      </span>
                      <span className="text-xs font-semibold text-white bg-[#691C33] px-2 py-1 rounded-full">
                        LIMITED SEATS
                      </span>
                    </div>
                    <h3
                      className={`text-xl md:text-4xl font-bold text-[#691C33] mb-2 ${gothamOffice.className}`}
                    >
                      {commercialCourse.title}
                    </h3>
                    <p className="text-[#691C33]/70 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
                      {commercialCourse.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[#691C33]/70 text-xs md:text-base">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 md:w-5 md:h-5 mr-1 md:mr-2 text-[#691C33]" />
                        {commercialCourse.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 md:w-5 md:h-5 mr-1 md:mr-2 text-[#691C33]" />
                        Small Class Sizes
                      </div>
                    </div>
                  </div>

                  <div className="text-center md:text-right mt-2 md:mt-0">
                    <div className="text-xs md:text-sm text-[#691C33]/70">
                      One-Time Investment
                    </div>
                    <div className="text-2xl md:text-4xl font-bold text-[#691C33]">
                      {commercialCourse.price}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-8 relative z-10">
                  <h4
                    className={`text-base md:text-xl font-bold text-[#691C33] ${gothamOffice.className}`}
                  >
                    What You'll Master
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {commercialCourse.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-[#691C33]/5"
                      >
                        <CheckCircle className="w-3 h-3 md:w-5 md:h-5 text-[#691C33] flex-shrink-0 mt-0.5" />
                        <span className="text-[#691C33] text-xs md:text-base">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#691C33] to-[#8B2846] text-white py-2 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-lg flex items-center justify-center gap-1 md:gap-3 shadow-lg relative z-10"
                >
                  <span>ENROLL NOW - {commercialCourse.price}</span>
                  <ChevronRight className="w-3 h-3 md:w-5 md:h-5" />
                </motion.button>
              </div>

              {/* Course Levels */}
              <div className="space-y-3 md:space-y-6">
                <h4
                  className={`text-lg md:text-2xl font-bold text-[#691C33] ${gothamOffice.className}`}
                >
                  Course Structure - 2 Weeks
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {commercialCourse.levels.map((level, index) => (
                    <motion.div
                      key={level.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 border border-[#691C33]/10 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2 md:mb-3">
                        <div>
                          <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#691C33]"></div>
                            <span className="text-xs font-semibold text-[#691C33]">
                              {level.duration}
                            </span>
                          </div>
                          <h5 className="font-bold text-[#691C33] text-base md:text-xl">
                            {level.title}
                          </h5>
                          <p className="text-[#691C33]/70 text-xs md:text-base mt-1 md:mt-2">
                            {level.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-4">
                        {level.features.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs text-[#691C33] bg-[#691C33]/10 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Video Preview */}
                      <div className="mt-3 md:mt-4">
                        <button
                          onClick={() => handlePlayVideo(level.video)}
                          className="relative w-full aspect-video rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-br from-[#691C33]/10 to-[#8B2846]/10 group"
                        >
                          <div className="absolute inset-0">
                            <Image
                              src={level.thumbnail}
                              alt={level.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                              <Play className="w-3 h-3 md:w-4 md:h-4 text-white fill-white ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            Watch Preview
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Included Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#691C33]/5 to-[#8B2846]/5 rounded-xl md:rounded-3xl p-4 md:p-8 border border-[#691C33]/10"
            >
              <div className="text-center mb-4 md:mb-8">
                <h4
                  className={`text-lg md:text-2xl font-bold text-[#691C33] mb-2 ${gothamOffice.className}`}
                >
                  Everything Included
                </h4>
                <p className="text-[#691C33]/70 text-sm md:text-base max-w-2xl mx-auto">
                  Your investment includes complete access to all resources,
                  tools, and support.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                {commercialCourse.included.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white rounded-lg border border-[#691C33]/10"
                  >
                    <CheckCircle className="w-3 h-3 md:w-5 md:h-5 text-[#691C33] flex-shrink-0" />
                    <span className="text-[#691C33] font-medium text-xs md:text-sm">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="art"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 md:space-y-12"
          >
            {/* Art Series Header */}
            <div className="text-center">
              <h3
                className={`text-xl md:text-4xl font-bold text-[#691C33] mb-2 md:mb-4 ${gothamOffice.className}`}
              >
                Complete Perfumery Artistry Training
              </h3>
              <p className="text-[#691C33]/70 text-sm md:text-xl max-w-3xl mx-auto">
                Master the art of perfume creation through our comprehensive
                three-level series, launching soon.
              </p>
            </div>

            {/* Art Series Levels */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {artSeries.levels.map((level, index) => {
                const Icon = level.icon;
                return (
                  <motion.div
                    key={level.level}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-[#691C33]/10 hover:border-[#691C33]/30 transition-all shadow-lg hover:shadow-xl"
                  >
                    {/* Level Header */}
                    <div className="flex items-start md:items-center justify-between mb-3 md:mb-4">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#691C33]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#691C33]" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#691C33] bg-[#691C33]/10 px-2 py-1 rounded-full">
                            {level.level}
                          </div>
                          <h4 className="font-bold text-[#691C33] text-base md:text-lg mt-1">
                            {level.title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Level Info */}
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center text-[#691C33]/70 text-xs md:text-sm">
                        <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-[#691C33]" />
                        {level.duration}
                      </div>

                      <p className="text-[#691C33]/70 text-xs md:text-sm leading-relaxed">
                        {level.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-1 md:space-y-2">
                        {level.features.slice(0, 3).map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-1 md:gap-2"
                          >
                            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#691C33]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-1.5 h-1.5 md:w-2 md:h-2 text-[#691C33]" />
                            </div>
                            <span className="text-[#691C33] text-xs md:text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Video Preview */}
                      <div className="mt-2 md:mt-3">
                        <button
                          onClick={() => handlePlayVideo(level.video)}
                          className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-[#691C33]/10 to-[#8B2846]/10 group"
                        >
                          <div className="absolute inset-0">
                            <Image
                              src={level.thumbnail}
                              alt={level.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                              <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Status Badge */}
                      <div className="pt-3 md:pt-4 border-t border-[#691C33]/10">
                        <div className="flex items-center justify-between">
                          <div className="text-base md:text-lg font-bold text-[#691C33]">
                            {level.price}
                          </div>
                          <div className="bg-[#691C33]/10 text-[#691C33] text-xs px-2 md:px-3 py-1 rounded-full">
                            COMING SOON
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Included Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#691C33]/5 to-[#8B2846]/5 rounded-xl md:rounded-3xl p-4 md:p-8 border border-[#691C33]/10"
            >
              <div className="text-center mb-3 md:mb-8">
                <h4
                  className={`text-lg md:text-2xl font-bold text-[#691C33] mb-1 md:mb-2 ${gothamOffice.className}`}
                >
                  All Three Levels Include
                </h4>
                <p className="text-[#691C33]/70 text-sm md:text-base max-w-2xl mx-auto">
                  Comprehensive resources and support throughout your perfumery
                  journey.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                {artSeries.included.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-center text-center p-2 md:p-4 bg-white rounded-lg border border-[#691C33]/10"
                  >
                    <CheckCircle className="w-3 h-3 md:w-5 md:h-5 text-[#691C33] mb-1 md:mb-2" />
                    <span className="text-[#691C33] font-medium text-xs md:text-sm">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Waitlist CTA */}
              <div className="mt-4 md:mt-8 p-4 md:p-6 bg-white rounded-lg md:rounded-xl border border-[#691C33]/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
                  <div className="text-center md:text-left">
                    <h5 className="font-bold text-[#691C33] text-base md:text-lg mb-1">
                      Be the First to Know
                    </h5>
                    <p className="text-[#691C33]/70 text-xs md:text-sm">
                      Join the waitlist for early access and exclusive launch
                      offers
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#691C33] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow text-sm md:text-base"
                  >
                    JOIN WAITLIST
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Payment Options */}
        {selectedOption === "commercial" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-12"
          >
            <div className="bg-gradient-to-r from-[#691C33] to-[#8B2846] rounded-xl md:rounded-3xl p-4 md:p-8 text-white">
              <div className="text-center mb-4 md:mb-8">
                <Award className="w-8 h-8 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-white/80" />
                <h3
                  className={`text-xl md:text-4xl font-bold mb-2 md:mb-3 ${italiana.className}`}
                >
                  Simple One-Time Investment
                </h3>
                <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
                  Pay once and gain lifetime access to all course materials,
                  resources, and our alumni network.
                </p>
              </div>

              {/* Single Payment Highlight */}
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-2xl p-4 md:p-8 border border-white/20 max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <Shield className="w-5 h-5 md:w-8 md:h-8 text-green-300" />
                  <Gift className="w-5 h-5 md:w-8 md:h-8 text-yellow-300" />
                  <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-blue-300" />
                </div>

                <div className="text-center mb-4 md:mb-6">
                  <div className="text-2xl md:text-5xl font-bold mb-1 md:mb-2">
                    {commercialCourse.price}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    One-Time Payment • Complete Access
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-8">
                  {[
                    "No monthly commitments or hidden fees",
                    "Immediate access to all course modules",
                    "Professional certificate upon completion",
                    "Priority business support included",
                    "Lifetime updates to materials",
                    "Exclusive supplier discounts",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-green-300 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90 text-xs md:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-[#691C33] py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-lg hover:shadow-xl transition-shadow"
                >
                  PAY IN FULL & ENROLL NOW
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl lg:max-w-6xl bg-black rounded-lg md:rounded-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 md:top-4 right-2 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Video Container */}
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                controls={false}
                playsInline
                muted={isVideoMuted}
              >
                <source src="" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-4">
                    {/* Play/Pause Button */}
                    <button
                      onClick={toggleVideoPlay}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#691C33] flex items-center justify-center hover:bg-[#8B2846] transition-colors"
                    >
                      {isVideoPlaying ? (
                        <div className="flex items-center justify-center w-3 h-3 md:w-4 md:h-4">
                          <div className="w-0.5 h-3 md:h-4 bg-white mx-0.5"></div>
                          <div className="w-0.5 h-3 md:h-4 bg-white mx-0.5"></div>
                        </div>
                      ) : (
                        <Play className="w-3 h-3 md:w-4 md:h-4 text-white fill-white ml-0.5" />
                      )}
                    </button>

                    {/* Mute/Unmute Button */}
                    <button
                      onClick={toggleMute}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      {isVideoMuted ? (
                        <VolumeX className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      ) : (
                        <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      )}
                    </button>

                    {/* Video Info */}
                    <div className="ml-2 md:ml-4">
                      <h3 className="text-white font-semibold text-sm md:text-base">
                        {selectedOption === "commercial"
                          ? commercialCourse.title
                          : artSeries.title}
                      </h3>
                    </div>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={() => {
                      const container = document.querySelector(
                        ".video-modal-container"
                      );
                      if (container?.requestFullscreen) {
                        container.requestFullscreen();
                      }
                    }}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Maximize2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TuitionOptions;
