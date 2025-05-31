import Link from 'next/link';
import { deleteBook, toggleRead } from '@/lib/actions';
import { MyButton } from './MyButton';


export default function BookCard({ book }: { book: any }) {
  return (
    <div className="border p-4 rounded shadow-sm flex flex-col justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold">{book.title}</h2>
        <p className="text-gray-600 text-sm">{book.author}</p>
        <p className="text-sm text-gray-500 mt-2">{book.description}</p>
      </div>

      <div className="flex gap-2 flex-wrap mt-4">
        <form action={toggleRead}>
          <input type="hidden" name="id" value={book.id} />
          <MyButton variant="success">Mark as Read</MyButton>
        </form>

        <form action={deleteBook}>
          <input type="hidden" name="id" value={book.id} />
          <MyButton variant="destructive" type="submit">Delete</MyButton>
        </form>

        <MyButton href={`/book/${book.id}`}>View Details</MyButton>
      </div>
    </div>
  );
}
