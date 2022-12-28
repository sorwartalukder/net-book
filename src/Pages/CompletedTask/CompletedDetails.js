import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const CompletedDetails = () => {
    const n = useLoaderData()
    const navigate = useNavigate()
    const handleNotComplete = id => {
        fetch(`http://localhost:5000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ completed: false })
        })
            .then(res => res.json())
            .then(data => {
                navigate('/completed-task')
            })
    }
    return (
        <div className='min-h-screen mt-11 max-w-[800px] mx-auto'>
            <div className='bg-white rounded-lg  flex flex-col'>

                {
                    n?.image && <img className='w-full max-h-[500px] max-w-lg h-1/2 p-3' src={n?.image} alt="" />
                }
                <p className='h-1/2  p-3 text-justify'> {n.note.slice(0, 180)} </p>
                <button
                    onClick={() => handleNotComplete(n._id)}
                    className='py-3 font-semibold text-slate-100 rounded-md uppercase bg-gradient-to-r from-cyan-500 to-blue-500 w-40 ml-auto block m-4 hover:shadow-md hover:shadow-slate-900 '
                >
                    Not Complete
                </button>
            </div>
        </div>
    );
};

export default CompletedDetails;