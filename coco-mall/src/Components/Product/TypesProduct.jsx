import React from 'react';
import SubCat from './SubCat';
import { useSelector } from 'react-redux';

function TypesProduct({ typeName, SubCategories, modalIsOpen, setModalIsOpen }) {
    const { productTypes } = useSelector((state) => state.stores);
    let keysSubCat = Object.keys(SubCategories);
    let keysNum = keysSubCat.filter((key) => parseInt(key));

    return (
        <div className='mt-5'>
            {productTypes.map((type) => {
                if (type.id === parseInt(typeName)) {
                    return (
                        <span className='w-24 mt-4 ml-4 font-semibold text-cocoMall-800'>
                            {type.Name.toUpperCase()}
                        </span>
                    );
                }
            })}
            {keysNum.length
                ? keysNum.map((k) => {
                      return (
                          <SubCat
                              SubCatName={k}
                              Products={SubCategories[k]}
                              modalIsOpen={modalIsOpen}
                              setModalIsOpen={setModalIsOpen}
                          />
                      );
                  })
                : null}
        </div>
    );
}

export default TypesProduct;
