import React from 'react';
import ReactModal from 'react-modal';
import { IoMdInformationCircle } from 'react-icons/io';

import bannerFlower from '../../Assets/images/banners/bannerFlower.png';
import InputMaps from '../Inputs/InputMaps';
import ReviewForm from '../StoreReview/reviewForm';
//import logo from '../../Assets/images/logoDefault.png';

ReactModal.setAppElement('#root');
const Info = ({ info, infoModal, setInfoModal }) => {
    return (
        <div>
            <div className='flex items-center gap-1 cursor-pointer' onClick={() => setInfoModal(true)}>
                <p className='hidden xl:block'>About us</p>
                <IoMdInformationCircle className='w-8 h-8' />
            </div>

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
                <div className='w-full h-full flex flex-col bg-cocoMall-200'>
                    <div className='h-1/3 w-full flex bg-cocoMall-50 text-center'>
                        <div className='w-2/3 h-full bg-cocoMall-200'>
                            <h3 className='text-3xl font-bold text-cocoMall-800'>
                                {info?.storeName}
                            </h3>
                            <p>{info?.description}</p>
                            <p>{info?.address}</p>
                            <p>{info?.country}</p>
                            <p>{info?.cp}</p>
                            <p>{info?.state}</p>
                        </div>
                        <div className='w-1/3 h-full bg-cocoMall-200'>
                            <InputMaps coord={info?.coord} />
                        </div>
                    </div>

                    <div className='w-full h-2/3 bg-cocoMall-50 p-4'>
                        <ReviewForm />
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default Info;
