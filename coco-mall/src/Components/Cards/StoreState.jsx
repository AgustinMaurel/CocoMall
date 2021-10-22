import React from 'react';
import { Image } from 'cloudinary-react';

const StoreState = ({ storeName, description, cloudImage, id }) => {
    return (
        <article className='flex transition-shadow h-36 max-w-xs shadow hover:shadow-lg m-4 rounded-md bg-white'>
            <div className='flex items-center w-1/4 bg-cocoMall-600 rounded-md relative'>
                <picture className='flex m-auto h-16 w-16 bg-white rounded-full overflow-hidden shadow-lg absolute -right-6'>
                    <Image
                        key={id}
                        crop='scale'
                        cloudName='cocomalls'
                        className='shadow object-cover'
                        publicId={cloudImage}
                        alt='logo'
                    />
                </picture>
            </div>

            <div className='text text-md text-center w-3/4 p-4'>
                <h3
                    className='text-cocoMall-600 font-bold
                                    md:text-lg
                                    xl:text-xl
                                    2xl:text-2xl
                                    mb-5'
                >
                    {storeName}
                </h3>

                <p className='text-sm ml-4'>{description}</p>
            </div>
        </article>
    );
};

export default StoreState;
