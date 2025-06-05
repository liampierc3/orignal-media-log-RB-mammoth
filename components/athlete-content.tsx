"use client"

import { useState, useEffect } from "react"
import type { VideoEntry } from "@/types/video"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EntryDetailDialog from "./entry-detail-dialog"

interface AthleteContentProps {
  videoData: VideoEntry[]
  athletes: string[]
  onUpdateEntry?: (id: string, updatedEntry: Partial<VideoEntry>) => Promise<boolean>
}

type AthleteItem = {
  name: string
  videoCount: number
  videos: VideoEntry[]
}

export default function AthleteContent({ videoData, athletes, onUpdateEntry }: AthleteContentProps) {
  // Initialize with all bins closed (empty object instead of setting all to true)
  const [openBins, setOpenBins] = useState<Record<string, boolean>>({})
  const [athleteSearch, setAthleteSearch] = useState("")
  const [quickFilter, setQuickFilter] = useState("")
  const [sortType, setSortType] = useState("name")
  const [showOnlyNeeded, setShowOnlyNeeded] = useState(false)
  const [athleteItems, setAthleteItems] = useState<AthleteItem[]>([])
  const [filteredAthletes, setFilteredAthletes] = useState<AthleteItem[]>([])
  const [expandedBins, setExpandedBins] = useState<Record<string, boolean>>({})
  const [viewingEntry, setViewingEntry] = useState<VideoEntry | null>(null)

  // Number of entries to show initially
  const initialEntries = 5

  // Initialize athlete items
  useEffect(() => {
    // Athletes are already sorted when passed from the parent component
    const items = athletes.map((athlete) => {
      const athleteVideos = videoData.filter((entry) => entry.athlete === athlete)
      return {
        name: athlete,
        videoCount: athleteVideos.length,
        videos: athleteVideos,
      }
    })
    setAthleteItems(items)
  }, [athletes, videoData])

  // Apply sorting and filtering
  useEffect(() => {
    let filtered = [...athleteItems]

    // Apply search filter
    if (athleteSearch) {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(athleteSearch.toLowerCase()))
    }

    // Apply content needed filter
    if (showOnlyNeeded) {
      filtered = filtered.filter((item) => item.videoCount <= 1)
    }

    // Apply sorting
    if (sortType === "videos-desc") {
      filtered.sort((a, b) => b.videoCount - a.videoCount)
    } else if (sortType === "videos-asc") {
      filtered.sort((a, b) => a.videoCount - b.videoCount)
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredAthletes(filtered)
  }, [athleteItems, athleteSearch, sortType, showOnlyNeeded])

  // Quick filter effect
  useEffect(() => {
    if (quickFilter) {
      const matchingAthletes = athleteItems.filter((item) =>
        item.name.toLowerCase().includes(quickFilter.toLowerCase()),
      )

      if (matchingAthletes.length > 0) {
        // Open the matching bins
        const newOpenBins = { ...openBins }
        matchingAthletes.forEach((athlete) => {
          newOpenBins[athlete.name] = true
        })
        setOpenBins(newOpenBins)

        // Scroll to the first match after a short delay
        setTimeout(() => {
          const firstMatch = document.querySelector(`[data-athlete-name="${matchingAthletes[0].name}"]`)
          if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 100)
      }
    }
  }, [quickFilter, athleteItems])

  const toggleBin = (athlete: string) => {
    setOpenBins((prev) => ({
      ...prev,
      [athlete]: !prev[athlete],
    }))
  }

  const toggleAllBins = (isOpen: boolean) => {
    const newState: Record<string, boolean> = {}
    athletes.forEach((athlete) => {
      newState[athlete] = isOpen
    })
    setOpenBins(newState)
  }

  const toggleContentNeeded = () => {
    setShowOnlyNeeded(!showOnlyNeeded)
  }

  const clearQuickFilter = () => {
    setQuickFilter("")
  }

  const toggleExpand = (athlete: string) => {
    setExpandedBins((prev) => ({
      ...prev,
      [athlete]: !prev[athlete],
    }))
  }

  const handleViewDetails = (entry: VideoEntry) => {
    setViewingEntry(entry)
  }

  const handleEditEntry = (entry: VideoEntry) => {
    if (onUpdateEntry) {
      // First set the viewing entry to null
      setViewingEntry(null)
      // Then call the parent's update function with the entry ID
      setTimeout(() => {
        onUpdateEntry(entry.id, {}).then(() => {
          // This is just to trigger the edit dialog in the parent
        })
      }, 50) // Increased timeout for better mobile experience
    }
  }

  // Stats calculations
  const totalAthletes = athletes.length
  const athletesWithContent = athletes.filter((athlete) => videoData.some((entry) => entry.athlete === athlete)).length
  const totalVideos = videoData.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content By Athlete</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium mb-2">Find Athlete</h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              placeholder="Type athlete name to quickly find..."
              value={quickFilter}
              onChange={(e) => setQuickFilter(e.target.value)}
              className="flex-1"
            />
            <Button variant="secondary" onClick={clearQuickFilter} className="w-full sm:w-auto">
              Clear
            </Button>
          </div>
          {quickFilter && (
            <div className="mt-2 text-sm text-gray-600 italic">
              {filteredAthletes.length === 0
                ? "No athletes found matching your search."
                : filteredAthletes.length === 1
                  ? "1 athlete found."
                  : `${filteredAthletes.length} athletes found.`}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-700">{totalAthletes}</div>
            <div className="text-sm text-gray-600">Total Athletes</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-700">{athletesWithContent}</div>
            <div className="text-sm text-gray-600">Athletes with Content</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-700">{totalVideos}</div>
            <div className="text-sm text-gray-600">Total Videos</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={() => toggleAllBins(false)} className="flex-1 sm:flex-none">
              Collapse All
            </Button>
            <Button variant="outline" size="sm" onClick={() => toggleAllBins(true)} className="flex-1 sm:flex-none">
              Expand All
            </Button>
            <Button
              variant={showOnlyNeeded ? "default" : "outline"}
              size="sm"
              onClick={toggleContentNeeded}
              className={`flex-1 sm:flex-none ${showOnlyNeeded ? "bg-red-600 hover:bg-red-700 text-white" : ""}`}
            >
              {showOnlyNeeded ? "Show All Athletes" : "Show Athletes Needing Content"}
            </Button>
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input
              type="text"
              placeholder="Filter athletes..."
              value={athleteSearch}
              onChange={(e) => setAthleteSearch(e.target.value)}
            />
          </div>
          <Select value={sortType} onValueChange={setSortType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="videos-desc">Most Videos First</SelectItem>
              <SelectItem value="videos-asc">Fewest Videos First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredAthletes.map((item) => {
            const isExpanded = expandedBins[item.name] || false
            const displayedVideos = isExpanded ? item.videos : item.videos.slice(0, initialEntries)
            const hasMoreVideos = item.videos.length > initialEntries

            return (
              <div
                key={item.name}
                className={`border rounded-lg overflow-hidden ${
                  showOnlyNeeded && item.videoCount <= 1 ? "border-l-4 border-l-red-500 bg-red-50" : ""
                }`}
                data-athlete-name={item.name.toLowerCase()}
              >
                <div
                  className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                  onClick={() => toggleBin(item.name)}
                >
                  <h3 className="font-medium text-lg">
                    {item.name} ({item.videoCount} videos)
                  </h3>
                  <Button variant="ghost" size="sm">
                    {openBins[item.name] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>

                {openBins[item.name] && (
                  <div className="p-4">
                    {item.videos.length === 0 ? (
                      <p className="text-gray-500 italic">No videos yet for this athlete</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Video Title</TableHead>
                              <TableHead>Shooter</TableHead>
                              <TableHead>Editor</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Content Description</TableHead>
                              <TableHead>Video Link</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {displayedVideos
                              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                              .map((video) => (
                                <TableRow
                                  key={video.id}
                                  className="cursor-pointer hover:bg-gray-50"
                                  onClick={() => handleViewDetails(video)}
                                >
                                  <TableCell>{video.date}</TableCell>
                                  <TableCell>{video.title}</TableCell>
                                  <TableCell>{video.shooter}</TableCell>
                                  <TableCell>{video.editor}</TableCell>
                                  <TableCell>{video.status}</TableCell>
                                  <TableCell className="max-w-xs truncate">{video.description}</TableCell>
                                  <TableCell onClick={(e) => e.stopPropagation()}>
                                    {video.linkUrl ? (
                                      <a
                                        href={video.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                      >
                                        View <ExternalLink className="h-3 w-3" />
                                      </a>
                                    ) : (
                                      "—"
                                    )}
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
                                toggleExpand(item.name)
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
                                  Show More ({item.videos.length - initialEntries} more videos)
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
        </div>

        {/* Entry Detail Dialog */}
        {viewingEntry && (
          <EntryDetailDialog entry={viewingEntry} onClose={() => setViewingEntry(null)} onEdit={handleEditEntry} />
        )}
      </CardContent>
    </Card>
  )
}
