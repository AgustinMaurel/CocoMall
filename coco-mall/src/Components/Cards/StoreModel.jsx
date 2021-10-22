import React from 'react';
import { Image } from 'cloudinary-react';
import {Link} from 'react-router-dom'

const StoreModel = ({ banner, logo, title, mail, description, storeId }) => {
    return (
        <article
            className='w-2/5  bg-white shadow-xl
            xs:h-44
            sm:h-52
            md:h-72
            lg:h-96
            2xl:w-1/5'
        >
            <Link to={`/home/store/${storeId}`}>
            {/* --banner-- */}
            <div className='bg-cocoMall-400 rounded-md h-20 lg:h-28 w-full'></div>

            {/* --logo-- */}
            <div className='flex justify-center px-5 -mt-6'>
                <Image
                    // key={storeDetail?.id}
                    crop='scale'
                    cloudName='cocomalls'
                    className='h-14 w-14 bg-white rounded-full
                                shadow
                                sm:h-16 sm:w-16
                                md:h-20 md:w-20
                                xl:-mt-4
                                2xl:h-24 2xl:w-24'
                    publicId={logo}
                />
            </div>
            {/* --contain-- */}
            <div>
                <div
                    className='text-center px-0 mt-4
                                md:px-6
                                lg:px-10'
                >
                    <h2
                        className='text-primary font-bold
                                    md:text-lg
                                    xl:text-xl
                                    2xl:text-2xl'
                    >
                        {title}
                    </h2>
                    <p
                        className='text-gray-400 text-xs
                                    xl:text-sm'
                    >
                        {mail}
                    </p>
                    <p
                        className='text-gray-600 text-xs px-2 py-4
                                    xl:text-sm
                                    2xl:text-lg'
                    >
                        {description}
                    </p>
                </div>
            </div>
        </Link>
        </article>
    );
};

export default StoreModel;
