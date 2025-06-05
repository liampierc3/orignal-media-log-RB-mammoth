"use client"

import { useState } from "react"
import type { VideoEntry } from "@/types/video"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, ExternalLink, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EntryDetailDialog from "./entry-detail-dialog"

interface EditorBinsProps {
  videoData: VideoEntry[]
  updateVideoLink: (id: string, linkUrl: string) => Promise<boolean>
  onEditEntry?: (entry: VideoEntry) => void
}

export default function EditorBins({ videoData, updateVideoLink, onEditEntry }: EditorBinsProps) {
  // Initialize with all bins closed
  const [openBins, setOpenBins] = useState<Record<string, boolean>>({})
  const [mediaLinks, setMediaLinks] = useState<Record<string, string>>({})
  const [savingLinks, setSavingLinks] = useState<Record<string, boolean>>({})
  const [expandedBins, setExpandedBins] = useState<Record<string, boolean>>({})
  const [viewingEntry, setViewingEntry] = useState<VideoEntry | null>(null)

  // Number of entries to show initially
  const initialEntries = 5

  const editors = ["Drew", "Liam", "Cullen", "Jack", "Marinho"]

  const toggleBin = (editor: string) => {
    setOpenBins((prev) => ({
      ...prev,
      [editor]: !prev[editor],
    }))
  }

  const toggleAllBins = (isOpen: boolean) => {
    const newState: Record<string, boolean> = {}
    editors.forEach((editor) => {
      newState[editor] = isOpen
    })
    setOpenBins(newState)
  }

  const handleLinkChange = (videoId: string, value: string) => {
    setMediaLinks((prev) => ({
      ...prev,
      [videoId]: value,
    }))
  }

  const saveLink = async (videoId: string) => {
    setSavingLinks((prev) => ({ ...prev, [videoId]: true }))

    try {
      const linkUrl = mediaLinks[videoId] || ""
      const success = await updateVideoLink(videoId, linkUrl)

      if (success) {
        // Clear the local state since we've updated Firebase
        setMediaLinks((prev) => {
          const newState = { ...prev }
          delete newState[videoId]
          return newState
        })
      }
    } finally {
      setSavingLinks((prev) => ({ ...prev, [videoId]: false }))
    }
  }

  const toggleExpand = (editor: string) => {
    setExpandedBins((prev) => ({
      ...prev,
      [editor]: !prev[editor],
    }))
  }

  const handleViewDetails = (entry: VideoEntry) => {
    setViewingEntry(entry)
  }

  const handleEditEntry = (entry: VideoEntry) => {
    if (onEditEntry) {
      // First close the detail view
      setViewingEntry(null)
      // Then trigger the edit dialog
      setTimeout(() => {
        onEditEntry(entry)
      }, 50) // Increased timeout for better mobile experience
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle>Editor Media Bins</CardTitle>
          <div className="space-x-2 flex">
            <Button variant="outline" size="sm" onClick={() => toggleAllBins(false)}>
              Collapse All
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleAllBins(true)}>
              Expand All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {editors.map((editor) => {
          const editorVideos = videoData.filter((entry) => entry.editor === editor)
          const isExpanded = expandedBins[editor] || false
          const displayedVideos = isExpanded ? editorVideos : editorVideos.slice(0, initialEntries)
          const hasMoreVideos = editorVideos.length > initialEntries

          return (
            <div key={editor} className="border rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                onClick={() => toggleBin(editor)}
              >
                <h3 className="font-medium text-lg">
                  {editor}'s Bin ({editorVideos.length} videos)
                </h3>
                <Button variant="ghost" size="sm">
                  {openBins[editor] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>

              {openBins[editor] && (
                <div className="p-4">
                  {editorVideos.length === 0 ? (
                    <p className="text-gray-500 italic">No videos yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Athlete</TableHead>
                            <TableHead>Video Title</TableHead>
                            <TableHead>Shooter</TableHead>
                            <TableHead>Video Link</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {displayedVideos.map((video) => (
                            <TableRow
                              key={video.id}
                              className="cursor-pointer hover:bg-gray-50"
                              onClick={() => handleViewDetails(video)}
                            >
                              <TableCell>{video.date}</TableCell>
                              <TableCell>{video.athlete}</TableCell>
                              <TableCell>{video.title}</TableCell>
                              <TableCell>{video.shooter}</TableCell>
                              <TableCell onClick={(e) => e.stopPropagation()}>
                                {video.linkUrl && (
                                  <div className="mb-2">
                                    <a
                                      href={video.linkUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                      View Video <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                )}
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <Input
                                    type="text"
                                    placeholder="Add/update video link"
                                    value={
                                      mediaLinks[video.id] !== undefined ? mediaLinks[video.id] : video.linkUrl || ""
                                    }
                                    onChange={(e) => handleLinkChange(video.id, e.target.value)}
                                    className="text-sm flex-1"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => saveLink(video.id)}
                                    disabled={savingLinks[video.id]}
                                    className="w-full sm:w-auto"
                                  >
                                    {savingLinks[video.id] ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {hasMoreVideos && (
                        <div className="flex justify-center mt-3 pt-2 border-t">
                          <Button
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleExpand(editor)
                            }}
                            className="text-gray-600 flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                Show More ({editorVideos.length - initialEntries} more videos)
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* Entry Detail Dialog */}
        {viewingEntry && (
          <EntryDetailDialog entry={viewingEntry} onClose={() => setViewingEntry(null)} onEdit={handleEditEntry} />
        )}
      </CardContent>
    </Card>
  )
}
