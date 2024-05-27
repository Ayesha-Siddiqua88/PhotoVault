import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";

export default function Navbar() {
  const handleLogout=async()=>{
    try{
      await signOut(auth);
    }catch(error){
      console.log(error.message);
    }
  }
  return (
    <nav className='py-10 flex justify-between'>
        <h1 className='text-[1.8rem] text-stone-300 font-bold underline underline-offset-8 decoration-blue-700 -rotate-2'>Photo<span className="text-green-500">V</span>ault</h1>
        <div className='flex justify-end gap-4 '>
                <Link to="/analytics" className="text-white text-1xl bg-green-500 py-2 px-2 rounded-lg font-bold hover:bg-blue-600">
                  Analytics
                </Link>
                <button onClick={handleLogout} className="text-white text-1xl bg-green-500 py-1 px-2 rounded-lg font-bold hover:bg-green-600">Logout</button>
        </div>
</nav>
  )
}
