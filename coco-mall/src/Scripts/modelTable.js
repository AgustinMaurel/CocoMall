import React from 'react'
import { GrSettingsOption, GrAdd } from 'react-icons/gr'
import { modalOptions } from './swalFunction'
import { useState } from 'react'
import ProductsCreate from '../Components/Forms/ProductsCreate'


export default function ModelTable({ info, title, filters, column_title, types, idStore }) {
    const [render, setRender] = useState(false)


    return (

        <div className='items-center text-center justify-center w-full' >

            <h1 className='text-center items-center '>{title}</h1>
            <ul className=' flex text-center justify-evenly items-center h-32 '>
                {filters.map((el) => (
                    <li key={el} className='border bg-secondary-light border-gray-200 rounded-md px-5'>{el}</li>
                ))}
                <li onClick={() => !render ? setRender(true) : setRender(false)} className='border bg-secondary-light border-gray-200 rounded-md px-5 py-1'><GrAdd /></li>
            </ul>
            {render ? <ProductsCreate idStore={idStore} /> : <table className='items-center border-separate text-center justify-center w-full'>


                <thead>
                    <tr>
                        {column_title.map((el) => (
                            <th key={el} className='border  border-gray-400 text-gray-800 py-2'>{el}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {info?.map((el) => (
                        <tr key={el}>
                            <td className='  border text-center justify-center items-center border-gray-400 py-2'>
                                <div className='flex justify-center'>
                                    <GrSettingsOption className='self-center cursor-pointer'
                                        onClick={() => {
                                            modalOptions(el.id)
                                        }} />
                                </div>
                            </td>
                            <td className='border  border-gray-400 py-2'>{el.productName}</td>
                            <td className='border  border-gray-400 py-2'>{el.price}</td>
                            <td className='border  border-gray-400 py-2'>{el.id}</td>
                            <td className='border  border-gray-400 py-2'>{el.cloudImage}</td>
                            <td className='border  border-gray-400 py-2'>{el.stock}</td>
                            <td className='border  border-gray-400 py-2'>{types ? types.find((type) => type.id === el.ProductTypeId).Name : false}</td>

                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    )

}
