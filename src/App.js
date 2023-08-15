import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    const todos = data.records.map((todo) => ({
      id: todo.id,
      title: todo.fields.title
    }
    ));
    console.log(todos);

    setTodoList(todos);
    setIsLoading(false);
  } catch (error) {
    console.error(error.message);
    setIsLoading(false);
  }
}

    useEffect(() => {
      fetchData();
    }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

return (
<BrowserRouter>
<div>
    <h1>Todo List</h1>
    <Routes>
    <Route path="*" element={<AddTodoForm onAddTodo={addTodo} />} />
    <Route 
    path="/"
    element={
  isLoading ? (
      <p>Loading...</p>
    ) : (
    <TodoList todoList={todoList} onRemoveTodo = {removeTodo} />)}
    />
    <Route path= "/new" element={<h1>New Todo List</h1>} />
    </Routes>
     </div>
     </BrowserRouter>
  );
};

export default App;