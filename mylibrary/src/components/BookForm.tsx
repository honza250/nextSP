'use client';

import { useState } from 'react';
import React from 'react';
import { createBook } from '../lib/actions';
import { useRouter } from 'next/navigation';
import { BookGenreSelect } from './BookGenreSelect';

export default function BookForm() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', author: '', genre: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true); // <- zapni spinner
    await createBook(form);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input required placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
      <BookGenreSelect
        value={form.genre}
        onChange={(genre) => setForm({ ...form, genre })}
      />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Přidávám…' : 'Add Book'}
      </button>

      {isSubmitting && (
        <p className="text-sm text-gray-500 italic">Přesměrovávám na hlavní stránku…</p>
      )}
    </form>
  );
}
