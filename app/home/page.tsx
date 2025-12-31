import AboutAcademy from "./About";
import Contact from "./Contact";
import CoursesShowcase from "./Courses";
import Curriculum from "./Curriculum";
import EnrollmentPage from "./EnrollmentProcess";
import FAQ from "./FAQ";
import Founder from "./Founder";
import Hero from "./Hero";
import PerfumeFunFacts from "./PerfumeFunFacts";
import StudentSuccess from "./StudentSuccess";
import Testimonials from "./Testimonials";
import TuitionOptions from "./TutionOptions";
import VideoGallery from "./VideoGallery";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <AboutAcademy />
      <Founder />
      <Curriculum />
      <CoursesShowcase />
      <VideoGallery />
      <TuitionOptions />
      <StudentSuccess />
      <EnrollmentPage />
      <Testimonials />
      <PerfumeFunFacts />
      <FAQ />
      <Contact />
    </div>
  );
}
