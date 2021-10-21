import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { Redirect, useHistory } from 'react-router-dom';
import {
    addToCartSomo,
    cartDeleteSomo,
    clearCart,
    deleteAllItems,
} from '../../Redux/actions/shoppingActions';
import { Image } from 'cloudinary-react';
import Question from '../Forms/QuestionForm';
import QuestionAndAnswer from './QuestionAndAnswer';

ReactModal.setAppElement('#root');
export default function ProductDetail(props) {
    let [productCant, setProductCant] = useState(1);
    const dispatch = useDispatch();
    const history = useHistory();
    const { product } = props;
    const { uid } = useSelector((state) => state.auth);

    const que = '+';

    const handleButtonClick = (id) => {
        if (uid) {
            dispatch(addToCartSomo(uid, id, que, productCant));
            props.setModalIsOpen(false);
        } else {
            history.push('/auth/login');
        }
    };

    const handleAddButton = () => {
        setProductCant(++productCant);
        // dispatch(addToCartSomo(uid, id, que, cant));
    };

    const handleDeleteOne = () => {
        if (productCant > 1) {
            setProductCant(--productCant);
        }
    };

    return (
        <>
            <div className=' flex  justify-start content-center items-center place-content-center place-items-center justify-items-center w-full h-full m-auto p-5 gap-3'>
                <div className='flex flex-col w-3/5 h-full rounded pt-3 gap-20 shadow'>
                    <div className='relative justify-self-start items-center'>
                        <h4 className='text-4xl mb-5 font-bold bg-white relative justify-self-start text-center'>
                            {product.productName.toUpperCase()}
                        </h4>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col min-h-max min-w-max relative'>
                            <Image
                                key={product.id}
                                cloudName='cocomalls'
                                publicId={product.cloudImage[0]}
                                width='400'
                                crop='scale'
                            />
                        </div>
                        <div>
                            <p className='text-lg font-semibold  md:text-lg text-justify xl:whitespace-nowrap w-5/6 2xl:text-3xl relative'>
                                Price ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                            </p>
                            <p className='text-base md:text-lg   text-justify xl:whitespace-nowrap w-5/6'>
                                Stock left: {product.stock}
                            </p>
                        </div>
                    </div>
                </div>
                <div className=' w-full  flex flex-col justify-start items-start h-full m-auto gap-5'>
                    <p className='text-3xl font-semibold inline-block'>Details</p>
                    <div className='flex flex-col justify-start w-full h-full items-start overflow-y-scroll'>
                        <p className='text-base md:text-lg  text-justify p-2 '>
                            {product.description}
                        </p>
                        {product.discount > 0 ? <span>{product.discount}%</span> : false}
                    </div>
                    <h3 className='text-primary font-bold text-xl '>Q&A</h3>
                    <div className='flex flex-col w-full h-full overflow-y-auto m-auto'>
                        <QuestionAndAnswer productId={product.id} />
                    </div>
                    <div className=' w-full h-1/4'>
                        <Question productId={product.id} />
                    </div>

                    <div className='flex flex-col w-4/5 z-20 justify-end h-full'>
                        <div className='flex flex-row h-12 shadow-inner  items-center w-full content-center justify-around py-1 bg-secondary'>
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
                                <p className='font-bolder text-white'>{productCant}</p>
                                <button
                                    id='btn-add'
                                    onClick={() => handleAddButton()}
                                    disabled={product.stock === productCant}
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
                    </div>
                </div>
            </div>
        </>
    );
}
