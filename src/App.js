import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


const App = () => {
  const [newTodo, setNewTodo] = React.useState("");

  return (
      <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo = {setNewTodo} />
     <TodoList />
     <p>{newTodo}</p>
     </div>
  );
};

export default App;
