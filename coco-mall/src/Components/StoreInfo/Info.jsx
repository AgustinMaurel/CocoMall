import React from 'react';
import ReactModal from 'react-modal';
import { IoMdInformationCircle } from 'react-icons/io';
import { IoLocationSharp } from 'react-icons/io5';

import InputMaps from '../Inputs/InputMaps';
import ReviewForm from '../StoreReview/reviewForm';
import { Image } from 'cloudinary-react';
import { useSelector } from 'react-redux';
import CocoIcon from '../StoreReview/CocoIcon';

ReactModal.setAppElement('#root');
const Info = ({ info, infoModal, setInfoModal }) => {
    const { storeDetail } = useSelector(state => state.stores)
    return (
        <div>
            <div
                className='flex items-center gap-1 cursor-pointer'
                onClick={() => setInfoModal(true)}
            >
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
                className='rounded-sm focus:outline-none bg-gray-100 shadow-lg xl:p-8 xl:w-5/6 xl:h-5/6 top-0 bottom-0 absolute right-0 left-0 m-auto'
            >
                <div className='w-full h-full flex flex-col'>
                    <div className='h-1/3 w-full flex text-center'>
                        <div className='flex flex-col justify-between w-full lg:w-2/3 h-full bg-cocoMall p-4'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    key={info?.id}
                                    cloudName='cocomalls'
                                    publicId={info?.cloudImage}
                                    crop='scale'
                                    className='shadow object-cover rounded-full bg-white h-10 w-10 lg:h-12 lg:w-12 2xl:h-14 2xl:w-14'
                                />
                                <div>
                                    <h3 className='text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-extrabold text-white'>
                                        {info?.storeName?.toUpperCase()}
                                    </h3>
                                    <div className='flex'>
                                        <span className='text-white'>Rating: {storeDetail?.rating}</span>
                                        <span>
                                            <CocoIcon color={'text-cocoMall-50'}/>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col text-left text-white text-xs 2xl:text-sm'>
                                <p>
                                    <IoMdInformationCircle className='inline-block' />
                                    <span> {info?.description}</span>
                                </p>
                                <p>
                                    <IoLocationSharp className='inline-block' />
                                    <span>
                                        {`
                                    ${info?.address},
                                    ${info?.state}
                                    ${info?.country}
                                    `}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className='hidden lg:block w-1/3 h-full'>
                            <InputMaps coord={info?.coord} />
                        </div>
                    </div>

                    <div className='w-full h-2/3 my-4'>
                        <ReviewForm setInfoModal={setInfoModal} />
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default Info;
