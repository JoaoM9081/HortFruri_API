// src/Views/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { login } from '../service/backService'
import '../index.css'

export default function Login() {
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const navigate              = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      await login({ email, password })
      navigate('/')
    } catch {
      setError('E-mail ou senha inválidos')
    }
  }

  return (
    <div className="hf-container">
      <Header />

      <main className="login-content">
        <div className="login-card">
          <h2>Login</h2>
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Senha
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              className="btn btn--enter login-btn"
              disabled={!email || !password}
            >
              Entrar
            </button>
          </form>

          <div className="login-links">
            <Link to="/register" className="login-register">
              Ainda não tem cadastro? Cadastre-se
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}