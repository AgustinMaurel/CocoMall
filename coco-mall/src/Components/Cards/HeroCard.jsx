import React from 'react';

const IMG = 'https://customblog.neocities.org/5.jpg';

const HeroCard = ({ color }) => {
    return (
        <div className={`h-80 ${color} mr-2 shadow-md rounded-md`}>
            <div className='h-44 -mb-10 overflow-hidden'>
                {/* <img src={IMG} alt="banner card" />
                <h3>{store}</h3> */}

            </div>
        </div>
    )
}

export default HeroCard
