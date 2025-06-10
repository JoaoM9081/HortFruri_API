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
  const [telefone, setTelefone] = useState('+55 ')
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

  // feedback geral e por campo
  const [error, setError]       = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  // helper para tirar tudo que não é dígito
  const onlyDigits = str => str.replace(/\D/g, '')

  // formata CNPJ com pontos, barra e hífen
  const formatCNPJ = val => {
    const v = onlyDigits(val).slice(0, 14)
    return v
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }

  // formata CEP XXXXX-XXX
  const formatCEP = val => {
    const v = onlyDigits(val).slice(0, 8)
    return v.replace(/^(\d{5})(\d)/, '$1-$2')
  }

  // formata telefone brasileiro +55 DD NNNNN-NNNN
  const formatPhone = val => {
    let digits = onlyDigits(val)
    if (digits.startsWith('55')) digits = digits.slice(2)
    digits = digits.slice(0, 11)
    if (digits.length === 0) return '+55 '
    const ddd = digits.slice(0, 2)
    const num = digits.slice(2)
    if (num.length <= 5) return `+55 ${ddd} ${num}`
    const lead = num.slice(0, num.length - 4)
    const last = num.slice(-4)
    return `+55 ${ddd} ${lead}-${last}`
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    // valida upload obrigatório
    if (!logoFile) {
      setFieldErrors({ imagem: 'Logo da loja é obrigatória.' })
      return
    }

    // 1) criar endereço
    console.log('Payload createEndereco:', { rua, numero, complemento, cidade, cep })
    let end
    try {
      end = await createEndereco(rua, numero, complemento, cidade, cep)
    } catch (err) {
      console.error('Erro createEndereco:', err)
      if (Array.isArray(err.message)) {
        const errs = err.message.reduce((acc, msg) => {
          const [field, ...rest] = msg.split(' ')
          acc[field] = rest.join(' ')
          return acc
        }, {})
        setFieldErrors(errs)
        return
      }
      setError('Erro ao criar endereço.')
      return
    }

    // 2) criar loja
    const cleanCnpj = onlyDigits(cnpj)
    const lojaPayload = {
      nome,
      cnpj: cleanCnpj,
      telefone,
      email,
      senha,
      enderecoId: end.id,
    }
    console.log('Payload createLoja:', lojaPayload)
    let loja
    try {
      loja = await createLoja(
        lojaPayload.nome,
        lojaPayload.cnpj,
        lojaPayload.telefone,
        lojaPayload.email,
        lojaPayload.senha,
        lojaPayload.enderecoId
      )
    } catch (err) {
      console.error('Erro createLoja:', err)
      if (Array.isArray(err.message)) {
        const errs = err.message.reduce((acc, msg) => {
          const [field, ...rest] = msg.split(' ')
          acc[field] = rest.join(' ')
          return acc
        }, {})
        setFieldErrors(errs)
        return
      }
      setError('Erro ao criar loja.')
      return
    }

    // 3) upload de logo
    try {
      await uploadLojaImage(loja.id, logoFile)
    } catch (err) {
      console.error('Erro uploadLojaImage:', err)
    }

    // 4) redireciona
    navigate('/login')
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
                className={fieldErrors.nome ? 'input-error' : ''}
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
              />
              {fieldErrors.nome && <small className="error-text">{fieldErrors.nome}</small>}
            </label>

            <label>
              CNPJ
              <input
                className={fieldErrors.cnpj ? 'input-error' : ''}
                type="text"
                value={cnpj}
                onChange={e => setCnpj(formatCNPJ(e.target.value))}
                maxLength={18}
                required
              />
              {fieldErrors.cnpj && <small className="error-text">{fieldErrors.cnpj}</small>}
            </label>

            <label>
              Telefone
              <input
                className={fieldErrors.telefone ? 'input-error' : ''}
                type="text"
                value={telefone}
                onChange={e => setTelefone(formatPhone(e.target.value))}
                maxLength={18}
                required
              />
              {fieldErrors.telefone && <small className="error-text">{fieldErrors.telefone}</small>}
            </label>

            <label>
              E-mail
              <input
                className={fieldErrors.email ? 'input-error' : ''}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              {fieldErrors.email && <small className="error-text">{fieldErrors.email}</small>}
            </label>

            <label>
              Senha
              <input
                className={fieldErrors.senha ? 'input-error' : ''}
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                minLength={6}
                required
              />
              {fieldErrors.senha && <small className="error-text">{fieldErrors.senha}</small>}
            </label>

            {/* ENDEREÇO */}
            <fieldset className="address-fieldset">
              <legend>Endereço</legend>
              <label>
                Rua
                <input
                  className={fieldErrors.rua ? 'input-error' : ''}
                  type="text"
                  value={rua}
                  onChange={e => setRua(e.target.value)}
                  required
                />
                {fieldErrors.rua && <small className="error-text">{fieldErrors.rua}</small>}
              </label>

              <label>
                Número
                <input
                  className={fieldErrors.numero ? 'input-error' : ''}
                  type="text"
                  value={numero}
                  onChange={e => setNumero(onlyDigits(e.target.value))}
                  required
                />
                {fieldErrors.numero && <small className="error-text">{fieldErrors.numero}</small>}
              </label>

              <label>
                Complemento
                <input
                  className={fieldErrors.complemento ? 'input-error' : ''}
                  type="text"
                  value={complemento}
                  onChange={e => setComplemento(e.target.value)}
                />
                {fieldErrors.complemento && <small className="error-text">{fieldErrors.complemento}</small>}
              </label>

              <label>
                Cidade
                <input
                  className={fieldErrors.cidade ? 'input-error' : ''}
                  type="text"
                  value={cidade}
                  onChange={e => setCidade(e.target.value)}
                  required
                />
                {fieldErrors.cidade && <small className="error-text">{fieldErrors.cidade}</small>}
              </label>

              <label>
                CEP
                <input
                  className={fieldErrors.cep ? 'input-error' : ''}
                  type="text"
                  value={cep}
                  onChange={e => setCep(formatCEP(e.target.value))}
                  maxLength={9}
                  required
                />
                {fieldErrors.cep && <small className="error-text">{fieldErrors.cep}</small>}
              </label>
            </fieldset>

            {/* LOGO */}
            <label>
              Logo da Loja (JPG/PNG)
              <input
                className={fieldErrors.imagem ? 'input-error' : ''}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={e => setLogoFile(e.target.files[0])}
                required
              />
              {fieldErrors.imagem && <small className="error-text">{fieldErrors.imagem}</small>}
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
                !cep ||
                !logoFile
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