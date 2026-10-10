import type { ImgHTMLAttributes } from 'react';
import { responsiveSrcSet } from '../lib/images.mjs';

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; width: number; height: number };
export default function ResponsiveImage({
  src,
  width,
  height,
  sizes = '(max-width: 640px) 160px, 280px',
  ...props
}: Props) {
  const srcSet = responsiveSrcSet(src, width);
  return (
    <img
      {...props}
      src={src}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
    />
  );
}
