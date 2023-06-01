import React from 'react';

const todoList = [
  { id: 1, title: "Project setup" },
  { id: 2, title: "Commit and create new branch" },
  { id: 3, title: "Complete todo list assignment" },
];

function App() {
  return (
      <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (item) {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
     </div>
  );
}

export default App;
