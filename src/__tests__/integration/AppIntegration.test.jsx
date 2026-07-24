import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import App from '../../App';
import { api } from '../../api/mockApi';

jest.mock('../../api/mockApi');

describe('App Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('redirects to login when accessing protected route', () => {
    renderWithProviders(<App />, { route: '/todos' });
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('allows user to login and fetches todos', async () => {
    const user = userEvent.setup();
    
    api.login.mockResolvedValue({ token: 'fake-jwt' });
    api.fetchTodos.mockResolvedValue([
      { id: '1', title: 'Integration Test Todo', completed: false, important: true }
    ]);

    renderWithProviders(<App />, { route: '/login' });

    // Login
    await user.type(screen.getByPlaceholderText(/username/i), 'admin');
    await user.type(screen.getByPlaceholderText(/password/i), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    // Assert Loading state
    expect(await screen.findByText(/loading todos/i)).toBeInTheDocument();

    // Assert Todos are displayed
    await waitFor(() => {
      expect(screen.getByDisplayValue('Integration Test Todo')).toBeInTheDocument();
    });

    expect(api.login).toHaveBeenCalledWith('admin', 'password');
  });
});