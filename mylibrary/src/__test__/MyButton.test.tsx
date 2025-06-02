import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyButton } from '../components/MyButton';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { useRouter } from 'next/navigation';

// 🔧 Mock Link (Next.js)
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('MyButton', () => {
  it('renders as a button by default', () => {
    render(<MyButton>Click me</MyButton>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<MyButton onClick={onClick}>Click me</MyButton>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('applies correct style variant (default)', () => {
    render(<MyButton>Default</MyButton>);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/bg-blue-600/); // default variant
  });

  it('applies correct style variant (destructive)', () => {
    render(<MyButton variant="destructive">Danger</MyButton>);
    const button = screen.getByRole('button');
    expect(button.className).toMatch(/bg-red-600/);
  });

  it('renders as a link when href is provided', () => {
    render(<MyButton href="/about">About</MyButton>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/about');
    expect(link).toHaveTextContent('About');
  });

  it('applies correct variant to link as well', () => {
    render(
      <MyButton href="/delete" variant="destructive">
        Delete
      </MyButton>
    );
    const link = screen.getByRole('link');
    expect(link.className).toMatch(/bg-red-600/);
  });
});
