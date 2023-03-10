import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TodoDetails = ({ todo }) => {
    const { dispatch } = useTodosContext()
    const { user } = useAuthContext()

    const handleDelete = async () => {

        if(!user) {
            return
        }

        //const response = await fetch(process.env.REACT_APP_TODO_DETAILS + todo._id, {
        //const response = await fetch('https://auth-to-do-list-backend.onrender.com/api/todos/' + todo._id, {
        const response = await fetch('https://calm-veil-worm.cyclic.app/api/todos/' + todo._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    return ( 
        <div className="todo-details">
            <div>
                <h3>{todo.title}</h3> <br />
                <p>{todo.content}</p> <br />
                <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
            </div>
            <button onClick={handleDelete}>❌</button>
        </div>
     )
}
 
export default TodoDetails;
