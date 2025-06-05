import type { VideoEntry } from "@/types/video"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsSectionProps {
  videoData: VideoEntry[]
  athletes: string[]
}

export default function StatsSection({ videoData, athletes }: StatsSectionProps) {
  // Count videos per athlete
  const athleteCount: Record<string, number> = {}
  athletes.forEach((athlete) => {
    athleteCount[athlete] = videoData.filter((entry) => entry.athlete === athlete).length
  })

  // Count videos per editor
  const editorCount = {
    Drew: videoData.filter((entry) => entry.editor === "Drew").length,
    Liam: videoData.filter((entry) => entry.editor === "Liam").length,
    Cullen: videoData.filter((entry) => entry.editor === "Cullen").length,
    Jack: videoData.filter((entry) => entry.editor === "Jack").length,
    Marinho: videoData.filter((entry) => entry.editor === "Marinho").length,
  }

  // Count videos per shooter
  const shooterCount = {
    Jack: videoData.filter((entry) => entry.shooter === "Jack").length,
    Cullen: videoData.filter((entry) => entry.shooter === "Cullen").length,
    Marinho: videoData.filter((entry) => entry.shooter === "Marinho").length,
    Rafe: videoData.filter((entry) => entry.shooter === "Rafe").length,
    Multiple: videoData.filter((entry) => entry.shooter === "Multiple").length,
  }

  // Find athletes with no videos
  const athletesWithNoVideos = athletes.filter((athlete) => !videoData.some((entry) => entry.athlete === athlete))

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Production Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">Total Videos</h4>
            <p className="text-2xl font-bold">{videoData.length}</p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-semibold text-amber-700 mb-2">Athletes with No Videos</h4>
            <p className="text-2xl font-bold">{athletesWithNoVideos.length}</p>
            <div className="mt-2 text-sm max-h-24 overflow-y-auto">{athletesWithNoVideos.join(", ")}</div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">Editor Workload</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-medium">Drew</p>
                <p className="text-xl font-bold">{editorCount.Drew} videos</p>
              </div>
              <div>
                <p className="font-medium">Liam</p>
                <p className="text-xl font-bold">{editorCount.Liam} videos</p>
              </div>
              <div>
                <p className="font-medium">Cullen</p>
                <p className="text-xl font-bold">{editorCount.Cullen} videos</p>
              </div>
              <div>
                <p className="font-medium">Jack</p>
                <p className="text-xl font-bold">{editorCount.Jack} videos</p>
              </div>
              <div>
                <p className="font-medium">Marinho</p>
                <p className="text-xl font-bold">{editorCount.Marinho} videos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-700 mb-2">Shooter Workload</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="font-medium">Jack</p>
              <p className="text-xl font-bold">{shooterCount.Jack} videos</p>
            </div>
            <div>
              <p className="font-medium">Cullen</p>
              <p className="text-xl font-bold">{shooterCount.Cullen} videos</p>
            </div>
            <div>
              <p className="font-medium">Marinho</p>
              <p className="text-xl font-bold">{shooterCount.Marinho} videos</p>
            </div>
            <div>
              <p className="font-medium">Rafe</p>
              <p className="text-xl font-bold">{shooterCount.Rafe} videos</p>
            </div>
            <div>
              <p className="font-medium">Multiple</p>
              <p className="text-xl font-bold">{shooterCount.Multiple} videos</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
