"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"

const videos = [
  {
    id: 1,
    title: "Corporate Brand Film",
    thumbnail: "/modern-office-working.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "A cinematic brand film showcasing company culture and values.",
  },
  {
    id: 2,
    title: "Wedding Highlight",
    thumbnail: "/placeholder.svg?key=bsgcu",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Capturing the most emotional moments of a special day.",
  },
  {
    id: 3,
    title: "Product Launch",
    thumbnail: "/placeholder.svg?key=73wx5",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Introducing a new product with style and impact.",
  },
]

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleVideoClick = (video: (typeof videos)[0]) => {
    setSelectedVideo(video)
    setIsOpen(true)
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl"
            onClick={() => handleVideoClick(video)}
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white">
                  <Play className="h-8 w-8" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold">{video.title}</h3>
              <p className="text-gray-600">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 sm:rounded-lg">
          {selectedVideo && (
            <div className="aspect-video w-full">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
