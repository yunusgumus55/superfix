"use client"
import { useMediaQuery } from "@/hooks/use-media-query"
import DesktopFooter from "@/components/layout/desktop-footer"
import MobileFooter from "@/components/layout/mobile-footer"

export default function Footer() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return isMobile ? <MobileFooter /> : <DesktopFooter />
}
