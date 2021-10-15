import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputDefault from '../Inputs/InputDefault';
import InputFile from '../Inputs/InputFile';
import { IMG_DEFAULT } from '../../Scripts/constants';
import validate from '../../Scripts/validate';
import { PRODUCT_CREATE_URL, UPDATE_PRODUCT } from '../../Scripts/constants';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getStores } from '../../Redux/actions/stores';

const ProductsCreate = ({ idStore, product }) => {
    //STATES
    const [image, setImage] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [types, setTypes] = useState('');

    //--HOOKS--
    const dispatch = useDispatch();

    const allTypes = useSelector((state) => state.stores.productTypes);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: product });

    console.log(product)
    //LOAD IMAGE
    const handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
            setIsUploaded(true);
        };
    };

    const handleTypes = (e) => {
        setTypes(e.target.value);
    };

    //POST DATA PRODUCT & ID STORE
    const onSubmit = (data) => {
        let dataRawProduct = {
            productName: data.productName.charAt(0).toUpperCase() + data.productName.slice(1).toLowerCase(),
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            sellBy: data.sellBy || 'Cuantity',
            ProductTypeId: Number(types),
            cloudImage: [image]
        };
        let dataProductClean = {
            product: dataRawProduct,
            storeId: idStore,
            idImage: [image],
            typeId: types,
        };
        console.log(dataProductClean);
        if (product) {
            axios
                .put(`/product/update/${product.id}`, { product: dataRawProduct })
                .then(() => {
                    setTypes('');
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Updated!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'An error has occurred, contact an administrator.',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
        } else {
            axios
                .post('/product/create', dataProductClean)
                .then(() => {
                    dispatch(getStores());
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Created!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'An error has occurred, contact an administrator.',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
        }
    };

    //TODO get de categorias -> hacer input SELECT
    return (
        <>
         
            {/* --CONTAINER-- */}
            <div className='w-full flex h-full justify-center items-center m-auto px-10 lg:px-24 xl:p-0'>
                <form className='w-full xl:w-1/3 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='mb-12 sm:mb-10 text-2xl md:text-3xl'>
                        {product ? 'Edit your Product' : 'Create your Product'}
                    </h3>
                    <InputDefault
                        register={register}
                        errors={errors}
                        name='productName'
                        placeholder='Eg: T-Shirt'
                        validate={validate.product}
                    />
                    <InputDefault
                        register={register}
                        errors={errors}
                        name='description'
                        placeholder='Eg: Description of T-Shirt'
                        validate={validate.description}
                    />
                    <InputDefault
                        register={register}
                        errors={errors}
                        name='price'
                        placeholder='Eg: 1500'
                        type='number'
                        validate={validate.price}
                    />
                    <InputDefault
                        register={register}
                        errors={errors}
                        name='stock'
                        placeholder='Eg: 15'
                        type='number'
                    />
                    <div className='relative mb-4 items-start flex flex-col'>
                        <p className='min-w-max '>Type</p>
                        <select
                            name='types'
                            onChange={handleTypes}
                            required={true}
                            className='outline-none p-2 w-full rounded text-gray-500  text-sm border border-gray-200'
                        >
                            <option defaultValue='SelectType' selected='SelectType' disabled={true}>
                                {product
                                    ? allTypes?.find((el) => el.id === product.ProductTypeId).Name
                                    : 'Select Type'}
                            </option>
                            {allTypes?.map((type) => {
                                return (
                                    <option key={type.id} value={type.id}>
                                        {type.Name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <InputFile
                        register={register}
                        errors={errors}
                        name='image'
                        type='file'
                        validate={validate.image}
                        watch={watch}
                        onChange={handleImageChange}
                    />
                    <button
                        type='submit'
                        className='w-full bg-secondary rounded my-4 p-2 text-white'
                    >
                        Send
                    </button>
                </form>

                {/* --PREVIEW-- */}
                <div
                    className='flex flex-col flex-none relative h-full border border-gray-100     shadow-xl rounded py-8 ml-4 w-80 text-center content-center justify-center items-center
                                xl:block overflow-hidden'
                >
                    <div className="flex items-center justify-center content-center relative h-80 ">
                        <img className="self-center content-center align-middle text-center justify-self-center" src={isUploaded ? image : IMG_DEFAULT} alt='img' />

                    </div>
                    <p className='font-bold mt-5 text-2xl'>
                        {watch('productName') ? watch('productName').toUpperCase() : 'PRODUCT'}
                    </p>
                    <p className='mt-1'>
                        {watch('description') ? watch('description') : 'description'}
                    </p>
                    <p className='text-xl'>{watch('price') ? `$ ${watch('price')}` : '$0.00'}</p>
                </div>
            </div>
        {/* </div> */}
        </>
    );
};

export default ProductsCreate;
