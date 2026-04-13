interface HistoryIconProps {
  className?: string;
  size?: number;
  hovered?: boolean;
}

export function HistoryIcon({ className, size = 100, hovered = false }: HistoryIconProps) {
  const fillColor = hovered ? "#199F4E" : "#575756";
  
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
      <path
        d="M50 27C37.317 27 27 37.317 27 50C27 62.683 37.317 73 50 73C62.683 73 73 62.683 73 50C73 37.317 62.683 27 50 27ZM50 68.4C39.858 68.4 31.6 60.142 31.6 50C31.6 39.858 39.858 31.6 50 31.6C60.142 31.6 68.4 39.858 68.4 50C68.4 60.142 60.142 68.4 50 68.4Z"
        fill={fillColor}
      />
      <path
        d="M52.3 38.5H47.7V51.15L58.625 58.0125L61.125 54.3375L52.3 48.85V38.5Z"
        fill={fillColor}
      />
      <path
        d="M34.5 50H30L36.5 56.5L43 50H38.5C38.5 44.2 43.2 39.5 49 39.5V35C40.716 35 34 41.716 34 50H34.5Z"
        fill={fillColor}
      />
    </svg>
  );
}
