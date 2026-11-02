"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  address: string;
}

export function SaveButton({ address }: SaveButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-3 right-3 z-20 size-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
      aria-label={`Save ${address}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Heart className="size-4 text-stone" />
    </Button>
  );
}
