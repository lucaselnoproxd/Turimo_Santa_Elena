import Icon from './Icon';

interface RatingStarsProps {
  rating: number;
  size?: 'small' | 'medium';
}

export default function RatingStars({ rating, size = 'medium' }: RatingStarsProps) {
  const starClass = size === 'small' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="star"
          className={starClass}
          style={{ color: i < rating ? 'var(--clr-star)' : '#d0e8f0' }}
        />
      ))}
    </div>
  );
}
