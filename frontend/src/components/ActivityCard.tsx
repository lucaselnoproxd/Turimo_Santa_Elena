import { Link } from 'react-router-dom';
import Icon from './Icon';
import type { Activity } from '../data/activities';
import { getCategoryById, categoryColor } from '../data/activities';

interface ActivityCardProps {
  activity: Activity;
  compact?: boolean;
}

export default function ActivityCard({ activity, compact = false }: ActivityCardProps) {
  const category = getCategoryById(activity.category);
  const color = categoryColor(activity.category);

  return (
    <Link
      to={`/experiencia/${activity.slug}`}
      className={`gel-card shine push-card group block overflow-hidden ${compact ? '' : 'h-full flex flex-col'}`}
    >
      <div className={`relative overflow-hidden ${compact ? 'h-40' : 'h-52'}`}>
        <img
          src={activity.cover}
          alt={activity.title}
          loading="lazy"
          className="w-full h-full object-cover object-center push-img"
        />
        <span
          className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ background: color, boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          {category?.short}
        </span>
      </div>

      <div className={`${compact ? 'p-4' : 'p-5 flex flex-col flex-1'}`}>
        <h3
          className={`font-heading font-bold ${compact ? 'text-base' : 'text-lg'} mb-1 transition-colors duration-200`}
          style={{ color: 'var(--clr-text-heading)' }}
        >
          {activity.cardTitle}
        </h3>
        <p className="text-sm mb-4 flex-1" style={{ color: 'var(--clr-text-muted)' }}>
          {activity.tagline}
        </p>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--clr-primary-dark)' }}
        >
          Ver experiencia
          <Icon name="arrow-right" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
