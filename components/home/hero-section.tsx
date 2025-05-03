"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  title: string
  description: string
  image: string
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryButtonAction?: () => void
  secondaryButtonAction?: () => void
}

export default function HeroSection({
  title,
  description,
  image,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
}: HeroSectionProps) {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
      <div className="container mx-auto px-4 py-10 md:py-20 relative z-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">{title}</h1>
          <p className="text-base md:text-xl mb-6 md:mb-8">{description}</p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            {primaryButtonText && (
              <Button className="bg-gray-800 hover:bg-gray-700 w-full sm:w-auto" onClick={primaryButtonAction}>
                {primaryButtonText}
              </Button>
            )}
            {secondaryButtonText && (
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
                onClick={secondaryButtonAction}
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={1600}
        height={600}
        className="w-full h-[350px] md:h-[500px] object-cover"
        priority
      />
    </section>
  )
}
