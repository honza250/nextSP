'use server';

import prisma from '@/lib/prisma';

// CREATE BOOK
export async function createBook(data: {
  title: string;
  author: string;
  description?: string;
  genre: string;
}) {
  try {
    await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        description: data.description,
        genre: data.genre,
        read: false,
      },
    });
    return true;
  } catch (error) {
    console.error('Error creating book:', error);
    return false;
  }
}

// DELETE BOOK
export async function deleteBook(formData: FormData) {
  const id = formData.get('id') as string;

  try {
    await prisma.book.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}

// TOGGLE READ/UNREAD
export async function toggleRead(formData: FormData) {
  const id = formData.get('id') as string;

  try {
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      throw new Error('Book not found');
    }

    await prisma.book.update({
      where: { id },
      data: { read: !book.read },
    });
  } catch (error) {
    console.error('Error toggling read status:', error);
  }
}

// GET BOOK BY ID
export async function getBookById(id: string) {
  try {
    return await prisma.book.findUnique({ where: { id } });
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
}

// UPDATE BOOK
export async function updateBook(id: string, data: {
  title: string;
  author: string;
  genre: string;
  description?: string;
}) {
  try {
    await prisma.book.update({
      where: { id },
      data,
    });
    return true;
  } catch (error) {
    console.error('Error updating book:', error);
    return false;
  }
}
