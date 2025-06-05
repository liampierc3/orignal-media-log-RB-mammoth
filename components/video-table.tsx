"use client"

import { useState } from "react"
import type { VideoEntry } from "@/types/video"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2, ChevronDown, ChevronUp, Pencil } from "lucide-react"

interface VideoTableProps {
  data: VideoEntry[]
  onDelete: (id: string) => void
  onEdit: (entry: VideoEntry) => void
  onViewDetails: (entry: VideoEntry) => void
  expanded?: boolean
  onToggleExpand?: (expanded: boolean) => void
}

export default function VideoTable({
  data,
  onDelete,
  onEdit,
  onViewDetails,
  expanded = false,
  onToggleExpand,
}: VideoTableProps) {
  const [localExpanded, setLocalExpanded] = useState(false)

  // Use either controlled or uncontrolled expanded state
  const isExpanded = onToggleExpand ? expanded : localExpanded

  // When collapsed, show no entries at all
  const displayedData = isExpanded ? data : []

  const toggleExpand = () => {
    if (onToggleExpand) {
      onToggleExpand(!expanded)
    } else {
      setLocalExpanded(!localExpanded)
    }
  }

  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Athlete</TableHead>
                <TableHead>Video Title</TableHead>
                <TableHead>Shooter</TableHead>
                <TableHead>Editor</TableHead>
                <TableHead>Content Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Video Link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    No entries found
                  </TableCell>
                </TableRow>
              ) : isExpanded ? (
                displayedData.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => onViewDetails(entry)}
                  >
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.athlete}</TableCell>
                    <TableCell>{entry.title}</TableCell>
                    <TableCell>{entry.shooter}</TableCell>
                    <TableCell>{entry.editor}</TableCell>
                    <TableCell className="max-w-xs truncate">{entry.description}</TableCell>
                    <TableCell>{entry.status}</TableCell>
                    <TableCell>
                      {entry.linkUrl ? (
                        <a
                          href={entry.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()} // Prevent row click
                        >
                          View Video
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      {" "}
                      {/* Prevent row click */}
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit(entry)
                          }}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 h-8 w-8"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(entry.id)
                          }}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    {/* Removed the explanatory text here */}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-center py-3 bg-gray-50 border border-t-0 rounded-b-md">
        <Button variant="ghost" onClick={toggleExpand} className="text-gray-600 flex items-center gap-1">
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Hide Entries
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show Entries ({data.length} entries)
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
