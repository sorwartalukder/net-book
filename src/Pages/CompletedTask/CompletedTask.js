import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import CompletedNote from './CompletedNote';

const CompletedTask = () => {
    const { user } = useContext(AuthContext)

    const { data: notes = [], isLoading } = useQuery({
        queryKey: ['notes', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/completed-notes/${user?.email}`);
            const data = res.json();
            return data
        }
    })
    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 min-h-screen lg:mx-11 mx-3 mt-11 pb-24'>
                {
                    notes.map(n => <Link
                        to={`/completed-details/${n._id}`}
                        key={n._id}
                    >
                        <CompletedNote
                            n={n}
                        ></CompletedNote>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default CompletedTask;