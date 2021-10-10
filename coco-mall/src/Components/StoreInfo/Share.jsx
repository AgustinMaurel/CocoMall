import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoShareSocialSharp } from 'react-icons/io5';

const Share = () => {
    const location = useLocation();
    const [share, setShare] = useState({
        value: 'http://localhost:3000' + location.pathname,
        copied: false,
    });
    return (
        <div className='text-white flex items-center justify-center absolute bottom-7 right-10'>
            <CopyToClipboard text={share.value} onCopy={() => setShare({ copied: true })}>
                <button
                    onClick={() =>
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Copied',
                            showConfirmButton: false,
                            timer: 1000,
                        })
                    }
                >
                    <IoShareSocialSharp className='w-6 h-6' style={{ pointerEvents: 'none' }} />
                </button>
            </CopyToClipboard>
        </div>
    );
};

export default Share;
