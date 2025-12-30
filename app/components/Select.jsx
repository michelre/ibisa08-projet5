"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function Select({ label, options, selected = [], onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (open) {
      // focus dans l’input quand on ouvre
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]);

  const toggle = () => setOpen((v) => !v);

  const handleSelect = (value) => {
    if (selected.includes(value)) return; // évite doublons
    onSelect?.(value);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="select" ref={rootRef}>
      <button type="button" className="select__button" onClick={toggle}>
        <span className="select__label">{label}</span>

        <span className={`select__chevron ${open ? "is-open" : ""}`} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="select__panel" role="listbox" aria-label={label}>
          <div className="select__search">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=""
              aria-label={`Rechercher dans ${label}`}
            />

            {query.length > 0 && (
              <button
                type="button"
                className="select__clear"
                aria-label="Effacer la recherche"
                onClick={() => setQuery("")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}

            <span className="select__searchIcon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M20 20l-3.2-3.2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>

          <ul className="select__list">
            {filtered.map((opt) => {
              const isSelected = selected.includes(opt.label);
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    className={`select__item ${isSelected ? "is-selected" : ""}`}
                    onClick={() => handleSelect(opt.label)}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}