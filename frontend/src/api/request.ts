import { ApiError } from './ApiError'

const BASE_URL = 'http://localhost:9876'

export const TOKEN_KEY = 'token'

type RequestOptions = RequestInit & { auth?: boolean }

export async function request<T>(
  path: string,
  { auth = false, ...init }: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(init.headers)
  const token = localStorage.getItem(TOKEN_KEY)

  if (auth && token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${BASE_URL}${path}`, { ...init, headers })
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(
      response.status,
      body?.message || response.statusText || 'Erro desconhecido',
      body?.details,
    )
  }

  return body
}
