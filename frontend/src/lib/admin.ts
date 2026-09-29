// ============================================================
// CLIENTE DEL PANEL DE ADMINISTRACIÓN (FASE 2)
// Las llamadas llevan credentials:'include' para que el navegador
// envíe/guarde la cookie httpOnly `admin_token` expedida por el backend.
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export class AdminError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'AdminError';
    this.status = status;
  }
}

async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    credentials: 'include',
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
      // cuerpo no-json, se usa el mensaje por defecto
    }
    throw new AdminError(res.status, message);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ============================ Sesión ============================

export interface AdminSession {
  sub: string;
  name: string;
}

export const adminSession = {
  async me(): Promise<AdminSession> {
    return adminRequest<AdminSession>('/admin/me');
  },
  async login(user: string, password: string): Promise<AdminSession> {
    return adminRequest<AdminSession>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ user, password }),
    });
  },
  async logout(): Promise<void> {
    await adminRequest<unknown>('/admin/logout', { method: 'POST' });
  },
};

// ============================ CRUD genérico ============================

export const adminCrud = {
  list<T>(path: string): Promise<T[]> {
    return adminRequest<T[]>(path);
  },
  create<T>(path: string, body: unknown): Promise<T> {
    return adminRequest<T>(path, { method: 'POST', body: JSON.stringify(body) });
  },
  update<T>(path: string, body: unknown): Promise<T> {
    return adminRequest<T>(path, { method: 'PATCH', body: JSON.stringify(body) });
  },
  remove(path: string): Promise<void> {
    return adminRequest<void>(path, { method: 'DELETE' });
  },
};