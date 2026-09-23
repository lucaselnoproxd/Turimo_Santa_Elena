import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { api } from '../lib/api';
import {
  beachFromApi,
  activityFromApi,
  servicesFromApi,
  type ApiActivity,
  type ApiBeach,
  type ApiService,
} from '../lib/api-mappers';
import type { Activity } from '../data/activities';
import type { Beach } from '../data/beaches';
import type { Hotel, Guide } from '../data/services';
import { activities as staticActivities } from '../data/activities';
import { beaches as staticBeaches } from '../data/beaches';
import { hotels as staticHotels, guides as staticGuides } from '../data/services';

interface SiteData {
  activities: Activity[];
  beaches: Beach[];
  hotels: Hotel[];
  guides: Guide[];
  loading: boolean;
  usingApi: boolean;
  refresh: () => void;
}

const SiteDataContext = createContext<SiteData | null>(null);

export function useSiteData(): SiteData {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error('useSiteData debe usarse dentro de SiteDataProvider');
  }
  return ctx;
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [usingApi, setUsingApi] = useState(false);

  const [activities, setActivities] = useState<Activity[]>(staticActivities);
  const [beaches, setBeaches] = useState<Beach[]>(staticBeaches);
  const [hotels, setHotels] = useState<Hotel[]>(staticHotels);
  const [guides, setGuides] = useState<Guide[]>(staticGuides);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [a, b, s] = await Promise.all([
        api.get<ApiActivity[]>('/activities'),
        api.get<ApiBeach[]>('/beaches'),
        api.get<ApiService[]>('/services'),
      ]);

      setActivities(a.map(activityFromApi));
      setBeaches(b.map(beachFromApi));

      const { hotels: h, guides: g } = servicesFromApi(s);
      setHotels(h);
      setGuides(g);

      setUsingApi(true);
    } catch {
      setActivities(staticActivities);
      setBeaches(staticBeaches);
      setHotels(staticHotels);
      setGuides(staticGuides);
      setUsingApi(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <SiteDataContext.Provider
      value={{
        activities,
        beaches,
        hotels,
        guides,
        loading,
        usingApi,
        refresh: () => {
          load();
        },
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}