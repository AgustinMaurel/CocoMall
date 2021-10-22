import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from '../Cards/ReviewCard';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import ReviewExample from '../Cards/ReviewExample';
import reviewImg from '../../Assets/images/review.svg';
import { useSelector } from 'react-redux';
import Qualification from './Qualification';

const ReviewForm = ({setInfoModal}) => {
    const { id } = useParams();
    const { uid } = useSelector((state) => state.auth);

    const [allStoreReviews, setAllStoreReviews] = useState([]);
    const [flag , setFlag] = useState(false)
    const [review, setReview] = useState({
        description: '',
        qualification: '1',
    });

    //slider config
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: allStoreReviews?.length < 3 ? allStoreReviews?.length : 3,
        slidesToScroll: allStoreReviews?.length < 3 ? allStoreReviews?.length : 3,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: allStoreReviews?.length < 2 ? allStoreReviews?.length : 2,
                    slidesToScroll: allStoreReviews?.length < 2 ? allStoreReviews?.length : 2,
                },
            },
            {
                breakpoint: 1420,
                settings: {
                    slidesToShow: allStoreReviews?.length < 2 ? allStoreReviews?.length : 2,
                    slidesToScroll: allStoreReviews?.length < 2 ? allStoreReviews?.length : 2,
                },
            },
        ],
    };

    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = { userId: uid, storeId: id, review: review };
        console.log(obj);
        axios
            .post('/review/create', obj)
            .then((res) => res.data)
            .then((stores) => Swal.fire({
                icon: 'success',
                title: 'Question send successfully ',
            }));

        axios.get(`/review/${id}`).then((response) => setAllStoreReviews(response.data));
        setInfoModal(false);
        setFlag(!flag)
    };

    useEffect(() => {
        axios.get(`/review/${id}`).then((response) => setAllStoreReviews(response.data));
    }, [flag]);


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
                    <div className='h-full'>
                        <Slider {...settings}>
                            {allStoreReviews?.map((rev) => (
                            <ReviewCard
                                username={rev?.User?.Name || ''}
                                qualification={rev?.qualification || ''}
                                description={rev?.description || ''}
                            />
                        ))}
                        </Slider>
                    </div>
                )}
            </div>

            <form className='h-1/2 w-full flex items-center gap-4' key='1' onSubmit={handleSubmit}>
                <textarea
                    placeholder='Describe your experience (optional)'
                    name='description'
                    rows='3'
                    cols='20'
                    onChange={handleChange}
                    className='resize-none w-2/3 h-3/4 shadow outline-none rounded focus:ring-1 focus:ring-cocoMall-300 focus:border-transparent p-2'
                ></textarea>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <Qualification qualification={review.qualification} />
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
