import React from 'react';

const Button = ({text}) => {
    return (
        <button className='text-white bg-[#fd9414] px-8 py-3 font-medium border-none rounded-lg'>
            {text}
        </button>
        
    );
};

export default Button;