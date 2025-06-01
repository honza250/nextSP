// app/api/books/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const book = await prisma.book.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(book);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.book.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
