import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { logIn, loginWithGoogle } = useContext(AuthContext)
    const [loginError, setLoginError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    //email login handler 
    const handleLogin = data => {
        setLoginError('')
        // login user 
        logIn(data.email, data.password)
            .then((result) => {
                toast.success('Log In Successfully.')
                toast.success('Log In Successfully.')
                navigate(from, { replace: true });
            })
            .catch((error) => {
                // login error message
                const errorMessage = error.message;
                setLoginError(errorMessage)
                console.error(error)
            });

    }

    // google login handler
    const handleLoginWithGoogle = () => {

        loginWithGoogle(googleProvider)
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true });
                saveUserDatabase(user.displayName, user.email, user.photoURL)
            }).catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            });
    }
    // user save database function
    const saveUserDatabase = (role, name, email, image) => {
        const user = { role, name, email, image }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Log In Successfully.')
            })
    }
    return (
        <section className='min-h-screen flex justify-center items-center py-12'>
            <div className='w-96 bg-white p-11 shadow-2xl rounded-lg'>
                <h2 className='text-xl text-center mb-3'>LOG IN</h2>
                <form onSubmit={handleSubmit(handleLogin)}>


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
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>

                    <button type="submit"
                        className='py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 w-full mt-4 hover:shadow-md hover:shadow-slate-900'
                    >
                        LOG IN
                    </button>
                </form>
                <div className=' text-center mt-9 '>
                    <p className='font-bold mb-2'>Or Sign In with</p>
                    {/* google sign in */}
                    <button
                        onClick={handleLoginWithGoogle}
                        className="bg-slate-800 rounded-full p-2 hover:shadow-md hover:shadow-blue-500">
                        <FaGoogle className='text-4xl text-blue-500' />
                    </button>
                </div>
                {/* go to sign up page  */}
                <p className='text-center'>New to Net Book <Link className='text-orange-600 font-bold hover:text-blue-500' to='/signup'>Register</Link></p>
            </div>
        </section>
    );
};

export default Login;