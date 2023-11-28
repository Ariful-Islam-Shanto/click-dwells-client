import React from 'react';

const Banner = () => {
    return (
        <div className=' h-[600px] flex items-center justify-center'>
            <div className="flex-1 space-y-8">
                <h1 className='text-6xl text-white font-bold -tracking-tight'>Beautiful <br />homes made <br />for you</h1>
                <p className='text-sm font-thin text-neutral-100'>At ClickDwells, embark on a journey where every click is a step closer to unlocking the door to your dream home. Our curated collection of properties invites you to explore a world of possibilities, where each dwelling has a unique story to tell. Find not just a house, but a place where your aspirations come to life.</p>
            </div>
            <div className="flex-1"></div>
        </div>
    );
};

export default Banner;