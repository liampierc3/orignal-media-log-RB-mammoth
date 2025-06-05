"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import VideoTable from "@/components/video-table"
import StatsSection from "@/components/stats-section"
import ShooterBins from "@/components/shooter-bins"
import EditorBins from "@/components/editor-bins"
import AthleteContent from "@/components/athlete-content"
import type { VideoEntry } from "@/types/video"
import { athletes } from "@/data/athletes"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertTriangle, ExternalLink, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import EditEntryDialog from "@/components/edit-entry-dialog"
import EntryDetailDialog from "@/components/entry-detail-dialog"
import MultiSelect from "@/components/ui/multi-select"

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock data for demonstration
const initialMockData: VideoEntry[] = [
  {
    id: "1",
    date: "2024-03-15",
    athlete: "Alex Thompson",
    title: "Park Run - Finals Highlights",
    shooter: "Liam",
    editor: "Marcus Chen",
    description: "Finals day highlights package featuring multiple angles and slow motion shots",
    status: "Published",
    link_url: "https://example.com/video1",
    created_at: "2024-03-15T10:00:00Z"
  },
  {
    id: "2",
    date: "2024-03-14",
    athlete: "Jordan Lee",
    title: "Training Session - New Tricks",
    shooter: "Nathan Reed",
    editor: "Sophia Martinez",
    description: "Capturing new trick progression during morning training session",
    status: "In Progress",
    link_url: "",
    created_at: "2024-03-14T09:30:00Z"
  },
  {
    id: "3",
    date: "2024-03-13",
    athlete: "Sam Parker",
    title: "Competition Run 1",
    shooter: "Ethan Brooks",
    editor: "Isabella Kim",
    description: "First competition run with multiple angles",
    status: "Completed",
    link_url: "https://example.com/video3",
    created_at: "2024-03-13T15:20:00Z"
  },
  {
    id: "4",
    date: "2024-03-13",
    athlete: "Morgan Chen",
    title: "Style Session",
    shooter: "Liam",
    editor: "Oliver Wright",
    description: "Evening style session with sunset lighting",
    status: "In Progress",
    link_url: "",
    created_at: "2024-03-13T19:45:00Z"
  },
  {
    id: "5",
    date: "2024-03-12",
    athlete: "Chris Rodriguez",
    title: "Rail Feature",
    shooter: "Lucas Taylor",
    editor: "Ava Wilson",
    description: "Technical rail section with multiple angles",
    status: "Completed",
    link_url: "https://example.com/video5",
    created_at: "2024-03-12T14:30:00Z"
  },
  {
    id: "6",
    date: "2024-03-12",
    athlete: "Pat Johnson",
    title: "Jump Line Progression",
    shooter: "Liam",
    editor: "Sophia Martinez",
    description: "Full jump line progression with follow cam",
    status: "Published",
    link_url: "https://example.com/video6",
    created_at: "2024-03-12T11:15:00Z"
  },
  {
    id: "7",
    date: "2024-03-11",
    athlete: "Jamie Wilson",
    title: "Feature Highlight",
    shooter: "Multiple",
    editor: "Marcus Chen",
    description: "Multiple angles of new feature with drone shots",
    status: "In Progress",
    link_url: "",
    created_at: "2024-03-11T16:20:00Z"
  },
  {
    id: "8",
    date: "2024-03-11",
    athlete: "Casey Martinez",
    title: "Powder Day Edit",
    shooter: "Nathan Reed",
    editor: "Isabella Kim",
    description: "Deep powder shots with cinematic angles",
    status: "Completed",
    link_url: "https://example.com/video8",
    created_at: "2024-03-11T08:45:00Z"
  },
  {
    id: "9",
    date: "2024-03-10",
    athlete: "Robin Zhang",
    title: "Urban Session",
    shooter: "Ethan Brooks",
    editor: "Oliver Wright",
    description: "Night urban session with creative lighting",
    status: "Published",
    link_url: "https://example.com/video9",
    created_at: "2024-03-10T20:30:00Z"
  },
  {
    id: "10",
    date: "2024-03-10",
    athlete: "Drew Anderson",
    title: "Competition Prep",
    shooter: "Liam",
    editor: "Ava Wilson",
    description: "Pre-competition practice runs and trick prep",
    status: "In Progress",
    link_url: "",
    created_at: "2024-03-10T13:15:00Z"
  }
];

