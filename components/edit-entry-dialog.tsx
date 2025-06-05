"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Loader2, Pencil } from "lucide-react"
import type { VideoEntry } from "@/types/video"
import { athletes } from "@/data/athletes"

interface EditEntryDialogProps {
  entry: VideoEntry | null
  onSave: (id: string, updatedEntry: Partial<VideoEntry>) => Promise<boolean>
  onClose: () => void
}

export default function EditEntryDialog({ entry, onSave, onClose }: EditEntryDialogProps) {
  const [formData, setFormData] = useState<Partial<VideoEntry>>({})
  const [loading, setLoading] = useState(false)

  // Sort athletes alphabetically
  const sortedAthletes = [...athletes].sort((a, b) => a.localeCompare(b))

  // Initialize form data when entry changes
  useEffect(() => {
    if (entry) {
      setFormData({
        athlete: entry.athlete,
        shooter: entry.shooter,
        editor: entry.editor,
        date: entry.date,
        title: entry.title,
        description: entry.description,
        status: entry.status,
        linkUrl: entry.linkUrl || "",
      })
    }
  }, [entry])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!entry) return

    setLoading(true)
    try {
      const success = await onSave(entry.id, formData)
      if (success) {
        onClose()
      }
    } finally {
      setLoading(false)
    }
  }

  if (!entry) return null

  return (
    <Dialog open={!!entry} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5" />
            Edit Video Entry
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="edit-athlete" className="font-medium">
              Athlete
            </label>
            <Select value={formData.athlete} onValueChange={(value) => handleInputChange("athlete", value)}>
              <SelectTrigger id="edit-athlete">
                <SelectValue placeholder="Select an athlete" />
              </SelectTrigger>
              <SelectContent className="max-h-[40vh]">
                {sortedAthletes.map((athlete) => (
                  <SelectItem key={athlete} value={athlete}>
                    {athlete}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-shooter" className="font-medium">
              Shooter
            </label>
            <Select value={formData.shooter} onValueChange={(value) => handleInputChange("shooter", value)}>
              <SelectTrigger id="edit-shooter">
                <SelectValue placeholder="Select shooter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Jack">Jack</SelectItem>
                <SelectItem value="Cullen">Cullen</SelectItem>
                <SelectItem value="Marinho">Marinho</SelectItem>
                <SelectItem value="Rafe">Rafe</SelectItem>
                <SelectItem value="Multiple">Multiple</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-editor" className="font-medium">
              Editor
            </label>
            <Select value={formData.editor} onValueChange={(value) => handleInputChange("editor", value)}>
              <SelectTrigger id="edit-editor">
                <SelectValue placeholder="Select editor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Drew">Drew</SelectItem>
                <SelectItem value="Liam">Liam</SelectItem>
                <SelectItem value="Cullen">Cullen</SelectItem>
                <SelectItem value="Jack">Jack</SelectItem>
                <SelectItem value="Marinho">Marinho</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-date" className="font-medium">
              Date
            </label>
            <Input
              type="date"
              id="edit-date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-title" className="font-medium">
              Video Title
            </label>
            <Input
              type="text"
              id="edit-title"
              placeholder="Enter video title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="edit-status" className="font-medium">
              Status
            </label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger id="edit-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="edit-description" className="font-medium">
              Video Content/Description
            </label>
            <Textarea
              id="edit-description"
              rows={3}
              placeholder="Describe what the video contains"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="edit-linkUrl" className="font-medium">
              Video Link
            </label>
            <Input
              type="text"
              id="edit-linkUrl"
              placeholder="Add link to the video"
              value={formData.linkUrl}
              onChange={(e) => handleInputChange("linkUrl", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading} className="w-full sm:w-auto">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
