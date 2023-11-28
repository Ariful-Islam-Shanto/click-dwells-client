import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-6 pb-8'>
            <img src="https://i.ibb.co/BnD9WPg/6333074-1.jpg" alt="" className='w-1/2 h-1/2'/>
            <h1 className='text-4xl text-black font-bold'>Oops! No page found</h1>
          <Link to={'/'}>
          <button className='px-5 py-2 border-none rounded-lg bg-[#ff735c] text-black'>Go Home</button>
          </Link>
        </div>
    );
};

export default ErrorPage;