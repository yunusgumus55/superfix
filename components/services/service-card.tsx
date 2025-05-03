import type React from "react"
import Link from "next/link"

interface ServiceCardProps {
  title: string
  description: string
  image: string
  link: string
  icon?: React.ReactNode
}

export default function ServiceCard({ title, description, image, link, icon }: ServiceCardProps) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm md:text-base">{description}</p>
      <Link href={link} className="text-orange-500 font-medium text-sm md:text-base">
        Daha fazla bilgi →
      </Link>
    </div>
  )
}
