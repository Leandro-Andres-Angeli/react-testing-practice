import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodos,
  updateTodo,
  createTodo,
  deleteTodo,
  initialState,
  todoSlice,
} from "../../store/todoSlice";

describe("Testing todoSlice", () => {

  it("fetching todos pending should have status 'loading'" , ()=>{
    const nextState = todoSlice.reducer(initialState , fetchTodos.pending())
    expect(nextState.status).toBe("loading")
  });
  it("fetching todos succesfully  should have status 'succeeded' and items" , ()=>{
    const nextState = todoSlice.reducer(initialState , fetchTodos.fulfilled([{ id: 1, title: "Buy groceries" } ,{ id: 2, title: "Buy groceries" }]))
    
    expect(nextState.status).toBe("succeeded")
    
    expect(nextState.items).toEqual([{ id: 1, title: "Buy groceries" } ,{ id: 2, title: "Buy groceries" }])
  });
  it("Should create todo prior items length should be 0 after update length should be 1 , item should be the one passed as payload", () => {
    const prevState = todoSlice.getInitialState();

    const nextState = todoSlice.reducer(
      initialState,
      createTodo.fulfilled({ id: 1, title: "Buy groceries" }),
    );
    expect(prevState.items.length).toBe(0);
    expect(nextState.items.length).toBe(1);
    expect(nextState.items.findIndex((el) => el.id === 1)).not.toBe(-1);
    expect(nextState.items).toContainEqual({ id: 1, title: "Buy groceries" });
    expect(nextState.items.filter((el) => el.id === 1).length).toBe(1);
  });
  it("Should delete existing item", () => {
    const stateWithOneItem = {
      ...initialState,
      items: [{ id: 1, title: "Test todo" }],
    };
    const nextState = todoSlice.reducer(
      stateWithOneItem,
      deleteTodo.fulfilled(1),
    );
    
    expect(nextState.items.length).toBe(0);
    expect(nextState.items.findIndex((el) => el.id === 1)).toBe(-1);
    expect(nextState.items).not.toContainEqual({ id: 1, title: "Buy groceries" });
    expect(nextState.items.filter((el) => el.id === 1).length).toBe(0);
  });
  it("Should update existing item", () => {
    const stateWithOneItem = {
      ...initialState,
      items: [{ id: 1, title: "Test todo" }],
    };
    const nextState = todoSlice.reducer(
      stateWithOneItem,
      updateTodo.fulfilled({ id: 1, title: "Updated Test todo" }),
    );
    
    expect(nextState.items.length).toBe(1);
    expect(nextState.items.findIndex((el) => el.id === 1)).toBe(0);
    expect(nextState.items).not.toContainEqual({ id: 1, title: "Buy groceries" });
    expect(nextState.items).toContainEqual({ id: 1, title: "Updated Test todo" });
    expect(nextState.items.filter((el) => el.id === 1).length).toBe(1);
  });
  it("Passing wrong id should not update any item", () => {
    const stateWithOneItem = {
      ...initialState,
      items: [{ id: 1, title: "Test todo" }],
    };
    const nextState = todoSlice.reducer(
      stateWithOneItem,
      updateTodo.fulfilled({ id: 1111, title: "Updated Test todo" }),
    );
    
    expect(nextState.items.length).toBe(1);
    expect(nextState.items.findIndex((el) => el.id === 1)).toBe(0);
    expect(nextState.items).not.toContainEqual({ id: 1111, title: "Buy groceries" });
    expect(nextState.items).toContainEqual({ id: 1, title: "Test todo" });
    expect(nextState.items.filter((el) => el.id === 1).length).toBe(1);
  });
  it("Should have meta.arg.id equal to item id being updated", () => {
    const stateWithOneItem = {
      ...initialState,
      items: [{ id: 1, title: "Test todo" }],
    };
    const nextState = todoSlice.reducer(
      stateWithOneItem,
      updateTodo.pending("fake-request-id", { id: 5, title: "Learn Redux" }),
    );
 
   expect(nextState.savingId).toBe(5);
    
  });
});
