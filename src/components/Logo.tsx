import { BRAND } from "../data";

const G_PATH = "M78 8 H34 Q8 8 8 40 Q8 72 34 72 H70 V44 H42";

type Props = {
  variant?: "light" | "dark"; // light = for white backgrounds, dark = for blue backgrounds
  className?: string;
};

export function Logo({ variant = "light", className = "" }: Props) {
  const id = `speed-${variant}`;
  const lineColor = variant === "dark" ? "#ffffff" : BRAND.blue;
  return (
    <svg
      viewBox="0 0 664 134"
      className={className}
      role="img"
      aria-label="Glacious Fresh"
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={lineColor} stopOpacity="0" />
          <stop offset="1" stopColor={lineColor} stopOpacity="1" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={BRAND.green}
        strokeWidth="16"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      >
        <path d={G_PATH} />
        <path transform="translate(90 0)" d="M8 0 V72 H64" />
        <path transform="translate(252 0)" d="M78 8 H34 Q8 8 8 40 Q8 72 34 72 H78" />
        <path transform="translate(342 0)" d="M8 0 V80" />
        <path
          transform="translate(370 0)"
          d="M34 8 H62 Q88 8 88 40 Q88 72 62 72 H34 Q8 72 8 40 Q8 8 34 8 Z"
        />
        <path transform="translate(478 0)" d="M8 0 V44 Q8 72 34 72 H52 Q78 72 78 44 V0" />
        <path
          transform="translate(576 0)"
          d="M80 8 H28 Q8 8 8 24 Q8 38 28 40 L60 42 Q80 44 80 58 Q80 72 60 72 H0"
        />
      </g>
      <polygon
        transform="translate(166 0)"
        fill={BRAND.green}
        points="0,80 30,0 44,0 74,80 50,80 58,72 37,22 18,80"
      />
      {/* speed lines */}
      <g fill={`url(#${id})`}>
        <rect x="24" y="100" width="380" height="3.5" />
        <rect x="6" y="113" width="420" height="3.5" />
        <rect x="24" y="126" width="374" height="3.5" />
      </g>
      <text
        x="440"
        y="132"
        fill={BRAND.green}
        fontFamily="'Inter', Arial, sans-serif"
        fontWeight="800"
        fontStyle="italic"
        fontSize="38"
        textLength="222"
        lengthAdjust="spacing"
        transform="skewX(-8) translate(18 0)"
      >
        FRESH
      </text>
    </svg>
  );
}

export function GMark({ className = "", color = BRAND.green }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <path d={G_PATH} fill="none" stroke={color} strokeWidth="16" />
    </svg>
  );
}

/** Data-URL version of the G mark, used inside the QR code centre */
export function gMarkDataUrl() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-14 -14 108 108"><rect x="-14" y="-14" width="108" height="108" rx="20" fill="#ffffff"/><path d="${G_PATH}" fill="none" stroke="${BRAND.green}" stroke-width="16"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
