import React from 'react';
import Product from './Product';
import ProductDetail from './ProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../Redux/actions/stores';
import ReactModal from 'react-modal';
import { addToCartSomo, cartDeleteSomo } from '../../Redux/actions/shoppingActions';

ReactModal.setAppElement('#root');

function SubCat({ SubCatName, Products, modalIsOpen, setModalIsOpen }) {
    const dispatch = useDispatch();
    //Despues se va a usar el estado de storeProductsFilter.allSubCat para renderizar los nombres de las categorias
    const { productDetail, productSubCat } = useSelector((state) => state.stores);
    const modalFuncion = (id) => {
        dispatch(getProductDetail(id));
        setModalIsOpen(true);
    };
    const { uid } = useSelector((state) => state.auth);

    const que = '+';
    const cant = 1;
    
    return (
        <div className='flex flex-col'>
            <div>
                {productSubCat.map((cat) => {
                    if (cat.id === parseInt(SubCatName)) {
                        return (
                            <h3 className='w-24 mt-4 ml-4 font-semibold leading-tight text-cocoMall-300'>
                                {cat.Name}
                            </h3>
                        );
                    }
                })}
            </div>

            <div className='flex overflow-hidden hover:overflow-x-auto'>
                {Products?.map((product) => (
                    <div onClick={() => modalFuncion(product.id)}>
                        <Product product={product} />
                    </div>
                ))}
            </div>

            <div>
                {productDetail.id ? (
                    <ReactModal
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            },
                            content: {
                                overflowY: "auto"
                            }
                        }}
                        contentLabel={"Product Detail"}
                        preventScroll={false}
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        className='rounded-md focus:outline-none bg-gray-100 shadow-lg p-4 absolute w-3/5 h-4/5 top-20 bottom-0 right-0 left-0 m-auto'
                    >
                        <ProductDetail product={productDetail} setModalIsOpen={setModalIsOpen} />
                    </ReactModal>
                ) : (
                    false
                )}
            </div>
        </div>
    );
}

export default SubCat;
