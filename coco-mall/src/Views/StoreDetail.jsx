import React from 'react'
import { useSelector } from 'react-redux';

export default function StoreDetail() {
    const storeDetail = useSelector((state) => state.stores.storeDetail);
    console.log(storeDetail);
    return (
        <div>
            <h2>{storeDetail.storeName}</h2>
            
        </div>
    )
}
