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
        <main className="p-4">
            <h1 className="text-4xl font-semibold mb-6 text-center text-orange-600">Previous Cases</h1>
            <p className="text-lg mb-6 text-center text-gray-700">List of previous cases that have been handled by the judiciary.</p>

            {/* Render each previous case */}
            {preCases.map((pre, i) => (
                <div
                    key={i}
                    className="border-2 my-4 bg-[#003366] border-black p-4 space-y-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
                >
                    {/* Title Section */}
                    <div className="items-center grid grid-cols-5">
                        <h2 className="w-32 text-[#FFD700] font-bold">Title:</h2>
                        <p className="text-lg text-white col-span-4">{pre.title}</p>
                    </div>

                    {/* Case ID Section */}
                    <div className=" items-center grid grid-cols-5">
                        <h2 className="w-32 text-[#FFD700] font-bold">CaseID:</h2>
                        <p className='text-white col-span-4'>{pre.case_id}</p>
                    </div>

                    {/* Date of Judgement Section */}
                    <div className=" items-center grid grid-cols-5">
                        <h2 className="w-32 text-[#FFD700] font-bold">Date of judgement:</h2>
                        <p className='text-white col-span-4'>{pre.date_of_judgement}</p>
                    </div>

                    {/* Defendant Section */}
                    <div className=" items-center grid grid-cols-5">
                        <h2 className="w-32 text-[#FFD700] font-bold">Defendant:</h2>
                        <p className='text-white col-span-4'>{pre.defendant}</p>
                    </div>

                    {/* Type of Offence Section */}
                    <div className=" items-center grid grid-cols-5">
                        <h2 className="w-32 text-[#FFD700] font-bold">Type of offence:</h2>
                        <p className='text-white col-span-4'>{pre.type_of_offence}</p>
                    </div>

                    {/* Citations Section */}
                    <div className=" items-center grid grid-cols-5">
                        <h2 className="w-32 text-[#FFD700] font-bold">Citations:</h2>
                        <p className='text-white col-span-4'>{pre.citations[0]}, {pre.citations[1]}</p>
                    </div>

                    {/* Judge Section */}
                    <div className=" items-center grid grid-cols-5">
                        <h2 className="w-32 text-[#FFD700] font-bold">Judge:</h2>
                        <p className='text-white col-span-4'>{pre.judge[0]}, {pre.judge[1]}, {pre.judge[2]}</p>
                    </div>

                    {/* Head Note Sentence Section */}
                    <div className=" items-center grid grid-cols-5">
                        <h2 className="w-32 text-[#FFD700] font-bold">Head Note Sentence:</h2>
                        <p className='text-white col-span-4'>{pre.headnote_sent}</p>
                    </div>

                    {/* Judge Statement Section */}
                    <div className=" items-center grid grid-cols-5">
                        <h2 className="w-32 text-[#FFD700] font-bold">Judge Statement:</h2>
                        <p className='text-white col-span-4'>{pre.judgement_sent}</p>
                    </div>
                </div>
            ))}
        </main>
    );
};

export default PrevCases;