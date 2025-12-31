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
  Sparkles,
  Clock,
  Users,
  Award,
  BookOpen,
  Eye,
  User,
  Video,
  Star,
  Zap,
  Flame,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

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
      youtubeId: "LgC_l3K6LXI",
      thumbnail: "/video-thumb-1.jpg",
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
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "/video-thumb-2.jpg",
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
      youtubeId: "LgC_l3K6LXI",
      thumbnail: "/video-thumb-3.jpg",
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
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "/video-thumb-4.jpg",
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
      youtubeId: "LgC_l3K6LXI",
      thumbnail: "/video-thumb-5.jpg",
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
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "/video-thumb-6.jpg",
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
      youtubeId: "LgC_l3K6LXI",
      thumbnail: "/video-thumb-7.jpg",
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
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "/video-thumb-8.jpg",
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
      youtubeId: "LgC_l3K6LXI",
      thumbnail: "/video-thumb-9.jpg",
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

  const nextVideo = () => {
    if (selectedVideo === null) return;
    const currentIndex = filteredVideos.findIndex(
      (v) => v.id === selectedVideo
    );
    const nextIndex = (currentIndex + 1) % filteredVideos.length;
    setSelectedVideo(filteredVideos[nextIndex].id);
  };

  const prevVideo = () => {
    if (selectedVideo === null) return;
    const currentIndex = filteredVideos.findIndex(
      (v) => v.id === selectedVideo
    );
    const prevIndex =
      (currentIndex - 1 + filteredVideos.length) % filteredVideos.length;
    setSelectedVideo(filteredVideos[prevIndex].id);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.09]"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#691C33]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#691C33]/5 to-transparent rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#691C33]/5 px-5 py-3 rounded-full border border-[#691C33]/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#691C33]" />
            <span
              className={`text-sm font-semibold text-[#691C33] tracking-wider ${gothamOffice.className}`}
            >
              FREE MASTERCLASS CONTENT
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 md:mb-6 ${italiana.className}`}
          >
            Watch & Learn For Free
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-lg md:text-xl text-[#691C33]/80 max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
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
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {videoCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-3 rounded-full font-medium text-sm md:text-base transition-all flex items-center gap-2 border ${
                  activeFilter === category.id
                    ? "bg-[#691C33] text-white border-[#691C33] shadow-lg"
                    : "bg-white text-[#691C33] border-[#691C33]/20 hover:border-[#691C33] hover:bg-[#691C33]/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#691C33]/10 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Featured Badge */}
                {video.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1 bg-[#691C33] text-white px-3 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-white" />
                      <span className="text-xs font-semibold">Featured</span>
                    </div>
                  </div>
                )}

                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#691C33]/10 to-[#8B2846]/10"></div>
                  <div className="relative w-full h-full">
                    {/* Placeholder for image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#691C33]/20 to-[#8B2846]/20">
                      <div className="text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
                          </div>
                        </div>
                        <p className="text-white text-sm font-semibold">
                          Click to Play
                        </p>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#691C33]"></div>
                        <span className="text-xs font-semibold text-[#691C33] uppercase tracking-wider">
                          {video.category}
                        </span>
                      </div>
                      <h3
                        className={`text-lg md:text-xl font-bold text-[#691C33] mb-3 line-clamp-2 ${gothamOffice.className}`}
                      >
                        {video.title}
                      </h3>
                      <p className="text-[#691C33]/70 text-sm md:text-base mb-4 line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#691C33]/10">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#691C33]" />
                        <span className="text-sm text-[#691C33]/70">
                          {video.instructor}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#691C33]" />
                      <span className="text-sm text-[#691C33]/70">
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
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-4 bg-gradient-to-r from-[#691C33]/5 to-[#8B2846]/5 rounded-2xl p-6 md:p-8 border border-[#691C33]/10 backdrop-blur-sm">
            <div className="text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-bold text-[#691C33] mb-2">
                Access 50+ Premium Videos
              </h4>
              <p className="text-[#691C33]/70 max-w-xl">
                Get complete access to our entire video library when you enroll
                in any course
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#691C33] to-[#8B2846] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              View Full Curriculum
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const container = document.querySelector(
                  ".video-modal-container"
                );
                if (container?.requestFullscreen) {
                  container.requestFullscreen();
                }
              }}
              className="absolute top-20 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <Maximize2 className="w-5 h-5" />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-6xl video-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredVideos.map(
                (video) =>
                  video.id === selectedVideo && (
                    <div key={video.id}>
                      <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                          title={video.title}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      {/* Video Info in Modal */}
                      <div className="mt-6 text-white">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center gap-2 bg-[#691C33]/20 px-3 py-1.5 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-[#691C33]"></div>
                                <span className="text-sm font-semibold text-white">
                                  {video.category.toUpperCase()}
                                </span>
                              </div>
                              {video.featured && (
                                <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
                                  <Star className="w-3 h-3 fill-white" />
                                  <span className="text-sm font-semibold">
                                    Featured
                                  </span>
                                </div>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">
                              {video.title}
                            </h3>
                            <p className="text-gray-300">{video.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <User className="w-5 h-5 text-gray-300" />
                              <span className="text-gray-300">
                                {video.instructor}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-gray-300" />
                              <span className="text-gray-300">
                                {video.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="w-5 h-5 text-gray-300" />
                              <span className="text-gray-300">
                                {video.views} views
                              </span>
                            </div>
                          </div>
                          <button className="text-[#691C33] hover:text-white transition-colors font-semibold">
                            Save for Later
                          </button>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;
