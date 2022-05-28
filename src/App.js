import Login from './Pages/Login-SignUp/Login'
import Home from './Pages/HomePage/Home';
import SignUp from './Pages/Login-SignUp/SignUp';
import Todo from './components/todo';
import PasswordReset from './Pages/passwordReset/passwordReset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  PrivateRoute  from './privateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset-password' element={<PasswordReset/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/todo' element={<PrivateRoute/>}>
          <Route path='/todo' element={<Todo/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
 
export default App;