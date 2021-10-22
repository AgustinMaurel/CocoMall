import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoMdShareAlt } from 'react-icons/io';

const Share = () => {
    const location = useLocation();
    const [share, setShare] = useState({
        value: 'https://coco-mall.vercel.app' + location.pathname,
        copied: false,
    });
    return (
        <div>
            <CopyToClipboard text={share.value} onCopy={() => setShare({ copied: true })}>
                <div className='flex items-center gap-1 cursor-pointer'  onClick={() =>
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Copied',
                                showConfirmButton: false,
                                timer: 1000,
                            })}>
                    <p className='hidden xl:block'>Share</p>
                    {/* <button
                    className='w-full h-full'
                        onClick={() =>
                            Swal.fire({
                                position: 'top-center',
                                icon: 'success',
                                title: 'Copied',
                                showConfirmButton: false,
                                timer: 1000,
                            })
                        }
                    > */}
                        <IoMdShareAlt className='w-8 h-8' style={{ pointerEvents: 'none' }} />
                    {/* </button> */}
                </div>
            </CopyToClipboard>
        </div>
    );
};

export default Share;
