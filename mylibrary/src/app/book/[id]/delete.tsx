'use server';
import { deleteBook } from '@/lib/actions';
import { redirect } from 'next/navigation';

export async function deleteAndRedirect(id: string) {
  const formData = new FormData();
  formData.set('id', id);
  await deleteBook(formData);
  redirect('/');
}
