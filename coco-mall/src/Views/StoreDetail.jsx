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
import HeroCard from '../Components/Cards/HeroCard';

import { getProductsStore, getProductDetail, getProductTypes } from '../Redux/actions/stores';
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
    handleOnChecked
} from '../Scripts/handles';

ReactModal.setAppElement('#root');
export default function StoreDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

   const {allStores, storeProductsFilter, cart, productDetail, productTypes} = useSelector((state) => state.stores)
   const storeDetail = useSelector((state) => state.stores.storeDetail);
    const storeProducts = useSelector((state) => state.stores.storeProducts);
    const shoppingCart = useSelector((state) => state.stores.cart);

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

    // const settingsCards = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     nextArrow: <Arrow />,
    //     prevArrow: <Arrow />,
    // };
    //by Chris

    /*---------CREO OBJETO QUE MANDO AL BACK-------------*/

    let total = Object.values(shoppingCart).reduce(
        (previous, key) => previous + key.price * key.quantity,
        0,
    );

    let data = {
        title: 'Cart',
        total: total,
    };

    /*----------------------------------*/

    useEffect(() => {
        dispatch(getProductsStore(id));
        // dispatch(getProductTypes());
        return () => dispatch(getProductsStore());
    }, [dispatch, id]);

    /*---------LE PIDO AL BACK EL LINK DE PAGO------------*/

    const handleCheckout = () => {
        axios.post('http://localhost:3001/checkout/mercadopago', data).then((order) => {
            history.push(`/cart/${order.data.response}`);
        });
    };

    
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

    return (
        <div className='grid grid-cols-12 w-screen grid-rows-8 h-screen overflow-x-hidden'>
            <div className='col-span-12 row-span-1 row-end-1 bg-gray-200 shadow  '>
                <NavBar />
            </div>
            <div className='col-span-12 content-center relative mx-auto w-full'>
                <Slider {...settingsHero}>
                    <HeroCard color={'bg-gray-500'} />
                    <HeroCard color={'bg-green-500'} />
                    <HeroCard color={'bg-blue-500'} />
                    <HeroCard color={'bg-red-500'} />
                </Slider>

                <Info info={allStores[0]} infoModal={infoModal} setInfoModal={setInfoModal} />
                <Share />
            </div>

            {/* SIDEBAR */}
            <div
                className='col-span-2  row-span-8
                bg-gray-100 border-gray-200 border-r'
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

                    {productTypes.length
                        ? productTypes.map((type, index) => {
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
            <div className='flex flex-col col-span-10 row-span-14 pl-5 py-2 '>
                <div className='w-3/4 m-auto mt-16'>
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
                <div className='cards   overflow-y-scroll '>
                    {storeProductsFilter.length
                        ? storeProductsFilter?.map((product) => (
                              <div onClick={() => modalFuncion(product.id)}>
                                  <Product
                                      product={product}
                                      addToCart={() => addToCart(product.id)}
                                  />
                              </div>
                          ))
                        : false}

                    {productDetail ? (
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
                    )}
                </div>
            </div>

            {/* CART */}
            <div className=' bg-green-300 flex row-span-14 col-span-2    border-r border-gray-200   '>
                <div className=' '>
                    <h3>Carrito</h3>
                    {cart.length ? (
                        <button
                            className='border bg-red-600 text-white shadow p-1'
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear cart
                        </button>
                    ) : (
                        false
                    )}
                    {cart?.map((item, index) => (
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
