import React from 'react';

const todoList = [
    { id: 1, title: "Project setup" },
    { id: 2, title: "Commit and create new branch" },
    { id: 3, title: "Complete todo list assignment" },
  ];

const TodoList = () => (
        <ul>
        {todoList.map((item) => (
        <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    );

export default TodoList;

