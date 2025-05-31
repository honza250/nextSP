// app/page.tsx

import prisma from '@/lib/prisma';
import BookCard from '@/components/BookCard';
import Link from 'next/link';

export default async function HomePage() {
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 My Library</h1>
      <Link
        href="/add"
        className="inline-block mb-4 text-blue-600 hover:underline"
        > + Add a new book
      </Link>

      {books.length === 0 ? (
        <p className="text-gray-500">No books yet. Try adding one!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
