import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Todos } from './components/Todos';
import { CreateTodo } from './components/CreateTodo';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/todos" 
            element={<ProtectedRoute><Todos /></ProtectedRoute>} 
          />
          <Route 
            path="/create" 
            element={<ProtectedRoute><CreateTodo /></ProtectedRoute>} 
          />
        </Routes>
      </div>
    </div>
  );
}