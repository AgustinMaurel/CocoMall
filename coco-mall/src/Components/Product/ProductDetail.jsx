import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { addToCartSomo } from '../../Redux/actions/shoppingActions';
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
    };

    const handleDeleteOne = () => {
        if (productCant > 1) {
            setProductCant(--productCant);
        }
    };

    return (
        <>
            <div className='flex w-full h-full m-auto p-5 gap-4'>
                <div className='p-6 bg-white rounded flex flex-col justify-between w-3/5 h-full gap-20 shadow'>
                    <div className=''>
                        <h4 className='text-4xl font-semibold bg-white'>
                            {product.productName.toUpperCase()}
                        </h4>
                    </div>

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
                        <p className='text-xs lg:text-lg text-cocoMall-600'>
                            Stock left: {product.stock}
                        </p>
                        <div className='p-2 font-bold text-center text-xl lg:text-2xl text-white bg-cocoMall-300 rounded-md'>
                            ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        </div>
                    </div>
                </div>
                <div className='p-6 bg-white rounded w-full flex flex-col justify-start items-start h-full m-auto gap-5'>
                    <p className='text-2xl text-cocoMall-400 font-semibold inline-block'>Details</p>
                    <div className='flex w-full h-full overflow-hidden hover:overflow-y-auto'>
                        <p className='md:text-lg p-2'>{product.description}</p>
                        {product.discount > 0 ? (
                            <span className='border'>{product.discount}%</span>
                        ) : (
                            false
                        )}
                    </div>
                    <h3 className='text-2xl text-cocoMall-400 font-semibold inline-block'>Q&A</h3>
                    <div className='flex flex-col w-full h-full overflow-y-auto m-auto'>
                        <QuestionAndAnswer productId={product.id} />
                    </div>
                    <div className='w-full h-1/4 '>
                        <Question productId={product.id} />
                    </div>

                    <div className='flex  w-full gap-6'>
                        <div className='flex w-2/4 relative items-center '>
                            <div className='flex w-full justify-between '>
                                <button
                                    id='btn-delete'
                                    onClick={() => handleDeleteOne()}
                                    className='  flex   items-center justify-center  bg-white rounded-full text-white font-bold text-xl cursor-pointer'
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
                                            d='M18 12H6'
                                        />
                                    </svg>
                                </button>
                                <p className='font-bolder text-black self-center'>{productCant}</p>
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
                            className='w-2/4 font-bold text-center text-lg text-white bg-cocoMall-300 rounded-md'
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
