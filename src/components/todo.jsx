import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../context";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import { collection, query, where, onSnapshot , orderBy } from "firebase/firestore";

const Todo = () => {
    const {currentUser, logOut, todos, setTodos} = useAuth()
    const todoRef = collection(db, 'todos')
    const [error, setError] = useState('')
    const [count, setCount ] = useState(0)
    let navigate = useNavigate()

    const logo = require('../assests/Grouplogo.png')
    useEffect(() => {
        const getData = async() => {
            const q = query(todoRef, where('owner', '==', currentUser.uid), orderBy('timestamp'))
            onSnapshot(q, (snapshot) => {
                let todos = []
                snapshot.forEach((doc) => {todos.push({id: doc.id, todo: doc.data().todo, owner: doc.data().owner, createdAt: doc.data().timestamp, completed: doc.data().completed})})
                console.log(todos)
                setTodos([...todos])
            })
        }
        getData()
    }, [])

    const onSubmit = (todo) => {
        setTodos([todo, ...todos])
        console.log(todo)
    }
    const countDisplay = () => {
        if(count === 0 ){
            return 'you have no uncompleted task in your database'
        }else {
            return `you have ${count} uncompleted tasks.`
        }
    }
    const handleLogOut = async() => {
        try {
            await logOut()
            navigate('/login')
        } catch {
            setError('')
            setError('Failed to log Out')
        }
    }
    useEffect(() => {
        const taskCount = () => {
            const completed = [...todos].filter(todo => {return !todo.completed})
            const newArr = [...completed]
            setCount(newArr.length) 
        }
        taskCount()

    }, [todos])

    return ( 
    <div className="min-h-screen font-poppins todo-page">
        <div className="flex justify-center"><img src={logo} alt='tif-logo' /></div>
        <p className="text-4xl font-semibold text-center text-secondary pt-4">{`Hello,  ${currentUser.displayName} 😁`}</p>
        <p className="text-center pt-2 text-secondary">{countDisplay()}</p>
        <p>{error}</p>
        <TodoForm onSubmit={onSubmit}/>
        <TodoList/>
        <div className="flex justify-center pb-4 mt-4">
            <button onClick={handleLogOut} className='px-4 py-2 border-2 rounded-lg bg-secondary text-white'>Log out</button>
        </div>
        
    </div> 
    );
}
 
export default Todo;