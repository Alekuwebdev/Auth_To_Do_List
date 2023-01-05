import { useTodosContext } from "../hooks/useTodosContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TodoDetails = ({ todo }) => {
    const { dispatch } = useTodosContext()

    const handleDelete = async () => {
        
        const response = await fetch('/api/todos/' + todo._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    return ( 
        <div className="todo-details">
            <h1>{todo.title}</h1>
            <p>{todo.content}</p>
            {/* <p>{todo.createdAt}</p> */}
            <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
     )
}
 
export default TodoDetails;