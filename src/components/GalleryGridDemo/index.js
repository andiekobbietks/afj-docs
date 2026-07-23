import React from 'react';

export default function GalleryGridDemo() {
  return (
    <div className="row row-cols-2 row-cols-md-4 g-2 p-3 rounded-3" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
      {[1, 2, 3, 4].map((i) => (
        <div className="col" key={i}>
          <div className="rounded-2" style={{ aspectRatio: '1', background: 'linear-gradient(135deg, var(--bg-panel), var(--bg-offset))' }} />
        </div>
      ))}
    </div>
  );
}
