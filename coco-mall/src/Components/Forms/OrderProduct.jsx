import React from 'react';
import { useForm } from 'react-hook-form';

import validate from '../../Scripts/validate';
import InputDefault from '../Inputs/InputDefault';

const OrderProduct = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: 'onTouched' });

    const onSubmit = (data) => console.log(data);

    /*
      hacer un post con esta data:
        {
            "userId":"1",
            "storeId":"29af68ca-2a6e-45b1-8934-93107beca099",
            "address":"La esquina de Gloria",
            "cords":{"altura": 132132, "latitud":13132},
            "amount":100,
            "orderState":"Success"
        }    
    */

    return (
        <div className='w-full flex justify-center items-center m-auto px-10 lg:px-24 xl:p-0'>
            <form className='w-full xl:w-1/3 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <h3 className='mb-12 sm:mb-10 text-2xl md:text-3xl'>
                    Order Product
                </h3>
                <InputDefault
                    register={register}
                    errors={errors}
                    name='productName'
                    placeholder='Eg: T-Shirt'
                    validate={validate.product}
                />
            </form>
        </div>
    );
};

export default OrderProduct;
