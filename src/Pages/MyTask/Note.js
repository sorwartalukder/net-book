import React from 'react';

const Note = ({ n, setNoteData }) => {
    return (
        <label
            onClick={() => setNoteData(n)}
        >
            <div className='bg-white rounded-lg shadow-lg hover:shadow-slate-900 h-72  flex flex-col overflow-hidden'
                data-aos="fade-up-right"
            >
                <p className='h-1/2 p-3 text-justify'> {n.note} </p>
                {
                    n?.image && <img className='w-full h-1/2 ' src={n?.image} alt="" />
                }

            </div>
        </label>
    );
};

export default Note;