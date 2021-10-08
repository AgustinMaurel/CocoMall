import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const IMG = 'https://customblog.neocities.org/5.jpg';
ReactModal.setAppElement('#root');
const HeroCard = ({ color, info, infoModal, setInfoModal }) => {
    const location = useLocation();
    const [share, setShare] = useState({
        value: 'http://localhost:3000' + location.pathname,
        copied: false,
    });
    console.log(location);
    return (
        <div className={`h-28 ${color}`}>
            <div className='h-full'>
                {/* <img src={IMG} alt="banner card" />
                <h3>{store}</h3> */}
                <li onClick={() => setInfoModal(true)}>info</li>
                <ReactModal
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                        },
                    }}
                    isOpen={infoModal}
                    onRequestClose={() => setInfoModal(false)}
                    className='rounded-sm focus:outline-none bg-white shadow-lg p-10 absolute w-4/6 h-4/6 top-0 bottom-0 right-0 left-0 m-auto'
                >
                    <li>{info?.storeName}</li>
                    <li>Direction{info?.address}</li>
                    <li>Country{info?.country}</li>
                    <li>CP{info?.cp}</li>
                    <li>DESCRIPTION{info?.description}</li>
                    <li>STATE{info?.state}</li>
                </ReactModal>
                {/* Agregar compartir URL usando useLocation sacando el path y un Sweet alarm para avisar que se copio el link */}
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
                        Share
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    );
};

export default HeroCard;
