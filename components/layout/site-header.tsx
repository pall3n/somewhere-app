import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";

const navLinks = [
  { href: "/homes", label: "Homes" },
  { href: "/places", label: "Places" },
  { href: "/find-your-place", label: "Find your place" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="font-serif text-2xl tracking-tight text-ink">
            somewhere
            <span className="text-dusty-rose">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/saved"
            className="text-sm font-medium text-stone transition-colors duration-200 hover:text-ink"
          >
            Saved
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex h-8 items-center rounded-chip bg-olive px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-olive/90"
          >
            Sign in
          </Link>
        </div>

        <MobileNav links={navLinks} />
      </Container>
    </header>
  );
}
