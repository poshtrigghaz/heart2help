import React, { useState } from 'react'

function SearchBar(props) {
    const [jobCriteria, setJobCriteria] = useState({
        title: "",
        location: "",
        experience: "",
        type:""
    })

    const handleChange = (e) => {
        setJobCriteria((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const search = async() => {
        await props.fetchJobsCustom(jobCriteria);
    }
    

  return (
    <div className='flex gap-4 my-10 justify-center px-10'>
        <select onChange={handleChange} name="title" value={jobCriteria.title} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
            <option value="" disabled hidden>Job Role</option>
            <option value="Medical Internship">Medical Internship</option>
            <option value="Education Support">Education Support</option>
        </select>
        <select onChange={handleChange} name="type" value={jobCriteria.type} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
            <option value="" disabled hidden>Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
        </select>
        <select onChange={handleChange} name="location" value={jobCriteria.location} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
            <option value="" disabled hidden>Location</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
        </select>
        <select onChange={handleChange} name="experience" value={jobCriteria.experience} className='w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md'>
            <option value="" disabled hidden>Experience</option>
            <option value="Medical Clearance">Medical Clearance</option>
            <option value="SSSCE/WASSCE Clearance">SSSCE/WASSCE Clearance</option>
        </select>
        <button onClick={search} className='w-64 bg-blue-500 text-white font-bold py-3 rounded-md'>Search</button>
    </div>
  )
}

export default SearchBar