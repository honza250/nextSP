'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteBook } from '@/lib/actions';
import { MyButton } from '@/components/MyButton';

export function DeleteBookButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    const formData = new FormData();
    formData.append('id', id);
    startTransition(async () => {
      await deleteBook(formData);
      router.push('/');
    });
  };

  return (
    <MyButton
      onClick={handleDelete}
      disabled={isPending}
      variant="destructive"
    >
      {isPending ? 'Mazání...' : 'Delete Book'}
    </MyButton>
  );
}
