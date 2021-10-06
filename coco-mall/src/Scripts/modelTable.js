import React from 'react'
import { GrSettingsOption } from 'react-icons/gr'

export default function ModelTable( {info , title, filters, column_title} ) {
    console.log(info)
    return (
        
        <div className='items-center text-center justify-center w-full' >

            <h1 className='text-center items-center '>{title}</h1>
            <ul className=' flex text-center justify-evenly items-center h-32 '>
            {filters.map((el)=>(
                   <li className='border  border-gray-400 rounded-md px-5'>{el}</li>
                   ))}
            </ul>
            <table className='items-center text-center justify-center w-full'>
                
                
                <thead>
                    <tr>
                    {column_title.map((el)=>(
                          <th className='border  border-gray-400 text-gray-800 py-2'>{el}</th>
                          ))}
                    </tr>
                </thead>
                <tbody> 
                    {info?.map((el) => (
                        <tr>
                            <td className='border text-center justify-center items-center border-gray-400 py-2'><div className='flex justify-center'>
                            <GrSettingsOption className="place-self-center"/>
                                </div></td>
                            <td className='border  border-gray-400 py-2'>{el.productName}</td>
                            <td className='border  border-gray-400 py-2'>{el.price}</td>
                            <td className='border  border-gray-400 py-2'>{el.description}</td>
                            <td className='border   border-gray-400 py-2'>{el.cloudImage}</td>
                            <td className='border   border-gray-400 py-2'>{el.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
