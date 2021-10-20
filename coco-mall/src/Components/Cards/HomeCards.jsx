import React from 'react';
import { Image } from 'cloudinary-react';

function HomeCards({ storeName, description, cloudImage, id }) {
    return (
        <article className='h-80 shadow hover:shadow-lg  transition-shadow m-4 rounded-md relative bg-white '>
            <div className='flex justify-center relative'>
                <div className='bg-cocoMall-400 rounded-md h-28 w-full'></div>
                <picture className='flex h-16 w-16 bg-white rounded-full overflow-hidden shadow-lg absolute -bottom-8'>
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
            <div className='mt-6'>
                <div className='text text-md text-center'>
                    <h3
                        className='text-primary font-bold
                                    md:text-lg
                                    xl:text-xl
                                    2xl:text-2xl
                                    mb-5'
                    >
                        {storeName.toUpperCase()}
                    </h3>

                    <p className='text-sm p-6'>{description}</p>
                </div>
            </div>
        </article>
    );
}

export default HomeCards;
