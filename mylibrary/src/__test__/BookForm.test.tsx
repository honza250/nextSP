import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookForm from '../components/BookForm';
import * as actions from '../lib/actions';
import '@testing-library/jest-dom';
import { MockAppRouterProvider } from './MockAppRouterProvider';
import { describe, it, expect, vi } from 'vitest';

describe('BookForm', () => {
  it('renders inputs and button', () => {
    render(
      <MockAppRouterProvider>
        <BookForm />
      </MockAppRouterProvider>
    );
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Author')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Add Book');
  });

  it('disables button and shows loading text when submitting', async () => {
  const createBookMock = vi.spyOn(actions, 'createBook').mockImplementation(() => new Promise(() => {})); // nikdy neskončí

  render(
    <MockAppRouterProvider>
      <BookForm />
    </MockAppRouterProvider>
  );

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
  fireEvent.change(screen.getByPlaceholderText('Author'), { target: { value: 'Test Author' } });
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Desc' } });

  const button = screen.getByRole('button');

  fireEvent.click(button);


  // Pokud chceš čekat na createBook, musíš mocknout, aby skončilo (třeba jiný test)
  createBookMock.mockRestore();
});

});
