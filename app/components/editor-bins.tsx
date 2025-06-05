import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { VideoEntry } from "@/types/video"

interface EditorBinsProps {
  videoData: VideoEntry[]
  updateVideoLink: (id: string, link: string) => Promise<boolean>
  onEditEntry: (entry: VideoEntry) => void
}

export default function EditorBins({ videoData, updateVideoLink, onEditEntry }: EditorBinsProps) {
  const [expandedBins, setExpandedBins] = useState<string[]>([])
  const [editingLink, setEditingLink] = useState<{ id: string; link: string } | null>(null)

  const editorBins = videoData.reduce((acc, entry) => {
    if (!acc[entry.editor]) {
      acc[entry.editor] = []
    }
    acc[entry.editor].push(entry)
    return acc
  }, {} as Record<string, VideoEntry[]>)

  const editors = ["Marcus Chen", "Sophia Martinez", "Isabella Kim", "Oliver Wright", "Ava Wilson"]

  const toggleBin = (editor: string) => {
    setExpandedBins(prev =>
      prev.includes(editor) ? prev.filter(e => e !== editor) : [...prev, editor]
    )
  }

  const handleLinkUpdate = async (id: string) => {
    if (!editingLink || editingLink.id !== id) return
    await updateVideoLink(id, editingLink.link)
    setEditingLink(null)
  }

  const collapseAll = () => setExpandedBins([])
  const expandAll = () => setExpandedBins(Object.keys(editorBins))

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-header">Editor Media Bins</h2>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={collapseAll}>
            Collapse All
          </Button>
          <Button variant="outline" size="sm" onClick={expandAll}>
            Expand All
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(editorBins).map(([editor, entries]) => (
          <div key={editor} className="media-bin">
            <div className="media-bin-header">
              <button
                onClick={() => toggleBin(editor)}
                className="w-full flex justify-between items-center"
              >
                <div>
                  <h3 className="media-bin-title">{editor}</h3>
                  <p className="media-bin-subtitle">{entries.length} videos</p>
                </div>
                <span>{expandedBins.includes(editor) ? "▼" : "▶"}</span>
              </button>
            </div>

            {expandedBins.includes(editor) && (
              <div className="media-bin-content">
                <div className="space-y-4">
                  {entries.map(entry => (
                    <div key={entry.id} className="video-entry">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="video-title">{entry.title}</h4>
                          <p className="video-meta">
                            {entry.athlete} • {entry.date}
                          </p>
                          <p className="video-meta mt-1">{entry.description}</p>
                          <p className="video-meta mt-1">
                            <span className={`status-${entry.status.toLowerCase().replace(' ', '-')}`}>
                              {entry.status}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditEntry(entry)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>

                      <div className="mt-2">
                        {editingLink?.id === entry.id ? (
                          <div className="flex gap-2">
                            <Input
                              value={editingLink.link}
                              onChange={e => setEditingLink({ id: entry.id, link: e.target.value })}
                              placeholder="Enter video link"
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => handleLinkUpdate(entry.id)}>
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingLink(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {entry.link_url ? (
                              <>
                                <a
                                  href={entry.link_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  View Video
                                </a>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setEditingLink({ id: entry.id, link: entry.link_url })
                                  }
                                >
                                  Edit Link
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingLink({ id: entry.id, link: "" })}
                              >
                                Add Link
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 