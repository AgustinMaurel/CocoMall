import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'cloudinary-react';
import ModelTable from '../Components/Tables/modelTable.jsx';
import NavBar from '../Components/NavBar/NavBar';
import { filterProductsPanel, getAllProducts, getProductsStore, getStores, ordersProduct, getProductsStorePanel, getOrdersStore } from '../Redux/actions/stores';
import { IoArrowBack } from 'react-icons/io5';
import ProductsCreate from '../Components/Forms/ProductsCreate';
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    productOptions,
    storeOptions,
    ordersOptions,
    userOptions,
} from '../Scripts/swalFunction.js';
import { FiUsers } from 'react-icons/fi';
import { BsBox, BsCardList } from 'react-icons/bs';
import { BiEditAlt, BiStore } from 'react-icons/bi';
import { GrUserSettings } from 'react-icons/gr';
import { swalDelete } from '../Scripts/swalDelete.js';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useHistory } from 'react-router';
import EditUser from '../Components/Forms/EditUser.jsx';
import { userInfo } from '../Redux/actions/auth.js';
export default function StorePanel() {
    const dispatch = useDispatch();

    const history = useHistory();

    const stores = useSelector((state) => state.stores);

    const user = useSelector((state) => state.auth);

    const storesUser = stores.allStores.filter((el) => el.UserId === user.uid);

    const products = useSelector((state) => state.stores.storeProductsFilter);

    const productsTypes = useSelector((state) => state.stores.productTypes);

    const allProducts = useSelector((state) => state.stores.allProducts);

    const ordersStore = useSelector((state) => state.stores.orderStore);

    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [idActual, setIdActual] = useState('');
    const [product, setProduct] = useState();
    const [selectStore, setSelectStore] = useState('SelectStore');
    const [render, setRender] = useState('');
    const [editState, setEditState] = useState(true);
    const [renderSec, setRenderSec] = useState(false);
    const [userAdmin, setUserAdmin] = useState(false);

    const [allOrders, setAllOrders] = useState()
    const [allUsers, setAllUsers] = useState()
    const [allStores, setAllStores] = useState()
    const [userOrders, setUserOrders] = useState()

    useEffect(() => {
        dispatch(getStores());
        axios.get(`/user`)
            .then(res => {
                let aux = res.data.find(el => el.id === user.uid)
                setUserAdmin(aux?.SuperAdmin)
            })
    }, [user]);


    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getStores())
        dispatch(getOrdersStore(idActual))
        axios.get('/order')
            .then(res =>{
                 setAllOrders(res.data)
                 let aux = res.data.filter(el => el.UserId === user.uid )
                 setUserOrders(aux)
                })
            
        axios.get('/store')
            .then(res => setAllStores(res.data))
        axios.get('/user')
            .then(res => setAllUsers(res.data))
            
    }, [flag2])

    useEffect(() => {
        dispatch(getProductsStorePanel(idActual));
    }, []);

    function handleStore(e) {
        if (e.target.value !== 'SelectStore') {
            setSelectStore(e.target.value);
            const aux = stores.allStores.find((store) => store.storeName === e.target.value);
            dispatch(getProductsStorePanel(aux.id));
            setIdActual(aux.id);
            setFlag2(!flag2);
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
            dispatch(filterProductsPanel(idActual, aux));
        } else {
            dispatch(filterProductsPanel(idActual, aux));
        }
    }
    const filterProduct = ['A-Z', 'Z-A', 'Price', 'Stock'];

    const filterOrders = ['All', 'Rejected', 'Completed'];

    const filtersNow = render === 'Products' ? filterProduct : [];

    return (
        <div className='grid grid-col-6   grid-rows-8  overflow-y-scroll '>
            <div className=' col-span-6 row-span-1 row-end-1   border-b-2 border-gray-100   '>
                <NavBar />
            </div>
            <div className='   hidden  overflow-y-hidden lg:flex w-64 lg:flex-col lg:col-span-1 lg:row-span-full lg:relative pl-10 lg:border-r lg:bg-gray-100 lg: border-gray-200 p-5  '>
                <div className='flex flex-col gap-10 items-center h-screen '>
                    {storesUser.length > 0 && (
                        <div className='flex flex-col items-center'>
                            <select
                                name='selectStore'
                                onChange={handleStore}
                                className='my-1 bg-primary rounded text-white p-1 cursor-pointer'
                            >
                                <option
                                    defaultValue='SelectStore'
                                    selected='SelectStore'
                                    value='SelectStore'
                                >
                                    {selectStore}
                                </option>
                                {storesUser?.map((e) => {
                                    return (
                                        <option key={e.id} value={e.storeName}>
                                            {e.storeName}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className='my-5 text-center'>
                                <Image
                                    cloudName='cocomalls'
                                    publicId={
                                        selectStore !== 'SelectStore'
                                            ? storesUser.find((el) => el.storeName === selectStore)
                                                  .cloudImage
                                            : false
                                    }
                                    width='180'
                                    alt={false}
                                    crop='scale'
                                />
                            </div>
                            {selectStore !== 'SelectStore' && (
                                <div className='flex w-full text-start items-start justify-start text-lg pt-1'>
                                    <RiDeleteBin7Line className='mt-1 ml-1' />
                                    <button
                                        className='ml-1'
                                        onClick={() => {
                                            swalDelete(idActual, setFlag2, flag2).then(() => {
                                                setSelectStore('SelectStore');
                                                history.push('/create/shop');
                                            });
                                        }}
                                    >
                                        Delete store
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {selectStore !== 'SelectStore' && (
                        <div className='flex w-full flex-col text-start items-start justify-start'>
                            <h2 className='text-primary text-xl  font-bold'>Store Panel</h2>
                            <div className='flex text-lg pt-1'>
                                <BsBox className='mt-1 ml-1' />
                                <button
                                    name='Products'
                                    value='Products'
                                    onClick={handleRender}
                                    className='ml-1'
                                >
                                    Products
                                </button>
                            </div>
                            <div className='flex text-lg pt-1'>
                                <BsCardList className='mt-1 ml-1' />
                                <button
                                    name='Orders'
                                    value='Orders'
                                    onClick={handleRender}
                                    className='ml-1'
                                >
                                    Orders
                                </button>
                            </div>
                        </div>
                    )}

                    <div className='flex w-full flex-col text-start items-start justify-start'>
                        <h2 className='text-primary text-xl font-bold'> User Panel</h2>
                        <div className='flex text-lg pt-1'>
                            <GrUserSettings className='mt-1 ml-1' />
                            <button className='ml-1' value='Edit profile' onClick={handleRender}>
                                Edit Profile
                            </button>
                        </div>
                        <div className='flex text-lg pt-1'>
                            <BsCardList className='mt-1' />
                            <button className='ml-1' value='My Orders' onClick={handleRender}>
                                My Orders
                            </button>
                        </div>
                    </div>
                    {userAdmin ? (
                        <div className='flex w-full flex-col text-start items-start justify-start'>
                            <h2 className='text-primary text-xl font-bold'>Admin Panel</h2>
                            <div className='flex text-lg pt-1'>
                                <BsBox className='mt-1' />
                                <button
                                    className='ml-1'
                                    value='All Products'
                                    onClick={handleRender}
                                >
                                    All Products
                                </button>
                            </div>
                            <div className='flex text-lg pt-1'>
                                <BsCardList className='mt-1' />
                                <button className='ml-1' value='All Orders' onClick={handleRender}>
                                    All Orders
                                </button>
                            </div>
                            <div className='flex text-lg pt-1'>
                                <FiUsers className='mt-1' />
                                <button className='ml-1' value='All Users' onClick={handleRender}>
                                    All Users
                                </button>
                            </div>
                            <div className='flex text-lg pt-1'>
                                <BiStore className='mt-1' />
                                <button className='ml-1' value='All Stores' onClick={handleRender}>
                                    All Stores
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            {editState ? (
                <div className='overflow-y-hidden col-start-2 col-end-6 row-span-full text-center justify-center items-center p-4 '>
                    <div className='text-center justify-center items-center'>
                        {selectStore === 'SelectStore' && render === '' ? (
                            <Link to='/create/shop'>
                                <button className='my-1 bg-primary rounded text-white p-1 cursor-pointer'>
                                    Create a Store
                                </button>
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
                        {render === 'Edit profile' && <EditUser />}
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
                                setFlag2={setFlag2}
                                swalFunction={ordersOptions}
                                idStore={idActual}
                            />
                        )}
                        {render === 'My Orders' && selectStore !== 'All' && (
                                        <ModelTable
                                            info={userOrders}
                                            column_title={[ 'State', 'Payment', 'Id', 'Description']}
                                            flag2={flag2}
                                            setFlag2={setFlag2}
                                            swalFunction={ordersOptions}
                                            idStore={idActual}
                                        />
                                    )}
                        {render === 'All Products' &&
                            <ModelTable
                                info={allProducts}
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
                        }

                        {render === 'All Orders' && (
                            <ModelTable
                                info={allOrders}
                                column_title={['Action', 'State', 'Payment', 'Id', 'Description']}
                                flag2={flag2}
                                setFlag2={setFlag2}
                                swalFunction={ordersOptions}
                            />
                        )}

                        {render === 'All Users' && (
                            <ModelTable
                                info={allUsers}
                                column_title={['Action', 'Role', 'Name', 'Mail', 'Id', 'Location']}
                                flag2={flag2}
                                setFlag2={setFlag2}
                                swalFunction={userOptions}
                            />
                        )}

                        {render === 'All Stores' && (
                            <ModelTable
                                info={allStores}
                                column_title={['Action', 'Name', 'Location', 'Id', 'Logo']}
                                swalFunction={storeOptions}
                                flag2={flag2}
                                setFlag2={setFlag2}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    {render === 'Products' || render === 'All Products' ? (
                        <IoArrowBack
                            onClick={() => {
                                setRender('');
                                setEditState(true);
                            }}
                        />
                    ) : (
                        false
                    )}
                    <ProductsCreate idStore={idActual} product={product} />
                </div>
            )}{' '}
            {/* DISPOSITIVOS */}
            <div className=' lg:hidden absolute bottom-0 col-span-6 w-full  overflow-y-hidden flex    pl-10 border-t bg-gray-100  border-gray-200 p-5  '>
                <div className='flex  gap-10   '>
                    {storesUser.length > 0 && (
                        <div className='flex flex-col items-center'>
                            <p className='text-primary text-base font-bold'>Store</p>
                            <select
                                name='selectStore'
                                onChange={handleStore}
                                className='my-1 bg-primary w-10 rounded text-white p-1 cursor-pointer text-sm'
                            >
                                <option
                                    defaultValue='SelectStore'
                                    selected='SelectStore'
                                    value='SelectStore'
                                ></option>
                                {storesUser?.map((e) => {
                                    return (
                                        <option key={e.id} value={e.storeName}>
                                            {e.storeName}
                                        </option>
                                    );
                                })}
                            </select>

                            {selectStore !== 'SelectStore' && (
                                <div className='flex relative  text-start items-start justify-start text-base pt-1'>
                                    <button
                                        className='absolute whitespace-nowrap text-sm text-red-500 -left-10 '
                                        onClick={() => {
                                            swalDelete(idActual, setFlag2, flag2).then(() => {
                                                setSelectStore('SelectStore');
                                                history.push('/create/shop');
                                            });
                                        }}
                                    >
                                        Delete store
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {selectStore !== 'SelectStore' && (
                        <div className='flex  flex-col text-start items-start justify-start'>
                            <h2 className='text-primary text-base whitespace-nowrap  font-bold'>
                                Store Panel
                            </h2>
                            <div className='flex text-sm pt-1'>
                                <button
                                    name='Products'
                                    value='Products'
                                    onClick={handleRender}
                                    className='ml-1'
                                >
                                    Products
                                </button>
                            </div>
                            <div className='flex text-sm pt-1'>
                                <button
                                    name='Orders'
                                    value='Orders'
                                    onClick={handleRender}
                                    className='ml-1'
                                >
                                    Orders
                                </button>
                            </div>
                        </div>
                    )}

                    <div className='flex w-full flex-col text-start items-start justify-start'>
                        <h2 className='text-primary text-base font-bold whitespace-nowrap'>
                            {' '}
                            User Panel
                        </h2>
                        <div className='flex text-sm pt-1'>
                            <button className='ml-1' value='Edit profile' onClick={handleRender}>
                                Edit Profile
                            </button>
                        </div>
                        <div className=' text-sm pt-1'>
                            <button className='ml-1' value='My Orders' onClick={handleRender}>
                                My Orders
                            </button>
                        </div>
                    </div>
                    {userAdmin ? (
                        <div className='flex w-full flex-col text-start items-start justify-start'>
                            <h2 className='text-primary whitespace-nowrap text-base font-bold'>
                                Admin Panel
                            </h2>
                            <div className='flex text-sm pt-1'>
                                <button
                                    className='ml-1'
                                    value='All Products'
                                    onClick={handleRender}
                                >
                                    All Products
                                </button>
                            </div>
                            <div className='flex text-sm pt-1'>
                                <button className='ml-1' value='All Orders' onClick={handleRender}>
                                    All Orders
                                </button>
                            </div>
                            <div className='flex text-sm pt-1'>
                                <button className='ml-1' value='All Users' onClick={handleRender}>
                                    All Users
                                </button>
                            </div>
                            <div className='flex text-sm pt-1'>
                                <button className='ml-1' value='All Stores' onClick={handleRender}>
                                    All Stores
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
