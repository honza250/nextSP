'use client';

import Link from 'next/link';
import { deleteBook, toggleRead } from '@/lib/actions';
import { useTransition } from 'react';
import { MyButton } from './MyButton'; // ← přidat import

export default function BookCard({ book }: { book: any }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const formData = new FormData();
    formData.append('id', book.id);
    startTransition(() => {
      toggleRead(formData);
    });
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append('id', book.id);
    startTransition(() => {
      deleteBook(formData);
    });
  };

  return (
    <div className="border p-4 rounded shadow-sm space-y-2">
      <Link href={`/book/${book.id}`}>
        <h2
          className={`text-lg font-semibold ${
            book.read ? 'line-through text-gray-500' : ''
          }`}
        >
          {book.title}
        </h2>
      </Link>
      <p className="text-sm text-gray-700">{book.author}</p>
      {book.genre && <p className="text-xs text-gray-500">Genre: {book.genre}</p>}
      {book.description && (
        <p className="text-sm text-gray-600">{book.description}</p>
      )}

      <div className="flex gap-2 mt-2">
        <MyButton
          onClick={handleToggle}
          disabled={isPending}
          variant="success"
        >
          {book.read ? 'Mark as unread' : 'Mark as read'}
        </MyButton>
        <MyButton
          onClick={handleDelete}
          disabled={isPending}
          variant="destructive"
        >
          Delete
        </MyButton>
        <Link href={`/book/${book.id}`} className="text-blue-600 hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
}
