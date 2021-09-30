import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Components/Inputs/Input';

const IMG_DEFAULT = 'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png'

const ProductsCreate = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => (
        console.log(data)
        );

    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen '>
            <div className='flex w-1/2 h-1/2'>
                <form
                    className='border bg-white shadow-md rounded p-8 m-4 w-1/2'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h3 className='text-3xl text-center'>Create Products</h3>
                    <Input
                        register={register}
                        errors={errors}
                        name='name'
                        msg='This field is required'
                    />
                    <Input
                        register={register}
                        errors={errors}
                        name='description'
                        msg='This field is required'
                    />
                    <Input
                        register={register}
                        errors={errors}
                        name='price'
                        msg='This field is required'
                        type='number'
                    />
                    <Input
                        register={register}
                        errors={errors}
                        name='image'
                        msg='This field is required'
                    />
                    <div className='flex items-center justify-between'>
                        <input
                            className='bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='submit'
                        />
                    </div>
                </form>
                <div className='border bg-white shadow-md rounded p-8 m-4 w-1/3 text-center'>
                    <img src={watch('image') ? watch('image') : IMG_DEFAULT} alt="img" />
                    <p className='font-bold mt-5 text-2xl'>{watch('name') ? watch('name').toUpperCase() : 'NAME'}</p>
                    <p className='mt-1'>{watch('description') ? watch('description') : 'description'}</p>
                    <p className='text-xl' >{watch('price') ? `$ ${watch('price')}` : '$0.00'}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductsCreate;
