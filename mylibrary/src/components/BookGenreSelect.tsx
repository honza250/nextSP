// src/components/BookGenreSelect.tsx
'use client';

import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const genres = [
  'Akční',
  'Fantasy',
  'Sci-fi',
  'Romantika',
  'Detektivka',
  'Historický',
  'Horor',
  'Biografie',
  'Non-fiction',
];

export function BookGenreSelect({ value, onChange }: Props) {
  return (
    <select
      name="genre"
      required
      value={value}
      onChange={e => onChange(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="" disabled>-- Vyber žánr --</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}
