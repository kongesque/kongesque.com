import { Header } from "@/components/header"
import { SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"
import { Footer } from "@/components/footer"

const projectItems = [
  {
    title: "locus-vision",
    role: "creator",
    period: "dec 2025 - Present",
    description:
      "An open-source vision analytics engine powered by YOLO11, optimized for edge devices. Features real-time object detection, tracking, line crossing, and spatial zone counting. 100% offline and fully self-hosted.",
    href: "https://github.com/Kongesque/locus-vision",
  },
  {
    title: "lemon & herbs",
    role: "creator",
    period: "nov 2025",
    description:
      "A bilingual brand showcase for a nursery in Hua Hin. Features a minimalist, nature-centric UI with seamless localization (TH/EN) to highlight artisanal lemon trees and herbs.",
    href: "https://www.lemonnherbs.com/",
  },
  {
    title: "custom-region-object-counter-YOLOV8",
    role: "creator",
    period: "mar 2024 - may 2024",
    description:
      "A web app for detecting and counting objects in videos using YOLOv8 for detection and ByteTrack for tracking, with customizable regions of interest (ROIs) function.",
    href: "https://github.com/Kongesque/custom-region-object-counter-YOLOV8",
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "kongesque",
            url: "https://www.kongesque.com",
            author: {
              "@type": "Person",
              name: "Kongesque",
              description: "Kongesque is a software engineer who specializes in building intelligent, offline-first edge AI systems. Builder of open-source computer vision and privacy-first video analytics tools.",
              url: "https://www.kongesque.com",
              knowsAbout: [
                "Computer Vision",
                "Edge AI",
                "Object Detection",
                "Object Tracking",
                "YOLO11",
                "YOLOv8",
                "ByteTrack",
                "OpenCV",
                "Real-Time Video Analytics",
                "Self-Hosted Infrastructure",
                "Privacy-First Software",
                "Full-Stack Web Development",
                "Next.js",
                "FastAPI",
                "Docker",
                "TypeScript",
                "Open Source Development",
                "Retail Analytics"
              ],
              email: "mailto:kongesque@gmail.com",
              sameAs: [
                "https://github.com/Kongesque",
                "https://gitee.com/kongesque",
                "https://huggingface.co/kongesque",
                "https://www.reddit.com/user/kongesque/",
              ],
              jobTitle: "Software Engineer"
            }
          }),
        }}
      />
      <Header />

      <SectionList
        title="Projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="More projects"
      />
      <BlogSection />
      <LinksSection />
      <Footer />
    </>
  )
}