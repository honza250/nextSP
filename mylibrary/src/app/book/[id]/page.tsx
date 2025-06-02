import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MyButton } from '@/components/MyButton';
import { DeleteBookButton } from '@/components/Delete'; 

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookDetail(props: Props) {
  const { id } = await props.params;
  
  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) return notFound();

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="p-6">
        <h1 className="text-3xl font-bold">Title: {book.title}</h1>
        <p className="text-xl text-gray-700">Author: {book.author}</p>
        <p className="mt-2 italic">Genre: {book.genre}</p>
        <p className="mt-4">Description: {book.description}</p>
        <p className="mt-4 text-sm text-gray-500">Status: {book.read ? 'Read' : 'Unread'}</p>
      </div>
      <MyButton href={`/edit/${book.id}`} variant="primary">
        Edit Book
      </MyButton>
      <DeleteBookButton id={book.id} />
      <MyButton href="/" variant="outline">
        ← Back to Home
      </MyButton>
    </main>
  );
}
