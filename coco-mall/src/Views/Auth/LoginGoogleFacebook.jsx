import React from 'react';

const LoginGoogleFacebook = ({ handleGoogleLogin, handleFacebookLogin }) => {
    return (
        <div className='pt-4 sm:p-0'>
            <div className='flex mt-1 z-10 justify-center content-center items-center bg-white'>
                <div
                    className='flex cursor-pointer text-sm text-center items-center bg-white border rounded shadow-sm border-gray-200 m-0.5 z-10 w-1/2'
                    onClick={handleGoogleLogin}
                >
                    <img
                        className='w-12 h-6 justify-self-center mt-0.5 bg-white '
                        src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                        alt='google button'
                    />
                    <label className='flex flex-col pointer-events-none justify-center bg-white p-3 mr-0.5'>
                        Google
                    </label>
                </div>

                <div
                    className='flex cursor-pointer text-sm text-center items-center bg-white border rounded shadow-sm border-gray-200 m-0.5 z-10 w-1/2'
                    onClick={handleFacebookLogin}
                >
                    <img
                        className='w-12 h-6 justify-self-center mt-0.5'
                        src='https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
                        alt='facebook button'
                    />
                    <label className='flex flex-col pointer-events-none content-center justify-center p-3 mr-0.5'>
                        Facebook
                    </label>
                </div>
            </div>
        </div>
    );
};

export default LoginGoogleFacebook;
