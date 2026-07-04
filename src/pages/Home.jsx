import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const form = new FormData()
    form.append("file", file)
    const res = await axios.post("http://cert-forgery-backend.onrender.com/api/detect/", form)
    navigate("/results", { state: res.data })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">🔍 Certificate Forgery Detector</h1>
      <input type="file" accept="image/*,.pdf"
        onChange={e => setFile(e.target.files[0])}
        className="text-sm text-gray-300" />
      <button onClick={handleUpload}
        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
        {loading ? "Analyzing..." : "Detect Forgery"}
      </button>
    </div>
  )
}