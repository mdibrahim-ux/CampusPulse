import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  index: string;
  title: string;
  description: string;
  href: string;
  action: string;
  icon: LucideIcon;
  tone: 'yellow' | 'blue' | 'orange' | 'paper';
};

export function FeatureCard({
  index,
  title,
  description,
  href,
  action,
  icon: Icon,
  tone,
}: FeatureCardProps) {
  return (
    <article className="nb-feature-card">
      <div className="nb-feature-card-top">
        <span className="nb-feature-index">{index}</span>
        <span className={'nb-feature-icon nb-tone-' + tone}>
          <Icon size={23} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={href} className="nb-feature-link">
        {action} <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
