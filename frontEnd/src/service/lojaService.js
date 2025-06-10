import api from './api'

export async function createEndereco(rua, numero, complemento, cidade, cep) {
  try {
    const resp = await api.post(
      '/enderecos',
      { rua, numero, complemento, cidade, cep },
      { withCredentials: true }
    )
    return resp.data
  } catch (err) {
    if (err.response?.status === 400 && Array.isArray(err.response.data.message)) {
      // lança o próprio objeto de validação para o front
      throw err.response.data
    }
    throw err
  }
}

export async function createLoja(nome, cnpj, telefone, email, senha, enderecoId) {
  try {
    const resp = await api.post(
      '/lojas',
      { nome, cnpj, telefone, email, senha, enderecoId },
      { withCredentials: true }
    )
    return resp.data
  } catch (err) {
    if (err.response?.status === 400 && Array.isArray(err.response.data.message)) {
      throw err.response.data
    }
    throw err
  }
}

// uploadLojaImage permanece igual
export async function uploadLojaImage(lojaId, file) {
  const form = new FormData()
  form.append('imagem', file)
  await api.patch(
    `/lojas/${lojaId}/imagem`,
    form,
    {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
}

export async function findLojaByEmail(email) {
  const resp = await api.get(`/lojas/email/${email}`, { withCredentials: true });
  return resp.data;
}
