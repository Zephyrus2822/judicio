import axios from 'axios'
import React, { useEffect ,useState} from 'react'

const PrevCases = () => {
    const [preCases, setpreCases] = useState([])

    const fetch=async()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_DEV_URL}getprevCases`)
            if(response){
                console.log(response.data)
                setpreCases(response.data)
            }
        } catch (error) {
            console.error(error)
            
        }
    }
    useEffect(()=>{
        fetch()
    },[])
  return (
    <main>
        <h1>Previous Cases</h1>
        <p>List of previous cases that have been handled by the judiciary.</p>
        {/* Add previous case components here */}
        {preCases.map((pre,i)=>(
            <div key={i} className='border-2 border-black p-2 space-y-2'>
            <div className='flex  items-center '>
                <h2 className='w-32 text-orange-500 font-bold'>Title : </h2>
                <p> {pre.title}</p>
            </div>
            <div className='flex  items-center '>
                <h2 className='w-32 text-orange-500 font-bold'>CaseID : </h2>
                <p> {pre.case_id}</p>
            </div>
            <div className='flex  items-center '>
                <h2 className='w-32 text-orange-500 font-bold'>Date of judgement : </h2>
                <p> {pre.date_of_judgement}</p>
            </div>
            <div className='flex  items-center '>
                <h2 className='w-32 text-orange-500 font-bold'>Defendent : </h2>
                <p>{pre.defendant}</p>
            </div>
            <div className='flex  items-center '>
                <h2 className='w-32 text-orange-500 font-bold'>Type of offence : </h2>
                <p> {pre.type_of_offence}</p>
            </div>
            <div className='flex  items-center '>
                <h2 className='w-32 text-orange-500 font-bold'>Citations : </h2>
                <p>{pre.citations[0]} , </p>
                <p>{pre.citations[1]}</p>
            </div>
            <div className='flex  items-center '>
                <h2 className='w-32 text-orange-500 font-bold'>Judge: </h2>
                <p> {pre.judge[0]} , {pre.judge[1]} , {pre.judge[2]}</p>
            </div>
            <div className='flex  items-center '>
                <h2 className='w-32 text-orange-500 font-bold'>Head Note Sentence : </h2>
                <p> {pre.headnote_sent}</p>
            </div>
            <div className='flex  items-center '>
                <h2 className='w-32 text-orange-500 font-bold'>Judge Statement : </h2>
                <p>{pre.judgement_sent}</p>
            </div>
          </div>
        ))}

      

    </main>
  )
}

export default PrevCases