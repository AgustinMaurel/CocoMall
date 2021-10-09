import React from 'react';
import ReactModal from 'react-modal';
import { IoMdInformationCircle } from 'react-icons/io';

import bannerFlower from '../../Assets/images/banners/bannerFlower.png';
import InputMaps from '../Inputs/InputMaps';
//import logo from '../../Assets/images/logoDefault.png';

ReactModal.setAppElement('#root');
const Info = ({ info, infoModal, setInfoModal }) => {
    return (
        <div className='text-white flex items-center justify-center absolute top-7 right-10'>
            <button onClick={() => setInfoModal(true)}>
                <IoMdInformationCircle className='w-6 h-6' />
            </button>

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
                <div className='w-full h-full flex bg-cocoMall-200'>
                    <div className='w-1/2 h-full bg-cocoMall-50 text-center'>
                        <div className='w-2/3 bg-cocoMall-100 p-8 flex'>
                            <img
                                className='h-full w-full object-cover'
                                src={bannerFlower}
                                alt='banner flower'
                            />
                        </div>
                        <div className='h-2/3 w-full bg-cocoMall-200'>
                            <h3 className='text-3xl font-bold text-cocoMall-800'>
                                {info?.storeName}
                            </h3>
                            <p>{info?.description}</p>
                            <p>{info?.address}</p>
                            <p>{info?.country}</p>
                            <p>{info?.cp}</p>
                            <p>STATE{info?.state}</p>
                        </div>
                    </div>

                    <div className='h-full w-1/2 bg-cocoMall-50'>
                        <InputMaps coord={info?.coord} />
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default Info;
