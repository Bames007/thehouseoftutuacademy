// components/Sections/VideoGallery.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Clock,
  Eye,
  User,
  Video,
  GraduationCap,
  TrendingUp,
  Volume2,
  VolumeX,
  Pause,
  FlaskRound,
  BookOpen,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const courseImages = [
    "/preview-image-one.jpeg",
    "/preview-image-two.jpeg",
    "/preview-image-three.jpeg",
    "/commercial.jpeg",
  ];

  const videoCategories = [
    { id: "all", label: "All", icon: Video },
    { id: "lessons", label: "Lessons", icon: GraduationCap },
    { id: "testimonials", label: "Stories", icon: User },
    { id: "process", label: "Process", icon: FlaskRound },
    { id: "business", label: "Business", icon: TrendingUp },
  ];

  const videos = [
    {
      id: 1,
      title: "Fragrance Oil Grades Explained",
      category: "lessons",
      description:
        "Master the difference between A, B, and C grade fragrance oils",
      videoUrl: "/video/preview-video-one.mp4",
      thumbnail: courseImages[0],
      duration: "8:42",
      views: "1.2K",
      instructor: "Ramatu Shehu",
      featured: true,
    },
    {
      id: 2,
      title: "Creating Your First Scent",
      category: "lessons",
      description: "Step-by-step guide to creating a balanced fragrance",
      videoUrl: "/video/preview-video-two.mp4",
      thumbnail: courseImages[1],
      duration: "15:23",
      views: "2.4K",
      instructor: "Master Perfumer",
      featured: false,
    },
    {
      id: 3,
      title: "From Zero to ₦5M — A Student Story",
      category: "testimonials",
      description: "How a graduate built a successful fragrance brand",
      videoUrl: "/video/preview-video-three.mp4",
      thumbnail: courseImages[2],
      duration: "6:18",
      views: "3.1K",
      instructor: "Graduate Spotlight",
      featured: true,
    },
    {
      id: 4,
      title: "Packaging & Branding Masterclass",
      category: "business",
      description: "Create luxury packaging that sells",
      videoUrl: "/video/commercial.mp4",
      thumbnail: courseImages[3],
      duration: "12:45",
      views: "1.8K",
      instructor: "Brand Expert",
      featured: false,
    },
    {
      id: 5,
      title: "Supplier Sourcing Secrets",
      category: "business",
      description: "Find and vet international suppliers",
      videoUrl: "/video/preview-video-one.mp4",
      thumbnail: courseImages[0],
      duration: "10:32",
      views: "2.7K",
      instructor: "Sourcing Specialist",
      featured: false,
    },
    {
      id: 6,
      title: "Live Class — Note Blending",
      category: "lessons",
      description: "Real-time class on top, middle, and base notes",
      videoUrl: "/video/preview-video-two.mp4",
      thumbnail: courseImages[1],
      duration: "22:15",
      views: "4.2K",
      instructor: "Ramatu Shehu",
      featured: true,
    },
    {
      id: 7,
      title: "Perfume Business Pricing Strategy",
      category: "business",
      description: "How to price your products for maximum profit",
      videoUrl: "/video/preview-video-three.mp4",
      thumbnail: courseImages[2],
      duration: "9:45",
      views: "1.5K",
      instructor: "Business Coach",
      featured: false,
    },
    {
      id: 8,
      title: "Scent Memory & Emotion",
      category: "process",
      description: "How scents create lasting memories",
      videoUrl: "/video/commercial.mp4",
      thumbnail: courseImages[3],
      duration: "11:30",
      views: "2.1K",
      instructor: "Psychology Expert",
      featured: false,
    },
    {
      id: 9,
      title: "Marketing for Perfume Brands",
      category: "business",
      description: "Digital marketing strategies for fragrance businesses",
      videoUrl: "/video/preview-video-one.mp4",
      thumbnail: courseImages[0],
      duration: "14:20",
      views: "3.3K",
      instructor: "Marketing Specialist",
      featured: true,
    },
  ];

  const filteredVideos =
    activeFilter === "all"
      ? videos
      : videos.filter((video) => video.category === activeFilter);

  const selectedVideoData = selectedVideo
    ? videos.find((video) => video.id === selectedVideo)
    : null;

  const nextVideo = () => {
    if (selectedVideo === null) return;
    const currentIndex = filteredVideos.findIndex(
      (v) => v.id === selectedVideo,
    );
    const nextIndex = (currentIndex + 1) % filteredVideos.length;
    setSelectedVideo(filteredVideos[nextIndex].id);
  };

  const prevVideo = () => {
    if (selectedVideo === null) return;
    const currentIndex = filteredVideos.findIndex(
      (v) => v.id === selectedVideo,
    );
    const prevIndex =
      (currentIndex - 1 + filteredVideos.length) % filteredVideos.length;
    setSelectedVideo(filteredVideos[prevIndex].id);
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

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsVideoPlaying(true);
    }
  }, [selectedVideo]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowRight") nextVideo();
      if (e.key === "ArrowLeft") prevVideo();
    };
    if (selectedVideo !== null) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [selectedVideo]);

  return (
    <section
      id="gallery"
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
          opacity: 0.05,
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
              WATCH & LEARN
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 leading-tight ${italiana.className}`}
          >
            Free Video Lessons
          </h2>

          <p
            className={`text-base md:text-lg text-[#691C33] max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Experience our teaching style with free lessons from our curriculum.
            See why our graduates succeed.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-2.5 mb-8 md:mb-10"
        >
          {videoCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-3.5 py-2.5 md:px-4 md:py-2.5 rounded-full font-semibold text-xs md:text-sm transition-all flex items-center gap-1.5 border-2 ${
                  isActive
                    ? "bg-[#691C33] text-white border-[#691C33] shadow-md"
                    : "bg-white text-[#691C33] border-[#691C33]/20 hover:border-[#691C33]/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, index) => (
              <motion.button
                key={video.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedVideo(video.id)}
                className="group text-left"
              >
                <div className="bg-white rounded-2xl overflow-hidden border-2 border-[#691C33]/10 hover:border-[#691C33]/30 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-[#2b0a15]">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors" />

                    {/* Featured badge */}
                    {video.featured && (
                      <div className="absolute top-3 left-3 bg-[#691C33] text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10">
                        Featured
                      </div>
                    )}

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/85 text-white px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 z-10">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </div>

                    {/* Play */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/25 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 md:w-7 md:h-7 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#691C33] uppercase tracking-wider bg-[#691C33]/10 px-2 py-0.5 rounded-full">
                        {video.category}
                      </span>
                    </div>

                    <h3
                      className={`text-base md:text-lg font-bold text-[#691C33] mb-2 line-clamp-2 leading-snug ${gothamOffice.className}`}
                    >
                      {video.title}
                    </h3>

                    <p className="text-sm text-[#691C33] line-clamp-2 leading-relaxed mb-4 flex-grow">
                      {video.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#691C33]/10">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <User className="w-3.5 h-3.5 text-[#691C33] flex-shrink-0" />
                        <span className="text-xs font-medium text-[#691C33] truncate">
                          {video.instructor}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Eye className="w-3.5 h-3.5 text-[#691C33]" />
                        <span className="text-xs font-medium text-[#691C33]">
                          {video.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#691C33] text-lg font-medium">
              No videos in this category yet.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16"
        >
          <div className="bg-[#691C33] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h4
                className={`text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 ${italiana.className}`}
              >
                Access 50+ Premium Videos
              </h4>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Get complete access to our entire video library when you enroll
                in any program.
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/enrollment")}
              className="bg-white text-[#691C33] px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-white/95 transition-colors whitespace-nowrap"
            >
              <BookOpen className="w-5 h-5" />
              View Full Curriculum
            </button>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo !== null && selectedVideoData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-0 md:p-4"
            onClick={handleCloseModal}
          >
            {/* Prev / Next (desktop only) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-colors z-20 hidden md:flex"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-colors z-20 hidden md:flex"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full md:h-auto md:max-w-5xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              ref={videoContainerRef}
            >
              {/* Video */}
              <div className="relative w-full flex-1 md:flex-initial bg-black md:rounded-t-2xl overflow-hidden">
                <div className="relative w-full aspect-video bg-black">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    controls={false}
                    onEnded={handleVideoEnd}
                    playsInline
                    muted={isVideoMuted}
                  >
                    <source src={selectedVideoData.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 md:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 md:gap-3">
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
                          {selectedVideoData.title}
                        </h3>
                        <p className="text-white/70 text-xs truncate">
                          {selectedVideoData.instructor} ·{" "}
                          {selectedVideoData.duration}
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
                </div>
              </div>

              {/* Info panel (mobile + desktop) */}
              <div className="bg-white md:rounded-b-2xl p-4 md:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-white bg-[#691C33] uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {selectedVideoData.category}
                  </span>
                  {selectedVideoData.featured && (
                    <span className="text-[10px] font-bold text-[#691C33] bg-[#691C33]/10 uppercase tracking-wider px-2.5 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-lg md:text-2xl font-bold text-[#691C33] mb-2 leading-tight">
                  {selectedVideoData.title}
                </h3>
                <p className="text-sm md:text-base text-[#691C33] leading-relaxed mb-4">
                  {selectedVideoData.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4 border-t border-[#691C33]/10 text-sm text-[#691C33]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">
                      {selectedVideoData.instructor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">
                      {selectedVideoData.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">
                      {selectedVideoData.views} views
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;
