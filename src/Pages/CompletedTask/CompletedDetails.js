import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import CompleteTaskComment from './CompleteTaskComment';

const CompletedDetails = () => {
    const n = useLoaderData()
    const navigation = useNavigation();
    const navigate = useNavigate()
    // handle not complete
    const handleNotComplete = id => {
        fetch(`https://net-book-server.vercel.app/notes/${id}`, {
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
    // load comment
    const { data: comments = [], isLoading, refetch } = useQuery({
        queryKey: ['comments', n._id],
        queryFn: async () => {
            const res = await fetch(`https://net-book-server.vercel.app/comments/${n._id}`);
            const data = res.json();
            return data
        }
    })
    // handle add comment
    const handleAddComment = e => {
        e.preventDefault()
        const commentMessage = e.target.comment.value;
        const comment = {
            commentID: n._id,
            commentMessage,
        }
        fetch('https://net-book-server.vercel.app/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
            .then(res => res.json())
            .then(data => {
                e.target.reset()
                refetch()
            })
    }

    //data loading spinner
    if (navigation.state === "loading") {
        return <Loader />
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
                {
                    isLoading ?
                        <Loader />
                        :
                        <CompleteTaskComment
                            handleAddComment={handleAddComment}
                            comments={comments}
                        />
                }
            </div>
        </div>
    );
};

export default CompletedDetails;