import React from 'react';

const IMG = 'https://customblog.neocities.org/5.jpg';

const HeroCard = ({ color }) => {
    return (
        <div className={`h-28 ${color}`}>
            <div className='h-full'>
                {/* <img src={IMG} alt="banner card" />
                <h3>{store}</h3> */}

            </div>
        </div>
    )
}

export default HeroCard
