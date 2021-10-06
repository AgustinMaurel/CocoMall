import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import { useState } from 'react';
import ProductsCreate from '../Components/Forms/ProductsCreate';
import { useSelector } from 'react-redux';
import StoreModel from '../Components/Cards/StoreModel';
import logo from '../Assets/icons/loco_coco.png';
import axios from 'axios';
import modelData from '../Scripts/modelTable';
import ModelTable from '../Scripts/modelTable';
import { data } from '../Scripts/jsonPrueba';

export default function StorePanel() {

    const [selectStore, setSelectStore] = useState("")
    const [productStore, setProductsStore] = useState([])

    const stores = useSelector((state) => state.stores)
    const user = useSelector(state => state.auth)

    const storesUser = stores.allStores.filter(e => e.UserId === user.uid)

    function handleStore(e) {
        setSelectStore(e.target.value)

    }

    function handleSubmit(e) {
        e.preventDefault()
        let aux = storesUser.find(e => e.storeName === selectStore)
        axios.get(`http://localhost:3001/product/${aux.id}`)
            .then(res => setProductsStore(res.data))    
    }

    return (
        <div className='grid grid-col-6   grid-rows-8  h-screen '>
            <div className=' col-span-6 row-span-1 row-end-1 flex  h-14 pt-4 border-b-2 border-gray-100 px-20 pb-3 z-10  '>
                <NavBar />
            </div>
            <div className='flex w-1/4 flex-col col-start-1 col-end-1   row-span-full relative pl-10 border-r bg-gray-100 border-gray-200 p-5  '>
                <div className='flex flex-col items-center '>
                    <select name="selectStore" onClick={handleStore}>
                        <option value="All">All</option>
                        {storesUser.map(e => {
                            return <option key={e.UserId} value={e.storeName}>{e.storeName}</option>
                        })}
                    </select>
                    <button type="submit" onClick={handleSubmit}>Go</button>
                    <img className="w-9/12" src={logo} alt="not found" />

                    <h1 className='text-start self-center p-5'>
                        Store Panel
                    </h1>

                    <button >Create products</button>

                    <button >All products</button>

                    <button> Orders</button>

                    <button >My stores</button>

                </div>

            </div>

            <div className='relative w-full   col-start-2 col-end-6 row-span-full  overflow-y-hidden p-4 '>
                    <div className='text-center justify-center items-center'> 

                        <ModelTable data={data}/>

                    </div>
            </div>
        </div>
    );
}
