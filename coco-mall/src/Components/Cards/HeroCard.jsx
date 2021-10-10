import React from 'react';

const HeroCard = ({ color, img }) => {

    return (
        <div className={`h-28 ${color} rounded-lg`}>
            <div className='h-full'>
                <img src={img} alt="banner" />               
                {/* Agregar compartir URL usando useLocation sacando el path y un Sweet alarm para avisar que se copio el link */}
            </div>
        </div>
    );
};

export default HeroCard;
