import { useLocation } from "react-router-dom"
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"

export default function Results() {
  const { state } = useLocation()
  if (!state) return <p className="text-white p-8">No results yet.</p>

  const radarData = Object.entries(state.layers).map(([k, v]) => ({
    layer: k, score: (v * 100).toFixed(1)
  }))

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
      <div className={`text-4xl font-black mb-2 ${state.verdict === "FORGED" ? "text-red-500" : "text-green-400"}`}>
        {state.verdict}
      </div>
      <p className="text-gray-400 mb-8">Confidence: {state.confidence}%</p>
      <h3 className="text-lg font-semibold mb-2">Layer Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="layer" />
          <Radar dataKey="score" fill="#3b82f6" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
      <h3 className="text-lg font-semibold mt-8 mb-2">Explainability</h3>
      {Object.entries(state.explanation).map(([k, v]) => (
        <div key={k} className="bg-gray-800 rounded p-3 mb-2">
          <span className="text-blue-400 font-mono">{k}:</span> {v}
        </div>
      ))}
    </div>
  )
}