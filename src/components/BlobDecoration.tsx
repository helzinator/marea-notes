"use client";

type BlobProps = {
  className?: string;
  variant?: "primary" | "teal" | "light";
  size?: number;
};

export default function BlobDecoration({
  className = "",
  variant = "primary",
  size = 400,
}: BlobProps) {
  const gradients = {
    primary: { start: "#0F7F8E", end: "#47B7C2" },
    teal: { start: "#47B7C2", end: "#0F7F8E" },
    light: { start: "#C4E2E7", end: "#BDE7EC" },
  };

  const g = gradients[variant];
  const id = `blob-grad-${variant}-${size}`;

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={g.start} stopOpacity="0.9" />
          <stop offset="100%" stopColor={g.end} stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M44.6,-67.2C57.1,-60.4,66.3,-47.6,72.4,-33.3C78.4,-19,81.2,-3.2,78.2,11.4C75.2,26,66.3,39.4,55.3,50.8C44.3,62.2,31.1,71.6,15.9,76.1C0.7,80.6,-16.5,80.2,-30.8,73.4C-45.1,66.6,-56.5,53.4,-64.4,38.8C-72.3,24.2,-76.7,8.2,-74.5,-6.8C-72.3,-21.8,-63.4,-35.8,-52.5,-47.2C-41.6,-58.6,-28.7,-67.4,-14.5,-71.5C-0.3,-75.6,15.2,-75,28.9,-70.3C42.6,-65.7,54.6,-57,44.6,-67.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
