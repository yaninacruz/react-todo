import React, { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './App.css';
import CompletedItemsList from './components/CompletedItemsList';

const AIRTABLE_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
const AIRTABLE_HEADERS = {
  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
};


const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showCompleted, setShowCompleted] = useState(true);

  async function fetchData() {
    const options = {
      method: 'GET',
      headers: AIRTABLE_HEADERS
    };

    const url = `${AIRTABLE_ENDPOINT}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;


  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

  const sortedTodos = data.records.sort((objectA, objectB) => {
    if (objectA.fields.title < objectB.fields.title) return -1;
    if (objectA.fields.title > objectB.fields.title) return 1;
    return 0;
  });

  const todos = sortedTodos.map((todo) => ({
      id: todo.id,
      title: todo.fields.title,
      isChecked: todo.fields.isChecked || false,
    }));
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

  async function updateCheckboxInAirtable(todoID, isCheckedStatus) {
    const options = {
      method: 'PATCH',
      headers: AIRTABLE_HEADERS,
      body: JSON.stringify({
        fields: {
          isChecked: isCheckedStatus,
        },
      }),
    };

    const url = `${AIRTABLE_ENDPOINT}/${todoID}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    }
    catch (error) {
      console.error(error.message);
    }
  }

const handleCheckboxChange = async (todoId) => {
  const updatedTodo = todoList.find((todo) => todo.id === todoId);
  updatedTodo.isChecked = !updatedTodo.isChecked;

  await updateCheckboxInAirtable(todoId, updatedTodo.isChecked);
  const updatedTodoList = todoList.map((todo) => (todo.id === todoId ? updatedTodo : todo));
  setTodoList(updatedTodoList);
};


  const handleSortToggle = () => {
    setSortOrder (prevOrder => {
      const newOrder = prevOrder === 'asc' ? 'desc' : 'asc';
      const sortedTodoList = [...todoList].sort((a, b) => {
        return newOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });
      setTodoList(sortedTodoList);
      return newOrder;
    });
  };

  async function saveToAirtable(newTodoItem) {
    const options = {
      method: 'POST',
      headers: AIRTABLE_HEADERS,
      body: JSON.stringify({
        fields: {
          title: newTodoItem.title,
        },
      }),
    };

    try {
      const response = await fetch(AIRTABLE_ENDPOINT, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      return {
        id: data.id,
        title: data.fields.title,
        isChecked: false,
      };
    } catch (error) {
      console.error(error.message);

      }
    }

  const addTodo = async (newTodoItem) => {
    const savedTodo = await saveToAirtable(newTodoItem);
    const updatedTodoList = [...todoList, savedTodo];
    setTodoList(updatedTodoList);
  };

  async function deleteFromAirtable(todoId) {
    const options = {
      method: 'DELETE',
      headers: AIRTABLE_HEADERS,
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${todoId}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const removeTodo = async (todoId) => {
    await deleteFromAirtable(todoId);
    const updatedTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(updatedTodoList);
  };

  async function updateInAirtable(updatedTodo) {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          title: updatedTodo.title,
        },
      }),
    };

    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${updatedTodo.id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      return {
        id: data.id,
        title: data.fields.title,
        isChecked: updatedTodo.isChecked,
      };
    } catch (error) {
      console.error(error.message);
    }
  }

const editTodo = async (updatedTodo) => {
  const newData = await updateInAirtable(updatedTodo);
  const updatedTodoList = todoList.map((todo) => (todo.id === updatedTodo.id ? newData : todo));
  setTodoList(updatedTodoList);
};

  return (

    <BrowserRouter>
      <>
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <h1 className='heading'>Todo List</h1>
                  <AddTodoForm onAddTodo={addTodo} />
                  <div className='toggle-container'>
                    <button className='toggle-button' onClick={handleSortToggle}>
                    ({sortOrder === 'asc' ? 'A to Z' : 'Z to A'})
                    </button>
                  </div>
                  <TodoList
                  todoList={todoList.filter((todo) => !todo.isChecked)}
                  onRemoveTodo={removeTodo}
                  onEditTodo={editTodo}
                  onCheckboxChange={handleCheckboxChange}
                  />
                  <button className='toggle-button' onClick={() => setShowCompleted(!showCompleted)}>
                    {showCompleted ? 'Hide Completed' : 'Show Completed'}
                  </button>
                  {showCompleted && <CompletedItemsList completedTasks={todoList.filter((todo) => todo.isChecked)} onCheckboxChange={handleCheckboxChange} onRemoveTodo={removeTodo} onEditTodo={editTodo}/>}
                </>
              )
            }
          />
          <Route path='/new' element={<h1>New Todo List</h1>} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;