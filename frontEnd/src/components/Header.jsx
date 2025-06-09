import { useLocation, useNavigate, Link } from 'react-router-dom'
import '../index.css'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  // exibe “Voltar” em /login **e** /register
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  return (
    <header className="hf-header">
      <div className="hf-header__brand">
        <img src="/logo.png" alt="Hortifruti" className="hf-header__logo" />
        <span className="hf-header__brand-name">Hortifruti</span>
      </div>
      <nav className="hf-header__nav">
        <Link to="/seja-entregador">Seja entregador</Link>
        <Link to="/">Hortifruti</Link>
        <Link to="/empresas">Empresas</Link>
      </nav>
      <div className="hf-header__actions">
        {isAuthPage ? (
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
