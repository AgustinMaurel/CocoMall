import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import StoreState from '../Cards/StoreState';
import coco from '../../Assets/icons/coco.png';

const SlidersCards = ({ allStores, storeDetail }) => {
    console.log(allStores.length);
    const settingsCards = {
        slidesToShow: allStores.length < 4 ? allStores.length : 4,
        slidesToScroll: 4,
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
                    slidesToShow: allStores.length < 2 ? allStores.length : 2,
                    slidesToScroll: 2,
                    arrows: false
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: allStores.length < 4 ? allStores.length : 4,
                    slidesToScroll: 4,
                },
            },
        ],
    };

    return (
        <Slider {...settingsCards}>
        {allStores?.map((e) => (
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
    )
}

export default SlidersCards
