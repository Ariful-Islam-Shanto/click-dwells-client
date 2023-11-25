import React from 'react';

const Container = ({children}) => {
    return (
        <div className='max-w-5xl mx-auto h-full'>
            {children}
        </div>
    );
};

export default Container;