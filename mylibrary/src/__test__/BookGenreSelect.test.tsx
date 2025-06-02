import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookGenreSelect, genres } from '../components/BookGenreSelect';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

describe('BookGenreSelect', () => {
  it('renders all genre options and placeholder', () => {
    const onChange = vi.fn();
    render(<BookGenreSelect value="" onChange={onChange} />);

    // placeholder option
    expect(screen.getByRole('option', { name: '-- Vyber žánr --' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '-- Vyber žánr --' })).toBeDisabled();

    // všechny žánry
    genres.forEach(genre => {
      expect(screen.getByRole('option', { name: genre })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: genre })).not.toBeDisabled();
    });
  });

  it('calls onChange with the selected genre', () => {
    const onChange = vi.fn();
    render(<BookGenreSelect value="" onChange={onChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: genres[2] } }); // Sci-fi

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('Sci-fi');
  });

  it('select shows the correct selected value', () => {
    const onChange = vi.fn();
    render(<BookGenreSelect value="Romantika" onChange={onChange} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('Romantika');
  });
});
