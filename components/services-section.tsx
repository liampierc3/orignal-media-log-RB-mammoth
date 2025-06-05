import { Camera, Film, Edit, Mic, PenTool, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Commercial Production",
    description: "High-quality commercials that capture attention and drive results for your brand.",
    icon: <Film className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Corporate Videos",
    description: "Professional videos for internal communications, training, and company events.",
    icon: <Camera className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Event Coverage",
    description: "Comprehensive coverage of conferences, weddings, and special occasions.",
    icon: <Video className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Post-Production",
    description: "Expert editing, color grading, and visual effects to perfect your footage.",
    icon: <Edit className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Audio Production",
    description: "Professional sound design, mixing, and voice-over services.",
    icon: <Mic className="h-10 w-10 text-red-600" />,
  },
  {
    title: "Creative Direction",
    description: "Strategic creative guidance to bring your vision to life effectively.",
    icon: <PenTool className="h-10 w-10 text-red-600" />,
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Our Services</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            We offer a comprehensive range of video production services to meet your specific needs.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
