import React, {useContext, useState} from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext.jsx'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setDataSubmitted(true)
      return;
    }

    login(currState === "Sign up" ? "Sign up" : "Login",  {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center gap-8 
    sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* Left Section */}
      <img src={assets.huge_logo} alt=""  className="w-[100px] sm:w-[140px] md:w-[180px] lg:w-[200px]"/>
      {/* Right Section */}
      <form onSubmit={onSubmitHandler} className='flex flex-col border-2 bg-white/8 text-white border-gray-100 p-6 gap-6 rounded-lg
      shadow-lg'>
        <h2 className='text-2xl font-medium flex items-center justify-between'>
          {currState}
          {isDataSubmitted && <img onClick={() => setDataSubmitted(false)} src={assets.arrow_icon} alt=""  className='w-5 cursor-pointer'/>}
          </h2>

          {currState === "Sign up" && !isDataSubmitted && (<input onChange={(e) => setFullName(e.target.value)}
           value={fullName}
           type="text"
           className='p-2 rounded-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#70e000]'
           placeholder='Full Name'
           required />
          )}

          {!isDataSubmitted && (
            <>
            <input onChange={(e) => setEmail(e.target.value)} value={email}
             type="email" placeholder='Email Address' required  className='p-2 rounded-md border border-gray-100 
             focus:outline-none focus:ring-2 focus:ring-[#70e000]'/>
            <input onChange={(e) => setPassword(e.target.value)} value={password}
              type="password" placeholder='Password' required className='p-2 rounded-md border border-gray-100
              focus:outline-none focus:ring-2 focus:ring-[#70e000]'/>
            </>
          )}

          {
            currState === "Sign up" && isDataSubmitted && (
              <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4}
               placeholder='provide a short bio...' className='p-2 rounded-md border border-gray-100 
               focus:outline-none focus:ring-2 focus:ring-[#70e000]' required/>
            )
          }

          <button type='submit' className='py-3 bg-gradient-to-r from-[#ccff33] to-[#70e000] text-white
          rounded-md cursor-pointer'>
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>
        
          <div className='flex items-center gap-2 text-sm text-gray-500'> 
            <input type="checkbox" />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

          <div className='flex flex-col gap-2'>
            {currState === "Sign up" ? (
              <p className='text-sm text-gray-600'>Already have an account ? <span onClick={() => {setCurrState("Login"); setDataSubmitted(false);}}
               className='font-medium text-white cursor-pointer'>
                Login here
                </span>
              </p>
            ) : (
              <p className='text-sm text-gray-600'>Create an account <span onClick={() => {setCurrState("Sign up"); setDataSubmitted(false);}}
              className='font-medium text-white cursor-pointer'>
                Click here
                </span>
              </p>
            )}
          </div>

      </form>
    </div>
  )
}

export default LoginPage
