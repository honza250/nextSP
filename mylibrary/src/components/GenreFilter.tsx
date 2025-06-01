'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { genres } from './BookGenreSelect';

export function GenreFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get('genre') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    const query = genre ? `?genre=${encodeURIComponent(genre)}` : '';
    router.push(`/${query}`);
  };

  return (
    <select
      className="mb-6 p-2 border rounded"
      value={selected}
      onChange={handleChange}
    >
      <option value="">Všechny žánry</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}