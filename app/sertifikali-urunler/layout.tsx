import type React from "react"

export default function CertifiedProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      {children}
    </div>
  )
}
