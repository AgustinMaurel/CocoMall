import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputDefault from '../Inputs/InputDefault';
import InputFile from '../Inputs/InputFile';
import { IMG_DEFAULT } from '../../Scripts/constants';
import validate from '../../Scripts/validate';
import { PRODUCT_CREATE_URL, UPDATE_PRODUCT } from '../../Scripts/constants';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getStores } from '../../Redux/actions/stores';

const ProductsCreate = ({ idStore, product }) => {
    //STATES
    const [image, setImage] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [types, setTypes] = useState('');
    const [subCategories, setSubCategories] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: product });

    useEffect(async () => {
        let subCategory = await axios.get(`/subCategory/match/${watch('subCategory')}`);
        if (subCategory?.data) {
            setSubCategories(subCategory);
        }
    }, [watch('subCategory')]);

    //--HOOKS--
    const dispatch = useDispatch();

    const allTypes = useSelector((state) => state.stores.productTypes);

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
            productName:
                data.productName.charAt(0).toUpperCase() + data.productName.slice(1).toLowerCase(),
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            sellBy: data.sellBy || 'Cuantity',
        };
        let dataProductClean = {
            product: dataRawProduct,
            storeId: idStore,
            idImage: [image],
            typeId: types,
            subCat: data.subCategory
                ? data.subCategory.charAt(0).toUpperCase() + data.subCategory.slice(1).toLowerCase()
                : 'Others',
        };
        console.log(dataProductClean);
        if (product) {
            axios
                .put(`/product/update/${product.id}`, dataProductClean)
                .then(() => {
                    setTypes('');
                    dispatch(getAllProducts());
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
                    dispatch(getAllProducts());
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
        <div className='w-full flex justify-center items-center m-auto'>
            {/* --CONTAINER-- */}
            <div className='w-full flex justify-center items-center m-auto px-10 lg:px-24 xl:p-0'>
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
                    <InputDefault
                        register={register}
                        errors={errors}
                        name='subCategory'
                        placeholder='Eg: T-shirt'
                        type='text'
                        validate={validate.subCategory}
                    />
                    {console.log(subCategories?.data)}
                    <div className='flex flex-row justify-center items-center text-base text-cocoMall-300 mb-8'>
                    {subCategories?.data?.length
                        ? subCategories?.data?.map((subCat) => {
                              return (
                              <span className='ml-4'>{subCat.Name}</span>
                              );
                            })
                            : false}
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
                    className='hidden bg-white shadow-md rounded py-8 ml-4 w-80 text-center
                                xl:block overflow-hidden'
                >
                    <img src={isUploaded ? image : IMG_DEFAULT} alt='img' />
                    <p className='font-bold mt-5 text-2xl'>
                        {watch('productName') ? watch('productName').toUpperCase() : 'PRODUCT'}
                    </p>
                    <p className='mt-1'>
                        {watch('description') ? watch('description') : 'description'}
                    </p>
                    <p className='text-xl'>{watch('price') ? `$ ${watch('price')}` : '$0.00'}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductsCreate;
