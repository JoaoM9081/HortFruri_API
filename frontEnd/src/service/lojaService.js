import api from './api'

/**
 * Cria um endereço.
 * @param {string} rua 
 * @param {string} numero 
 * @param {string} complemento 
 * @param {string} cidade 
 * @param {string} cep 
 * @returns {Promise<{ id: number, rua: string, numero: string, complemento?: string, cidade: string, cep: string }>}
 */
export async function createEndereco(rua, numero, complemento, cidade, cep) {
  const resp = await api.post(
    '/enderecos',
    { rua, numero, complemento, cidade, cep },
    { withCredentials: true }
  )
  return resp.data
}

/**
 * Cria uma loja.
 * @param {string} nome 
 * @param {string} cnpj 
 * @param {string} telefone 
 * @param {string} email 
 * @param {string} senha 
 * @param {number} enderecoId 
 * @returns {Promise<{ id: number, nome: string, cnpj: string, telefone: string, email: string, endereco: { id: number } }>}
 */
export async function createLoja(nome, cnpj, telefone, email, senha, enderecoId) {
  const resp = await api.post(
    '/lojas',
    { nome, cnpj, telefone, email, senha, enderecoId },
    { withCredentials: true }
  )
  return resp.data
}

/**
 * Envia a logo da loja via multipart/form-data.
 * @param {number} lojaId 
 * @param {File} file 
 */
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
