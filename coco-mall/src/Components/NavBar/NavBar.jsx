import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../Redux/actions/auth';
import { useHistory } from 'react-router';
import MenuDropDown from './MenuDropDown';
import coco from '../../Assets/icons/coco_png.png'

function NavBar() {
    const [width, setWidth] = useState(window.innerWidth);
    const [displayMenu, setDisplayMenu] = useState(false);

    const breakpoint = 1024;

    const history = useHistory();
    const user = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.auth.userCart);
    const dispatch = useDispatch();

    let ITEMS_IN_CART =
        cartItems.length > 0 &&
        cartItems?.map((el) => el.quantity).reduce((current, sum) => current + sum, 0);

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    function handleLogout(e) {
        e.preventDefault();
        dispatch(startLogout());
        history.push('/');
    }

    function handleDisplay(e) {
        e.preventDefault();
        if (displayMenu) setDisplayMenu(false);
        else setDisplayMenu(true);
    }

    //relacionar el pago con el id de tienda, para asi en una propiedad que tenga ej: wallet que sea donde esta el total de sus ventas
    //checkout carrito general --> id + tienda --> pago --> tienda: wallet --> pago

    return (
        <>
            {width < breakpoint ? (
                <div className='p-5'>
                    <nav className='flex  justify-between'>
                        <div className='flex align-center items-center gap-5'>
                            <Link to='/'>
                            <img className="w-20" src={coco} alt="logo" />
                            </Link>
                            <Link to='/home'>
                                <p>Home</p>
                            </Link>
                        </div>
                        <div onClick={handleDisplay} className='fixed right-5 top-4 z-20'>
                            <MenuDropDown />
                        </div>
                    </nav>
                </div>
            ) : (
                <div className='flex top-0 shadow-lg sticky  w-full bg-gray-100 h-14 pt-4 border-b-2 border-gray-100 px-20 pb-3 z-10 '>
                    <nav className=' flex align-center items-center h-auto justify-between  w-full'>
                        <div className='flex align-center items-center  gap-5'>
                            <Link to='/'>
                            

                                <img className="w-20" src={coco} alt="logo" />

                            </Link>
                            <Link to='/home'>
                                <p>Home</p>
                            </Link>
                        </div>
                        <div className='flex gap-x-5 items-center'>
                            {user.uid ? (
                                <>
                                    <div className='relative cursor-pointer'>
                                        <Link to='/cart'>
                                            {cartItems.length > 0 ? (
                                                <div class='absolute flex items-center content-center justify-center top-0 right-0 mr-3 mt-3  bg-red-500 h-5 w-5 text-xs  text-white rounded-full '>
                                                    {ITEMS_IN_CART}
                                                </div>
                                            ) : (
                                                <div class='absolute flex items-center content-center justify-center top-0 right-0 mr-3 mt-3  bg-red-500 h-5 w-5 text-xs  text-white rounded-full '>
                                                    0
                                                </div>
                                            )}

                                            <svg
                                                className='w-6 h-6 pointer-events-none'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                                                ></path>
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className='shadow  flex items-center justify-center align-center bg-primary h-8  w-24  rounded'>
                                        <Link
                                            className='relative w-full h-full flex items-center align-center justify-center'
                                            to='/storePanel'
                                        >
                                            <button className='w-full focus:outline-none text-white text-center text-sm text-md'>
                                                {user.name.split(' ')[0]}{' '}
                                                {/* para ver solo nombre */}
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='shadow  flex items-center justify-center  align-center bg-secondary-light  h-8 w-24   rounded'>
                                        <div
                                            className='relative w-full h-full flex items-center align-center justify-center'
                                            to='/'
                                        >
                                            <button
                                                onClick={handleLogout}
                                                className='min-w-max h-full focus:outline-none text-primary text-center text-sm text-md'
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
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
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}

export default NavBar;
