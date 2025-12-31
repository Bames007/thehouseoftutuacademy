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
  Sparkles,
  Clock,
  BookOpen,
  Eye,
  User,
  Video,
  Star,
  GraduationCap,
  TrendingUp,
  Volume2,
  VolumeX,
  Pause,
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
    { id: "all", label: "All Videos", icon: Video },
    { id: "lessons", label: "Class Lessons", icon: GraduationCap },
    { id: "testimonials", label: "Student Testimonials", icon: User },
    { id: "process", label: "Creation Process", icon: Sparkles },
    { id: "business", label: "Business Training", icon: TrendingUp },
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
      title: "Student Success Story - From Zero to ₦5M",
      category: "testimonials",
      description: "How our graduate built a successful fragrance brand",
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
      title: "Live Class Recording - Note Blending",
      category: "lessons",
      description: "Real-time class on blending top, middle, and base notes",
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
      title: "Scent Memory & Emotional Connection",
      category: "process",
      description: "Understanding how scents create lasting memories",
      videoUrl: "/video/commercial.mp4",
      thumbnail: courseImages[3],
      duration: "11:30",
      views: "2.1K",
      instructor: "Psychology Expert",
      featured: false,
    },
    {
      id: 9,
      title: "Advanced Marketing for Perfume Brands",
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
    if (selectedVideo === null || !selectedVideoData) return;
    const currentIndex = filteredVideos.findIndex(
      (v) => v.id === selectedVideo
    );
    const nextIndex = (currentIndex + 1) % filteredVideos.length;
    setSelectedVideo(filteredVideos[nextIndex].id);
  };

  const prevVideo = () => {
    if (selectedVideo === null || !selectedVideoData) return;
    const currentIndex = filteredVideos.findIndex(
      (v) => v.id === selectedVideo
    );
    const prevIndex =
      (currentIndex - 1 + filteredVideos.length) % filteredVideos.length;
    setSelectedVideo(filteredVideos[prevIndex].id);
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
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    if (selectedVideo !== null) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [selectedVideo]);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.09]"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-[#691C33]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tr from-[#691C33]/5 to-transparent rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 md:px-5 md:py-3 rounded-full border border-[#691C33]/10 mb-4 md:mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#691C33]" />
            <span
              className={`text-xs md:text-sm font-semibold text-[#691C33] tracking-wider ${gothamOffice.className}`}
            >
              FREE MASTERCLASS CONTENT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-[#691C33] mb-4 md:mb-6 ${italiana.className}`}
          >
            Watch & Learn For Free
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-base md:text-lg lg:text-xl text-[#691C33]/80 max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed px-4`}
          >
            Experience our teaching style with free video lessons from our
            curriculum. See why our graduates succeed in the fragrance industry.
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2"
        >
          {videoCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category.id)}
                className={`px-3 py-2 md:px-4 md:py-3 rounded-full font-medium text-xs md:text-sm lg:text-base transition-all flex items-center gap-1 md:gap-2 border ${
                  activeFilter === category.id
                    ? "bg-[#691C33] text-white border-[#691C33] shadow-lg"
                    : "bg-white text-[#691C33] border-[#691C33]/20 hover:border-[#691C33] hover:bg-[#691C33]/5"
                }`}
              >
                <Icon className="w-3 h-3 md:w-4 h-4" />
                <span className="whitespace-nowrap">{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-white border border-[#691C33]/10 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Featured Badge */}
                {video.featured && (
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                    <div className="flex items-center gap-1 bg-[#691C33] text-white px-2 py-1 md:px-3 md:py-1 rounded-full">
                      <Star className="w-2 h-2 md:w-3 h-3 fill-white" />
                      <span className="text-xs font-semibold">Featured</span>
                    </div>
                  </div>
                )}

                {/* Thumbnail - UPDATED WITH IMAGE COMPONENT */}
                <div className="relative aspect-video overflow-hidden">
                  {/* Actual Image Thumbnail */}
                  <div className="relative w-full h-full">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                    />
                  </div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Animated ring */}
                      <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 md:border-4 border-white/30 animate-ping"></div>

                      {/* Play button */}
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-black/80 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 z-10">
                    <Clock className="w-2 h-2 md:w-3 h-3" />
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#691C33]"></div>
                      <span className="text-xs font-semibold text-[#691C33] uppercase tracking-wider">
                        {video.category}
                      </span>
                    </div>
                    <h3
                      className={`text-base md:text-lg lg:text-xl font-bold text-[#691C33] mb-2 line-clamp-2 min-h-[3rem] ${gothamOffice.className}`}
                    >
                      {video.title}
                    </h3>
                    <p className="text-[#691C33]/70 text-sm md:text-base mb-4 line-clamp-2">
                      {video.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-[#691C33]/10">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="flex items-center gap-1 md:gap-2">
                        <User className="w-3 h-3 md:w-4 h-4 text-[#691C33]" />
                        <span className="text-xs md:text-sm text-[#691C33]/70 truncate max-w-[80px] md:max-w-none">
                          {video.instructor}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <Eye className="w-3 h-3 md:w-4 h-4 text-[#691C33]" />
                      <span className="text-xs md:text-sm text-[#691C33]/70">
                        {video.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Videos CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16"
        >
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 bg-gradient-to-r from-[#691C33]/5 to-[#8B2846]/5 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-[#691C33]/10 backdrop-blur-sm w-full">
            <div className="text-center md:text-left">
              <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-[#691C33] mb-1 md:mb-2">
                Access 50+ Premium Videos
              </h4>
              <p className="text-[#691C33]/70 text-sm md:text-base max-w-xl">
                Get complete access to our entire video library when you enroll
                in any course
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#691C33] to-[#8B2846] text-white px-6 py-3 md:px-8 md:py-3 rounded-lg md:rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 md:w-5 h-5" />
              View Full Curriculum
            </motion.button>
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
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-0 md:p-4"
            onClick={handleCloseModal}
          >
            {/* Navigation Buttons - Hidden on mobile, visible on tablet+ */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20 hidden md:flex"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20 hidden md:flex"
            >
              <ChevronRight className="w-4 h-4 md:w-6 h-6" />
            </button>

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 md:w-5 h-5" />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full md:w-full md:h-auto md:max-w-6xl video-modal-container"
              onClick={(e) => e.stopPropagation()}
              ref={videoContainerRef}
            >
              <div className="relative w-full h-full bg-black">
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

                {/* Custom Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-4">
                      {/* Play/Pause Button */}
                      <button
                        onClick={toggleVideoPlay}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#691C33] flex items-center justify-center hover:bg-[#8B2846] transition-colors"
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-3 h-3 md:w-4 h-4 text-white fill-white" />
                        ) : (
                          <Play className="w-3 h-3 md:w-4 h-4 text-white fill-white ml-1" />
                        )}
                      </button>

                      {/* Mute/Unmute Button */}
                      <button
                        onClick={toggleMute}
                        className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        {isVideoMuted ? (
                          <VolumeX className="w-3 h-3 md:w-4 h-4 text-white" />
                        ) : (
                          <Volume2 className="w-3 h-3 md:w-4 h-4 text-white" />
                        )}
                      </button>

                      {/* Video Info - hidden on mobile, visible on tablet+ */}
                      <div className="hidden md:block ml-2">
                        <h3 className="text-white font-semibold text-lg">
                          {selectedVideoData.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {selectedVideoData.description}
                        </p>
                      </div>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={toggleFullscreen}
                      className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-3 h-3 md:w-4 h-4 text-white" />
                      ) : (
                        <Maximize2 className="w-3 h-3 md:w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>

                  {/* Video Info for Mobile */}
                  <div className="md:hidden mt-2">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {selectedVideoData.title}
                    </h3>
                    <p className="text-gray-300 text-xs truncate">
                      {selectedVideoData.description}
                    </p>
                  </div>

                  {/* Stats for Mobile */}
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-400 md:hidden">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{selectedVideoData.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{selectedVideoData.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-3 h-3" />
                      <span>{selectedVideoData.views} views</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info in Modal - Tablet+ */}
              <div className="hidden md:block mt-4 md:mt-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2 bg-[#691C33]/20 px-3 py-1.5 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-[#691C33]"></div>
                        <span className="text-sm font-semibold text-white">
                          {selectedVideoData.category.toUpperCase()}
                        </span>
                      </div>
                      {selectedVideoData.featured && (
                        <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                          <Star className="w-3 h-3 fill-white" />
                          <span className="text-sm font-semibold">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedVideoData.title}
                    </h3>
                    <p className="text-gray-300">
                      {selectedVideoData.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-300" />
                      <span className="text-gray-300">
                        {selectedVideoData.instructor}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-300" />
                      <span className="text-gray-300">
                        {selectedVideoData.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-gray-300" />
                      <span className="text-gray-300">
                        {selectedVideoData.views} views
                      </span>
                    </div>
                  </div>
                  <button className="text-[#691C33] hover:text-white transition-colors font-semibold">
                    Save for Later
                  </button>
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
