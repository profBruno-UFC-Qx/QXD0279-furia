import { ApiError } from './ApiError'

const BASE_URL = 'http://localhost:9876'

export const TOKEN_KEY = 'token'

type RequestOptions = RequestInit & { 
  auth?: boolean;
  params?: Record<string, any>; 
}

export async function request<T>(
  path: string,
  { auth = false, params, ...init }: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(init.headers)
  const token = localStorage.getItem(TOKEN_KEY)

  if (auth && token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const url = new URL(`${BASE_URL}${path}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      // Ignora valores nulos, indefinidos ou strings vazias
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value))
      }
    })
  }

  const response = await fetch(url.toString(), { ...init, headers })

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
