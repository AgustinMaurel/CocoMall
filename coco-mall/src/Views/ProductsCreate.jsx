import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputDefault from '../Components/Inputs/InputDefault';
import InputFile from '../Components/Inputs/InputFile';
import validate from '../Scripts/validate';

const IMG_DEFAULT =
    'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png';



const ProductsCreate = () => {
    const [image, setImage] = useState('');
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

    const onSubmit = (data) => {
        console.log(data)

    };

    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen '>
            <div className='flex w-1/2 h-1/2'>
                <form
                    className='border bg-white shadow-md rounded p-8 m-4 w-1/2'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h3 className='text-3xl text-center'>Create Products</h3>
                    <InputDefault
                        register={register}
                        errors={errors}
                        name='product'
                        validate={validate.product}
                    />
                    <InputDefault
                        register={register}
                        errors={errors}
                        name='description'
                        validate={validate.description}
                    />
                    <InputDefault
                        register={register}
                        errors={errors}
                        name='price'
                        type='number'
                        validate={validate.price}
                    />
                    <InputFile
                        register={register}
                        errors={errors}
                        name='image'
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
                        {watch('product') ? watch('product').toUpperCase() : 'PRODUCT'}
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
