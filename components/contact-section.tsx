"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle form submission, e.g., send data to an API
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", email: "", phone: "", message: "" })
    alert("Thanks for your message! We'll get back to you soon.")
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Get In Touch</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Ready to start your next video project? Contact us today to discuss your ideas and requirements.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-2xl font-semibold">Contact Information</h3>
            <div className="mb-8 space-y-4">
              <div className="flex items-start">
                <Mail className="mr-4 h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <a href="mailto:info@videoproduction.com" className="text-gray-600 hover:text-red-600">
                    info@videoproduction.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-4 h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <a href="tel:+1234567890" className="text-gray-600 hover:text-red-600">
                    (123) 456-7890
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-4 h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium">Visit Us</p>
                  <p className="text-gray-600">
                    123 Creative Studio St.
                    <br />
                    Los Angeles, CA 90001
                  </p>
                </div>
              </div>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1620930800924!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Our Location"
              ></iframe>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-semibold">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[150px] w-full"
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
