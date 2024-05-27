import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export default function Signup() {
    const navigate=useNavigate();
    const [email,setEmail]=useState<string>("");
    const [password,setPassword]=useState<string>("");
    const [error,setError]=useState<string>("");

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try{
            await createUserWithEmailAndPassword(auth,email,password);
            navigate("/");
        }catch(error){
            setError(error.message);
        }
    }

  return (
  <form onSubmit={handleSubmit}>
    {error && error}
    <div className="hero min-h-screen bg-slate-800">
        <div className="hero-content flex-col">
            <div className="text-center">
                <h3 className=" text-stone-300 text-4xl font-bold underline underline-offset-8 decoration-blue-700 -rotate-2">Photo<span className="text-green-500">V</span>ault</h3>
                <p className="pb-6 pt-2 mt-4 text-stone-300">Signup to share your photos!</p>
            </div>
            <div className="card sm:w-[28rem] shadow-2xl bg-base-100 form-card">
                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Email</span>
                        </label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="input input-bordered input-style" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="input input-bordered input-style" required />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary btn-gradient text-white">SIGN UP</button>
                    </div>

                </div>
            </div>
        </div>
   </div>
  </form>
  )
}
