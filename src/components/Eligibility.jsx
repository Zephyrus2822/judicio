import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from "moment"

const Eligibility = () => {
    const [crimes, setcrimes] = useState([])
    const [elegiblecriminals, setelegiblecriminals] = useState([])

    const fetchcriminals=async()=>{
     
        try {
            await axios.get(`${import.meta.env.VITE_DEV_URL}api/getprisonerdets`)
            .then(res=>{ 
                // console.log(res.data)
                if(crimes["crime"]==res.data["Crime"]){
                    const crimeDate = moment(res.data["createdAt"]).format('YYYY-MM-DD')
                    console.log(crimeDate)
                    let currentdate=moment().format('YYYY-MM-DD')
                    console.log(currentdate)
                    const diffdate=moment(crimeDate).to(currentdate,'days')

                    console.log(diffdate)

                    if(diffdate>=crimes["duration"]){
                        console.log("Eligible for bail")
                        setelegiblecriminals(res.data)
                    }
                }
                // console.log(elegiblecriminals)
            })
        } catch (error) {
            console.error("Server Error",error)
        }
        
    }

    const fetchCrimes=async(e)=>{
        try {
            await axios.get(`${import.meta.env.VITE_DEV_URL}api/crimes`)
            .then(res=>{
                // console.log(res.data)
                setcrimes(res.data)
                // console.log(crimes) 
            })
        } catch (error) {
            console.error("Server Error",error)
            
        }
    }

    useEffect(()=>{
        fetchCrimes()
        fetchcriminals()
    },[])

  return (
    <main>
        <h1 className='text-center text-4xl font-bold'>Eligible for Bail</h1>
        <div className='flex justify-between items-center px-[300px] my-[40px] border-b-2 border-black'>

        <div>Name</div>
        <div>Prisonement</div>
        </div>
        <h1>{elegiblecriminals}</h1>
        <div className='flex justify-between items-center px-[300px] my-[40px] '>
            <div className='text-center border-b-2 border-black'>Chandan</div>
            <div className='text-center border-b-2 border-black'>Already completed half duration</div>
        </div>

    </main>
  )
}

export default Eligibility