import { useState } from "react"
import { useTodosContext } from "../hooks/useTodosContext"
import { useAuthContext } from '../hooks/useAuthContext'

const TodoForm = () => {
  const { dispatch } = useTodosContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const todo = {title, content}

    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setContent('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_TODO', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Todo</h3>

      <label>Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Content:</label>
      <input 
        type="text"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className={emptyFields.includes('content') ? 'error' : ''}
      />

      <button>Add Todo</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TodoForm
