import React from 'react';
import Slider from 'react-slick';

import Arrow from '../Slides/Arrow';
import FilterTypeProduct from '../FilterTypeProduct/FilterTypeProduct';

const SliderTypes = ({ productTypes, handleChecked, check }) => {
    const settingsTypes = {
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: false
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    arrows: false
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settingsTypes}>
            {productTypes?.map((type, index) => {
                return (
                    <FilterTypeProduct
                        type={type}
                        index={index}
                        handleChecked={handleChecked}
                        check={check}
                    />
                );
            })}
        </Slider>
    );
};

export default SliderTypes;
