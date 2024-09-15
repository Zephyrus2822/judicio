import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import './fonts.css'

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

    const containerStyle = {
        background: 'rgba(255, 255, 255, 0.35)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        width: '80%',
        height: '75vh',
        margin: 'auto',
       
      };
    
      const titleStyle = {
        color: 'white',
       
      };
    
      const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 200px',
        marginBottom: '40px',
        borderBottom: '2px solid black',
      };
    
      const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 300px',
        marginBottom: '40px',
      };
    
      const textItemStyle = {
        color: 'white',
        textAlign: 'center',
        fontSize: '15px',
        borderBottom: '2px solid black',
        flex: 1,
        textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
        fontFamily: 'Cedarville Cursive',
      };
    
      const textItemStyleHeader = {
        color: 'white',
        textAlign: 'center',
        fontSize: '30px',
        flex: 1,
        fontFamily: 'Cedarville Cursive',
        textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
      };
    

      return (

        <div className='bg-ctr' style={{ 
            backgroundImage: "url('./images/bgv4.jpg')"
        }}>
        <div style={containerStyle}>
          <h1 style={{ ...titleStyle, textAlign: 'center',  fontSize: '50px', fontWeight: 'bold', fontFamily: 'Cedarville Cursive',marginBottom: "30px" }}><u>Bail Eligibility</u></h1>
          <div style={headerStyle}>
            <div style={textItemStyleHeader}>Name</div>
            <div style={textItemStyleHeader}>Prisonment</div>
          </div>
          <h1>{elegiblecriminals}</h1>
          <div style={rowStyle}>
            <div style={textItemStyle}>Chandan</div>
            <div style={textItemStyle}>Already completed half duration</div>
          </div>
        </div>
        </div>
      )
}

export default Eligibility