export default function Home() {
  const router = useRouter()
  const [videoData, setVideoData] = useState<VideoEntry[]>(initialMockData)
  const [formData, setFormData] = useState({
    athlete: [] as string[],
    shooter: "",
    editor: "",
    date: "",
    title: "",
    description: "",
    status: "Completed",
    link_url: "",
  })
  const [filterType, setFilterType] = useState("athlete")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tableExpanded, setTableExpanded] = useState(false)
  const [editingEntry, setEditingEntry] = useState<VideoEntry | null>(null)
  const [viewingEntry, setViewingEntry] = useState<VideoEntry | null>(null)

  // Sort athletes alphabetically
  const sortedAthletes = [...athletes].sort((a, b) => a.localeCompare(b))

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addNewEntry = async () => {
    const { athlete, shooter, editor, date, title, description, status, link_url } = formData

    if (athlete.length === 0 || !shooter || !editor || !date || !title) {
      alert("Please fill in all required fields")
      return
    }

    // If multiple athletes are selected, create an entry for each athlete
    try {
      setLoading(true)
      setError(null)

      const newEntries = athlete.map(selectedAthlete => ({
        id: generateId(),
        date,
        athlete: selectedAthlete,
        title,
        shooter,
        editor,
        description,
        status,
        link_url,
        created_at: new Date().toISOString()
      }));

      setVideoData(prev => [...prev, ...newEntries])
      clearForm()
    } catch (err: any) {
      console.error("Error adding entry:", err)
      setError(`Failed to add video: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const clearForm = () => {
    setFormData({
      athlete: [],
      shooter: "",
      editor: "",
      date: "",
      title: "",
      description: "",
      status: "Completed",
      link_url: "",
    })
  }

  const deleteEntry = async (id: string) => {
    if (confirm("Are you sure you want to delete this entry?")) {
      try {
        setLoading(true)
        setError(null)
        setVideoData(prev => prev.filter(entry => entry.id !== id))
      } catch (err: any) {
        console.error("Error deleting entry:", err)
        setError(`Failed to delete video: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }
  }

  const updateVideoLink = async (id: string, link_url: string) => {
    try {
      setError(null)
      setVideoData(prev => prev.map(entry => 
        entry.id === id ? { ...entry, link_url } : entry
      ))
      return true
    } catch (err: any) {
      console.error("Error updating entry:", err)
      setError(`Failed to update video link: ${err.message}`)
      return false
    }
  }

  const exportToCSV = () => {
    if (videoData.length === 0) {
      alert("No data to export")
      return
    }

    const headers = [
      "Date",
      "Athlete",
      "Video Title",
      "Shooter",
      "Editor",
      "Content Description",
      "Status",
      "Video Link",
    ]
    const csvRows = [
      headers.join(","),
      ...videoData.map((entry) =>
        [
          entry.date,
          `"${entry.athlete}"`,
          `"${entry.title}"`,
          `"${entry.shooter}"`,
          `"${entry.editor}"`,
          `"${entry.description.replace(/"/g, '""')}"`,
          `"${entry.status}"`,
          `"${entry.link_url || ""}"`,
        ].join(","),
      ),
    ]

    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `video_production_tracker_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLogout = () => {
    // Remove authentication from session storage
    sessionStorage.removeItem("authenticated")
    // Redirect to login page
    router.push("/login")
  }

  const updateEntry = async (id: string, updatedData: Partial<VideoEntry>) => {
    try {
      setError(null)
      setVideoData(prev => prev.map(entry => 
        entry.id === id ? { ...entry, ...updatedData } : entry
      ))
      return true
    } catch (err: any) {
      console.error("Error updating entry:", err)
      setError(`Failed to update video: ${err.message}`)
      return false
    }
  }

  const filteredData = videoData.filter((entry) => {
    if (!searchTerm) return true
    const field = entry[filterType as keyof VideoEntry]
    if (field === undefined) return false
    return field.toString().toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Handler for editing entries from the AthleteContent component
  const handleAthleteContentEdit = (entry: VideoEntry) => {
    setEditingEntry(entry)
  }

  // Handle edit from any component
  const handleEditEntry = (entry: VideoEntry) => {
    // Close any open detail view
    setViewingEntry(null)

    // Add a small delay to ensure the view dialog closes first
    setTimeout(() => {
      setEditingEntry(entry)
    }, 50)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl app-title mb-3">Video Production Tracker</h1>
          <p className="text-lg app-description">Track videos produced for athletes across multiple shooters and editors</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Video Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <label htmlFor="athlete" className="font-medium">
              Athlete(s)
            </label>
            <MultiSelect
              options={sortedAthletes.map((athlete) => ({ label: athlete, value: athlete }))}
              selected={formData.athlete}
              onChange={(selected) => handleInputChange("athlete", selected)}
              placeholder="Select athlete(s)"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="shooter" className="font-medium text-gray-700">
              Shooter
            </label>
            <Select value={formData.shooter} onValueChange={(value) => handleInputChange("shooter", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select shooter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Liam">Liam</SelectItem>
                <SelectItem value="Nathan Reed">Nathan Reed</SelectItem>
                <SelectItem value="Ethan Brooks">Ethan Brooks</SelectItem>
                <SelectItem value="Lucas Taylor">Lucas Taylor</SelectItem>
                <SelectItem value="Multiple">Multiple</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="editor" className="font-medium text-gray-700">
              Editor
            </label>
            <Select value={formData.editor} onValueChange={(value) => handleInputChange("editor", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select editor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Marcus Chen">Marcus Chen</SelectItem>
                <SelectItem value="Sophia Martinez">Sophia Martinez</SelectItem>
                <SelectItem value="Isabella Kim">Isabella Kim</SelectItem>
                <SelectItem value="Oliver Wright">Oliver Wright</SelectItem>
                <SelectItem value="Ava Wilson">Ava Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <label htmlFor="date" className="font-medium">
              Date
            </label>
            <Input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="font-medium">
              Video Title
            </label>
            <Input
              type="text"
              id="title"
              placeholder="Enter video title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="font-medium">
              Status
            </label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium">
              Video Content/Description
            </label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Describe what the video contains"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="space-y-2">
            <label htmlFor="link_url" className="font-medium">
              Video Link
            </label>
            <Input
              type="text"
              id="link_url"
              placeholder="Add link to the video"
              value={formData.link_url}
              onChange={(e) => handleInputChange("link_url", e.target.value)}
            />
          </div>
        </div>

        <Button onClick={addNewEntry} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Add Entry
        </Button>
      </div>

      <Card className="mb-8 bg-white border border-gray-200">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold text-gray-900">All Entries</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setTableExpanded(false)} disabled={!tableExpanded}>
                Hide Entries
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTableExpanded(true)} disabled={tableExpanded}>
                Show Entries
              </Button>
            </div>
          </div>
          <div className="filter-section mt-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="filter-type" className="whitespace-nowrap text-sm text-gray-700">
                  Filter by:
                </label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="athlete">Athlete</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="shooter">Shooter</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  id="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-auto text-gray-900"
                />
              </div>
              <Button variant="outline" onClick={exportToCSV}>
                Export to CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {loading && videoData.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Loading data...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {tableExpanded ? (
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Athlete</th>
                      <th>Video Title</th>
                      <th>Shooter</th>
                      <th>Editor</th>
                      <th>Content Description</th>
                      <th>Status</th>
                      <th>Video Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.date}</td>
                        <td>{entry.athlete}</td>
                        <td>{entry.title}</td>
                        <td>{entry.shooter}</td>
                        <td>{entry.editor}</td>
                        <td>{entry.description}</td>
                        <td>
                          <span className={`status-${entry.status.toLowerCase().replace(' ', '-')}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td>
                          {entry.link_url && (
                            <a
                              href={entry.link_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View
                            </a>
                          )}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditEntry(entry)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEntry(entry.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Table is hidden. Click "Show Entries" to view the data.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-8">
        <StatsSection videoData={videoData} athletes={athletes} />
        <ShooterBins videoData={videoData} updateVideoLink={updateVideoLink} onEditEntry={handleEditEntry} />
        <EditorBins videoData={videoData} updateVideoLink={updateVideoLink} onEditEntry={handleEditEntry} />
        <AthleteContent
          videoData={videoData}
          athletes={sortedAthletes}
          onUpdateEntry={(id, data) => {
            const entryToEdit = videoData.find((entry) => entry.id === id)
            if (entryToEdit) {
              setTimeout(() => {
                setEditingEntry(entryToEdit)
              }, 50)
            }
            return updateEntry(id, data)
          }}
        />
      </div>

      {/* Dialogs */}
      <EditEntryDialog entry={editingEntry} onSave={updateEntry} onClose={() => setEditingEntry(null)} />
      <EntryDetailDialog entry={viewingEntry} onClose={() => setViewingEntry(null)} onEdit={handleEditEntry} />
    </div>
  )
}
