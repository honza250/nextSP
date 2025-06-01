// src/app/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookGenreSelect, genres } from '@/components/BookGenreSelect';
import { updateBook, getBookById } from '@/lib/actions';

type Props = {
  params: { id: string };
};

export default function EditBookPage({ params }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      const book = await getBookById(params.id);
      if (book) {
        setForm({
          title: book.title,
          author: book.author,
          genre: book.genre,
          description: book.description || '',
        });
      }
      setLoading(false);
    }
    fetchBook();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(params.id, form);
    router.push(`/book/${params.id}`);
  };

  if (loading) return <p className="p-6">Načítám data knihy…</p>;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Book</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          required
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="border p-2 rounded"
        />
        <BookGenreSelect
          value={form.genre}
          onChange={(genre) => setForm({ ...form, genre })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </main>
  );
}
