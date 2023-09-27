import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './TodoListItem';


const TodoList = ({ todoList, onRemoveTodo, onEditTodo, onCheckboxChange }) => (
<ul>
{todoList.map((item) => (
    <TodoListItem

 key={item.id} todo={item}  onRemoveTodo={onRemoveTodo} onEditTodo={onEditTodo} onCheckboxChange={onCheckboxChange}/>
))}
</ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todoList: [],
};


export default TodoList;

