import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from "cloudinary-react"
import ModelTable from '../Scripts/modelTable';
import NavBar from '../Components/NavBar/NavBar';
import {
    filterProducts,
    getProductsStore,
    getStores,
    ordersProduct,
} from '../Redux/actions/stores';
import { IoArrowBack } from 'react-icons/io5';
import ProductsCreate from '../Components/Forms/ProductsCreate';
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function StorePanel() {
    const dispatch = useDispatch();

    const stores = useSelector((state) => state.stores);

    const user = useSelector((state) => state.auth);

    const storesUser = stores.allStores.filter((el) => el.UserId === user.uid);

    const products = useSelector((state) => state.stores.storeProductsFilter);

    const productsTypes = useSelector((state) => state.stores.productTypes);

    const [flag, setFlag] = useState(false);
    const [idActual, setIdActual] = useState('');
    const [product, setProduct] = useState();
    const [selectStore, setSelectStore] = useState('SelectStore');
    const [render, setRender] = useState('');
    const [editState, setEditState] = useState(true);
    const [renderSec, setRenderSec] = useState(false);
    const [userAdmin, setUserAdmin] = useState({
        admin: false
    })
    const [allProducts, setAllProducts] = useState()

    const id = user.uid
  
    useEffect(()=>{
        axios.get('/product')
        .then(res=>setAllProducts(res.data))
    },[flag])

    useEffect(() => {
        dispatch(getStores());
        axios.get(`/user/${id}`)
        .then(res=>setUserAdmin({
            admin: res.data[0].SuperAdmin
        }))
    }, [user]);
   
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

    const filterOrders = ['All', 'Shipped', 'Rejected', 'Pending', 'Completed'];

    const filtersNow =
        render === 'Products' ? filterProduct : render === 'Orders' ? filterOrders : [];

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
                     {userAdmin.admin === true ? <div className="flex flex-col text-start items-center justify-center">

                        <h1 className='text-center self-center p-5'>Admin Panel</h1>
                        <button value="ProductsAdmin" onClick={handleRender} className='my-5  bg-primary rounded text-white p-1 cursor-pointer'>All Products</button>
                        <button value="OrdersAdmin" onClick={handleRender} className='my-5  bg-primary rounded text-white p-1 cursor-pointer'>All Orders</button>
                        <button value="UsersAdmin" onClick={handleRender} className='my-5  bg-primary rounded text-white p-1 cursor-pointer'>All Users</button>
                        <button value="StoresAdmin" onClick={handleRender} className='my-5  bg-primary rounded text-white p-1 cursor-pointer'>All Stores</button>

                    </div>: false}
                </div>
            </div>

            {editState ? (
                <div className='overflow-y-hidden col-start-2 col-end-6 row-span-full text-center justify-center items-center p-4 '>
                    <IoArrowBack />

                    <div className='text-center justify-center items-center'>
                        {selectStore === 'SelectStore' ? (
                            <Link to="/create/shop">
                                <button className='my-1 bg-primary rounded text-white p-1 cursor-pointer'>Create a Store</button>
                            </Link>
                        ) : (
                            <div>
                                <h1 className='text-center items-center '>
                                    {render === 'Products'
                                        ? 'Products'
                                        : render === 'Orders'
                                            ? 'Orders'
                                            : false}
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
                            />
                        ) : renderSec === true ? (
                            <ProductsCreate idStore={idActual} />
                        ) : (
                            false
                        )}

                        {render === 'Orders' && selectStore !== 'All' && (
                            <ModelTable
                                info={[]}
                                column_title={['Action', 'State', 'Payment', 'Description']}
                            />
                        )}
                        {render === 'ProductsAdmin' &&
                        <ModelTable  column_title={[
                            'Action',
                            'Name',
                            'Price',
                            'Id',
                            'Image',
                            'Stock',
                            'Type',
                        ]} types={productsTypes} info={allProducts}  setProduct={setProduct} setEditState={setEditState} idStore={idActual}/>}
                        {render === 'OrdersAdmin' && selectStore !== 'All' && (
                            <ModelTable
                                info={[]}
                                column_title={['Action', 'State', 'Payment', 'Description']}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <IoArrowBack onClick={() => setEditState(true)} />
                    <ProductsCreate idStore={idActual} product={product} />
                </div>
            )}
        </div>
    );
}
