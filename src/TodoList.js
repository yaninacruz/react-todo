import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
    { id: 1, title: "Project setup" },
    { id: 2, title: "Commit and create new branch" },
    { id: 3, title: "Complete todo list assignment" },
  ];

const TodoList = () => (
        <ul>
        {todoList.map((item) => (
        <TodoListItem key={item.id} todo={item} />
        ))}
      </ul>
    );

export default TodoList;

