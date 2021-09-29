import React from 'react';

import icon01 from '../../Assets/icons/01.png';
import icon04 from '../../Assets/icons/04.png';
import icon06 from '../../Assets/icons/06.png';
import icon07 from '../../Assets/icons/07.png';

const SectionStats = () => {
    return (
        <div className='flex justify-center gap-4 bg-primary p-4'>
            <div className='flex flex-col items-center rounded-md bg-white'>
                <img src={icon01} alt='create' />
                <p>40+</p>
                <p>Happy Clients</p>
            </div>
            <div className='flex flex-col items-center rounded-md bg-white'>
                <img src={icon04} alt='create' />
                <p>540+</p>
                <p>Cantidad de tiendas</p>
            </div>
            <div className='flex flex-col items-center rounded-md bg-white'>
                <img src={icon06} alt='create' />
                <p>300</p>
                <p>Usuarios registrados</p>
            </div>
            <div className='flex flex-col items-center rounded-md bg-white'>
                <img src={icon07} alt='create' />
                <p>25+</p>
                <p>Awards Won</p>
            </div>
        </div>
    );
};

export default SectionStats;
