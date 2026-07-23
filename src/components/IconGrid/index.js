import React from 'react';
import { Menu, ShoppingBag, Calendar, User, Filter, Star, Play, FileText } from 'lucide-react';

const ICONS = [
  { Icon: Menu, name: 'Menu' },
  { Icon: ShoppingBag, name: 'Basket' },
  { Icon: Calendar, name: 'Schedule' },
  { Icon: User, name: 'Profile' },
  { Icon: Filter, name: 'Filter' },
  { Icon: Star, name: 'Rating' },
  { Icon: Play, name: 'Begin scroll' },
  { Icon: FileText, name: 'Governance doc' },
];

export default function IconGrid() {
  return (
    <div className="row row-cols-4 row-cols-md-8 g-2 p-3 rounded-3" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      {ICONS.map(({ Icon, name }) => (
        <div className="col text-center" key={name}>
          <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-1" style={{ width: 40, height: 40, background: 'var(--bg-offset)', border: '1px solid var(--border)' }}>
            <Icon size={18} color="var(--text)" aria-hidden="true" />
          </div>
          <p className="mb-0" style={{ fontSize: 9, color: 'var(--text-muted)' }}>{name}</p>
        </div>
      ))}
    </div>
  );
}
