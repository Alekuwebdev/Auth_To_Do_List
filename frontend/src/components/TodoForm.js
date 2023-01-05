import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";

const TodoForm = () => {
    const { dispatch } = useTodosContext()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([])

    // Function handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault()

        const todo = {title, content}

        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            setTitle('')
            setContent('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_TODO', payload: json})
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New To Do</h3>

            <label >Exercize Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Add Content:</label>
            <input  
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className={emptyFields.includes('content') ? 'error' : ''}
            />

            <button>Add To Do</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default TodoForm;