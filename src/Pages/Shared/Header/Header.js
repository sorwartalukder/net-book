import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import './Header.css'

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    let activeClass = {
        color: "blue",
        background: "none",
    };
    // log out
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(e => console.error(e))
    }
    // nav items
    const menuItems = <React.Fragment>

        <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/">
            <li>Add Task</li>
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)} to="/my-task">
            <li>My Task</li>
        </NavLink>


        <NavLink style={({ isActive }) => (isActive ? activeClass : undefined)}
            to="/completed-task
                ">
            <li>Complete Task</li>
        </NavLink>

    </React.Fragment>

    return (
        <header className='bg-white py-2 md:px-10 px-4'>

            <div className='max-w-[1480px] mx-auto flex flex-row-reverse md:flex-row justify-between items-center'>
                {/* LOGO */}
                <Link to='/'>
                    <div className='font-semibold text-2xl text-blue-500 border-2 border-green-500 rounded px-2 py-1 hover:bg-slate-900 hover:border-blue-600'>
                        <h2>NET BOOK</h2>
                    </div>
                </Link>
                {/* nav items */}
                <div className='hidden md:block'>
                    <ul className="flex justify-center items-center text-lg text-slate-600 net-nav-items">
                        {menuItems}
                    </ul>
                </div>
                <div className='hidden md:block'>
                    <div className='flex items-center'>
                        {/* log out button */}
                        <button
                            onClick={handleLogOut}
                            className='py-3 font-semibold px-4 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-md hover:shadow-slate-900'
                        >LOG OUT</button>
                        {
                            user?.email && <div>
                                <img className="rounded-full border-4 border-blue-500 ml-3" src={user?.photoURL} alt='' height='80' width='80' />
                            </div>
                        }
                    </div>
                </div>
                {/* mobile device */}
                <div className='mobile-nav block md:hidden'>
                    <div className='w-14 bg-slate-200  text-blue-500 border-2 hover:bg-slate-900 border-blue-500 rounded  hover:shadow-sm hover:shadow-slate-900'>
                        <label className="text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                    <div className='mobile-nav-items rounded-lg'>
                        <div className='bg-slate-200 p-3 rounded-lg'>
                            <ul className="text-lg text-slate-600 net-nav-items">
                                {menuItems}
                            </ul>
                            <div className='flex items-center mt-2'>

                                {
                                    user?.email && <div>
                                        <img className="rounded-full border-4 border-blue-500" src={user?.photoURL} alt='' height='80' width='80' />
                                    </div>
                                }
                                {/* log out button */}
                                <button
                                    onClick={handleLogOut}
                                    className='py-3 ml-2 px-4 font-semibold rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-md hover:shadow-slate-900'
                                >LOG OUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </header >
    );
};

export default Header;