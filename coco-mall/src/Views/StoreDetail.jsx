import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import ReactModal from 'react-modal';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiOutlineLine } from 'react-icons/ai';
import { AiOutlinePercentage } from 'react-icons/ai';

import { getProductsStore, getProductDetail, getStoreDetail } from '../Redux/actions/stores';
import {
    addToCart,
    deleteFromCart,
    deleteAllFromCart,
    clearCart,
} from '../Redux/actions/shoppingActions';
import Info from '../Components/StoreInfo/Info';
import Share from '../Components/StoreInfo/Share';
import FilterTypeProduct from '../Components/FilterTypeProduct/FilterTypeProduct';
import Search from '../Components/Inputs/Search';
import HeroCard from '../Components/Cards/HeroCard';
import NavBar from '../Components/NavBar/NavBar';
import Product from '../Components/Product/Product';
import CartItem from '../Components/ShoppingCart/CartItem';
import ProductDetail from '../Components/Product/ProductDetail';
import {
    handleOnChange,
    handleOnOrder,
    handleOnSubmit,
    handleOnDiscount,
    handleOnChecked,
    handleOnTypes,
} from '../Scripts/handles';
import Arrow from '../Components/Slides/Arrow';

ReactModal.setAppElement('#root');

export default function StoreDetail() {
    //HOOKS
    const dispatch = useDispatch();
    const { id } = useParams();

    //STATES
    const { allStores, storeProductsFilter, cart, productDetail, productTypes, storeProducts, storeDetail } =
        useSelector((state) => state.stores);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [checkType, setCheckType] = useState([]);
    const [infoModal, setInfoModal] = useState(false);
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

    const settingsTypes = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
    };
    //by Chris

    useEffect(() => {
        dispatch(getStoreDetail(id));
        dispatch(getProductsStore(id));
        return () => {
            dispatch(getProductsStore());
            dispatch(getStoreDetail());
        };
    }, [dispatch, allStores]);


    const modalFuncion = (id) => {
        dispatch(getProductDetail(id));
        setModalIsOpen(true);
    };

    const handleChange = handleOnChange(setFilters);
    const handleSubmit = handleOnSubmit(filters, checkType, dispatch, id);
    const handleOrder = handleOnOrder(dispatch);
    const handleDiscount = handleOnDiscount(filters, dispatch, id);
    const handleTypes = handleOnTypes(dispatch, id);

    let productTypesArr = [];
    storeProducts.length &&
        storeProducts.map((product) => {
            if (!productTypesArr.includes(product.ProductTypeId)) {
                productTypesArr.push(product.ProductTypeId);
            }
        });

    const typesProductInStore = productTypes.filter((type) => {
        return productTypesArr.includes(type.id);
    });

    return (
        <div className='grid grid-cols-12 w-screen grid-rows-8 h-screen overflow-x-hidden bg-gray-50'>
            <div className='col-span-12 row-span-1 row-end-1 bg-gray-200 shadow '>
                <NavBar />
            </div>
            {/* --- BANNER PRODUCTS --- */}
            <div className='col-span-12 flex flex-col items-center text-white justify-center content-center mx-auto w-full bg-cocoMall-200 gap-2'>
                <h3 className='text-5xl font-extrabold text-white'>{storeDetail?.storeName?.toUpperCase()}</h3>
                <p>{storeDetail?.description}</p>
            </div>

            {/* --- FILTERS & SEARCH --- */}
            <div className='col-span-12 w-3/4 row-span-2 m-auto'>
                <Search
                    searchProduct={filters.searchProduct}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
                {/* --- FILTERS --- */}
                <div className='flex w-3/4 m-auto items-center justify-between'>
                    <div className=''>
                        <select
                            className='cursor-pointer p-2 rounded-md text-white bg-gray-300'
                            name='category'
                            id='category'
                            onChange={handleTypes}
                            defaultValue='All'
                        >
                            <option value='All'>All products</option>
                            {typesProductInStore?.map((type) => {
                                return (
                                    <option key={type.id} value={type.id}>
                                        {type.Name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className='flex'>
                        <form onSubmit={(e) => handleSubmit(e)} className='flex items-center gap-1'>
                            <input
                                type='number'
                                placeholder='minimum'
                                name='min'
                                className=' appearance-none border border-gray-50 rounded shadow-sm py-1 px-3 w-36
                                            focus:outline-none focus:bg-white focus:border-cocoMall-100 '
                                value={filters.min}
                                onChange={handleChange}
                            ></input>
                            <AiOutlineLine className='text-cocoMall-400' />
                            <input
                                type='number'
                                placeholder='maximum'
                                name='max'
                                className=' appearance-none border border-gray-50 rounded shadow-sm py-1 px-3 w-36
                                            focus:outline-none focus:bg-white focus:border-cocoMall-100 '
                                value={filters.max}
                                onChange={handleChange}
                            ></input>
                            <button className='flex text-cocoMall-300 h-6' type='submit'>
                                <BsFillArrowRightCircleFill className='h-full w-full' />
                            </button>
                        </form>
                        <button
                            className='cursor-pointer flex items-center gap-2 bg-gray-300 text-gray-50 p-2 px-4 rounded-md ml-6 h-8'
                            onClick={handleDiscount}
                        >
                            Promotions
                            <AiOutlinePercentage />
                        </button>
                    </div>

                    {/* --- ORDERS --- */}
                    <div>
                        <select
                            className='border cursor-pointer p-2 rounded-md text-white bg-gray-300'
                            onChange={handleOrder}
                        >
                            <option value='Mas relevantes'>Mas relevantes</option>
                            <option value='Barato'>Barato</option>
                            <option value='Caro'>Caro</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* CARDS */}
            <div className='col-span-12 w-2/3 m-auto'>
                <div>
                    <h3 className='text-2xl font-bold text-cocoMall-800 ml-4'>Alls Products</h3>
                </div>
                <div className='flex flex-wrap'>
                    {/* {storeProductsFilter.length
                        ? storeProductsFilter?.map((product) => (
                              <div onClick={() => modalFuncion(product.id)}>
                                  <Product
                                      product={product}
                                      addToCart={() => addToCart(product.id)}
                                  />
                              </div>
                          ))
                        : false} */}

                    {/* Por cada tipo de producto que tenga la tienda quiero renderizar
                        una seccion de productos 
                        */}

                    {storeProductsFilter.length
                        ? typesProductInStore.map((type) => {
                            // storeProductsFilter
                              return (
                                  <div className='flex'>
                                    {
                                       storeProductsFilter[0].ProductTypeId === type?.id ? <h2>{type.Name}</h2> : <></>
                                    }

                                      {storeProductsFilter
                                          ?.sort((a, b) => a.ProductTypeId - b.ProductTypeId)
                                          .map((product) => {
                                              if (type.id === product.ProductTypeId) {
                                                  return (
                                                      <div onClick={() => modalFuncion(product.id)}>
                                                          <Product
                                                              product={product}
                                                              addToCart={() =>
                                                                  addToCart(product.id)
                                                              }
                                                          />
                                                      </div>
                                                  );
                                              }
                                          })}
                                  </div>
                              );
                          })
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
                            className='rounded-md focus:outline-none bg-white shadow-lg p-4 absolute w-3/6 h-3/6 top-0 bottom-0 right-0 left-0 m-auto'
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
            <div className='hidden'>
                <div className=' bg-green-300 flex row-span-14 col-span-2 border-r border-gray-200 '>
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
        </div>
    );
}


//RENDERS FILTERS

// {
//     filters.searchProduct ||
//     filters.type.length ||
//     filters.min ||
//     filters.max ||
//     filters.discount ? (
//         <div className='border'>
//             <span>Render Filters </span>
//             <br />
//             <span>Resultados</span> <span>{storeProductsFilter.length}</span>
//             {/* Agregar cantidad de resultados al buscar productos */}
//             {filters.searchProduct !== '' ? (
//                 <li>{filters.searchProduct}</li>
//             ) : (
//                 false
//             )}
//             {filters.type.length ? <li>{filters.type}</li> : false}
//             {filters.min !== '' ? <li>{filters.min}</li> : false}
//             {filters.max !== '' ? <li>{filters.max}</li> : false}
//             {filters.discount !== 0 ? <li>Discount</li> : false}
//     </div>
// ) : (
//     false
// )}


/* <Slider {...settingsTypes}>
    {typesProductInStore?.map((type, index) => {
        return (
            <FilterTypeProduct
                type={type}
                index={index}
                handleChecked={handleChecked}
                check={check}
            />
        );
    })}
</Slider> */



// {
//     storeProductsFilter[0].ProductTypeId === type?.id ? <h2>{type.Name}</h2> : <></>
// }