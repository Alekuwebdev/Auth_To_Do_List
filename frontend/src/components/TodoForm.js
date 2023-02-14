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

    const response = await fetch(process.env.REACT_APP_TODO_FORM, {
    //const response = await fetch('https://auth-to-do-list-backend.onrender.com/api/todos', {
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
    <main className="create_main">
      <form className="create" onSubmit={handleSubmit}>
        <h2>Add a New Todo</h2>

        <label>Title: <br />
        <input 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        /></label>

        <label>Content: <br />
        <input 
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className={emptyFields.includes('content') ? 'error' : ''}
        /></label>

        <button>Add Todo</button> 
        {error && <div className="error">{error}</div>}
      </form>
    </main>
  )
}

export default TodoForm
