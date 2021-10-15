import React from 'react'
import SubCat from './SubCat';

function TypesProduct({ typeName, SubCategories }) {
    // console.log(typeName)
    // console.log(SubCategories)
    let keysSubCat = Object.keys(SubCategories)
    let keysNum = keysSubCat.filter((key)=> parseInt(key))
    return (
                <div>
                    <h3>{typeName}</h3>
                    {keysNum.length ? 
                    keysNum.map((k)=> {
                        return <SubCat SubCatName={k} Products={SubCategories[k]} />
                    })
                    : null
                }
                </div>
    )
}

export default TypesProduct
