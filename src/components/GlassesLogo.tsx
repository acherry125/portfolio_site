interface GlassesLogoProps {
  width?: number;
  opacity?: number;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export default function GlassesLogo({
  width = 40,
  opacity = 1,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: GlassesLogoProps) {
  const height = Math.round(width * (64 / 180));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 180 64"
      fill="none"
      style={opacity !== 1 ? { opacity } : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      <g>
        <path
          d="M10 16 C10 8, 28 2, 56 2 C72 2, 80 5, 84 10 L84 18 C82 36, 78 48, 76 52 C74 57, 64 60, 48 60 C32 60, 16 57, 14 52 C10 44, 8 24, 10 16Z"
          stroke="#C0392B"
          strokeWidth="3.5"
          fill="rgba(192,57,43,0.04)"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(180,0) scale(-1,1)">
        <path
          d="M10 16 C10 8, 28 2, 56 2 C72 2, 80 5, 84 10 L84 18 C82 36, 78 48, 76 52 C74 57, 64 60, 48 60 C32 60, 16 57, 14 52 C10 44, 8 24, 10 16Z"
          stroke="#C0392B"
          strokeWidth="3.5"
          fill="rgba(192,57,43,0.04)"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M84 12 Q90 6, 96 12"
        stroke="#C0392B"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="8" cy="12" rx="5" ry="2.5" fill="#C0392B" />
      <ellipse cx="172" cy="12" rx="5" ry="2.5" fill="#C0392B" />
    </svg>
  );
}
