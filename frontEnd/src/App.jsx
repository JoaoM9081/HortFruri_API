import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Views/Home'
import Login from './Views/Login'
import RegisterLoja from './Views/RegisterLoja'

export default function App() {
  return (
    <BrowserRouter>
      <div className="hf-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterLoja />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
