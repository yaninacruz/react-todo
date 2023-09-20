import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';


const TodoList = ({ todoList, onRemoveTodo }) => (
<ul>
{todoList.map((item) => (
    <TodoListItem

 key={item.id} todo={item}  onRemoveTodo={onRemoveTodo}/>
))}

      </ul> 
  
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};


export default TodoList;

