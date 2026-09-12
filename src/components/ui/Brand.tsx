export function Brand({
  compact = false
}: {
  compact?: boolean;
}) {
  return <span className={`brand ${compact ? 'brand--compact' : ''}`} aria-label="Hood Sports">
    <svg className="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M10 5h9l-4 12h9l4-12h9L27 35h-9l4-12h-9L9 35H0L10 5Z" fill="currentColor" />
    </svg>
    <span className="brand-word">HOOD<span>SPORTS</span>
    </span>
  </span>;
}
