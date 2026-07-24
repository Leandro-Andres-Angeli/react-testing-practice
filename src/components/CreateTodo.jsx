import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../store/todoSlice';
import { useNavigate } from 'react-router-dom';

export const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createTodo({ title, completed: false, important: false }));
    navigate('/todos');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Todo</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" required />
      <button type="submit">Create</button>
    </form>
  );
};