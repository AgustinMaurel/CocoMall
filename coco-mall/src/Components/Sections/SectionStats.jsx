import React from 'react';

import icon01 from '../../Assets/icons/01.png';
import icon04 from '../../Assets/icons/04.png';
import icon06 from '../../Assets/icons/06.png';
import icon07 from '../../Assets/icons/07.png';

const SectionStats = () => {
    return (
        <div className='flex justify-center h-screen items-center'>
            <div
                className='bg-primary flex justify-center w-full h-60 relative
                            lg:h-32'
            >
                <div
                    className='flex gap-8 items-center justify-center h-32 absolute top-10
                                sm:flex-wrap
                                md:flex-wrap md:mx-12
                                lg:absolute lg:top-16'
                >
                    <div className='flex flex-col items-center justify-around rounded-md bg-white w-32 h-32 shadow'>
                        <img src={icon01} alt='create' />
                        <p className='font-extrabold text-center text-5xl text-primary '>40+</p>
                        <p className='text-xs'>Happy Clients</p>
                    </div>
                    <div className='flex flex-col items-center justify-around rounded-md bg-white w-32 h-32 shadow'>
                        <img src={icon04} alt='create' />
                        <p className='font-extrabold text-center text-5xl text-primary '>540+</p>
                        <p className='text-xs'>Cantidad de tiendas</p>
                    </div>
                    <div className='flex flex-col items-center justify-around rounded-md bg-white w-32 h-32 shadow'>
                        <img src={icon06} alt='create' />
                        <p className='font-extrabold text-center text-5xl text-primary '>300</p>
                        <p className='text-xs'>Usuarios registrados</p>
                    </div>
                    <div className='flex flex-col items-center justify-around rounded-md bg-white w-32 h-32 shadow'>
                        <img src={icon07} alt='create' />
                        <p className='font-extrabold text-center text-5xl text-primary '>25+</p>
                        <p className='text-xs'>Awards Won</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionStats;
