import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { VideoEntry } from "@/types/video"

interface StatsSectionProps {
  videoData: VideoEntry[]
  athletes: string[]
}

export default function StatsSection({ videoData, athletes }: StatsSectionProps) {
  const totalVideos = videoData.length
  const athletesWithContent = new Set(videoData.map(entry => entry.athlete)).size
  const athletesWithNoContent = athletes.length - athletesWithContent

  const editorWorkload = videoData.reduce((acc, entry) => {
    acc[entry.editor] = (acc[entry.editor] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const shooterWorkload = videoData.reduce((acc, entry) => {
    acc[entry.shooter] = (acc[entry.shooter] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="mb-8">
      <h2 className="section-header">Production Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="stats-card">
          <CardHeader className="pb-2">
            <CardTitle className="stats-title">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stats-value">{totalVideos}</p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="pb-2">
            <CardTitle className="stats-title">Athletes with No Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="stats-value">{athletesWithNoContent}</p>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardHeader className="pb-2">
            <CardTitle className="stats-title">Editor Workload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(editorWorkload).map(([editor, count]) => (
                <div key={editor} className="flex justify-between items-center">
                  <span className="text-gray-700">{editor}</span>
                  <span className="font-medium text-gray-900">{count} videos</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card col-span-1 md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="stats-title">Shooter Workload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(shooterWorkload).map(([shooter, count]) => (
                <div key={shooter} className="flex justify-between items-center">
                  <span className="text-gray-700">{shooter}</span>
                  <span className="font-medium text-gray-900">{count} videos</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 