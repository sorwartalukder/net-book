import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import errorPhoto from '../../../Assets/images/download.png'

const NotFound = () => {
    const { logOut } = useContext(AuthContext)
    const error = useRouteError()
    const navigate = useNavigate()

    const handleBackHistory = () => {
        window.history.back()
    }
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(e => console.error(e))
    }
    return (
        <div className=' min-h-screen flex justify-center items-center'>
            <div>
                <img src={errorPhoto} alt="" />
                <p className="text-red-500">Something went wrong</p>
                <p className="text-red-400">{error.statusText || error.message}</p>
                <h4 className="text-3xl">
                    Please <button
                        className="py-2 px-4 rounded-md uppercase font-semibold text-red-700 bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-md hover:shadow-slate-900"
                        onClick={handleLogOut}> Log Out </button> and log back in.
                </h4>
                <button
                    onClick={handleBackHistory}
                    className="py-3 px-4 rounded-md uppercase font-semibold text-slate-100 bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-md hover:shadow-slate-900 mt-5"
                >Go To Back</button>
            </div>
        </div>
    );
};

export default NotFound;