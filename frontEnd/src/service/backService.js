import api from './api'  

/**
 * Faz login, guarda cookie via httpOnly e retorna true/lança erro.
 * @param {{ email: string, password: string }} credentials
 */
export async function login({ email, password }) {
  // Content-Type: application/json enviado por api.js
  const resp = await api.post(
    '/auth/login',
    { email, password },
    { withCredentials: true }
  )
  return resp.data.success === true
}

/**
 * Faz logout limpando o cookie
 */
export async function logout() {
  await api.post('/auth/logout', {}, { withCredentials: true })
}

/**
 * Busca /auth/me com cookie
 * @returns {Promise<{ id: number, email: string, role: string }>}
 */
export async function fetchCurrentUser() {
  const resp = await api.get('/auth/me', { withCredentials: true })
  return resp.data
}
