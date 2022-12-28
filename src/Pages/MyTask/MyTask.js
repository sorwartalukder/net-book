import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Note from './Note';
import NoteModal from './NoteModal';

const MyTask = () => {
    const { user } = useContext(AuthContext)
    const [noteData, setNoteData] = useState(null)
    const navigate = useNavigate()
    // load notes
    const { data: notes = [], isLoading, refetch } = useQuery({
        queryKey: ['notes', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/notes/${user?.email}`);
            const data = res.json();
            return data
        }
    })
    //booking modal close handle
    const closeModal = () => {
        setNoteData(null);
    }
    // handle deleted note
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/notes/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                setNoteData(null);
                toast.success('Deleted note.')
                refetch()
            })
    }
    // handle completed
    const handleCompleted = (id) => {
        fetch(`http://localhost:5000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ completed: true })
        })
            .then(res => res.json())
            .then(data => {
                navigate('/completed-task')
                toast.success('Completed')
            })
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 min-h-screen lg:mx-11 mx-3 mt-11 pb-24'>
                {
                    notes.map(n => <Note
                        key={n._id}
                        n={n}
                        setNoteData={setNoteData}
                    ></Note>)
                }
            </div>
            <NoteModal
                closeModal={closeModal}
                noteData={noteData}
                handleDelete={handleDelete}
                handleCompleted={handleCompleted}
            />
        </div>
    );
};

export default MyTask;