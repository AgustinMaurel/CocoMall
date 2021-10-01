import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Components/Inputs/Input';

const IMG_DEFAULT =
    'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png';

const validate = {
    product: {
        required: { value: true, message: 'product is required' },
        minLength: {
            value: 2,
            message: 'product must contain at least 2 characters',
        },
        maxLength: {
            value: 16,
            message: 'product must contain a maximum of 16 characters ',
        },
    },
    description: {
        required: { value: true, message: 'description is required' },
        minLength: {
            value: 2,
            message: 'description must contain at least 2 characters',
        },
        maxLength: {
            value: 40,
            message: 'description must contain a maximum of 40 characters ',
        },
    },
    price: {
        required: { value: true, message: 'description is required' },
        min: {
            value: 1,
            message: 'price min',
        },
        max: {
            value: 9999999999,
            message: 'price maximum',
        },
    },
    image: { required: true },
};

const ProductsCreate = () => {
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    //const [typeFile, setTypeFile] = useState("");

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          //setTypeFile(e.target.files[0].type);
          let reader = new FileReader();
    
          reader.onload = (e) => {
            setImage(e.target.result);
            setIsUploaded(true);
          };
    
          reader.readAsDataURL(e.target.files[0]);
        }
      }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    console.log(watch('image'));

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
                        validate={validate.product}
                    />
                    <Input
                        register={register}
                        errors={errors}
                        name='description'
                        msg='This field is required'
                        validate={validate.description}
                    />
                    <Input
                        register={register}
                        errors={errors}
                        name='price'
                        msg='This field is required'
                        type='number'
                        validate={validate.price}
                    />
                    <Input
                        register={register}
                        errors={errors}
                        name='image'
                        msg='This field is required'
                        type='file'
                        validate={validate.image}
                        onChange={handleImageChange}
                    />
                    <div className='flex items-center justify-between'>
                        <input
                            className='bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            type='submit'
                        />
                    </div>
                </form>
                <div className='border bg-white shadow-md rounded p-8 m-4 w-1/3 text-center'>
                    <img src={isUploaded ? image : IMG_DEFAULT} alt='img' />
                    <p className='font-bold mt-5 text-2xl'>
                        {watch('name') ? watch('name').toUpperCase() : 'NAME'}
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
