import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { Image } from 'cloudinary-react';
import { modalOptions } from './swalFunction';
import { useState } from 'react';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProductsStore } from '../Redux/actions/stores';

export default function ModelTable({
    info,
    column_title,
    types,
    idStore,
    setEditState,
    setProduct,
}) {
    const [flag, setFlag] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsStore(idStore));
    }, [flag]);

    return (
        <div className='items-center text-center justify-center  w-full'>
            <div >
                <table className='items-center border-separate text-center justify-center w-full'>
                    <thead>
                        <tr>
                            {column_title.map((el) => (
                                <th key={el} className='border  border-gray-400 text-gray-800 py-2'>
                                    {el}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {info.length > 0 &&
                            info?.map((el) => (
                                <tr key={el}>
                                    <td className='  border text-center justify-center items-center border-gray-400 py-2'>
                                        <div className='flex justify-evenly cursor-pointer'>
                                            <FiSettings
                                                onClick={() => {
                                                    modalOptions(
                                                        el.id,
                                                        setEditState,
                                                        setFlag,
                                                        flag,
                                                        setProduct,
                                                        el,
                                                    );
                                                    setProduct(el);
                                                }}
                                            />
                                            {console.log(el.cloudImage)}
                                        </div>
                                    </td>
                                    <td className='border  border-gray-400 py-2'>
                                        {el.productName}
                                    </td>
                                    <td className='border  border-gray-400 py-2'>{el.price}</td>
                                    <td className='border  border-gray-400 py-2'>{el.id}</td>
                                    <td className='border flex justify-center  border-gray-400 py-2'>
                                        <Image
                                            cloudName='cocomalls'
                                            publicId={el.cloudImage[el.cloudImage.length -1]}
                                            width='200'
                                            alt={el.productName}
                                            crop='scale'
                                        />
                                        
                                    </td>
                                    <td className='border  border-gray-400 py-2'>{el.stock}</td>
                                    <td className='border  border-gray-400 py-2'>
                                        {types
                                            ? types.find((type) => type.id === el.ProductTypeId)
                                                  .Name
                                            : false}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
