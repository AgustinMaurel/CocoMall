import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import TypesProduct from '../Components/Product/TypesProduct';
import Search from '../Components/Inputs/Search';
import {
    getProductsStore,
    getProductDetail,
    getStoreDetail,
    getProductSubCat,
    clearProducts,
} from '../Redux/actions/stores';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { AiOutlineLine } from 'react-icons/ai';
import { AiOutlinePercentage } from 'react-icons/ai';
import {
    handleOnChange,
    handleOnOrder,
    handleOnSubmit,
    handleOnDiscount,
    handleOnTypes,
    handleOnCategories,
    handleOnChangeProduct,
} from '../Scripts/handles';
import Info from '../Components/StoreInfo/Info';
import { Image } from 'cloudinary-react';
import Share from '../Components/StoreInfo/Share';
import FilterPopup from '../Components/Product/FilterPopup';

ReactModal.setAppElement('#root');

export default function StoreDetail() {
    const { uid, userCart } = useSelector((state) => state.auth);
    //HOOKS
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    //STATES
    const {
        allStores,
        storeProductsFilter,
        cart,
        productTypes,
        storeProducts,
        storeDetail,
        productSubCat,
    } = useSelector((state) => state.stores);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [infoModal, setInfoModal] = useState(false);
    const [check, setCheck] = useState(new Array(productTypes.length).fill(false));
    const [filters, setFilters] = useState({
        searchProduct: '',
        type: [],
        min: '',
        max: '',
        discount: 0,
        subCategory: [],
        order: '',
    });

    // const [Cart, setCart] = useState();
    // console.log(Cart, 'LOCAL STORAGE');

    let userCartToBack = {
        userId: uid,
        cart: [],
    };

    //agregar el pedido de user infoDb para actualizar el carrito se va a tener que cambiar por le de userInfo
    useEffect(() => {
        dispatch(getStoreDetail(id));
        dispatch(getProductsStore(id));
        return () => {
            dispatch(clearProducts());
        };
    }, [id]);
    //agregar el userCart.length

    useEffect(() => {
        if (storeProducts.allsubCat?.length) {
            dispatch(getProductSubCat(storeProducts.allsubCat));
        }
    }, [id, storeProducts.allsubCat?.length]);

    const handleChange = handleOnChange(setFilters);
    const handleSubmit = handleOnSubmit(filters, filters.type, dispatch, id);
    const handleDiscount = handleOnDiscount(filters, dispatch, id);
    const handleTypes = handleOnTypes(dispatch, id, filters);
    const handleCategories = handleOnCategories(dispatch, id, filters);
    const handleOrderPrice = handleOnChangeProduct(dispatch, id, filters);

    const handleDoubleCat = (e) => {
        handleChange(e);
        handleCategories(e);
    };
    const handleDouble = (e) => {
        handleChange(e);
        handleTypes(e);
    };

    const handleOrder = async (e) => {
        handleChange(e);
        handleSubmit(e);
    };

    let itemsCart;
    if (userCart.length) {
        let itemsQuantity = userCart?.map((item) => item.quantity);
        itemsCart = itemsQuantity.reduce((a, b) => a + b);
    } else {
        itemsCart = 0;
    }

    let total;
    if (userCart.length) {
        let totalprice = Object.values(userCart).reduce(
            (previous, key) => previous + key.price * key.quantity,
            0,
        );
        total = totalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } else {
        total = 0;
    }

    let keysTypes;
    if (storeProductsFilter?.Products) {
        keysTypes = Object.keys(storeProductsFilter.Products);
    }
    let keysTypesSinFilter;
    if (storeProducts.Products) {
        keysTypesSinFilter = Object.keys(storeProducts.Products);
    }

    let keysSubCats;
    if (filters.type.length) {
        if (storeProducts?.Products[filters.type]) {
            keysSubCats = Object.keys(storeProducts?.Products[filters.type])
                .map((key) => parseInt(key))
                .filter((key) => parseInt(key));
        }
    }

    return (
        <div className='grid grid-col-6 grid-rows-8 bg-gray-200 h-screen'>
            <div className='z-10 col-span-6 row-span-1 row-end-1 bg-gray-200 shadow'>
                <NavBar />
            </div>
            <div className='w-full col-span-6 row-span-full px-6 md:px-12 xl:px-24 overflow-x-auto'>
                {/* --- BANNER PRODUCTS --- */}
                <div className='flex 2xl:w-2/3 h-24 mx-auto bg-cocoMall-200 rounded-b-2xl'>
                    <div className='flex items-center justify-between w-full px-4'>
                        <div className='flex items-center gap-2'>
                            <picture className='flex h-full'>
                                <Image
                                    key={storeDetail?.id}
                                    cloudName='cocomalls'
                                    publicId={storeDetail?.cloudImage}
                                    crop='scale'
                                    className='shadow object-cover rounded-full bg-white h-10 w-10 lg:h-14 lg:w-14'
                                />
                            </picture>
                            <div>
                                <h3 className='text-base md:text-lg lg:text-2xl font-extrabold text-white'>
                                    {storeDetail?.storeName?.toUpperCase()}
                                </h3>
                                <p className='hidden text-white text-sm lg:text-lg'>
                                    {storeDetail?.description}
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-1'>
                            <div className='text-white flex items-center justify-center p-1 xl:px-4 xl:py-1 rounded xl:mx-2 bg-cocoMall-100'>
                                <Info
                                    info={storeDetail}
                                    infoModal={infoModal}
                                    setInfoModal={setInfoModal}
                                />
                            </div>
                            <div className='text-white flex items-center justify-center p-1 xl:px-4 xl:py-1 rounded xl:mx-2 bg-cocoMall-100'>
                                <Share />
                            </div>
                        </div>
                    </div>
                </div>

                {userCart.length ? (
                    <div
                        className='fixed flex w-screen justify-evenly bottom-5 z-20  '
                        onClick={() => history.push('/cart')}
                    >
                        <span className='bg-primary rounded-lg   p-1.5 cursor-pointer text-white font-semibold'>
                            Your cart has {itemsCart} items ${total}
                        </span>
                    </div>
                ) : (
                    false
                )}

                {/* --- FILTERS & SEARCH --- */}
                <div className='m-auto mt-6 2xl:w-3/4 2xl:mt-16'>
                    <Search
                        searchProduct={filters.searchProduct}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                    {/* --- FILTERS --- */}
                    <div className='flex mb-4 items-center justify-between gap-4 '>
                        {/* --- part1 --- */}
                        <div className=' flex gap-2 md:gap-4'>
                            <div className=''>
                                <select
                                    className='cursor-pointer p-2 rounded-md text-white text-sm bg-gray-300 outline-none hover:bg-cocoMall-400'
                                    name='category'
                                    id='category'
                                    onChange={handleDouble}
                                    defaultValue='All'
                                >
                                    <option value='All'>All products</option>

                                    {productTypes.length && storeProducts.allCurrentTypes?.length
                                        ? productTypes?.map((type, i) => {
                                              if (storeProducts.allCurrentTypes.includes(type.id)) {
                                                  return (
                                                      <option key={type.id} value={type.id}>
                                                          {type.Name}
                                                      </option>
                                                  );
                                              }
                                          })
                                        : false}
                                </select>
                            </div>

                            <div className=''>
                                <select
                                    className='cursor-pointer p-2 rounded-md text-white text-sm bg-gray-300 outline-none hover:bg-cocoMall-400'
                                    name='subcategory'
                                    id='subcategory'
                                    onChange={handleDoubleCat}
                                    defaultValue='All'
                                >
                                    <option
                                        value='All'
                                        disabled={!filters.type.length ? true : false}
                                    >
                                        {!filters.type.length ? 'Choose a Type' : 'All Categories'}
                                    </option>
                                    {filters.type.length && keysSubCats?.length
                                        ? productSubCat.map((subCat, i) => {
                                              if (keysSubCats?.includes(subCat.id)) {
                                                  return (
                                                      <option key={subCat.id} value={subCat.id}>
                                                          {subCat.Name}
                                                      </option>
                                                  );
                                              }
                                          })
                                        : false}
                                </select>
                            </div>
                        </div>

                        {/* --- part2 --- */}
                        <div className='xl:hidden'>
                            <FilterPopup
                                handleSubmit={handleSubmit}
                                filters={filters}
                                handleChange={handleChange}
                                handleDiscount={handleDiscount}
                            />
                        </div>
                        <div className='hidden xl:flex gap-4 text-sm '>
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className='flex items-center gap-1'
                            >
                                <input
                                    type='number'
                                    placeholder='min'
                                    name='min'
                                    className=' appearance-none  border-gray-50 rounded shadow-sm py-1 px-3 w-36
                                            focus:outline-none focus:bg-white focus:border-cocoMall-100 '
                                    value={filters.min}
                                    onChange={handleChange}
                                ></input>
                                <AiOutlineLine className='text-cocoMall-400' />
                                <input
                                    type='number'
                                    placeholder='max'
                                    name='max'
                                    className=' appearance-none  border-gray-50 rounded shadow-sm py-1 px-3 w-36
                                            focus:outline-none focus:bg-white focus:border-cocoMall-100 '
                                    value={filters.max}
                                    onChange={handleChange}
                                ></input>
                                <button className='flex text-cocoMall-300 h-6' type='submit'>
                                    <BsFillArrowRightCircleFill className='h-full w-full' />
                                </button>
                            </form>
                        </div>
                        <div className='hidden xl:flex gap-4 text-sm '>
                            <button
                                className='cursor-pointer flex items-center gap-2 bg-gray-300 text-gray-50 p-2 px-4 rounded-md ml-6 h-8'
                                onClick={handleDiscount}
                            >
                                <AiOutlinePercentage />
                            </button>

                            <select
                                className='cursor-pointer p-2 rounded-md text-white bg-gray-300 outline-none hover:bg-cocoMall-400'
                                onChange={handleChange}
                            >
                                <option name='ALL' value='ALL'>
                                    Most Relevant
                                </option>
                                <option name='DESC' value='DESC'>
                                    Low Price
                                </option>
                                <option name='ASC' value='ASC'>
                                    High Price
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* CARDS */}
                <div className='m-auto mt-6 2xl:w-3/4 2xl:mt-16'>
                    <div>
                        {keysTypesSinFilter?.length <= keysTypes?.length ? (
                            <h3 className='text-3xl font-bold text-cocoMall-800 ml-4'>
                                Alls Products
                            </h3>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className='flex flex-col'></div>
                    <div>
                        {storeProductsFilter?.Products
                            ? keysTypes.map((k) => {
                                  return (
                                      <TypesProduct
                                          typeName={k}
                                          SubCategories={storeProductsFilter.Products[k]}
                                          modalIsOpen={modalIsOpen}
                                          setModalIsOpen={setModalIsOpen}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
