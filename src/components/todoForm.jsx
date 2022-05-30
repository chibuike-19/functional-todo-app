import { useState,} from 'react';
import { collection , addDoc,serverTimestamp} from 'firebase/firestore';
import { db } from "../firebase";
import { useAuth } from '../context';

const TodoForm = ({onSubmit}) => {
    const [todo, setTodo] = useState('')
    const {currentUser} = useAuth()

    // useEffect(() => {
    //     let todos = []
    //     onSnapshot(collection(db,'todos'), (snapshot) => {
    //         snapshot.docs.forEach(doc => {
    //             todos.push({id: doc.id, todo: doc.data().todo})
    //             console.log(todos)
    //         })
    //     })
    // })
    const handleDisable = () => {
        if(todo === ''){
            return true
        }else {
            return false
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(addDoc(collection(db,'todos'),{
        todo: todo,
        timestamp: serverTimestamp(),
        owner: currentUser.uid,
        completed: false
        }))
        setTodo('')
    }
    return(
        <div className='flex justify-center mt-6'>
            <form onSubmit={handleSubmit}>
            <input type='text' onChange={(e) => setTodo(e.target.value)} className="w-60 sm:w-72 py-1 px-3 focus:outline-none rounded-xl text-secondary border-2 border-blue-500"/>
            <button className="px-2 py-1 text-sm border-2 border-white ml-3 rounded-lg focus:outline-none focus:text-secondary focus:bg-white text-white bg-secondary" disabled={handleDisable()} >Add Task</button>
            </form>
        </div>
    ) ;
}
 
export default TodoForm;