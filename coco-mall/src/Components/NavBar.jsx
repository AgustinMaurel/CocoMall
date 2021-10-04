import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../Redux/actions/auth';
import { useHistory } from 'react-router';

function NavBar() {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1024;

    const history = useHistory()
    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);


    function handleLogout (e) {
        e.preventDefault()
        dispatch(startLogout())
        history.push('/')
    }

    return (
        <>
            {width < breakpoint ? (
                <nav className='flex justify-between'>
                    <div className='flex align-center items-center gap-5'>
                        <Link to='/'>
                            <p>Logo</p>
                        </Link>
                        <Link to='/home'>
                            <p>Home</p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/'>
                            <svg
                                className='w-6 h-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h16M4 18h16'
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </nav>
            ) : (
                <nav className='flex align-center items-center h-auto justify-between  w-full'>
                    <div className='flex align-center items-center  gap-5'>
                        <Link to='/'>
                            <p>Logo</p>
                        </Link>
                        <Link to='/home'>
                            <p>Home</p>
                        </Link>
                    </div>
                    <div className='flex gap-x-5'>
                        {user.uid ? (
                            <>
                                <div className='shadow  flex items-center justify-center align-center bg-primary h-8  w-24  rounded'>
                                    <Link
                                        className='relative w-full h-full flex items-center align-center justify-center'
                                        to='/auth/login'
                                    >
                                        <button className='w-full focus:outline-none text-white text-center text-sm text-md'>
                                            {user.name || "Pablo Koll"}
                                        </button>
                                    </Link>
                                </div>
                                <div className='shadow  flex items-center justify-center  align-center bg-secondary-light  h-8 w-24   rounded'>
                                    <div
                                        className='relative w-full h-full flex items-center align-center justify-center'
                                        to='/'
                                    >
                                        <button onClick={handleLogout} 
                                        className='min-w-max h-full focus:outline-none text-primary text-center text-sm text-md'>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                            )

                            : (
                                <>
                                    <div className='shadow  flex items-center justify-center align-center bg-primary h-8  w-24  rounded'>
                                        <Link
                                            className='relative w-full h-full flex items-center align-center justify-center'
                                            to='/auth/login'
                                        >
                                            <button className='w-full focus:outline-none text-white text-center text-sm text-md'>
                                                Login
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='shadow  flex items-center justify-center  align-center bg-secondary-light  h-8 w-24   rounded'>
                                        <Link
                                            className='relative w-full h-full flex items-center align-center justify-center'
                                            to='/auth/register'
                                        >
                                            <button className='w-full h-full focus:outline-none text-primary text-center text-sm text-md'>
                                                Sign Up
                                            </button>
                                        </Link>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </nav>
            )}
        </>
    );
}

export default NavBar;
