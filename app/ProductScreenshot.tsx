import images from './screenshots.generated.json';
import { siteAsset } from './site-path';

type Props = {
  src: keyof typeof images;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

export default function ProductScreenshot({ src, alt, priority = false, sizes = '(max-width: 760px) calc(100vw - 40px), (max-width: 1440px) calc(100vw - 96px), 1344px' }: Props) {
  const image = images[src];
  const fallback = image.variants.find(v => v.width >= 1280) ?? image.variants[0];
  return <img
    src={siteAsset(fallback.src)}
    srcSet={image.variants.map(v => `${siteAsset(v.src)} ${v.width}w`).join(', ')}
    sizes={sizes}
    width={image.width}
    height={image.height}
    alt={alt}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'}
    decoding="async"
  />;
}
