import Link from "next/link"
import { EchoLogo } from './echo-logo';

export function Footer() {
  return (
    <footer className="animate-fade-in-up">
      <hr className="border-0 border-t-2 border-line" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-xs sm:text-sm text-primary pt-6">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center hover:text-accent transition-colors duration-300"
        >
          <EchoLogo size={32} />
        </Link>
        <small className="font-semibold text-xs">© {new Date().getFullYear()} Kongesque — Unapologetically Curious</small>
      </div>
    </footer>
  )
}