import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from '../components/BookCard'; // relativní cesta
import * as actions from '../lib/actions'; // relativní cesta
import '@testing-library/jest-dom';

const mockBook = {
  id: '1',
  title: 'Mock Book Title',
  author: 'Mock Author',
  genre: 'Fantasy',
  description: 'Some description',
  read: false,
};

describe('BookCard', () => {
  it('renders book title and author', () => {
    render(<BookCard book={mockBook} />);
    expect(screen.getByText('Mock Book Title')).toBeInTheDocument();
    expect(screen.getByText('Mock Author')).toBeInTheDocument();
  });

  it('has "View Details" link with correct href', () => {
    render(<BookCard book={mockBook} />);
    const link = screen.getByText('View Details');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/book/1');
  });

  it('calls deleteBook when "Delete" button is clicked', () => {
    const deleteSpy = vi.spyOn(actions, 'deleteBook').mockImplementation(() => Promise.resolve());
    render(<BookCard book={mockBook} />);
    const button = screen.getByText('Delete');
    fireEvent.click(button);
    expect(deleteSpy).toHaveBeenCalled();
    deleteSpy.mockRestore();
  });

  it('calls toggleRead when "Mark as read" button is clicked', () => {
    const toggleSpy = vi.spyOn(actions, 'toggleRead').mockImplementation(() => Promise.resolve());
    render(<BookCard book={mockBook} />);
    const button = screen.getByText('Mark as read');
    fireEvent.click(button);
    expect(toggleSpy).toHaveBeenCalled();
    toggleSpy.mockRestore();
  });
});
