import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';

import Arrow from '../Components/Slides/Arrow';
import HeroCard from '../Components/Cards/HeroCard';
import homeStores from '../Helpers/homeStores';
import HomeCards from '../Components/Cards/HomeCards';

import NavBar from '../Components/NavBar/NavBar';
import Product from '../Components/Product/Product';
import {
    getStoreDetail,
    getProductsStore,
    getProductDetail,
    filterProducts,
} from '../Redux/actions/stores';
import {
    addToCart,
    deleteFromCart,
    deleteAllFromCart,
    clearCart,
} from '../Redux/actions/shoppingActions';
import CartItem from '../Components/ShoppingCart/CartItem';
import ReactModal from 'react-modal';
import ProductDetail from '../Components/Product/ProductDetail';

export default function StoreDetail() {
    const { id } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        searchProduct: '',
        type: [],
        min: '',
        max: '',
    });

    const dispatch = useDispatch();
    const storeDetail = useSelector((state) => state.stores.storeDetail);
    const storeProducts = useSelector((state) => state.stores.storeProductsFilter);
    const shoppingCart = useSelector((state) => state.stores.cart);
    const productDetail = useSelector((state) => state.stores.productDetail);

    //SLIDER HERO configuraciones
    const settingsHero = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    const settingsCards = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
    };
    //by Chris


    useEffect(() => {
        dispatch(getStoreDetail(id));
        dispatch(getProductsStore(id));
        return () => dispatch(getProductsStore());
    }, [dispatch]);

    const modalFuncion = (id) => {
        dispatch(getProductDetail(id));
        setModalIsOpen(true);
    };

    const handleChange = (e) => {
        setFilters((prevData) => {
            const state = {
                ...prevData,
                [e.target.name]: e.target.value,
            };
            if (filters.searchProduct) {
                filters.searchProduct =
                    filters.searchProduct[0].toUpperCase() + filters.searchProduct.substring(1);
            }
            return state;
        });
    };

    const handleChangeTypes = (e) => {
        setFilters((prevData) => {
            const state = {
                ...prevData,
                [e.target.name]: [parseInt(e.target.value)]
            };
            return state;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (filters.searchProduct) {
            dispatch(filterProducts(id, filters));
            setFilters(() => ({
                searchProduct: '',
                type: [],
                min: '',
                max: '',
            }));
        } else {
            dispatch(filterProducts(id, filters));
        }
    };

    return (
        <div className='grid grid-cols-12 w-screen grid-rows-8 h-screen'>
            <div className='col-span-12 row-span-1 row-end-1 bg-gray-200 shadow  '>
                <NavBar />
            </div>
            <div className='col-span-12 content-center mx-auto w-full'>

                <Slider {...settingsHero}>
                    <HeroCard color={'bg-gray-500'} />
                    <HeroCard color={'bg-green-500'} />
                    <HeroCard color={'bg-blue-500'} />
                    <HeroCard color={'bg-red-500'} />
                </Slider>

            </div>

            {/* SIDEBAR */}
            <div
                className=' col-span-2  row-span-8
                bg-gray-100 border-gray-200 border-r  p-5   '
            >
                <div className='  '>
                    <label>Search</label>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type='search'
                            placeholder='Find Products...'
                            name='searchProduct'
                            className='relative  border border-secondary rounded px-2 w-full focus:outline-none  '
                            value={filters.searchProduct}
                            onChange={handleChange}
                        />

                        <label>type</label>
                        <input
                            type='number'
                            placeholder='Type'
                            name='type'
                            className='relative  border border-secondary rounded px-2 w-full focus:outline-none  '
                            value={filters.type}
                            onChange={handleChangeTypes}
                        />

                        <label>min</label>
                        <input
                            type='number'
                            placeholder='min'
                            name='min'
                            className='relative  border border-secondary rounded px-2 w-full focus:outline-none  '
                            value={filters.min}
                            onChange={handleChange}
                        ></input>

                        <label>max</label>
                        <input
                            type='number'
                            placeholder='max'
                            name='max'
                            className='relative  border border-secondary rounded px-2 w-full focus:outline-none  '
                            value={filters.max}
                            onChange={handleChange}
                        ></input>
                        <button type='submit'>FILTER</button>
                    </form>
                </div>
            </div>

            {/* CARDS */}
            <div className='flex flex-col  col-span-8 row-span-14 pl-5 py-2 '>


                <div className='w-3/4 m-auto mt-16'>
                    <h3 className='text-2xl font-bold text-cocoMall-800'>Our recommendations</h3>
                    <Slider {...settingsCards}>
                        {homeStores()?.map((e, i) => (
                            <Link to={`/home/store/${e.id}`} onClick={() => storeDetail(e.id)}>
                                <HomeCards
                                    storeName={e.storeName}
                                    description={e.description}
                                    cloudImage={e.logo}
                                    key={i}
                                />
                            </Link>
                        ))}
                    </Slider>
                </div>


                <div className='cards   overflow-y-scroll '>
                    {storeProducts.length
                        ? storeProducts?.map((product) => (
                              //   <Link
                              //       to={`${location.pathname}/products/${product.id}`}
                              //       onClick={() => dispatch(getProductDetail(product.id))}
                              //   >
                              <div onClick={() => modalFuncion(product.id)}>
                                  <Product
                                      product={product}
                                      addToCart={() => addToCart(product.id)}
                                  />
                              </div>
                              //   </Link>
                          ))
                        : false}

                    <ReactModal
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            },
                        }}
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        className='rounded-sm focus:outline-none bg-white shadow-lg p-10 absolute w-4/6 h-4/6 top-0 bottom-0 right-0 left-0 m-auto'
                    >
                        {productDetail ? <ProductDetail product={productDetail} /> : false}
                    </ReactModal>
                </div>
            </div>

            {/* CART */}
            <div className='bg-green-300 flex row-span-14 col-span-2    border-r border-gray-200   '>
                <div className=' '>
                    <h3>Carrito</h3>
                    {shoppingCart.length ? (
                        <button
                            className='border bg-red-600 text-white shadow p-1'
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear cart
                        </button>
                    ) : (
                        false
                    )}
                    {shoppingCart?.map((item, index) => (
                        <CartItem
                            key={index}
                            data={item}
                            deleteFromCart={() => dispatch(deleteFromCart(item.id))}
                            deleteAllFromCart={() => dispatch(deleteAllFromCart(item.id))}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
