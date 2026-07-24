import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, deleteTodo } from '../store/todoSlice';

export const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const savingId = useSelector(state => state.todos.savingId);
  
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);
  const [important, setImportant] = useState(todo.important);

  const isDirty = title !== todo.title || completed !== todo.completed || important !== todo.important;
  const isSaving = savingId === todo.id;

  const handleSave = () => {
    dispatch(updateTodo({ ...todo, title, completed, important }));
  };

  return (
    <div style={{ border: '1px solid gray', margin: '8px 0', padding: '8px', display: 'flex', gap: '10px', alignItems: 'center' }} data-testid={`todo-${todo.id}`}>
      <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} aria-label="Toggle Complete" />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Todo Title" />
      <label>
        Important: <input type="checkbox" checked={important} onChange={(e) => setImportant(e.target.checked)} aria-label="Toggle Importance" />
      </label>
      
      {isDirty && (
        <button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      )}
      <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
    </div>
  );
};