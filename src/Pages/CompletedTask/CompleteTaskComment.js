import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const CompleteTaskComment = ({ handleAddComment, comments }) => {
    const { user } = useContext(AuthContext)
    return (
        <div className='mt-5 mb-24'>
            <hr className='mb-5 border-2 border-slate-900' />
            <form
                onSubmit={handleAddComment}
            >
                <textarea
                    name="comment"
                    className='p-3 rounded-md border-2 ml-4'
                    cols="35" rows="5">
                </textarea>
                <button
                    type='submit'
                    className='py-3 font-semibold text-slate-100 rounded-md uppercase bg-gradient-to-r from-cyan-500 to-blue-500 w-40 block m-4 hover:shadow-md hover:shadow-slate-900 '
                >
                    Comment
                </button>
            </form>
            <div>
                {
                    comments.map(comment => <div
                        className='my-5 bg-slate-800 rounded-lg text-slate-200 p-1 mx-3'
                        key={comment._id}
                    >
                        <div className='flex items-center'>
                            {
                                user?.email && <div>
                                    <img className="rounded-full border-4 border-blue-500 m-1" src={user?.photoURL} alt='' height='50' width='50' />
                                </div>
                            }
                            <h4 className='text-xl font-semibold ml-1'>{user?.displayName}</h4>
                        </div>
                        <div className=' ml-16'>
                            <p className='text-lg'>{comment.commentMessage}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default CompleteTaskComment;