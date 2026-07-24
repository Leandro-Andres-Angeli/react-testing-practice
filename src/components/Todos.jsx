import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/todoSlice';
import { TodoItem } from './TodoItem';

export const Todos = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.todos);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTodos());
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading todos...</div>;

  return (
    <div>
      <h2>Your Todos</h2>
      {items.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
};