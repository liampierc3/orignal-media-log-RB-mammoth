import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Linkedin, Twitter } from "lucide-react"

const team = [
  {
    name: "Alex Johnson",
    role: "Creative Director",
    image: "/placeholder.svg?key=ucych",
    bio: "With over 15 years of experience in film and video production, Alex leads our creative team.",
  },
  {
    name: "Sarah Williams",
    role: "Lead Cinematographer",
    image: "/professional-woman-camera.png",
    bio: "Sarah's eye for composition and lighting brings a unique visual style to every project.",
  },
  {
    name: "Michael Chen",
    role: "Senior Editor",
    image: "/placeholder.svg?key=r1fuu",
    bio: "Michael transforms raw footage into compelling stories with his expert editing skills.",
  },
  {
    name: "Jessica Rodriguez",
    role: "Production Manager",
    image: "/placeholder.svg?key=bywji",
    bio: "Jessica ensures every production runs smoothly from pre-production to final delivery.",
  },
]

export default function TeamSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Meet Our Team</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Our talented professionals bring creativity, technical expertise, and passion to every project.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg">
              <div className="aspect-square relative">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                <p className="mb-3 text-red-600">{member.role}</p>
                <p className="mb-4 text-sm text-gray-600">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-500 hover:text-red-600">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-red-600">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-red-600">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
