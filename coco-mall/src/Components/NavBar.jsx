import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1024;

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    return (
        <>
            {width < breakpoint ? (
                <nav className='flex justify-between'>
                    <p>Logo</p>
                    <div>

                        <Link to="/">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </Link >
                    </div>
                </nav>
            ) : (
                <nav className='flex align-center items-center h-auto justify-between  w-full'>
                    <div>
                        <p>Logo</p>
                    </div>
                    <div className='flex gap-x-5'>
                        <div className='shadow  flex items-center justify-center align-center bg-primary h-6 w-24 p-4 rounded'>
                            <Link className='relative w-full' to='/'>
                                <button className='w-full focus:outline-none text-white text-center text-sm text-md'>
                                    Login
                                </button>
                            </Link>
                        </div>
                        <div className='shadow  flex items-center justify-center  align-center bg-secondary-light  h-6 w-24  p-4 rounded'>
                            <Link className='relative w-full' to='/'>
                                <button className='w-full h-full focus:outline-none text-primary text-center text-sm text-md'>
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}

export default NavBar;
