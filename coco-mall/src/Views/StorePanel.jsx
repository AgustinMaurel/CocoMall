import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from "cloudinary-react"
import ModelTable from '../Components/Tables/modelTable.jsx';
import NavBar from '../Components/NavBar/NavBar';
import { filterProducts, getAllProducts, getProductsStore, getStores, ordersProduct, } from '../Redux/actions/stores';
import { IoArrowBack } from 'react-icons/io5';
import ProductsCreate from '../Components/Forms/ProductsCreate';
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { modalOptions } from '../Scripts/swalFunction.js';
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
    }, [flag2])


    useEffect(() => {
        axios.get(`/order/${idActual}`)
            .then(res => setOrdersStore(res.data))
    }, [idActual])


    useEffect(() => {
        axios.get('/user')
            .then(res => setAllUsers(res.data))
    }, [])





    useEffect(() => {
        dispatch(getProductsStore(idActual));
    }, [flag]);

    function handleStore(e) {
        if (e.target.value !== 'All') {
            setSelectStore(e.target.value);
            const aux = stores.allStores.find((store) => store.storeName === e.target.value);
            dispatch(getProductsStore(aux.id));
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
        render === 'Products' || render === "ProductsAdmin" ? filterProduct : render === 'Orders' || render === 'OrdersAdmin' ? filterOrders : [];

    return (
        <div className='grid grid-col-6   grid-rows-8  overflow-y-scroll '>
            <div className=' col-span-6 row-span-1 row-end-1   border-b-2 border-gray-100   '>
                <NavBar />
            </div>
            <div className=' overflow-y-hidden flex w-64 flex-col col-span-1 row-span-full relative pl-10 border-r bg-gray-100 border-gray-200 p-5  '>
                <div className='flex flex-col items-center h-screen '>
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
                    <h1 className='text-center self-center p-5'>Store Panel</h1>

                    {selectStore !== "SelectStore" && <div className="flex flex-col text-start items-center justify-center">
                        <button
                            name='Products'
                            value='Products'
                            onClick={handleRender}
                            className='my-1 bg-primary rounded text-white p-1 cursor-pointer'
                        >
                            Products{' '}
                        </button>
                        <button
                            name='Orders'
                            value='Orders'
                            onClick={handleRender}
                            className=' my-1 bg-primary rounded text-white p-1 cursor-pointer'
                        >
                            Orders{' '}
                        </button>
                    </div>}

                    <div className="flex flex-col text-start items-center justify-center">
                        <h1 className='text-center self-center p-5'> User Panel</h1>
                        <button className='my-5  bg-primary rounded text-white p-1 cursor-pointer'>Profile</button>

                    </div>
                    {userAdmin ?
                        <div className="flex flex-col text-start items-center justify-center">

                            <h1 className='text-center self-center p-5'>Admin Panel</h1>
                            <button value="ProductsAdmin" onClick={handleRender} className='my-5  bg-primary rounded text-white p-1 cursor-pointer'>All Products</button>
                            <button value="OrdersAdmin" onClick={handleRender} className='my-5  bg-primary rounded text-white p-1 cursor-pointer'>All Orders</button>
                            <button value="UsersAdmin" onClick={handleRender} className='my-5  bg-primary rounded text-white p-1 cursor-pointer'>All Users</button>
                            <button value="StoresAdmin" onClick={handleRender} className='my-5  bg-primary rounded text-white p-1 cursor-pointer'>All Stores</button>

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
                                <h1 className='text-center items-center '>
                                    {render}
                                </h1>
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
                                                        {' '}
                                                        {el.Name}{' '}
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
                                swalFunction={modalOptions}
                            />
                        ) : renderSec === true ? (
                            <ProductsCreate idStore={idActual} />
                        ) : (
                            false
                        )}

                        {render === 'Orders' && selectStore !== 'All' && (
                            <ModelTable
                                info={ordersStore}
                                column_title={['Action', 'State', 'Payment', 'Description']}
                            />
                        )}
                        {render === 'ProductsAdmin' &&


                            <ModelTable
                                info={allProducts}
                                setProduct={setProduct}
                                setEditState={setEditState}
                                idStore={idActual}
                                types={productsTypes}
                                column_title={['Action', 'Name', 'Price', 'Id', 'Image', 'Stock', 'Type',]}
                                flag2={flag2}
                                setFlag2={setFlag2}
                                swalFunction={modalOptions}


                            />}

                        {render === 'OrdersAdmin' && (
                            <ModelTable
                                info={allOrders}
                                column_title={['Action', 'State', 'Payment', 'Id', 'Description']}
                            />
                        )}

                        {render === "UsersAdmin" &&
                            <ModelTable info={allUsers}
                                column_title={['Action', 'Name', 'Mail', 'Id', 'Location']} />}

                        {render === "StoresAdmin" &&
                            <ModelTable info={allStores}
                                column_title={['Action', 'Name', 'Location', 'Id', 'Logo']} />}
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
