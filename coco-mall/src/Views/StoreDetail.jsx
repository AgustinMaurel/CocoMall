import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import Product from '../Components/Product/Product';
import Slider from 'react-slick';
import Info from '../Components/StoreInfo/Info';
import Share from '../Components/StoreInfo/Share';
import FilterTypeProduct from '../Components/FilterTypeProduct/FilterTypeProduct';
import Search from '../Components/Inputs/Search';

//import Arrow from '../Components/Slides/Arrow';
import HeroCard from '../Components/Cards/HeroCard';

import { SHOPPING_CART} from '../Scripts/constants'
import { getProductsStore, getProductDetail } from '../Redux/actions/stores';
import {
    addToCart,
    deleteFromCart,
    deleteAllFromCart,
    clearCart,
} from '../Redux/actions/shoppingActions';
import CartItem from '../Components/ShoppingCart/CartItem';
import ReactModal from 'react-modal';
import ProductDetail from '../Components/Product/ProductDetail';
import {
    handleOnChange,
    handleOnOrder,
    handleOnSubmit,
    handleOnDiscount,
    handleOnChecked,
} from '../Scripts/handles';

ReactModal.setAppElement('#root');
export default function StoreDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

 
    const { allStores, storeProductsFilter,  productDetail, productTypes, storeProducts } =
        useSelector((state) => state.stores);

    const {uid ,userCart} = useSelector(state => state.auth)

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [infoModal, setInfoModal] = useState(false);
    const [checkType, setCheckType] = useState([]);

    const [check, setCheck] = useState(new Array(productTypes.length).fill(false));

    const [filters, setFilters] = useState({
        searchProduct: '',
        type: [],
        min: '',
        max: '',
        discount: 0,
    });

    let userCartToBack = {
        userId: uid,
        cart: []
    }

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

    useEffect(() => {
        dispatch(getProductsStore(id));
        return () => dispatch(getProductsStore());
    }, [dispatch, id]);

    /*---------LE PIDO AL BACK EL LINK DE PAGO------------*/

    // const handleCheckout = () => {
    //     axios.post('http://localhost:3001/checkout/mercadopago', data).then((order) => {
    //         history.push(`/cart/${order.data.response}`);
    //     });
    // };

    const handleClearCart = () => {
        dispatch(clearCart())
        
        axios.post(SHOPPING_CART.ADD_TO_CART , userCartToBack  )
    }
    
    const modalFuncion = (id) => {
        dispatch(getProductDetail(id));
        setModalIsOpen(true);
    };

    const handleChange = handleOnChange(setFilters);
    const handleSubmit = handleOnSubmit(filters, checkType, dispatch, id);
    const handleChecked = handleOnChecked(
        checkType,
        setCheckType,
        filters,
        dispatch,
        id,
        check,
        setCheck,
    );
    const handleOrder = handleOnOrder(dispatch);
    const handleDiscount = handleOnDiscount(filters, dispatch, id);
    let productTypesArr = [];
    storeProducts.length &&
        storeProducts.map((product, ) => { 
            if (!productTypesArr.includes(product.ProductTypeId)) 
                productTypesArr.push(product.ProductTypeId);
            
        });

    const typesProductInStore = productTypes.filter((type, index) => {
        return productTypesArr.includes(type.id);
    });

    return (
        <div className='grid grid-cols-12 w-screen grid-rows-8 h-screen overflow-x-hidden'>
            <div className='col-span-12 row-span-1 row-end-1 bg-gray-200 shadow '>
                <NavBar />
            </div>
            <div className='col-span-12 row-span-2 row-end-3 content-center relative mx-auto w-full'>
                <Slider {...settingsHero}>
                    <HeroCard color={'bg-gray-500'} />
                    <HeroCard color={'bg-green-500'} />
                    <HeroCard color={'bg-blue-500'} />
                    <HeroCard color={'bg-red-500'} />
                </Slider>

                <Info info={allStores[0]} infoModal={infoModal} setInfoModal={setInfoModal} />
                <Share />
            </div>
            <div className='col-span-12 row-span-3 content-center relative mx-auto w-full'>
                <Search
                    searchProduct={filters.searchProduct}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
                <div className='flex flex-col justify-center'>
                    <div className='flex m-auto w-1/5'>
                        {typesProductInStore.length
                            ? typesProductInStore.map((type, index) => {
                                  return (
                                      <FilterTypeProduct
                                          type={type}
                                          index={index}
                                          handleChecked={handleChecked}
                                          check={check}
                                      />
                                  );
                              })
                            : false}
                    </div>
                    <div className='flex m-auto w-1/5 p-5'>
                        <form onSubmit={(e) => handleSubmit(e)} className='flex p-5 w-3/4 h-full'>
                            {/* <label>Search</label>
                        <input
                            type='search'
                            placeholder='Find Products...'
                            name='searchProduct'
                            className='relative  border border-secondary rounded px-2 w-full focus:outline-none  '
                            value={filters.searchProduct}
                            onChange={handleChange}
                        /> */}

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
                            <button type='submit'>Search Price</button>
                        </form>
                        <button onClick={handleDiscount}>Discount</button>
                    </div>
                </div>
            </div>
            {/* SIDEBAR */}
            <div
                className='col-span-2  row-span-8
                bg-gray-100 border-gray-200 border-r hidden'
            >
                <div className='  '>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        {/* <label>Search</label>
                        <input
                            type='search'
                            placeholder='Find Products...'
                            name='searchProduct'
                            className='relative  border border-secondary rounded px-2 w-full focus:outline-none  '
                            value={filters.searchProduct}
                            onChange={handleChange}
                        /> */}

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
                        <button type='submit'>Search Price</button>
                    </form>
                    <button onClick={handleDiscount}>Discount</button>

                    {typesProductInStore.length
                        ? typesProductInStore.map((type, index) => {
                              return (
                                  <FilterTypeProduct
                                      type={type}
                                      index={index}
                                      handleChecked={handleChecked}
                                      check={check}
                                  />
                              );
                          })
                        : false}

                    {filters.searchProduct ||
                    filters.type.length ||
                    filters.min ||
                    filters.max ||
                    filters.discount ? (
                        <div>
                            <span>Render Filters </span>
                            <br />
                            <span>Resultados</span> <span>{storeProductsFilter.length}</span>
                            {/* Agregar cantidad de resultados al buscar productos */}
                            {filters.searchProduct !== '' ? (
                                <li>{filters.searchProduct}</li>
                            ) : (
                                false
                            )}
                            {filters.type.length ? <li>{filters.type}</li> : false}
                            {filters.min !== '' ? <li>{filters.min}</li> : false}
                            {filters.max !== '' ? <li>{filters.max}</li> : false}
                            {filters.discount !== 0 ? <li>Discount</li> : false}
                        </div>
                    ) : (
                        false
                    )}
                    <div>
                        Ordenamientos
                        <br />
                        <select onChange={handleOrder}>
                            <option value='Mas relevantes'>Mas relevantes</option>
                            <option value='Barato'>Barato</option>
                            <option value='Caro'>Caro</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* CARDS */}
            <div className='col-span-12'>
                <div className='flex flex-col col-span-12 row-span-14 pl-12 pr-12'>
                    <div className='w-1/4 m-auto mt-5'>
                        <h3 className='text-2xl font-bold text-cocoMall-800'>Our recommendations</h3>
                        {/*
                        <Slider {...settingsCards}>
                            {homeStores()?.map((e, i) => (
                                <Link to={`/home/store/${e.id}`} onClick={() => allStores(e.id)}>
                                    <ProductCard
                                        productName={e.storeName}
                                        description={e.description}
                                        cloudImage={e.logo}
                                        key={i}
                                    />
                                </Link>
                            ))}
                        </Slider> */}
                    </div>
                    <div className='flex flex-wrap justify-center'>
                        {storeProductsFilter.length
                            ? storeProductsFilter?.map((product) => (
                                  <div onClick={() => modalFuncion(product.id)}>
                                      <Product
                                          product={product}
                                          key={product.id}
                                      />
                                  </div>
                              ))
                            : false}
                        {/* {productDetail ? (
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
                                <ProductDetail
                                    product={productDetail}
                                    addToCart={() => addToCart(productDetail.id)}
                                />
                            </ReactModal>
                        ) : (
                            false
                        )} */}
                    </div>
                </div>
                {/* CART */}
                <div className=' col-span-12 flex flex-col h-screen row-span-14 pl-12 pr-12'>
                    <div className=' bg-green-300 relative h-full flex row-span-14 col-span-2 border-r border-gray-200 '>
                        <div className=' '>
                            <h3>Carrito</h3>
                            {userCart.length > 0 ? (
                                <button
                                    className='border bg-red-600 text-white shadow p-1'
                                    onClick={handleClearCart}
                                >
                                    Clear cart
                                </button>
                            ) : (
                                false
                            )}
                            {userCart?.map((item, index) => (
                                <CartItem
                                    key={index}
                                    data={item}
                                    deleteFromCart={() => deleteFromCart(item.id)}
                                    deleteAllFromCart={() => deleteAllFromCart(item.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
