// src/app/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookGenreSelect } from '@/components/BookGenreSelect';
import { updateBook, getBookById } from '@/lib/actions';
import { MyButton } from '@/components/MyButton';
import { use } from 'react';


type Props = {
  params: Promise<{ id: string }>;
};

export default function EditBookPage(_props: Props) {
  const router = useRouter();
  const { id } = use(_props.params);
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      const book = await getBookById(id);
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
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(id, form);
    router.push(`/`);
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
        
        <MyButton type="submit">Save Changes</MyButton>
        <MyButton href={`/book/${id}`} variant="outline" className="bg-gray-300 text-gray-800 p-2 rounded">
          Cancel
        </MyButton>

      </form>
    </main>
  );
}
