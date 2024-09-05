import React from 'react'

const BailApplication = () => {
  return (
    <main className='w-full min-h-[80vh] overflow-hidden'>
        <h1 className='text-2xl font-bold text-center mt-10'>Apply for Bail</h1>
        <form className='w-full max-w-md mx-auto p-5 bg-gradient-to-tr from-slate-100 to-slate-300 mt-10 rounded-lg shadow-md space-y-4'>
          <div className="input grid grid-cols-3">
            <label className='text-xl font-semibold' htmlFor="">Name : </label>
            <input className='col-span-2 rounded-lg px-2 py-1 ' type="text" />
          </div>
          <div className="input grid grid-cols-3">
            <label className='text-xl font-semibold' htmlFor="">S/O : </label>
            <input className='col-span-2 rounded-lg px-2 py-1 ' type="text" />
          </div>
          <div className="input grid grid-cols-3">
            <label className='text-xl font-semibold' htmlFor="">FIR Date : </label>
            <input className='col-span-2 rounded-lg px-2 py-1 ' type="text" />
          </div>
          <div className="input grid grid-cols-3">
            <label className='text-xl font-semibold' htmlFor="">P/S : </label>
            <input className='col-span-2 rounded-lg px-2 py-1 ' type="text" />
          </div>
          <div className="input grid grid-cols-3">
            <label className='text-xl font-semibold' htmlFor="">Age : </label>
            <input className='col-span-2 rounded-lg px-2 py-1 ' type="text" />
          </div>
          <div className="input grid grid-cols-3">
            <label className='text-xl font-semibold' htmlFor="">Election card number : </label>
            <input className='col-span-2 rounded-lg px-2 py-1 ' type="text" />
          </div>
          <div className="input grid grid-cols-3">
            <label className='text-xl font-semibold' htmlFor="">Addhar Number : </label>
            <input className='col-span-2 rounded-lg px-2 py-1 ' type="text" />
          </div>
          <div className="input grid grid-cols-3">
            <label className='text-xl font-semibold' htmlFor="">Crime : </label>
            <input className='col-span-2 rounded-lg px-2 py-1 ' type="text" />
          </div>
        </form>
      
    </main>
  )
}

export default BailApplication