import React from 'react'

function FilterTypeProduct({type, index, handleChecked, check}) {
    return (
        <div>
            <label>{type?.Name}</label>
            <input 
                type='checkbox'
                name={type?.id}
                value={type?.id}
                onChange={(e)=> handleChecked(e, index)}
                checked={check[index]}
            />
        </div>
    )
}

export default FilterTypeProduct
