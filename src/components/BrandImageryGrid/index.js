import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const IMAGES = [
  { file: 'logo_full.png', label: 'Full brand mark', alt: 'Full AFJ Cardiff brand mark showing the interlocking African wordmark' },
  { file: 'logo_letter_A.png', label: 'Letter A', alt: 'Close-up of the A letter from the AFJ wordmark' },
  { file: 'logo_letter_F.png', label: 'Letter F', alt: 'Close-up of the F letter from the AFJ wordmark' },
  { file: 'logo_weave.png', label: 'Weave detail', alt: 'Zoomed detail of the interlocking weave pattern' },
  { file: 'logo_tagline.png', label: 'Tagline', alt: 'The AFJ Cardiff tagline, Impact Through Dance and Culture' },
  { file: 'logo_palette.png', label: 'Colour palette', alt: 'AFJ Cardiff logo colour palette showing the gradient transition' },
];

function ImageWithFallback({ src, alt, label }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // No real file has ever been dropped in — this sandbox could never
    // fetch the actual logo (the source was network-blocked all
    // session). A clear, honest "placeholder" card reads as intentional;
    // a raw broken-image icon just looks like a bug.
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center p-2"
        style={{ aspectRatio: '1', background: 'var(--gradient, linear-gradient(135deg, var(--accent-1), var(--accent-2)))' }}
        role="img"
        aria-label={alt}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{label}</span>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,.8)', marginTop: 4 }}>Placeholder — add real file</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="card-img-top"
      style={{ aspectRatio: '1', objectFit: 'cover' }}
      onError={() => setFailed(true)}
    />
  );
}

export default function BrandImageryGrid() {
  const basePath = useBaseUrl('/img/brand');

  return (
    <div className="row row-cols-2 row-cols-md-3 g-2">
      {IMAGES.map((img) => (
        <div className="col" key={img.file}>
          <div className="card h-100">
            <ImageWithFallback src={`${basePath}/${img.file}`} alt={img.alt} label={img.label} />
          </div>
        </div>
      ))}
    </div>
  );
}
