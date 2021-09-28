import React from 'react';

import icon01 from '../../Assets/icons/01.png';
import icon04 from '../../Assets/icons/04.png';
import icon06 from '../../Assets/icons/06.png';
import icon07 from '../../Assets/icons/07.png';

const SectionBenefits = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen gap-4'>
            <h3 className='text-xl'>Benefits of working with us</h3>
            <div className='flex flex-col items-center gap-4'>
                <div className='flex items-center gap-4'>
                    <img src={icon01} alt='icon01' />
                    <div>
                        <h4 className='text-base'>Administra todo facilmente</h4>
                        <p className='text-xs'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed
                            nam sem tellus
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <img src={icon04} alt='icon04' />
                    <div>
                        <h4 className='text-base'>Administra todo facilmente</h4>
                        <p className='text-xs'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed
                            nam sem tellus
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <img src={icon06} alt='icon06' />
                    <div>
                        <h4 className='text-base'>Ofrece simplicidad a tus clientes</h4>
                        <p className='text-xs'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed
                            nam sem tellus
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <img src={icon07} alt='icon07' />
                    <div>
                        <h4 className='text-base'>Otro beneficio</h4>
                        <p className='text-xs'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et sed
                            nam sem tellus
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionBenefits;
