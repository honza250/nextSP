import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function BookDetail({ params }: { params: { id: string } }) {
  const book = await prisma.book.findUnique({ where: { id: params.id } });

  if (!book) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-xl text-gray-700">{book.author}</p>
      <p className="mt-2 italic">{book.genre}</p>
      <p className="mt-4">{book.description}</p>
      <p className="mt-4 text-sm text-gray-500">Status: {book.read ? 'Read' : 'Unread'}</p>
    </div>
  );
}
