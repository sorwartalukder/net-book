import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUpError] = useState('')
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate()

    const handleUserCreate = data => {
        setSignUpError('')
        //create user
        createUser(data.email, data.password)
            .then((result) => {
                toast.success('Account Created Successfully.')
                const user = result.user;
                //store image
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
                        const userInfo = {
                            displayName: data.name,
                            photoURL: imgData.data.url
                        }
                        // update user
                        updateUserProfile(userInfo)
                            .then(() => {
                                // user save database function call
                                saveUserDatabase(user.displayName, user.email, imgData.data.url)
                            })
                            .catch(e => console.error(e))

                    })

            })
            .catch((error) => {
                const errorMessage = error.message;
                setSignUpError(errorMessage)
                console.error(error)
            });
    }
    //user save function
    const saveUserDatabase = (name, email, image) => {
        const user = { name, email, image }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/')
            })
    }
    return (
        <section className='min-h-screen flex justify-center items-center py-12'>
            <div className='w-96 bg-white p-11 shadow-2xl rounded-lg'>
                <h2 className='text-xl text-center mb-3'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleUserCreate)}>

                    {/* name field  */}
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            {...register("name", {
                                required: 'Name is required'
                            })}
                        />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>

                    {/* email field  */}
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            {...register("email", {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    {/* password field  */}
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 characters long' },
                                pattern: { value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.])/, message: 'Password must be strong. one capital letter, one number and one special key word (!@#$%^&*()-__+.)' }
                            })}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        {signUpError && <p className='text-red-600'>{signUpError}</p>}
                    </div>

                    {/* image  */}
                    <div className="form-control w-full max-w-xs">
                        <label>Photo</label>
                        <input
                            required
                            type="file"
                            className="w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100"
                            {...register("image", {
                                required: 'image is required'
                            })}
                        />
                        {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}

                    </div>
                    <button type="submit"
                        className='py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 w-full mt-4 hover:shadow-md hover:shadow-slate-900'
                    >
                        SIGN UP
                    </button>
                </form>
                {/* go to login page  */}
                <p className='mt-3 pb-6'>Already have an account <Link className='text-orange-600 font-bold hover:text-blue-500' to='/login'>Please Login</Link></p>
            </div>
        </section>
    );
};

export default SignUp;