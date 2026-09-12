import { Header } from "@/components/header"
import { SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"
import { Footer } from "@/components/footer"

const projectItems = [
  {
    title: "locus-vision",
    role: "creator",
    period: "dec 2025 - present",
    description:
      "An open-source vision analytics engine powered by YOLO11, optimized for edge devices. Features real-time object detection, tracking, line crossing, and spatial zone counting. 100% offline and fully self-hosted.",
    href: "https://github.com/Kongesque/locus-vision",
  },
  {
    title: "line-cli",
    role: "creator",
    period: "sep 2026 - present",
    description:
      "An unofficial command-line client for personal LINE accounts. Read and send messages, share files, react, watch live events, and automate workflows with JSON, with Letter Sealing end-to-end encryption.",
    href: "https://github.com/kongesque/line-cli",
  },
  {
    title: "flow free solver",
    role: "creator",
    period: "nov 2024",
    description:
      "A web-based solver for the Flow Free puzzle game. Powered by Heuristic BFS, SAT (Z3) & A* search.",
    href: "https://flow.kongesque.com/",
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

      <BlogSection />
      <SectionList
        title="Projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="More projects"
      />
      <LinksSection />
      <Footer />
    </>
  )
}
