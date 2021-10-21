import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from '../Cards/ReviewCard';

import Slider from 'react-slick';
import Arrow from '../Slides/Arrow';
import CocoIcon from './CocoIcon';
import ReviewExample from '../Cards/ReviewExample';
import reviewImg from '../../Assets/images/review.svg';
import { useSelector } from 'react-redux';

const ReviewForm = () => {
    const { id } = useParams();
    const { uid } = useSelector((state) => state.auth);

    const [allStoreReviews, setAllStoreReviews] = useState([]);
    const [review, setReview] = useState({
        description: '',
        qualification: '1',
    });

    //slider config
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('funciona');
        axios.post(`/review/create`, { userId: id, storeId: uid, review: review })
        .then((response) => console.log('review creada en el back todasss: ', response.data));
    };

    useEffect(() => {
        axios.get(`/review/${id}`).then((response) => setAllStoreReviews(response.data));
    }, []);

    return (
        <>
            <div className='h-1/2 w-full'>
                {allStoreReviews.length < 1 ? (
                    <div className='flex h-full gap-2'>
                        <div className='bg-white h-full w-2/3'>
                            <div className='bg-white h-full shadow flex gap-20 p-10 justify-between'>
                                <div className='flex flex-col justify-between'>
                                    <p className='text-cocoMall-800 font-medium text-2xl'>
                                        The store does not have any reviews at the moment.
                                    </p>
                                    <p>Be the first! you can see the example.</p>
                                </div>
                                <img className='h-full' src={reviewImg} alt='review' />
                            </div>
                        </div>
                        <div className='w-1/3 h-full bg-white'>
                            <ReviewExample />
                        </div>
                    </div>
                ) : (
                    <Slider {...settings}>
                        {/* simulación de la ReviewCard */}
                        <ReviewExample />
                        <ReviewExample />
                        <ReviewExample />
                        <ReviewExample />

                        {/* {allStoreReviews?.map((rev) => (
                        <ReviewCard
                            username={rev.User.Name}
                            qualification={rev.qualification}
                            description={rev.description}
                        />
                    ))} */}
                    </Slider>
                )}
            </div>

            <form className='h-1/2 w-full flex items-center gap-4' key='1' onSubmit={handleSubmit}>
                <textarea
                    placeholder='Describe your experience (optional)'
                    name='description'
                    rows='3'
                    cols='20'
                    onChange={handleChange}
                    className='w-2/3 h-3/4 shadow outline-none rounded focus:ring-1 focus:ring-cocoMall-300 focus:border-transparent p-2'
                ></textarea>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        {review.qualification === '1' ? (
                            <span>🥥</span>
                        ) : review.qualification === '2' ? (
                            <span>🥥 🥥</span>
                        ) : review.qualification === '3' ? (
                            <span>🥥 🥥 🥥</span>
                        ) : review.qualification === '4' ? (
                            <span>🥥 🥥 🥥 🥥</span>
                        ) : review.qualification === '5' ? (
                            <span>🥥 🥥 🥥 🥥 🥥</span>
                        ) : (
                            false
                        )}
                        <input
                            type='range'
                            id='qualification'
                            name='qualification'
                            value={review.qualification}
                            min='1'
                            max='5'
                            step='1'
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className='cursor-pointer p-2 rounded-md text-white bg-primary-light outline-none hover:bg-cocoMall-400 w-full'
                        type='submit'
                        disabled={!review.qualification ? true : false}
                        onSubmit={handleSubmit}
                        id='buttonC'
                    >
                        SEND
                    </button>
                </div>
            </form>
        </>
    );
};

export default ReviewForm;
