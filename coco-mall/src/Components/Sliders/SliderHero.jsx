import React from 'react';
import Slider from 'react-slick';

import HeroCard from '../Cards/HeroCard';

const SliderHero = () => {
    const settingsHero = {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplay: true,
        //autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                dots: false
              }
            },
          ]
    };

    return (
        <Slider {...settingsHero}>
            <HeroCard img={'/banners/bannerHero-1.png'} />
            <HeroCard img={'/banners/bannerHero-2.png'} />
            <HeroCard img={'/banners/bannerHero-3.png'} />
        </Slider>
    );
};

export default SliderHero;
