import React from 'react';
import Product from './Product';
import ProductDetail from './ProductDetail';
import {useDispatch, useSelector} from 'react-redux'
import {getProductDetail} from '../../Redux/actions/stores'
import ReactModal from 'react-modal';
import {addToCartSomo} from '../../Redux/actions/shoppingActions';

ReactModal.setAppElement('#root');
function SubCat({ SubCatName, Products, modalIsOpen, setModalIsOpen }) {
    const dispatch = useDispatch();
        //Despues se va a usar el estado de storeProductsFilter.allSubCat para renderizar los nombres de las categorias
    const {productDetail, productSubCat} = useSelector((state) => state.stores)
    const modalFuncion = (id) => {
        dispatch(getProductDetail(id));
        setModalIsOpen(true);
    };
    
    return (
        <div className='flex flex-wrap'>
            {productSubCat.map((cat) => {
                if (cat.id === parseInt(SubCatName)) {
                    return <h3 className='w-24 mt-4 ml-4 font-semibold leading-tight text-cocoMall-300'>{cat.Name}</h3>;
                }
            })}
            {Products?.map((product) => {
                return (
                    <div onClick={() => modalFuncion(product.id)} className='bk-red'>
                        <Product product={product} />
                    </div>
                );
            })}
            <div>
            {productDetail.id ? (
                        <ReactModal
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                                },
                            }}
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            className='rounded-md focus:outline-none bg-white shadow-lg p-4 absolute w-3/6 h-3/6 top-0 bottom-0 right-0 left-0 m-auto'
                        >
                            <ProductDetail
                                product={productDetail}
                                addToCart={() => addToCartSomo(uid, productDetail.id, que, cant)}
                            />
                        </ReactModal>
                    ) : (
                        false
                    )}
            </div>
        </div>
    );
}

export default SubCat;
