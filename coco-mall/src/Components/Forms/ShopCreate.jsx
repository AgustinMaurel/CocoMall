import React, {  useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputDefault from '../Inputs/InputDefault';
import validate from '../../Scripts/validate';
import {useSelector} from 'react-redux'

function ShopCreate({ isTrue, setIsTrue }) {
    //Hacer un useSelector para tomar el id del usuario y asi linkearlo con la tienda que cree
    const auth = useSelector(state => state.auth)
    const userId = auth.uid

    console.log(userId)

    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        watch,
    } = useForm();

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleRegister = (data) => {
     
        if (!selectedFile) return;
        setIsTrue(false);
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            sendData(reader.result, data);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    const sendData = async (base64EncodedImage, info) => {
        let data = {
            idImage: base64EncodedImage,
            store: info,
            idUser: userId
        };

        

        console.log(data);
        try {
            await axios.post('http://localhost:3001/store/create', data).then(() => {
                setValue('storeName', '');
                setValue('address', '');
                setValue('country', '');
                setValue('cp', '');
                setValue('description', '');
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col text-center  h-screen py-3 overflow-hidden relative'>
            <form
                className='flex flex-col w-96  h-3/4 my-auto relative mx-auto '
                onSubmit={handleSubmit(handleRegister)}
            >
                <div className='relaitve    flex flex-col h-full justify-evenly   '>
                    <i>Create Store</i>

                    <InputDefault
                        register={register}
                        errors={errors}
                        name='storeName'
                        placeholder='Eg: Chilli King'
                        validate={validate.storeName}
                        watch={watch}
                    />
                    <InputDefault
                        register={register}
                        errors={errors}
                        name='country'
                        placeholder='Eg: Argentina'
                        validate={validate.country}
                        watch={watch}
                    />

                    <InputDefault
                        register={register}
                        errors={errors}
                        name='state'
                        placeholder='Eg: Buenos Aires'
                        validate={validate.state}
                        watch={watch}
                    />

                    <InputDefault
                        register={register}
                        errors={errors}
                        name='address'
                        placeholder='Eg: Nuñez 3800'
                        validate={validate.address}
                        watch={watch}
                    />

                    <div className='relative'>
                        <input
                            {...register('cp', {
                                required: { value: true, message: 'Area Code is required' },
                                minLength: {
                                    value: 4,
                                    message: 'Area Code must contain at least 4 numbers',
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Area Code must contain a maximum of 15 numbers ',
                                },
                                pattern: {
                                    value: /^\d+$/gm,
                                    message: 'Wrong postal code',
                                },
                            })}
                            type='text'
                            placeholder='Eg: 1430'
                            name='cp'
                            autoComplete='off'
                            className={
                                errors.cp
                                    ? 'outline-none p-2 w-full rounded text-sm border border-red-200'
                                    : 'outline-none p-2 w-full rounded text-sm border border-gray-200'
                            }
                        />
                        {errors.cp ? (
                            <p className='absolute text-xs text-red-500 -top-4 left-0 font-semibold'>
                                {errors.cp.message}
                            </p>
                        ) : (
                            <p className='absolute text-xs  min-w-max  -top-4 left-0 font-semibold'>
                                Area Code*
                            </p>
                        )}
                    </div>

                    <div className='relative'>
                        <textarea
                            {...register('description', {
                                required: { value: true, message: 'Description is required' },
                                minLength: {
                                    value: 4,
                                    message: 'Description must contain at least 4 characters',
                                },
                                maxLength: {
                                    value: 255,
                                    message:
                                        'Description must contain a maximum of 255 characters ',
                                },
                            })}
                            placeholder='Vegan food shop...'
                            name='description'
                            autoComplete='off'
                            className={
                                errors.description
                                    ? 'border border-red-200 resize-none outline-none p-2 w-full rounded text-sm'
                                    : 'resize-none outline-none p-2 w-full rounded text-sm border border-gray-200'
                            }
                        />
                        {errors.description ? (
                            <p className='absolute text-xs text-red-500 -top-4 left-0 font-semibold'>
                                {errors.description.message}
                            </p>
                        ) : (
                            <p className='absolute text-xs  min-w-max  -top-4 left-0 font-semibold'>
                                Description*
                            </p>
                        )}
                    </div>

                    <div className='relative'>
                        <input
                            // {...register('image')}
                            type='file'
                            name='image'
                            value={fileInputState}
                            onChange={handleFileInputChange}
                            className='outline-none p-2 w-full rounded'
                            id='selectedFile'
                            accept='.png'
                            style={{ display: 'none' }}
                        />
                        <input
                            type='button'
                            value='Select Logo'
                            onClick={() => document.getElementById('selectedFile').click()}
                            className={
                                // errors.image
                                //     ? 'border border-red-200 bg-white text-gray-400 outline-none p-2 w-full rounded cursor-pointer' :
                                'border border-gray-200 bg-white text-gray-400 outline-none p-2 w-full rounded cursor-pointer'
                            }
                        />
                        {/* {errors.image ? (
                            <p className='absolute text-xs text-red-500 -top-4 left-0 font-semibold'>
                                {errors.image.message}
                            </p>
                        ) : watch('image')?.length > 0 ? (
                            <div>
                                <div className='flex align-center items-center  gap-2 content-center justify-center absolute -top-4 left-0'>
                                    <p className=' text-xs  min-w-max  font-semibold '>Logo</p>
                                    <div>
                                        <svg
                                            className='w-3 h-3 rounded-full bg-green-400'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M5 13l4 4L19 7'
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className='absolute text-xs  min-w-max  -top-4 left-0 font-semibold'>
                                Logo*
                            </p>
                        )} */}
                    </div>

                    <button type='submit' className='bg-secondary w-32 rounded h-8 text-white'>
                        Next
                    </button>
                </div>
            </form>
            {previewSource && <img src={previewSource} alt='chosen' style={{ height: '300px' }} />}
        </div>
    );
}

export default ShopCreate;
// {/* <div
//             className='h-20 w-20 bg-primary-light rounded-full absolute z-0 left-12 -top-10
//             xl:h-28 xl:w-28 xl:left-52 xl:top-32'
//         ></div>
//         <div
//             className='h-40 w-40 bg-primary-light rounded-full absolute z-0 -left-12 -bottom-12
//             xl:h-28 xl:w-28 xl:left-52 xl:top-32'
//         ></div>
//         <div
//             className='h-52 w-52 bg-primary-light rounded-full absolute z-0 -right-12 top-40
//             xl:h-28 xl:w-28 xl:left-52 xl:top-32'
//         ></div> */}
