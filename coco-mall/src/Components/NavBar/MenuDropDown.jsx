import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { startLogout } from '../../Redux/actions/auth';

export default function MenuDropDown() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    const userId = user.uid;
    const history = useHistory();

    function handleLogout(e) {
        e.preventDefault();
        dispatch(startLogout());
        history.push('/');
    }

    return (
        <Menu as='div' className='relative inline-block text-left '>
            <Menu.Button className=' relative inline-flex justify-center  px-2 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                <svg
                    className='w-4 h-4'
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
            </Menu.Button>
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='absolute right-0 w-64 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {!userId ? (
                        <div className='px-1 py-1 '>
                            <Menu.Item>
                                <button
                                    onClick={() => history.push('/auth/login')}
                                    className={`${'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                    <LoginIcon
                                        className='w-5 h-5 mr-2 pointer-events-none'
                                        aria-hidden='true'
                                    />
                                    Login
                                </button>
                            </Menu.Item>

                            <Menu.Item>
                                <button
                                    onClick={() => history.push('/auth/register')}
                                    className={`${'text-gray-900'} z-50 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                    <SignUpIcon className='w-5 h-5 mr-2' aria-hidden='true' />
                                    Sign Up
                                </button>
                            </Menu.Item>
                        </div>
                    ) : (
                        <>
                            <div className='px-1 py-1'>
                                <Menu.Item>
                                    <button
                                        onClick={() => history.push('/storePanel')}
                                        className={`${'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        <UserIcon
                                            className='w-5 h-5 mr-2 pointer-events-none'
                                            aria-hidden='true'
                                        />
                                        {user.name}
                                    </button>
                                </Menu.Item>
                            </div>

                            <div className='px-1 py-1'>
                                <Menu.Item>
                                    <button
                                        onClick={handleLogout}
                                        className={`${'text-gray-900'} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                        <LogOutIcon
                                            className='w-5 h-5 mr-2 text-violet-400'
                                            aria-hidden='true'
                                        />
                                        Log Out
                                    </button>
                                </Menu.Item>
                            </div>
                        </>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

function LoginIcon(props) {
    return (
        // <svg {...props} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        //     <path d='M4 13V16H7L16 7L13 4L4 13Z' fill='#EDE9FE' stroke='#A78BFA' strokeWidth='2' />
        // </svg>
        <svg
            {...props}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                stroke='#38A3A5'
                strokeWidth='2'
                d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
            ></path>
        </svg>
    );
}

function UserIcon(props) {
    return (
        <svg
            {...props}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                stroke='#38A3A5'
                strokeWidth='2'
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            ></path>
        </svg>
    );
}

function SignUpIcon(props) {
    return (
        <svg
            {...props}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                stroke='#38A3A5'
                strokeWidth='2'
                d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'
            ></path>
        </svg>
    );
}

function WishListIcon(props) {
    return (
        <svg
            {...props}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                stroke='#38A3A5'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
        </svg>
    );
}

function MyShopIcon(props) {
    return (
        <svg {...props} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M10 4H16V10' stroke='#38A3A5' strokeWidth='2' />
            <path d='M16 4L8 12' stroke='#38A3A5' strokeWidth='2' />
            <path d='M8 6H4V16H14V12' stroke='#38A3A5' strokeWidth='2' />
        </svg>
    );
}

function LogOutIcon(props) {
    return (
        <svg {...props} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                stroke='#38A3A5'
                strokeWidth='2'
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            ></path>
        </svg>
    );
}
