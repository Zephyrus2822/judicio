import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <main className='bg-blue-400 relative '>
    <div className='absolute top-1/2 left-1/2 -translate-x-[50%] translate-y-[30%]  bg-green-400 py-10 px-5 rounded-lg space-y-10'>
    <h1>Register</h1>
        <form  action="">
            <div className="input">
                <label className='text-2xl' htmlFor="">Username : </label>
                <input className='text-2xl px-2  outline-none py-2 border-b-2 border-black bg-transparent' placeholder='Username' type="text" />
            </div>
            <div className="input">
                <label className='text-2xl' htmlFor="">Password : </label>
                <input className='text-2xl px-2  outline-none py-2 border-b-2 border-black bg-transparent' placeholder='password' type="Password" />
            </div>
            <button className='flex justify-center items-center bg-blue-500 text-2xl p-2 rounded-lg' type='submit' >Register</button>
        </form>
        <hr />
        <p>Already have an account please login</p>
        <a className='flex justify-center items-center bg-blue-500 text-2xl p-2 rounded-lg' href='/login'> Login</a>
    </div>
</main>
  )
}

export default Register