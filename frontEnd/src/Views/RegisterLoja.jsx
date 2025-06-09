// src/Views/RegisterLoja.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  createEndereco,
  createLoja,
  uploadLojaImage,
} from '../service/lojaService'
import '../index.css'

export default function RegisterLoja() {
  const navigate = useNavigate()

  // campos da loja
  const [nome, setNome]         = useState('')
  const [cnpj, setCnpj]         = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail]       = useState('')
  const [senha, setSenha]       = useState('')

  // campos do endereço
  const [rua, setRua]           = useState('')
  const [numero, setNumero]     = useState('')
  const [complemento, setComplemento] = useState('')
  const [cidade, setCidade]     = useState('')
  const [cep, setCep]           = useState('')

  // arquivo da logo
  const [logoFile, setLogoFile] = useState(null)

  // feedback
  const [error, setError]       = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      // 1) cria o endereço
      const end = await createEndereco(rua, numero, complemento, cidade, cep)

      // 2) cria a loja
      const loja = await createLoja(
        nome,
        cnpj,
        telefone,
        email,
        senha,
        end.id
      )

      // 3) faz upload da logo se enviou arquivo
      if (logoFile) {
        await uploadLojaImage(loja.id, logoFile)
      }

      // 4) redireciona para login
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError('Erro no cadastro, verifique os dados.')
    }
  }

  return (
    <div className="hf-container register-page">
      <Header />

      <main className="register-content">
        <div className="register-card">
          <h2>Cadastro de Loja</h2>
          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            {/* DADOS DA LOJA */}
            <label>
              Nome da Loja
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
              />
            </label>
            <label>
              CNPJ
              <input
                type="text"
                value={cnpj}
                onChange={e => setCnpj(e.target.value)}
                maxLength={14}
                required
              />
            </label>
            <label>
              Telefone
              <input
                type="tel"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
                required
              />
            </label>
            <label>
              E-mail
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
                value={senha}
                onChange={e => setSenha(e.target.value)}
                minLength={6}
                required
              />
            </label>

            {/* ENDEREÇO */}
            <fieldset className="address-fieldset">
              <legend>Endereço</legend>
              <label>
                Rua
                <input
                  type="text"
                  value={rua}
                  onChange={e => setRua(e.target.value)}
                  required
                />
              </label>
              <label>
                Número
                <input
                  type="text"
                  value={numero}
                  onChange={e => setNumero(e.target.value)}
                  required
                />
              </label>
              <label>
                Complemento
                <input
                  type="text"
                  value={complemento}
                  onChange={e => setComplemento(e.target.value)}
                />
              </label>
              <label>
                Cidade
                <input
                  type="text"
                  value={cidade}
                  onChange={e => setCidade(e.target.value)}
                  required
                />
              </label>
              <label>
                CEP
                <input
                  type="text"
                  value={cep}
                  onChange={e => setCep(e.target.value)}
                  required
                />
              </label>
            </fieldset>

            {/* LOGO */}
            <label>
              Logo da Loja (JPG/PNG)
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={e => setLogoFile(e.target.files[0])}
              />
            </label>

            <button
              type="submit"
              className="btn btn--enter register-btn"
              disabled={
                !nome ||
                !cnpj ||
                !telefone ||
                !email ||
                senha.length < 6 ||
                !rua ||
                !numero ||
                !cidade ||
                !cep
              }
            >
              Criar Conta
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}