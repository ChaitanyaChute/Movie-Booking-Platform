import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link} from "react-router";


function Signuppage() {
    const Navigate = useNavigate()

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    async function Signup() {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        
        await axios.post(`http://localhost:3000/users/signup` ,{
            username,
            password
        })

        toast.success("signed up")

        Navigate("/auth")
      
        
    }


  return (<>
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-black text-center">Create Account</h2>
        
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username:</label>
            <input
              ref={usernameRef}
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <button
            onClick={Signup}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors cursor-pointer"
          >
           Signup
          </button>
        
        <div className=' mt-5 text-black text-center'>Already have a account  <div className='text-blue-900 font-bold underline'><Link to="/auth" className='text-blue' >Login</Link> </div></div>
      </div>
    </div>
  </>);
}

export default Signuppage;
