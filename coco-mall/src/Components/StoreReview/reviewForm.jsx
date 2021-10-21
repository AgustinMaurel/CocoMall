import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from '../Cards/ReviewCard';

const ReviewForm = () => {
    const { id } = useParams();
    const [allStoreReviews, setAllStoreReviews] = useState([]);
    const [review, setReview] = useState({
        description: '',
        qualification: '1',
    });

    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('funciona');
    };

    useEffect(() => {
        axios
            .get(`/review/f2c78acf-f084-4870-8a5b-e29ef805fb4a`)
            .then((response) => setAllStoreReviews(response.data));
    }, []);

    return (
        <>
            <div className='flex gap-4 h-1/2'>
                <div className='w-1/3 bg-white shadow'></div>
                <div className='w-1/3 bg-white shadow'></div>
                <div className='w-1/3 bg-white shadow'></div>
                {/* {allStoreReviews?.map((rev) => (
                        <ReviewCard
                            username={rev.User.Name}
                            qualification={rev.qualification}
                            description={rev.description}
                        />
                    ))} */}
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
