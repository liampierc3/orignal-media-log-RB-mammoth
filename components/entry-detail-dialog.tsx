"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil, ExternalLink, Calendar, User, Film, FileText, CheckCircle } from "lucide-react"
import type { VideoEntry } from "@/types/video"

interface EntryDetailDialogProps {
  entry: VideoEntry | null
  onClose: () => void
  onEdit: (entry: VideoEntry) => void
}

export default function EntryDetailDialog({ entry, onClose, onEdit }: EntryDetailDialogProps) {
  if (!entry) return null

  return (
    <Dialog open={!!entry} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{entry.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{entry.date}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 w-full sm:w-auto"
                onClick={() => onEdit(entry)}
              >
                <Pencil className="h-4 w-4" />
                Edit Entry
              </Button>
              {entry.linkUrl && (
                <Button variant="outline" size="sm" className="flex items-center gap-1 w-full sm:w-auto" asChild>
                  <a href={entry.linkUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View Video
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Athlete</h3>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                <p className="text-lg">{entry.athlete}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Shooter</h3>
              <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-red-500" />
                <p className="text-lg">{entry.shooter}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Editor</h3>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                <p className="text-lg">{entry.editor}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <div className="flex items-center gap-2">
              <CheckCircle className={`h-5 w-5 ${getStatusColor(entry.status)}`} />
              <p className="text-lg">{entry.status}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Content Description</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="whitespace-pre-wrap">{entry.description || "No description provided."}</p>
            </div>
          </div>

          {entry.linkUrl && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Video Link</h3>
              <a
                href={entry.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1 break-all"
              >
                {entry.linkUrl}
                <ExternalLink className="h-3 w-3 flex-shrink-0" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getStatusColor(status: string): string {
  switch (status) {
    case "Completed":
      return "text-green-500"
    case "In Progress":
      return "text-amber-500"
    case "Published":
      return "text-blue-500"
    default:
      return "text-gray-500"
  }
}
