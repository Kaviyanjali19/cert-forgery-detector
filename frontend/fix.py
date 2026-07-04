with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write("""import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Results from "./pages/Results"
import Login from "./pages/Login"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  )
}
""")
print("Done!")