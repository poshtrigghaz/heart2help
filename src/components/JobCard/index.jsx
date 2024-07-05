import React from 'react';
import dayjs from 'dayjs';

function JobCard({ job, onClick }) {
  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff(job.postedOn, 'day');

  return (
    <div className='mx-40 mb-4' onClick={() => onClick(job)}>
      <div className='flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103'>
        <div className='flex flex-col items-start gap-3'>
          <h1 className='text-lg font-semibold'>{job.title} - {job.company}</h1>
          <p>{job.type} &#x2022; {job.experience} &#x2022; {job.location}</p>
          <div className='flex items-center gap-2'>
            {job.skills.map((skill, i) => (
              <p key={i} className='text-gray-500 py-1 px-2 rounded-md border border-black'>{skill}</p>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <p className='text-gray-500'>Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago</p>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
