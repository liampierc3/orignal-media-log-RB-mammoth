import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "The team delivered beyond our expectations. The video perfectly captured our brand essence and has significantly boosted our online engagement.",
    author: "Emily Chen",
    company: "TechStart Inc.",
  },
  {
    quote:
      "Professional, creative, and incredibly responsive. They transformed our corporate event into a compelling story that resonates with our audience.",
    author: "Marcus Johnson",
    company: "Global Enterprises",
  },
  {
    quote:
      "Working with this team was a game-changer for our product launch. The quality of their work and attention to detail is unmatched.",
    author: "Sophia Rodriguez",
    company: "Innovate Solutions",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-900 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Client Testimonials</h2>
          <p className="mx-auto max-w-2xl text-gray-300">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800 border-none">
              <CardContent className="p-8">
                <Quote className="mb-4 h-10 w-10 text-red-500" />
                <p className="mb-6 text-lg italic text-gray-200">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
