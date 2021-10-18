import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from "cloudinary-react"
import ModelTable from '../Components/Tables/modelTable.jsx';
import NavBar from '../Components/NavBar/NavBar';
import { filterProducts, getAllProducts, getProductsStore, getStores, ordersProduct, getProductsStorePanel } from '../Redux/actions/stores';
import { IoArrowBack } from 'react-icons/io5';
import ProductsCreate from '../Components/Forms/ProductsCreate';
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { productOptions, storeOptions, ordersOptions, userOptions } from '../Scripts/swalFunction.js';
import { FiUsers } from "react-icons/fi";
import { BsBox, BsCardList } from "react-icons/bs";
import { BiEditAlt, BiStore } from "react-icons/bi";
import { GrUserSettings } from "react-icons/gr"
export default function StorePanel() {

    const dispatch = useDispatch();

    const stores = useSelector((state) => state.stores);

    const user = useSelector((state) => state.auth);

    const storesUser = stores.allStores.filter((el) => el.UserId === user.uid);

    const products = useSelector((state) => state.stores.storeProductsFilter);

    const productsTypes = useSelector((state) => state.stores.productTypes);

    const allProducts = useSelector(state => state.stores.allProducts)

    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [idActual, setIdActual] = useState('');
    const [product, setProduct] = useState();
    const [selectStore, setSelectStore] = useState('SelectStore');
    const [render, setRender] = useState('');
    const [editState, setEditState] = useState(true);
    const [renderSec, setRenderSec] = useState(false);
    const [userAdmin, setUserAdmin] = useState(false)

    const [ordersStore, setOrdersStore] = useState()
    const [allOrders, setAllOrders] = useState()
    const [allUsers, setAllUsers] = useState()
    const [allStores, setAllStores] = useState()

    useEffect(() => {
        dispatch(getStores());
        axios.get(`/user/`)
            .then(res => {
                let aux = res.data.find(el => el.id === user.uid)
                setUserAdmin(aux?.SuperAdmin)
            })
    }, [user]);


    useEffect(() => {
        dispatch(getAllProducts())
        axios.get('/order')
            .then(res => setAllOrders(res.data))
        axios.get('/store')
            .then(res => setAllStores(res.data))
        axios.get(`/order/${idActual}`)
            .then(res => setOrdersStore(res.data))
        axios.get('/user')
            .then(res => setAllUsers(res.data))
    }, [flag2])

    useEffect(() => {
        dispatch(getProductsStorePanel(idActual));
    }, []);

    function handleStore(e) {
        if (e.target.value !== 'All') {
            setSelectStore(e.target.value);
            const aux = stores.allStores.find((store) => store.storeName === e.target.value);
            dispatch(getProductsStorePanel(aux.id));
            setIdActual(aux.id);
        }
        return false;
    }

    function handleRender(e) {
        setRender(e.target.value);
        setFlag(!flag);
    }

    function handleTypes(e) {
        let val = parseInt(e.target.value);
        let aux = {
            type: [],
        };
        if (e.target.value !== 'All') {
            aux.type = [val];
            dispatch(filterProducts(idActual, aux));
        } else {
            dispatch(filterProducts(idActual, aux));
        }
    }
    const filterProduct = ['A-Z', 'Z-A', 'Price', 'Stock'];

    const filterOrders = ['All', 'Rejected', 'Completed'];


    const filtersNow =
        render === 'Products' || render === "All Products" ? filterProduct : render === 'Orders' || render === 'All Orders' ? filterOrders : [];

    return (
        <div className='grid grid-col-6   grid-rows-8  overflow-y-scroll '>
            <div className=' col-span-6 row-span-1 row-end-1   border-b-2 border-gray-100   '>
                <NavBar />
            </div>
            <div className=' overflow-y-hidden flex w-64 flex-col col-span-1 row-span-full relative pl-10 border-r bg-gray-100 border-gray-200 p-5  '>
                <div className='flex flex-col gap-10 items-center h-screen '>
                    {storesUser.length > 0 && <div className='flex flex-col items-center'>
                        <select
                            name='selectStore'
                            onChange={handleStore}
                            className='my-1 bg-primary rounded text-white p-1 cursor-pointer'
                        >
                            <option
                                defaultValue='SelectStore'
                                selected='SelectStore'
                                disabled={true}
                                value='Select Store'
                            >
                                Select Store
                            </option>
                            {storesUser?.map((e) => {
                                return (
                                    <option key={e.id} value={e.storeName}>
                                        {e.storeName}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="my-5 text-center">

                            <Image
                                cloudName='cocomalls'
                                publicId={selectStore !== 'SelectStore' ? storesUser.find(el => el.storeName === selectStore).cloudImage : false}
                                width='180'
                                alt={false}
                                crop='scale'

                            />

                        </div>
                    </div>}

                    {selectStore !== "SelectStore" &&
                        <div className="flex w-full flex-col text-start items-start justify-start">
                            <h2 className='text-primary text-xl  font-bold'>Store Panel</h2>
                            <div className="flex text-lg pt-1">

                                <BsBox className="mt-1 ml-1" />
                                <button
                                    name='Products'
                                    value='Products'
                                    onClick={handleRender}
                                    className='ml-1'
                                >
                                    Products
                                </button>

                            </div>
                            <div className="flex text-lg pt-1">
                                <BsCardList className="mt-1 ml-1" />
                                <button
                                    name='Orders'
                                    value='Orders'
                                    onClick={handleRender}
                                    className='ml-1'
                                >
                                    Orders
                                </button>

                            </div>
                        </div>}

                    <div className="flex w-full flex-col text-start items-start justify-start">
                        <h2 className='text-primary text-xl  font-bold'> User Panel</h2>
                        <div className="flex text-lg pt-1">
                            <GrUserSettings className="mt-1 ml-1" />
                            <button className='ml-1'>Edit Profile</button>
                        </div>
                    </div>
                    {userAdmin ?
                        <div className="flex w-full flex-col text-start items-start justify-start">

                            <h2 className='text-primary text-xl font-bold'>Admin Panel</h2>
                            <div className="flex text-lg pt-1">
                                <BsBox className="mt-1" />
                                <button className="ml-1" value="All Products" onClick={handleRender} >All Products</button>
                            </div>
                            <div className="flex text-lg pt-1">
                                <BsCardList className="mt-1" />
                                <button className="ml-1" value="All Orders" onClick={handleRender} >All Orders</button>

                            </div>
                            <div className="flex text-lg pt-1">
                                <FiUsers className="mt-1" />
                                <button className="ml-1" value="All Users" onClick={handleRender} >All Users</button>

                            </div>
                            <div className="flex text-lg pt-1">
                                <BiStore className="mt-1" />
                                <button className="ml-1" value="All Stores" onClick={handleRender}>All Stores</button>
                            </div>

                        </div> : null}
                </div>
            </div>

            {editState ? (
                <div className='overflow-y-hidden col-start-2 col-end-6 row-span-full text-center justify-center items-center p-4 '>
                    <IoArrowBack />

                    <div className='text-center justify-center items-center'>
                        {selectStore === 'SelectStore' && render === '' ? (
                            <Link to="/create/shop">
                                <button className='my-1 bg-primary rounded text-white p-1 cursor-pointer'>Create a Store</button>
                            </Link>
                        ) : (
                            <div>
                                <h2 className='text-center items-center text-xl font-bold '>
                                    {render}
                                </h2>
                                <div className=' flex text-center justify-evenly items-center h-32 '>
                                    {filtersNow.map((el) => (
                                        <label
                                            onClick={() => {
                                                dispatch(ordersProduct(el));
                                            }}
                                            key={el}
                                            className='border cursor-pointer bg-secondary-light border-gray-200 rounded-md px-5'
                                        >
                                            {el}
                                        </label>
                                    ))}
                                    {render === 'Products' && (
                                        <>
                                            <select
                                                onChange={handleTypes}
                                                className='border cursor-pointer bg-secondary-light border-gray-200 rounded-md px-5 py-1'
                                            >
                                                <option value='All'>All</option>
                                                {productsTypes?.map((el) => (
                                                    <option key={el.id} value={el.id}>
                                                        {el.Name}
                                                    </option>
                                                ))}
                                            </select>

                                            <label
                                                onClick={() =>
                                                    dispatch(getProductsStore(idActual)) &&
                                                        !renderSec
                                                        ? setRenderSec(true)
                                                        : setRenderSec(false)
                                                }
                                                className='border cursor-pointer bg-secondary-light border-gray-200 rounded-md px-5 py-1'
                                            >
                                                <GrAdd />
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {render === 'Products' &&
                            selectStore !== 'Select Store' &&
                            renderSec === false ? (
                            <ModelTable
                                info={products}
                                setProduct={setProduct}
                                setEditState={setEditState}
                                idStore={idActual}
                                types={productsTypes}
                                column_title={[
                                    'Action',
                                    'Name',
                                    'Price',
                                    'Id',
                                    'Image',
                                    'Stock',
                                    'Type',
                                ]}
                                flag2={flag2}
                                setFlag2={setFlag2}
                                swalFunction={productOptions}
                            />
                        ) : renderSec === true ? (
                            <ProductsCreate idStore={idActual} />
                        ) : (
                            false
                        )}

                        {render === 'Orders' && selectStore !== 'All' && (
                            <ModelTable
                                info={ordersStore}
                                column_title={['Action', 'State', 'Payment', 'Id', 'Description']}
                                flag2={flag2}
                                idStore={idActual}
                                setFlag2={setFlag2}
                                swalFunction={ordersOptions}
                            />
                        )}
                        {render === 'All Products' &&
                            <ModelTable
                                info={allProducts}
                                setProduct={setProduct}
                                setEditState={setEditState}
                                idStore={idActual}
                                types={productsTypes}
                                column_title={['Action', 'Name', 'Price', 'Id', 'Image', 'Stock', 'Type',]}
                                flag2={flag2}
                                setFlag2={setFlag2}
                                swalFunction={productOptions}


                            />}

                        {render === 'All Orders' && (
                            <ModelTable
                                info={allOrders}
                                column_title={['Action', 'State', 'Payment', 'Id', 'Description']}
                                flag2={flag2}
                                setFlag2={setFlag2}
                                swalFunction={ordersOptions}
                            />
                        )}

                        {render === "All Users" &&
                            <ModelTable
                                info={allUsers}
                                column_title={['Action', 'Name', 'Mail', 'Id', 'Location']}
                                flag2={flag2}
                                setFlag2={setFlag2}
                                swalFunction={userOptions}
                            />}

                        {render === "All Stores" &&
                            <ModelTable
                                info={allStores}
                                column_title={['Action', 'Name', 'Location', 'Id', 'Logo']}
                                swalFunction={storeOptions}
                                flag2={flag2}
                                setFlag2={setFlag2}
                            />}
                    </div>
                </div>
            ) : (
                <div>
                    <IoArrowBack onClick={() => {
                        setRender('')
                        setEditState(true)
                    }} />
                    <ProductsCreate idStore={idActual} product={product} />
                </div>
            )}
        </div>
    );
}
