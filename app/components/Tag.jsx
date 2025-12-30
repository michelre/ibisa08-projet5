"use client";

export default function Tag({ label, onRemove }) {
  return (
    <span className="tag">
      <span className="tag__label">{label}</span>
      <button
        type="button"
        className="tag__remove"
        aria-label={`Supprimer ${label}`}
        onClick={() => onRemove?.(label)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </span>
  );
}