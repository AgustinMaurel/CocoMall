import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';

import Arrow from '../Components/Slides/Arrow';
import HeroCard from '../Components/Cards/HeroCard';
import homeStores from '../Helpers/homeStores';
import dataProducts from '../Helpers/dataProducts';
import ProductCard from '../Components/Cards/ProductCard';

import NavBar from '../Components/NavBar/NavBar';
import Product from '../Components/Product/Product';
import {
    getStoreDetail,
    getProductsStore,
    getProductDetail,
    filterProducts,
    getProductTypes,
    ordersProduct
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

ReactModal.setAppElement('#root');
export default function StoreDetail() {
    const dispatch = useDispatch();
    const storeDetail = useSelector((state) => state.stores.allStores);
    const storeProducts = useSelector((state) => state.stores.storeProductsFilter);
    const shoppingCart = useSelector((state) => state.stores.cart);
    const productDetail = useSelector((state) => state.stores.productDetail);
    const productTypes = useSelector((state) => state.stores.productTypes);

    const { id } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [infoModal, setInfoModal] = useState(false);
    const [checkType, setCheckType] = useState([]);

    const [check, setCheck] = useState(new Array(productTypes.length).fill(false));

    const [filters, setFilters] = useState({
        searchProduct: '',
        type: [],
        min: '',
        max: '',
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

    const settingsCards = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
    };
    //by Chris

    useEffect(() => {
        dispatch(getProductsStore(id));
        dispatch(getProductTypes());
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

    const handleSubmit = (e) => {
        e.preventDefault();
        filters.type = [...checkType];
        if (filters.searchProduct || checkType.length || filters.min || filters.max) {
            dispatch(filterProducts(id, filters));
        } else {
            dispatch(filterProducts(id, filters));
        }
    };

    const handleChecked = (e, position) => {
        const newChecked = [...checkType];
        if (e.target.checked) {
            newChecked.push(parseInt(e.target.value));
            setCheckType(newChecked);
            filters.type = [...newChecked];
            dispatch(filterProducts(id, filters));
        } else {
            setCheckType(newChecked.filter((el) => el !== parseInt(e.target.value)));
            filters.type = newChecked.filter((el) => el !== parseInt(e.target.value))
            dispatch(filterProducts(id, filters));
        }
        const updatedCheckState = check.map((item, index) => {
            return index === position ? !item : item;
        });
        setCheck(updatedCheckState);
    };

    const handleOrder = (e) => {
        e.preventDefault();
        dispatch(ordersProduct(e.target.value))
    }

    return (
        <div className='grid grid-cols-12 w-screen grid-rows-8 h-screen overflow-x-hidden'>
            <div className='col-span-12 row-span-1 row-end-1 bg-gray-200 shadow  '>
                <NavBar />
            </div>
            <div className='col-span-12 content-center mx-auto w-full'>
                <Slider {...settingsHero}>
                    <HeroCard color={'bg-gray-500'} info={storeDetail[0]} infoModal={infoModal} setInfoModal={setInfoModal} />
                    <HeroCard color={'bg-green-500'} info={storeDetail[0]} infoModal={infoModal} setInfoModal={setInfoModal}/>
                    <HeroCard color={'bg-blue-500'} info={storeDetail[0]} infoModal={infoModal} setInfoModal={setInfoModal}/>
                    <HeroCard color={'bg-red-500'} info={storeDetail[0]} infoModal={infoModal} setInfoModal={setInfoModal}/> 
                </Slider>
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

                    {productTypes.length
                        ? productTypes.map((type, index) => {
                              return (
                                  <div>
                                      <label>{type.Name}</label>
                                      <input
                                          type='checkbox'
                                          name={type.id}
                                          value={type.id}
                                          onChange={(e) => handleChecked(e, index)}
                                          checked={check[index]}
                                      />
                                      <span>{type.id}</span>
                                  </div>
                              );
                          })
                        : false}

                        {filters ? 
                        <div>
                            {/* Agregar cantidad de resultados al buscar productos */}
                        {filters.searchProduct !== "" ? <li>{filters.searchProduct}</li> :false}
                        {filters.type.length ? <li>{filters.type}</li> :false}
                        {filters.min !== "" ? <li>{filters.min}</li> :false}
                        {filters.max !== "" ? <li>{filters.max}</li> :false}
                        </div>
                        :false
                    }
                    <div>
                        Ordenamientos
                        <br />
                        <select onChange={handleOrder}>
                            <option value="Mas relevantes">Mas relevantes</option>
                            <option value="Barato">Barato</option>
                            <option value="Caro">Caro</option>
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
                            <Link to={`/home/store/${e.id}`} onClick={() => storeDetail(e.id)}>
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
                    {storeProducts.length
                        ? storeProducts?.map((product) => (
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
