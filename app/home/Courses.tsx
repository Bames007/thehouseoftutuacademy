// components/Sections/CoursesShowcase.tsx
"use client";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  BookOpen,
  Target,
  Globe,
  Award,
  Clock,
  Users,
  CheckCircle,
  Play,
  ChevronRight,
  Palette,
  FlaskRound,
  Briefcase,
  Lock,
  X,
  Volume2,
  VolumeX,
  Pause,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const CoursesShowcase = () => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const courses = [
    {
      level: "Level 1",
      title: "Foundation of Scent",
      duration: "4 Weeks",
      description:
        "Introduction to fragrance theory, basic scent composition, and understanding essential perfume ingredients.",
      color: "from-[#691C33] to-[#8B2846]",
      badge: "Art of Perfumery",
      features: [
        "Fragrance Families & Notes",
        "Basic Scent Blending",
        "Essential Ingredients",
        "Introduction to Equipment",
        "Safety Protocols",
      ],
      status: "coming_soon",
      previewImage: "/preview-image-one.jpeg",
      video: "/video/preview-video-one.mp4",
      icon: Palette,
      videoDescription: "Watch a preview of Level 1 course content",
    },
    {
      level: "Level 2",
      title: "Advanced Composition",
      duration: "6 Weeks",
      description:
        "Master advanced scent structures, complex accords, and professional formulation techniques.",
      color: "from-[#691C33] to-[#8B2846]",
      badge: "Art of Perfumery",
      features: [
        "Advanced Accord Building",
        "Complex Scent Structures",
        "Professional Formulation",
        "Aging & Maturation",
        "Quality Control",
      ],
      status: "coming_soon",
      previewImage: "/preview-image-two.jpeg",
      video: "/video/preview-video-two.mp4",
      icon: FlaskRound,
      videoDescription: "Preview advanced composition techniques",
    },
    {
      level: "Level 3",
      title: "Master Perfumer",
      duration: "8 Weeks",
      description:
        "Create signature scents, understand commercial formulation, and develop professional perfumery skills.",
      color: "from-[#691C33] to-[#8B2846]",
      badge: "Art of Perfumery",
      features: [
        "Signature Scent Creation",
        "Commercial Formulation",
        "Industry Standards",
        "Professional Certification",
        "Portfolio Development",
      ],
      status: "coming_soon",
      previewImage: "/preview-image-three.jpeg",
      video: "/video/preview-video-three.mp4",
      icon: Award,
      videoDescription: "See what Master Perfumer training looks like",
    },
    {
      level: "Commercial",
      title: "Business Mastery",
      duration: "Available Now",
      description:
        "Transform your perfumery skills into a profitable business with branding, marketing, and sales strategies.",
      color: "from-[#691C33] to-[#8B2846]",
      badge: "Commercial Training",
      features: [
        "Complete Business Blueprint",
        "Brand Development",
        "Pricing & Profit Margins",
        "Marketing Strategies",
        "Sales & Distribution",
      ],
      status: "available",
      price: "₦500,000",
      previewImage: "/commercial.jpeg",
      video: "/video/commercial.mp4",
      icon: Briefcase,
      videoDescription: "Watch a sample lesson from this course",
    },
  ];

  const handlePlayVideo = () => {
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setIsVideoPlaying(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  };

  const toggleVideoPlay = () => {
    if (modalVideoRef.current) {
      if (isVideoPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalVideoRef.current.muted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (videoContainerRef.current) {
        videoContainerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    if (showVideoModal && modalVideoRef.current) {
      modalVideoRef.current.play().catch(console.error);
      setIsVideoPlaying(true);
    }
  }, [showVideoModal]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    if (showVideoModal) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open on mobile
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [showVideoModal]);

  return (
    <section
      className="py-12 md:py-24 bg-white relative overflow-hidden"
      id="courses"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.07]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
              STRUCTURED LEARNING PATHS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 md:mb-6 ${italiana.className}`}
          >
            Master The Art & Business
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-base md:text-xl text-[#691C33]/80 max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Start with our Commercial Perfumery Masterclass and prepare for the
            complete Art of Perfumery series, coming soon.
          </motion.p>
        </motion.div>

        {/* Course Levels Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12"
        >
          {courses.map((course, index) => (
            <motion.button
              key={course.level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveLevel(index)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all border flex items-center gap-2 ${
                activeLevel === index
                  ? "bg-[#691C33] text-white border-[#691C33] shadow-lg"
                  : "bg-white text-[#691C33] border-[#691C33]/20 hover:border-[#691C33] hover:bg-[#691C33]/5"
              }`}
            >
              {course.level === "Commercial" ? (
                <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Lock className="w-4 h-4 md:w-5 md:h-5" />
              )}
              <span>{course.level}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Course Display */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
          {/* Course Details */}
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-[#691C33]/10 relative overflow-hidden"
          >
            {/* Pattern Background for Card */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.09]"></div>

            {/* Course Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 md:mb-8 gap-4 relative z-10">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                  <div
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r ${courses[activeLevel].color}`}
                  />
                  <span className="text-xs md:text-sm font-semibold text-[#691C33] bg-[#691C33]/10 px-3 py-1 rounded-full">
                    {courses[activeLevel].badge}
                  </span>
                  {courses[activeLevel].status === "coming_soon" && (
                    <span className="text-xs md:text-sm font-semibold text-white bg-[#691C33] px-3 py-1 rounded-full">
                      COMING SOON
                    </span>
                  )}
                </div>
                <h3
                  className={`text-2xl md:text-4xl font-bold text-[#691C33] mb-2 ${gothamOffice.className}`}
                >
                  {courses[activeLevel].title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[#691C33]/70 text-sm md:text-base">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#691C33]" />
                    {courses[activeLevel].duration}
                  </div>
                  {courses[activeLevel].status === "available" && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#691C33]" />
                      Limited Seats
                    </div>
                  )}
                </div>
              </div>

              {courses[activeLevel].status === "available" && (
                <div className="text-right">
                  <div className="text-sm text-[#691C33]/70">Starting from</div>
                  <div className="text-3xl md:text-4xl font-bold text-[#691C33]">
                    {courses[activeLevel].price}
                  </div>
                </div>
              )}
            </div>

            <p className="text-[#691C33]/70 text-base md:text-lg mb-6 md:mb-8 leading-relaxed relative z-10">
              {courses[activeLevel].description}
            </p>

            {/* Features */}
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 relative z-10">
              <h4
                className={`text-lg md:text-xl font-bold text-[#691C33] ${gothamOffice.className}`}
              >
                What You'll Learn
              </h4>
              {courses[activeLevel].features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#691C33]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#691C33]" />
                  </div>
                  <span className="text-[#691C33] text-sm md:text-base">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            {courses[activeLevel].status === "coming_soon" ? (
              <div className="relative overflow-hidden rounded-xl border border-[#691C33]/20 bg-[#691C33]/5 p-4 md:p-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#691C33]/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 md:w-6 md:h-6 text-[#691C33]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#691C33] text-lg md:text-xl mb-1">
                      Course Coming Soon
                    </h4>
                    <p className="text-[#691C33]/70 text-sm md:text-base">
                      Join the waitlist to be notified when this course launches
                    </p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-[#691C33]/10 text-[#691C33] py-3 rounded-lg font-semibold text-base md:text-lg hover:bg-[#691C33]/20 transition-colors">
                  JOIN WAITLIST
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(105, 28, 51, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#691C33] to-[#8B2846] text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 shadow-lg relative z-10"
              >
                <span>ENROLL IN COMMERCIAL MASTERCLASS</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            )}
          </motion.div>

          {/* Course Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            {/* Course Image/Video Preview */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-6 md:mb-8">
              <div className="aspect-[4/3] md:aspect-video relative bg-gradient-to-br from-[#691C33]/10 to-[#8B2846]/10">
                <div className="relative w-full h-full">
                  <Image
                    src={courses[activeLevel].previewImage}
                    alt={`${courses[activeLevel].title} Preview`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Play button overlay */}
                  <button
                    onClick={handlePlayVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 group"
                    aria-label="Play video preview"
                  >
                    <div className="relative">
                      {/* Animated ring */}
                      <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/30 animate-ping group-hover:animate-none"></div>

                      {/* Play button */}
                      <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-5 h-5 md:w-7 md:h-7 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Play text - hidden on mobile, visible on tablet+ */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#691C33]/80 backdrop-blur-sm rounded-lg hidden sm:block">
                      <p className="text-white text-sm font-semibold">
                        PLAY PREVIEW
                      </p>
                    </div>
                  </button>
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-6">
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    {(() => {
                      const IconComponent = courses[activeLevel].icon;
                      return (
                        <IconComponent className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      );
                    })()}
                    <span className="text-white text-sm md:text-base font-semibold truncate">
                      {courses[activeLevel].title}
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm line-clamp-2">
                    {courses[activeLevel].videoDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Included Materials */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-[#691C33]/10 shadow-lg relative overflow-hidden">
              {/* Pattern Background */}
              <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.03]"></div>

              <h4
                className={`text-lg md:text-xl font-bold text-[#691C33] mb-4 relative z-10 ${gothamOffice.className}`}
              >
                Course Includes
              </h4>
              <div className="grid grid-cols-2 gap-3 md:gap-4 relative z-10">
                {[
                  {
                    icon: BookOpen,
                    label: "Workbook",
                  },
                  {
                    icon: Target,
                    label: "Projects",
                  },
                  {
                    icon: Award,
                    label: "Certificate",
                  },
                  {
                    icon: Globe,
                    label: "Resources",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex flex-col items-center p-2 md:p-3 rounded-xl border border-[#691C33]/10 hover:border-[#691C33]/20 hover:shadow-md transition-all bg-white/50 backdrop-blur-sm"
                  >
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-[#691C33]/10 flex items-center justify-center mb-1 md:mb-2">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 md:w-6 md:h-6 text-[#691C33]" />
                    </div>
                    <span className="font-medium text-[#691C33] text-xs md:text-sm text-center">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Program Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20"
        >
          <div className="text-center mb-8 md:mb-12">
            <h3
              className={`text-2xl md:text-3xl lg:text-4xl font-black text-[#691C33] mb-4 ${italiana.className}`}
            >
              Program Structure
            </h3>
            <p
              className={`text-[#691C33]/80 max-w-2xl mx-auto ${gothamOffice.className}`}
            >
              A comprehensive journey from artistic mastery to commercial
              success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-4 md:p-6 border-2 relative overflow-hidden ${
                  course.status === "available"
                    ? "border-[#691C33] shadow-lg"
                    : "border-[#691C33]/10 hover:border-[#691C33]/30"
                }`}
              >
                {/* Pattern Background */}
                <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.03]"></div>

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${course.color}`}
                      />
                      <span className="text-xs font-semibold text-[#691C33] bg-[#691C33]/10 px-2 py-1 rounded-full">
                        {course.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-[#691C33] text-lg md:text-xl">
                      {course.level}
                    </h4>
                    <p className="text-[#691C33]/70 text-sm md:text-base mt-1">
                      {course.title}
                    </p>
                  </div>
                  {course.status === "coming_soon" && (
                    <div className="bg-[#691C33]/10 text-[#691C33] text-xs px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                  )}
                </div>

                <div className="space-y-2 relative z-10">
                  <div className="flex items-center text-[#691C33]/70 text-sm">
                    <Clock className="w-3 h-3 md:w-4 h-4 mr-2 text-[#691C33]" />
                    {course.duration}
                  </div>
                  {course.status === "available" && (
                    <div className="text-base md:text-lg font-bold text-[#691C33]">
                      {course.price}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setActiveLevel(index)}
                  className={`w-full mt-4 py-2 rounded-lg font-medium text-sm transition-colors relative z-10 ${
                    course.status === "available"
                      ? "bg-[#691C33] text-white hover:bg-[#8B2846]"
                      : "bg-[#691C33]/10 text-[#691C33] hover:bg-[#691C33]/20"
                  }`}
                >
                  {course.status === "available"
                    ? "Learn More"
                    : "Join Waitlist"}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-0 md:p-4">
          <div
            ref={videoContainerRef}
            className="relative w-full h-full md:w-full md:h-auto md:max-w-6xl bg-black md:rounded-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Video Container */}
            <div className="relative w-full h-full">
              <video
                ref={modalVideoRef}
                className="w-full h-full object-contain"
                controls={false}
                onEnded={handleVideoEnd}
                playsInline
                muted={isVideoMuted}
              >
                <source src={courses[activeLevel].video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-4">
                    {/* Play/Pause Button */}
                    <button
                      onClick={toggleVideoPlay}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#691C33] flex items-center justify-center hover:bg-[#8B2846] transition-colors"
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
                      ) : (
                        <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white ml-1" />
                      )}
                    </button>

                    {/* Mute/Unmute Button */}
                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      {isVideoMuted ? (
                        <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      ) : (
                        <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      )}
                    </button>

                    {/* Video Info - hidden on mobile, visible on tablet+ */}
                    <div className="hidden md:block ml-2">
                      <h3 className="text-white font-semibold text-lg">
                        {courses[activeLevel].title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {courses[activeLevel].videoDescription}
                      </p>
                    </div>
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    ) : (
                      <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    )}
                  </button>
                </div>

                {/* Video Info for Mobile */}
                <div className="md:hidden mt-2">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {courses[activeLevel].title}
                  </h3>
                  <p className="text-gray-300 text-xs truncate">
                    {courses[activeLevel].videoDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoursesShowcase;
