import Login from "../Login-SignUp/Login";
import { Link } from "react-router-dom";

const Home = () => {
    let background = require('../../assests/Landing-page.png')
    return (<div className="min-h-screen todo-page ">
        <h3 className="text-center text-secondary text-5xl font-poppins pt-8">Tif task manager</h3>
    <div className="flex justify-around md:flex-row flex-col-reverse md:mx-0 px-4 items-center gap-12 w-full mt-10 ">
        <div className="text-poppins">
            <p className="text-5xl text-secondary font-semibold">Your Busy Life deserves this.</p>
            <p className="pt-6 text-2xl text-gray-900">Tif task manager is an award winning web app used by,<br/> millions people to stay organized and get more done. </p>
            <div className="pt-8 text-center md:text-left"><Link to='/sign-up' className="mt-8 px-4 py-2 text-center text-2xl border-2 bg-secondary rounded-md text-white">Get started</Link>
            </div>
            
        </div>
        <div className=""><img src={background} alt='background' className='w-96 h-96 rounded-md border-transparent'/></div>
    </div>
    </div>);
}
 
export default Home;