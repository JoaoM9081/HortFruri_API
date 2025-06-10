import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import '../index.css'
import { fetchCurrentUser, logout } from '../service/backService'
import { findLojaByEmail }      from '../service/lojaService'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  const [user, setUser]     = useState(null)
  const [logoUrl, setLogoUrl] = useState('')

  // flag para destacar o link “Hortifruti”
  const highlightHome = !isAuthPage && location.pathname === '/'

  useEffect(() => {
    fetchCurrentUser()
      .then(u => {
        setUser(u)
        if (u.role === 'loja') return findLojaByEmail(u.email)
      })
      .then(loja => {
        if (loja?.imagemUrl) {
          const base = import.meta.env.VITE_API_BASE_URL
          setLogoUrl(`${base}${loja.imagemUrl}`)
        }
      })
      .catch(() => setUser(null))
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error('Erro no logout:', err)
    } finally {
      // limpa o estado local
      setUser(null)
      setLogoUrl('')
      // mantém na home
      navigate('/')
    }
  }

  return (
    <header className="hf-header">
      <div className="hf-header__brand">
        <img src="/logo.png" alt="Hortifruti" className="hf-header__logo" />
        <span className="hf-header__brand-name">Hortifruti</span>
      </div>

      <nav className="hf-header__nav">
        {user && user.role === 'loja' ? (
          <>
            <Link to="/#">Meus Produtos</Link>
            <Link to="/" className={highlightHome ? 'active-link' : ''}>
              Hortifruti
            </Link>
            <Link to="/#">Vendas</Link>
          </>
        ) : (
          <>
            <Link to="#">Seja entregador</Link>
            <Link to="/" className={highlightHome ? 'active-link' : ''}>
              Hortifruti
            </Link>
            <Link to="#">Empresas</Link>
          </>
        )}
      </nav>

      <div className="hf-header__actions">
        {user && user.role === 'loja' ? (
          <>
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Logo da loja"
                className="hf-header__user-logo"
              />
            )}
            <button className="btn btn--exit" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : isAuthPage ? (
          <button className="btn btn--enter" onClick={() => navigate('/')}>
            Voltar
          </button>
        ) : (
          <button className="btn btn--enter" onClick={() => navigate('/login')}>
            Entrar
          </button>
        )}
      </div>
    </header>
  )
}