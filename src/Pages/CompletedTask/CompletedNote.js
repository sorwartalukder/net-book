import React from 'react';

const CompletedNote = ({ n }) => {
    return (
        <div className='bg-white rounded-lg shadow-lg hover:shadow-slate-900 h-72  flex flex-col overflow-hidden'>
            <p className='h-1/2 p-3 text-justify'> {n.note} </p>
            {
                n?.image && <img className='w-full h-1/2 p-3' src={n?.image} alt="" />
            }

        </div>
    );
};

export default CompletedNote;