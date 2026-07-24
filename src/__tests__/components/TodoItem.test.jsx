import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import { TodoItem } from '../../components/TodoItem';
import * as todoSlice from '../../store/todoSlice';

describe('TodoItem Component', () => {
  const mockTodo = { id: '1', title: 'Buy groceries', completed: false, important: false };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders todo correctly', () => {
    renderWithProviders(<TodoItem todo={mockTodo} />);
    expect(screen.getByDisplayValue('Buy groceries')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /toggle complete/i })).not.toBeChecked();
    expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument();
  });

  it('shows save button when title is edited and dispatches update on click', async () => {
    const user = userEvent.setup();
    const updateTodoSpy = jest.spyOn(todoSlice, 'updateTodo').mockImplementation((todo) => ({
      type: 'todos/updateTodo',
      payload: todo,
    }));

    renderWithProviders(<TodoItem todo={mockTodo} />);
    
    const input = screen.getByRole('textbox', { name: /todo title/i });
    await user.clear(input);
    await user.type(input, 'Buy milk');

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);
    expect(updateTodoSpy).toHaveBeenCalledWith({
      ...mockTodo,
      title: 'Buy milk'
    });
  });
});