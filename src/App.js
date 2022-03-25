import { useEffect, useState } from 'react'

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodoDescription, setNewTodoDescription] = useState('')

  useEffect(() => {
    fetch('/api/todos')
      .then(async res => {
        const data = await res.json()
        if (!res.ok) {
          console.error(data)
          return []
        }
        return data
      })
      .then(setTodos)
  }, [])

  const addTodo = event => {
    event.preventDefault()
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ description: newTodoDescription }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      const data = await res.json()
      if (res.ok) {
        setTodos([...todos, data])
        return
      }
      console.error(data)
      setNewTodoDescription('')
    })
  }

  const updateTodo = todo => {
    fetch(`/api/todos/${todo._id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      const data = await res.json()
      if (res.ok) {
        const updatedTodos = todos.map(todo =>
          todo._id === data._id ? data : todo
        )
        setTodos(updatedTodos)
        return
      }
      console.error(data)
    })
  }

  const toggleDone = todo => updateTodo({ ...todo, done: !todo.done })

  return (
    <>
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <label>
          New Todo{' '}
          <input
            type="text"
            value={newTodoDescription}
            onChange={event => setNewTodoDescription(event.target.value)}
          />
        </label>
        <button>Add</button>
      </form>
      {todos.length === 0 ? (
        <p>No todos</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo._id} onClick={() => toggleDone(todo)}>
              {todo.description} is {todo.done ? 'done' : 'not done'}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
