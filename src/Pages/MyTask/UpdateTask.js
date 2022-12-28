import React from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
    const n = useLoaderData()
    const navigate = useNavigate()
    const handleUpdatedNote = (e) => {
        e.preventDefault()
        const updateNote = e.target.note.value;
        fetch(`http://localhost:5000/note/${n._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ note: updateNote })
        })
            .then(res => res.json())
            .then(data => {
                navigate('/my-task')
                toast.success('Updated note.')
            })
    }
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <form
                onSubmit={handleUpdatedNote}
            >
                <textarea
                    name="note"
                    defaultValue={n.note}
                    className='p-3 text-justify rounded-md mx-auto block'
                    cols="35" rows="15">
                </textarea>
                <button type="submit"
                    className='py-3 font-semibold text-slate-100 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 w-full mt-4 hover:shadow-md hover:shadow-slate-900'
                >
                    SAVE
                </button>
            </form>
        </div>
    );
};

export default UpdateTask;