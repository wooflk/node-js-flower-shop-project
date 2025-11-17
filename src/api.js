const API_ROOT = import.meta.env.VITE_API_URL || 'https://undegenerating-contumely-lashandra.ngrok-free.dev'

export async function apiGet(path, token) {
  const res = await fetch(API_ROOT + path, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  return res.json()
}

export async function apiPost(path, body, token) {
  const res = await fetch(API_ROOT + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })
  return res.json()
}
