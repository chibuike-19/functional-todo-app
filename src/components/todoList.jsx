import { useAuth } from "../context";
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import { useState } from "react";
import { updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";


const TodoList = () => {
    const { todos, currentUser } = useAuth()
    const [edit, setEdit] = useState(null)
    const [textEdit, setTextEdit] = useState('')
    // useEffect(() => {
    //     onSnapshot(collection(db,'todos'),(snapshot)=>{
    //     setTodos(snapshot.docs.map(doc => doc.data()))
    //     })
    // },[todos])
    const handleEdit = (id, completed) => {
        updateDoc(doc(db, 'todos', id), {
            todo: textEdit,
            timestamp: edit,
            owner: currentUser.uid
        })
        setTextEdit('')
        setEdit(null)
        completed = false
        // editRef.current.value = ''
        // const edited = [...todos].map(todo => {
        //     if(id === todo.timestamp){
        //         todo.todo = editRef
        //     }
        //     setTodos(edited)
        // })
    }
    const showComplete = (completed) => {
            if(completed){
                return 'flex justify-between w-96 px-0 sm:px-2 rounded-md mt-8 bg-white bg-opacity-10 shadow-2xl py-8 line-through'
            }else{
                return 'flex justify-around w-96 px-0 sm:px-2 rounded-md mt-8 bg-white bg-opacity-50 shadow-2xl py-8'
            }
        
    }
    const inputClose = (id) => {
        if (id === edit){
            return 'hidden'
        }else {
            return 'text-slate-900 break-words '
        }
    }
    const checkClose = (id) => {
        if (id === edit){
            return 'hidden'
        }else {
            return ''
        }
    }
    const toggleComplete = async(id) => {
        const q = doc(db, 'todos', id)
        await getDoc(q).then((docs) => {
            if(docs.exists){
                let docRef = docs.ref
                return updateDoc(docRef, {
                    completed: !docs.data().completed
                })
            }else{
                console.log('error')
            }
        } )
        
    }
    const handleDelete = async(id) => {
        return await deleteDoc(doc(db, 'todos', id)).then(() => {
            console.log('successfully Deleted')
        }).catch(error => {
            console.log(error)
        })
        // const updated = [...todos]
        // updated.filter(todo => {
        //     return todo.timestamp !== timestamp
        // })
        // console.log(updated)
        // setTodos(updated)
    }
    return (
        <div>
            <ul>
                {todos.map((todo, index) => {
                    return (
                    <div key={index} className='sm:inline-block flex justify-center items-center mx-4 md:mx-2 '>
                        <div className={showComplete(todo.completed, todo.id)}><div className="flex items-center gap-4"><div className=" ml-2"><input type='checkbox' onClick={() => toggleComplete(todo.id)} className={checkClose(todo.id)}/></div><div className="sm:max-w-[180px] max-w-[125px]  "><li className={inputClose(todo.id)}>{todo.todo}</li></div></div>
                        {(todo.id === edit) ? (
                            <div className="grid place-items-center gap-2 w-full">
                                <input type='text' maxLength='40' onChange={(e) => setTextEdit(e.target.value)} className="sm:w-72 w-60 border-2 border-blue-500 shadow-2xl rounded-lg focus:outline-none h-9 py-1 px-3  text-secondary"/>
                           <div className="flex"><button className=" focus:outline-none text-white bg-secondary flex justify ml-2 px-3 py-1 rounded-lg" disabled={textEdit === ''} onClick={() => handleEdit(todo.id, todo.completed)}>Submit Edit</button><button className=" focus:outline-none text-white bg-secondary flex justify ml-2 px-3 py-1 rounded-lg" onClick={() => setEdit(null)}>Go back</button></div></div>
                        ):(<div className="ml-24"><button className=" text-secondary" onClick={() => setEdit(todo.id)}><FaEdit/></button><button className=" text-secondary ml-3" onClick={() => handleDelete(todo.id)}><FaTrashAlt/></button>
                        </div>)}</div>
                    </div>
                    )
                })}
            </ul>
        </div>
    ) ;
}
 
export default TodoList;