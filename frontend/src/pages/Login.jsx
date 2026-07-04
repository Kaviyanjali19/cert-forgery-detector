import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const endpoint = isRegister ? "register" : "login"
      const res = await axios.post(
        `http://localhost:8000/api/auth/${endpoint}`,
        { username, password }
      )
      if (res.data.error) {
        setError(res.data.error)
      } else {
        localStorage.setItem("token", res.data.access_token)
        navigate("/")
      }
    } catch (err) {
      setError("Something went wrong!")
    }
  }

  return (
    <div style={{minHeight:"100vh",backgroundColor:"#030712",color:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"16px"}}>
      <h1 style={{fontSize:"2rem",fontWeight:"bold"}}>{isRegister ? "Register" : "Login"}</h1>
      <input style={{backgroundColor:"#1f2937",padding:"12px",borderRadius:"8px",width:"280px",color:"white",border:"none"}} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input style={{backgroundColor:"#1f2937",padding:"12px",borderRadius:"8px",width:"280px",color:"white",border:"none"}} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <p style={{color:"red"}}>{error}</p>}
      <button onClick={handleSubmit} style={{backgroundColor:"#2563eb",padding:"12px 24px",borderRadius:"8px",width:"280px",color:"white",border:"none",cursor:"pointer"}}>{isRegister ? "Register" : "Login"}</button>
      <p onClick={() => setIsRegister(!isRegister)} style={{color:"#9ca3af",cursor:"pointer"}}>{isRegister ? "Already have account? Login" : "No account? Register"}</p>
    </div>
  )
}
