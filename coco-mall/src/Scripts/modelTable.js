import React from 'react'
import { GrSettingsOption } from 'react-icons/gr'
import Swal from 'sweetalert2'

export default function ModelTable( {info , title, filters, column_title} ) {
    console.log(info)
    return (
        
        <div className='items-center text-center justify-center w-full' >

            <h1 className='text-center items-center '>{title}</h1>
            <ul className=' flex text-center justify-evenly items-center h-32 '>
            {filters.map((el)=>(
                   <li key={el} className='border bg-secondary-light border-gray-200 rounded-md px-5'>{el}</li>
                   ))}
            </ul>
            <table className='items-center border-separate text-center justify-center w-full'>
                
                
                <thead>
                    <tr>
                    {column_title.map((el)=>(
                          <th key={el} className='border  border-gray-400 text-gray-800 py-2'>{el}</th>
                          ))}
                    </tr>
                </thead>
                <tbody> 
                    {info?.map((el) => (
                        <tr key={el}>
                            <td className='border text-center justify-center items-center border-gray-400 py-2'><div className='flex justify-center'>
                            <button onClick={()=>Swal.fire({
                                title:'what would you want to do'
                            })}><GrSettingsOption/></button>
                                </div></td>
                            <td className='border  border-gray-400 py-2'>{el.productName}</td>
                            <td className='border  border-gray-400 py-2'>{el.price}</td>
                            <td className='border  border-gray-400 py-2'>{el.id}</td>
                            <td className='border  border-gray-400 py-2'>{el.cloudImage}</td>
                            <td className='border  border-gray-400 py-2'>{el.stock}</td>
                            <td className='border  border-gray-400 py-2'>{el.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}
