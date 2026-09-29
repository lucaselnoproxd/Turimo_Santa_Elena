import { useCallback, useEffect, useRef, useState } from 'react';
import { adminCrud, AdminError } from '../lib/admin';

/**
 * Colección remota de un módulo del panel.
 * Al crear/editar/borrar refresca solo esta colección (invalidación
 * por clave), de modo que editar un módulo no vuelve a cargar los demás.
 */
export function useAdminCollection<T extends { id: string }>(basePath: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = useCallback(async (): Promise<boolean> => {
    try {
      const data = await adminCrud.list<T>(basePath);
      if (mounted.current) {
        setItems(Array.isArray(data) ? data : []);
        setError(null);
      }
      return true;
    } catch (e) {
      if (mounted.current) {
        setError(e instanceof AdminError ? e.message : 'No se pudo cargar la lista');
      }
      return false;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [basePath]);

  useEffect(() => {
    void load();
  }, [load]);

  const create = useCallback(
    async (body: unknown): Promise<boolean> => {
      await adminCrud.create(`${basePath}`, body);
      return load();
    },
    [basePath, load],
  );

  const update = useCallback(
    async (id: string, body: unknown): Promise<boolean> => {
      await adminCrud.update<T>(`${basePath}/${id}`, body);
      return load();
    },
    [basePath, load],
  );

  const remove = useCallback(
    async (id: string): Promise<boolean> => {
      await adminCrud.remove(`${basePath}/${id}`);
      return load();
    },
    [basePath, load],
  );

  return { items, loading, error, load, create, update, remove };
}