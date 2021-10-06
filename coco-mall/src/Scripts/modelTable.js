import React from 'react'


export default function ModelTable({ data }) {

    return (
        <div className='items-center text-center justify-center w-full' >

            <h1>Products</h1>
            <table>
                
                <thead>
                <th>A-Z/Z-A</th>
                        <th>Price</th>
                        <th>ProductType</th>
                        <th>Stock </th>
                        <th>More sell</th>
                </thead>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((el) => (
                        <tr>
                            <td>{el.productName}</td>
                            <td>{el.price}</td>
                            <td>{el.description}</td>
                            <td>{el.cloudImage}</td>
                            <td>{el.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
