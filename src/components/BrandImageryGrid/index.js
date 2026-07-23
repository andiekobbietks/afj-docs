import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const IMAGES = [
  { file: 'logo_full.png', alt: 'Full AFJ Cardiff brand mark showing the interlocking African wordmark' },
  { file: 'logo_letter_A.png', alt: 'Close-up of the A letter from the AFJ wordmark' },
  { file: 'logo_letter_F.png', alt: 'Close-up of the F letter from the AFJ wordmark' },
  { file: 'logo_weave.png', alt: 'Zoomed detail of the interlocking weave pattern' },
  { file: 'logo_tagline.png', alt: 'The AFJ Cardiff tagline, Impact Through Dance and Culture' },
  { file: 'logo_palette.png', alt: 'AFJ Cardiff logo colour palette showing the gradient transition' },
];

export default function BrandImageryGrid() {
  const basePath = useBaseUrl('/img/brand'); // called once, at the top level — not inside the loop below

  return (
    <div className="row row-cols-2 row-cols-md-3 g-2">
      {IMAGES.map((img) => (
        <div className="col" key={img.file}>
          <div className="card h-100">
            <img src={`${basePath}/${img.file}`} alt={img.alt} className="card-img-top" style={{ aspectRatio: '1', objectFit: 'cover' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
