import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoMdShareAlt } from 'react-icons/io';

const Share = () => {
    const location = useLocation();
    const [share, setShare] = useState({
        value: 'http://localhost:3000' + location.pathname,
        copied: false,
    });
    return (
        <div>
            <div className='flex items-center gap-1 cursor-pointer'>
                <p className=''>Share</p>
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
                        <IoMdShareAlt className='w-8 h-8' style={{ pointerEvents: 'none' }} />
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    );
};

export default Share;
