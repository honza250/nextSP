import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GenreFilter } from '../components/GenreFilter';
import { genres } from '../components/BookGenreSelect';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

let pushMock = vi.fn();
let getMock = vi.fn();

// ✅ Mockuje celý modul
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => ({ get: getMock }),
}));

describe('GenreFilter', () => {
  beforeEach(() => {
    pushMock = vi.fn();
    getMock = vi.fn();
  });

  it('renders with selected genre from searchParams', () => {
    getMock.mockReturnValue('Sci-fi');

    render(<GenreFilter />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('Sci-fi');
  });

  it('calls router.push with correct query on change', () => {
    getMock.mockReturnValue('');
    render(<GenreFilter />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Fantasy' } });

    expect(pushMock).toHaveBeenCalledWith('/?genre=Fantasy');
  });

  it('clears genre query if "all genres" selected', () => {
    getMock.mockReturnValue('Sci-fi');
    render(<GenreFilter />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '' } });

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
