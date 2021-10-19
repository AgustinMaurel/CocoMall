import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import StoreState from '../Cards/StoreState';
import coco from '../../Assets/icons/coco.png';

const SlidersCards = ({ allStores, storeDetail, stateStores }) => {

    console.log('tiendas filtradas: ', allStores);
    console.log('tiendas filtradas doss: ', stateStores);
    let renderStores = allStores
    if (stateStores?.length && stateStores !== undefined){
        renderStores = stateStores
    }
    const settingsCards = {
        slidesToShow: renderStores?.length < 4 ? renderStores?.length : 4,
        slidesToScroll: 2,
        dots: true,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: renderStores?.length < 2 ? renderStores?.length : 2,
                    slidesToScroll: 2,
                    arrows: false
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: renderStores?.length < 3 ? renderStores?.length : 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: renderStores?.length < 4 ? renderStores?.length : 4,
                    slidesToScroll: 4,
                },
            },
        ],
    };

    return (
        <div className={renderStores?.length < 3 ? 'max-w-2xl' : renderStores?.length < 4 ? 'max-w-4xl' : ''}>
            <Slider {...settingsCards}>
            {renderStores?.map((e) => (
                <Link
                    to={`/home/store/${e.id}`}
                    onClick={() => storeDetail(e.id)}
                >
                    <StoreState
                        id={e.id}
                        storeName={e.storeName}
                        description={e.description}
                        cloudImage={e.cloudImage || coco}
                        key={e.id}
                    />
                </Link>
            ))}
        </Slider>
        </div>
    )
}

export default SlidersCards
