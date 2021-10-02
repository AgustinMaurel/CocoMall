import React from 'react';
import { Link } from 'react-router-dom';

function HomeCards() {
    return (
        <article className='h-22'>
        <Link to="/">
            <img className='object-cover h-40 w-full' src='https://picsum.photos/600/400?image=1083' alt='banner' />

            <div className='flex justify-center px-5 -mt-6'>
                <img
                    className=' h-14 w-14
                                bg-white rounded-full
                                shadow
                                sm:h-16 sm:w-16
                                md:h-20 md:w-20
                                xl:-mt-4
                                2xl:h-20 2xl:w-20'
                    src='https://picsum.photos/600/400?image=1063'
                    alt='logo'
                />
            </div>
            <div>
                <div className='text text-md'>
                    <h3
                        className='text-primary font-bold
                                    md:text-lg
                                    xl:text-xl
                                    2xl:text-2xl
                                    mb-5'
                    >
                        Aliento Vegano Store
                    </h3>

                    <p className='text-sm'>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                        parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
                        pellentesque eu, pretium quis.
                    </p>
                </div>
            </div>
        </Link>
        </article>
    );
}

export default HomeCards;
