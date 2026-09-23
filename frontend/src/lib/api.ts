// ============================================================
// CLIENTE HTTP PARA EL BACKEND
// ============================================================
// En desarrollo usa el proxy de Vite (/api -> localhost:3000).
// En producción apunta a VITE_API_URL si está definida; si no,
// usa la ruta relativa /api (backend desplegado en el mismo dominio).

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const body = (await res.json()) as { message?: string | string[] };
      if (typeof body.message === 'string') message = body.message;
      else if (Array.isArray(body.message)) message = body.message.join(', ');
    } catch {
      // cuerpo no-json, usamos el mensaje por defecto
    }
    throw new ApiError(res.status, message);
  }

  return res.json() as Promise<T>;
}

export const api = {
  get<T>(path: string): Promise<T> {
    return request<T>(path);
  },
  post<T>(path: string, body: unknown): Promise<T> {
    return request<T>(path, { method: 'POST', body: JSON.stringify(body) });
  },
  patch<T>(path: string, body: unknown): Promise<T> {
    return request<T>(path, { method: 'PATCH', body: JSON.stringify(body) });
  },
  put<T>(path: string, body: unknown): Promise<T> {
    return request<T>(path, { method: 'PUT', body: JSON.stringify(body) });
  },
  delete<T>(path: string): Promise<T> {
    return request<T>(path, { method: 'DELETE' });
  },
};

export interface AuthPayload {
  token: string;
  user: { id: string; email: string; name: string };
}

export async function login(
  email: string,
  password: string,
): Promise<AuthPayload> {
  return api.post<AuthPayload>('/auth/login', { email, password });
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<AuthPayload> {
  return api.post<AuthPayload>('/auth/register', { name, email, password });
}