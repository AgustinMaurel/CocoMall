import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { Image } from 'cloudinary-react';

import { useState } from 'react';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsStorePanel, getAllProducts, getOrdersStore } from '../../Redux/actions/stores';

export default function ModelTable({
    info,
    column_title,
    types,
    idStore,
    setEditState,
    setProduct,
    flag2,
    setFlag2,
    swalFunction,
}) {
    const [flag3, setFlag3] = useState(false);
    console.log(info)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
        idStore && dispatch(getProductsStorePanel(idStore));
        idStore && dispatch(getOrdersStore(idStore));
    }, [flag3]);
    return (
        <div className='items-center text-center justify-center  w-full'>
            <div>
                <table className='items-center  text-center justify-center w-full '>
                    <thead>
                        <tr>
                            {column_title.map((el) => (
                                <th
                                    key={el}
                                    className='  border-double border-b border-gray-800 text-sm lg:text-lg text-gray-800 py-2'
                                >
                                    {el}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className=' odd:bg-gray-400 '>
                        {info.length > 0 &&
                            info?.map((el) => (
                                <tr
                                    className='font-semibold text-gray-700 text-sm lg:text-base'
                                    key={el.id}
                                >
                                   {column_title[0] === 'Action' && <td
                                        key={el.id}
                                        className='  border-b text-center justify-center items-center border-gray-400 py-2'
                                    >
                                        <div
                                            key={el.id}
                                            className='flex justify-evenly cursor-pointer'
                                        >
                                            <FiSettings
                                                onClick={() => {
                                                    swalFunction(
                                                        el.id,
                                                        setEditState,
                                                        setFlag3,
                                                        flag3,
                                                        setFlag2,
                                                        flag2,
                                                        el.SuperAdmin,
                                                    );
                                                    setProduct && setProduct(el);
                                                    console.log(el);
                                                }}
                                            />
                                        </div>
                                    </td>}
                                    {el.SuperAdmin === false || el.SuperAdmin === true ? (
                                        <td className='border-b  border-gray-400 py-2'>
                                            {el.SuperAdmin === true ? 'Admin' : 'User'}
                                        </td>
                                    ) : (
                                        false
                                    )}
                                    <td className='border-b  border-gray-400 py-2'>
                                        {el.productName || el.orderState || el.Name || el.storeName}
                                    </td>
                                    <td className=' border-b  border-gray-400 py-2'>
                                        {el.price || el.amount || el.Mail || el.state}
                                    </td>

                                    <td className='border-b  border-gray-400 py-2'>{el.paymentAccount || el.id }</td>

                                    {el.Country ? <td className='border-b  border-gray-400 py-2'>{el.State +"/"+ el.Country }</td> 
                                    : el.arrayIdProducts ?
                                     <td className='border-b  border-gray-400 py-2'>
                                          <div className="flex flex-col justify-start items-start">
                                               {el.arrayIdProducts.map(el => <span>{el.productName} ({el.quantity})</span>)}</div>
                                                </td> : false}
                                    
                                    {el.cloudImage ? (
                                        <td className='border-b flex justify-center  border-gray-400 py-2'>
                                            <Image
                                                cloudName='cocomalls'
                                                publicId={
                                                    Array.isArray(el.cloudImage)
                                                        ? el.cloudImage[el.cloudImage.length - 1]
                                                        : el.cloudImage
                                                }
                                                width='200'
                                                alt={el.productName || 'false'}
                                                crop='scale'
                                            />
                                        </td>
                                    ) : (
                                        false
                                    )}
                                    {el.stock ? (
                                        <td className='border-b  border-gray-400 py-2'>
                                            {el.stock}
                                        </td>
                                    ) : (
                                        false
                                    )}
                                    {el.ProductTypeId ? (
                                        <td className='border-b  border-gray-400 py-2'>
                                            {types
                                                ? types.find((type) => type.id === el.ProductTypeId)
                                                      .Name
                                                : false}
                                        </td>
                                    ) : (
                                        false
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
