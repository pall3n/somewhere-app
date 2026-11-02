"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavProps {
  links: readonly { href: string; label: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger
        className="inline-flex size-8 items-center justify-center rounded-lg text-stone hover:bg-muted md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">
            somewhere<span className="text-dusty-rose">.</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4 px-4" aria-label="Mobile">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-stone transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-border" />
          <Link
            href="/saved"
            className="text-base font-medium text-stone transition-colors duration-200 hover:text-ink"
          >
            Saved
          </Link>
          <Link
            href="/sign-in"
            className="text-base font-medium text-stone transition-colors duration-200 hover:text-ink"
          >
            Sign in
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
