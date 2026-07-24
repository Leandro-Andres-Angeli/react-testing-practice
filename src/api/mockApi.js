const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let mockTodos = [
  { id: '1', title: 'Learn React Testing', completed: false, important: true },
  { id: '2', title: 'Setup Redux', completed: true, important: false },
];

export const api = {
  login: async (username, password) => {
    await delay(500);
    if (username === 'admin' && password === 'password') {
      return { token: 'fake-jwt-token-123' };
    }
    throw new Error('Invalid credentials');
  },
  fetchTodos: async () => {
    await delay(500);
    return [...mockTodos];
  },
  createTodo: async (todo) => {
    await delay(500);
    const newTodo = { id: Date.now().toString(), ...todo };
    mockTodos.push(newTodo);
    return newTodo;
  },
  updateTodo: async (updatedTodo) => {
    await delay(500);
    mockTodos = mockTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
    return updatedTodo;
  },
  deleteTodo: async (id) => {
    await delay(500);
    mockTodos = mockTodos.filter((t) => t.id !== id);
    return id;
  },
};