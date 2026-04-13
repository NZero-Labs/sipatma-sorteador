interface HistoryIconProps {
  className?: string;
  size?: number;
  hovered?: boolean;
}

export function HistoryIcon({
  className,
  size = 100,
  hovered = false,
}: HistoryIconProps) {
  const strokeColor = hovered ? "#199F4E" : "#575756";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="50" fill="#E6E6E6" />
      <g transform="translate(26, 26) scale(2)">
        <path
          d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M3 3v5h5M12 7v5l4 2"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
