'use client';

import BookForm from '@/components/BookForm';

export default function AddBookPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add a New Book</h1>
      <BookForm />
    </main>
  );
}