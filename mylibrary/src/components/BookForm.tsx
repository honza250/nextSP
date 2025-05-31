'use client';

import { useState } from 'react';
import { addBook } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function BookForm() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', author: '', genre: '', description: '' });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addBook(form);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input required placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
      <input required placeholder="Genre" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Book</button>
    </form>
  );
}
