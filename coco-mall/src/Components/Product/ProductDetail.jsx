import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { Redirect, useHistory } from 'react-router-dom';
import {
    addToCartSomo,
    cartDeleteSomo,
    clearCart,
    deleteAllItems,
} from '../../Redux/actions/shoppingActions'
import { Image } from 'cloudinary-react';
import Question from '../Forms/QuestionForm'
import QuestionAndAnswer from './QuestionAndAnswer'

ReactModal.setAppElement('#root');
export default function ProductDetail(props) {
    let [productCant, setProductCant] = useState(0)
    const dispatch = useDispatch();
    const history = useHistory();
    const { product } = props;
    const { uid } = useSelector((state) => state.auth);

    const que = '+';

    const handleButtonClick = (id) => {
        if (uid) {
            dispatch(addToCartSomo(uid, id, que, productCant));
            props.setModalIsOpen(false)
        } else {
            history.push('/auth/login');
        }
    };

    const handleAddButton = () => {
        setProductCant(++productCant)
        // dispatch(addToCartSomo(uid, id, que, cant));
    };

    const handleDeleteOne = () => {
        if(productCant > 0){
            setProductCant(--productCant)
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center w-full h-full'>
                <h4 className='text-5xl mb-5 whitespace-nowrap font-semibold'>
                    {product.productName.toUpperCase()}
                </h4>
                <div className='flex justify-center w-2/5'>
                    <Image
                        key={product.id}
                        cloudName='cocomalls'
                        publicId={product.cloudImage[0]}
                        width='400'
                        crop='scale'
                    />
                </div>
                <div className='w-3/5 flex flex-col justify-between'>
                    <div className='flex flex-col justify-center mt-14'>
                        <span className='text-lg font-semibold  md:text-lg   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>
                            Price ${product.price}
                        </span>
                        <span className='text-3xl font-semibold'>Details</span>
                        <p className='text-base md:text-lg   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>
                            {product.description}
                        </p>
                        <span className='text-base md:text-lg   text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl'>
                            Current quantity: {product.stock} unidades
                        </span>

                        {product.discount > 0 ? <span>{product.discount}%</span> : false}
                    </div>
                    <div className='flex flex-row h-12 shadow-inner  items-center w-full content-center justify-around   py-1 bg-secondary'>
                                                <div className='flex flex-none flex-row items-center content-center justify-center gap-4'>
                                                    <button
                                                        id='btn-delete'
                                                        onClick={() => handleDeleteOne()}
                                                        className='  flex   items-center justify-center  bg-white rounded-full text-white font-bold text-xl cursor-pointer'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='h-6 w-6 md:h-8 md:w-8'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='#2ec5ce'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M18 12H6'
                                                            />
                                                        </svg>
                                                    </button>
                                                    <p className='font-bolder text-white'>
                                                        {productCant}
                                                    </p>
                                                    <button
                                                        id='btn-add'
                                                        onClick={() => handleAddButton()}
                                                        disabled={product.stock === product.quantity}
                                                        className={
                                                            product.stock !== product.quantity
                                                                ? `h-6 w-6 md:h-8 md:w-8 flex items-center justify-center  bg-white rounded-full  font-bold text-xl cursor-pointer`
                                                                : `h-6 w-6 md:h-8 md:w-8 flex  items-center justify-center bg-cocoMall  rounded-full text-white font-bold text-xl cursor-not-allowed`
                                                        }
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='h-6 w-6'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='#2ec5ce'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                    <button
                        className='font-bold text-center text-xl text-white bg-cocoMall-300 py-4 sticky'
                        onClick={() => handleButtonClick(product.id)}
                    >
                        Add Cart
                    </button>

                    <Question productId={product.id} />
                    <QuestionAndAnswer productId={product.id} />
                </div>
            </div>
        </>
    );
}
