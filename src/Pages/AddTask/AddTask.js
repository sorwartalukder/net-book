import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import './AddTask.css'

const AddTask = () => {
    const { user } = useContext(AuthContext)
    const [addImage, setAddImage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate()
    // handle note
    const handleNote = data => {
        setErrorMessage('')
        if (data.note === ' ') {
            setErrorMessage('Type Latter must')
            return;
        }
        if (addImage) {
            if (data.image[0]) {
                // img hosting
                const image = data.image[0];
                const formData = new FormData();
                formData.append('image', image);
                const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then((res) => res.json())
                    .then(imgData => {
                        const note = { note: data.note, image: imgData.data.url, email: user.email }
                        saveNote(note)
                    })
                    .catch(e => console.error(e))
            }
            else {
                const note = { note: data.note, email: user.email }
                saveNote(note)
            }
        }
        else {
            const note = { note: data.note, email: user.email }
            saveNote(note)
        }

    }
    // save to database
    const saveNote = note => {
        fetch('https://net-book-server.vercel.app/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/my-task')
                toast.success('Save note.')
            })
    }
    return (
        <div className='min-h-screen py-12'>
            <form
                onSubmit={handleSubmit(handleNote)}
                className='max-w-[384px] bg-white p-11 rounded-lg mx-auto'
            >

                <div className='flex items-center -mt-3 mb-5 -ml-2'>
                    {
                        user?.email && <div>
                            <img className="rounded-full border-4 border-blue-500 ml-3" src={user?.photoURL} alt='' height='50' width='50' />
                        </div>
                    }
                    <h4 className='text-xl font-semibold ml-2'>{user?.displayName}</h4>
                </div>

                {/* note field  */}
                <div className="mb-3">
                    <textarea
                        cols="50" rows="5"
                        type="text"
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        {...register("note", {
                            required: 'Note is required'
                        })}
                    >
                    </textarea>

                    {errors.note && <p className='text-red-600'>{errors.note?.message}</p>}
                    {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
                </div>
                {/* image  */}
                {
                    addImage ?
                        <div className="mb-3">
                            <div className="file-input">
                                <input type="file" id="file" className="file"
                                    {...register("image")}
                                />
                                <label htmlFor="file" className='hover:shadow-sm hover:shadow-slate-600'>UPLOAD IMAGE</label>
                            </div>
                        </div>
                        :
                        <label
                            onClick={() => setAddImage(!addImage)}
                            className='bg-slate-600 px-3 py-2 block mx-auto w-28 text-center text-blue-500 font-semibold rounded-xl'
                        >Add Image</label>

                }
                <button type="submit"
                    className='py-3 font-semibold text-slate-100 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 w-full mt-4 hover:shadow-md hover:shadow-slate-900'
                >
                    SAVE
                </button>
            </form>
        </div>
    );
};

export default AddTask;