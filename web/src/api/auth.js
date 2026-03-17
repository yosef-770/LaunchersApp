const URL_API = import.meta.env.VITE_URL_API

export function getToken() {
  return localStorage.getItem('token')
}

async function reqWithRes(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  return fetch(`${URL_API}${path}`, { ...options, headers }).then(async (res) => {
    const data = await res.json().catch(() => ({}))
    return { data, ok: res.ok }
  })
}

export async function login(body) {
  const res = await fetch(`${URL_API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) return { data, ok: false }
  if (data.token) localStorage.setItem('token', data.token)
  return { data, ok: true }
}

export async function getUser() {
  return await reqWithRes('/api/auth/getUser')
}

export async function register(body) {
  return await reqWithRes('/api/auth/register/create', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function getAllUsers() {
  return await reqWithRes('/api/auth/getAllusers')
}

export async function updateUser(id, body) {
  return await reqWithRes(`/api/auth/register/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
}

export async function deleteUser(id) {
  return await reqWithRes(`/api/auth/register/delete/${id}`, { method: 'DELETE' }).then((r) => ({ ok: r.ok }))
}
