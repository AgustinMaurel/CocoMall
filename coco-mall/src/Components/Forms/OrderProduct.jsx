import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import NavBar from '../NavBar/NavBar';
import { Image, Transformation } from 'cloudinary-react';
import { useHistory } from 'react-router-dom';
import { userInfo } from '../../Redux/actions/auth';
import axios from 'axios';
import Autocomplete from 'react-google-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../../Scripts/constants.js';
import Address from '../Cards/Address';
import InputMaps from '../Inputs/InputMaps';
import ReactModal from 'react-modal';

const OrderProduct = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [addressStatus, setAddressStatus] = useState(false);
    const [placeSelected, setPlaceSelected] = useState({});
    const { userCart, uid, userInfoDB } = useSelector((state) => state.auth);
    const { allStores } = useSelector((state) => state.stores);
    const [link, setLink] = useState('');

    const [addressSelect, setAddressSelect] = useState({
        address: '',
        cords: {},
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: 'onTouched' });

    let itemsCart;
    if (userCart.length) {
        let itemsQuantity = userCart?.map((item) => item.quantity);
        itemsCart = itemsQuantity.reduce((a, b) => a + b);
    }

    let total =
        userCart.length > 0 &&
        Object.values(userCart).reduce((previous, key) => previous + key.price * key.quantity, 0);

    let items = userCart.length > 0 && userCart.map((el) => el.productName);

    let objectToCheckout = {
        title: (items && items.join(', ')) || 'cart products',
        total: (total && total) || 1,
        quantity: 1,
    };

    useEffect(() => {
        axios
            .post('/checkout/mercadopago', objectToCheckout)
            .then((order) => {
                setLink(order.data.init_points);
            })
            .catch((err) => console.log(err));
    }, []);

    const storeOrders = userCart.reduce((accArr, value) => {
        if (accArr.indexOf(value.StoreId) < 0) {
            accArr.push(value.StoreId);
        }
        return accArr;
    }, []);

    userCart.sort((a, b) => {
        if (a.StoreId > b.StoreId) return 1;
        if (a.StoreId < b.StoreId) return -1;
        return 0;
    });

    const postAddressCreate = () => {
        const obj = {
            id: uid,
            directions: placeSelected.name,
            cords: placeSelected.coord,
        };
        axios.post(`/address/create`, obj).then(()=> {
            dispatch(userInfo(uid));
        })
    };
    const onSubmit = () => {
        postAddressCreate();
    };

    const userAddress = userInfoDB?.Addresses;
    const userAddressFunc = (i) => {
        if (!i && userAddress?.length) {
            setAddressSelect((prevData) => {
                const state = {
                    ...prevData,
                };
                state.address = userAddress[0].directions;
                state.cords = userAddress[0].cords;
                return state;
            });
        } else {
            if (i && userAddress?.length) {
                setAddressSelect((prevData) => {
                    const state = {
                        ...prevData,
                    };
                    state.address = userAddress[i].directions;
                    state.cords = userAddress[i].cords;
                    return state;
                });
            }
        }
    };

    //tengo que tener 2 useEffect porque sino rompe

    useEffect(() => {
        userAddressFunc();
    }, [userAddress?.length, addressStatus]);

    //revisar useEffect porque rompio
    useEffect(() => {
        dispatch(userInfo(uid));
    }, [uid, userCart.length, addressStatus]);

    //uid, userInfoDB.length, modalIsOpen

    const postOrder = () => {
        for (let storeId of storeOrders) {
            let totalStore = userCart
                .filter((filterStore) => filterStore.StoreId === storeId)
                .reduce((previous, key) => previous + key.price * key.quantity, 0);
            let storeProducts = userCart.map((product) => {
                return {
                    id: product.id,
                    quantity: product.quantity,
                };
            });
            const obj = {
                userId: uid,
                storeId: storeId,
                address: addressSelect.address,
                cords: addressSelect.cords,
                amount: totalStore,
                orderState: 'Success',
                arrayIdProducts: storeProducts,
            };
            console.log(obj, 'obj al back');
            axios.post('/order/create', obj);
        }
    };

    const handleSubmitOrder = () => {
        postOrder();
    };

    return (
        <div className=' xl:w-screen bg-gray-200  '>
            <div className=' sticky bg-white shadow top-0 z-20'>
                <NavBar />
            </div>

            {/* BANNER */}
            <div className='  relative z-10 h-20 flex flex-col  items-center text-white justify-center content-center mx-auto w-full bg-cocoMall-200 overflow-hidden '>
                <h3 className='text-5xl z-10 font-extrabold text-white'>MY ORDER</h3>
                <div className='absolute h-36 w-36 lg:h-64 lg:w-64  rounded-full bg-primary bottom-0 right-10 z-0'></div>
                <div className='absolute h-36 w-36  lg:h-64 lg:w-64 rounded-full bg-primary top-0 left-0 z-0'></div>
                <div className='absolute md:h-10 md:w-10  rounded-full bg-primary  md:left-96 z-0'></div>
            </div>

            <div className='flex  justify-center   bg-gray-200   2xl:px-20 '>
                <div className='flex flex-col xl:flex-row relative py-2  w-full h-full items-center align-center content-center justify-evenly rounded lg:gap-16   xl:pb-10 '>
                    <div
                        className='flex flex-col w-6/6 xl:w-4/6
                     bg-gray-200 h-full xl:flex-none relative   gap-10  py-5 justify-start m-auto'
                    >
                        <div className='flex flex-col  justify-start bg-gray-200'>
                            <h2 className='font-bold text-cocoMall-800 text-lg md:text-2xl'>
                                Shipping options to
                            </h2>
                            <div className=' flex flex-col gap-4 relative h-full w-full '>
                                {addressSelect?.address ? (
                                    <span className='text-cocoMall-800 text-lg md:text-xl'>
                                        {addressSelect.address}
                                    </span>
                                ) : (
                                    <>
                                        <div className='w-4/5 flex flex-col 2xl:w-3/5'>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className='relative my-4'>
                                                    <Autocomplete
                                                        className={
                                                            'outline-none p-2 w-full rounded text-gray-500  text-sm border border-gray-200'
                                                        }
                                                        apiKey={GOOGLE_MAPS_API_KEY}
                                                        onPlaceSelected={(place) => {
                                                            setPlaceSelected({
                                                                place: place,
                                                                name: place.name,
                                                                address: place.formatted_address,
                                                                state: place.address_components[4]
                                                                    ?.long_name,
                                                                country:
                                                                    place.address_components[5]
                                                                        ?.long_name,
                                                                cp:
                                                                    place.address_components[6]
                                                                        ?.long_name || 'C3100',
                                                                coord: {
                                                                    lat: place.geometry.location.lat(),
                                                                    lng: place.geometry.location.lng(),
                                                                },
                                                            });
                                                        }}
                                                        options={{
                                                            fields: [
                                                                'name',
                                                                'address_component',
                                                                'adr_address',
                                                                'formatted_address',
                                                                'geometry',
                                                            ],
                                                            types: ['address'],
                                                            // componentRestrictions: { country: 'ar' },
                                                        }}
                                                        placeholder='Eg: Av. Belgrano 3200'
                                                    />
                                                    <div>
                                                        <div className='flex align-center items-center  gap-2 content-center justify-center absolute -top-6 left-0'>
                                                            <p className='min-w-max'> Address</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='h-36 mb-8'>
                                                    <InputMaps coord={placeSelected.coord} />
                                                </div>
                                                <button
                                                    type='submit'
                                                    onClick={() => setAddressStatus(!addressStatus)}
                                                >
                                                    Crear direccion
                                                </button>
                                            </form>
                                        </div>
                                    </>
                                )}
                                <div>
                                    <button
                                        className=' focus:outline-none text-center text-xs font-bold text-gray-400 
                                        sm:text-sm        
                                        xl:text-md'
                                        onClick={() => setModalIsOpen(true)}
                                    >
                                        Edit or choose another
                                    </button>
                                </div>
                            </div>
                        </div>
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
                            <Address
                                address={userAddress}
                                placeSelected={placeSelected}
                                setPlaceSelected={setPlaceSelected}
                                onSubmit={onSubmit}
                                setAddressSelect={setAddressSelect}
                                userAddressFunc={userAddressFunc}
                            />
                        </ReactModal>

                        <div className='flex flex-col w-full m-auto bg-blue-500'>
                            {userCart.length
                                ? storeOrders.map((storeOrders, index) => {
                                      return (
                                          <div className='bg-gray-200 w-full  '>
                                              <h2 className='font-bold text-cocoMall-800 text-lg md:text-2xl'>
                                                  {allStores[index].storeName}
                                              </h2>
                                              <div className='xl:w-6/6 xl:flex  bg-gray-200  xl:flex-col xl:items-center xl:justify-evenly   '>
                                                  {userCart.map((item) => {
                                                      if (item.StoreId === storeOrders) {
                                                          return (
                                                              <div
                                                                  key={item.id}
                                                                  className=' bg-white  mt-5 xl:mt-10   flex flex-col shadow   h-56 xl:h-60 xl:flex-none relative  '
                                                              >
                                                                  <div className='flex flex-row  h-full items-center xl:flex-none relative  px-5 gap-10  py-5'>
                                                                      <div className=' flex  justify-self-start items-center flex-none w-2/4 h-full '>
                                                                          <Image
                                                                              publicId={
                                                                                  item.cloudImage[0]
                                                                              }
                                                                              cloudName='cocomalls'
                                                                          >
                                                                              <Transformation
                                                                                  gravity='auto'
                                                                                  height='180'
                                                                                  width='200'
                                                                                  crop='fill'
                                                                              />
                                                                          </Image>
                                                                      </div>
                                                                      <div className=' flex flex-col gap-2 flex-none   h-full  pr-2 '>
                                                                          <h4 className='font-bold text-cocoMall-800 text-lg md:text-xl'>
                                                                              {item.productName}
                                                                          </h4>
                                                                          <div className=' h-full  w-full flex-col items-between justify-between'>
                                                                              <p className='h-5/6  w-full text-sm md:text-base text-gray-500 font-light '>
                                                                                  Quantity:{' '}
                                                                                  {item.quantity}
                                                                              </p>
                                                                              <p className='h-5/6  w-full text-sm md:text-base text-gray-500 font-light '>
                                                                                  Price:{' '}
                                                                                  {item.price}
                                                                              </p>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          );
                                                      }
                                                  })}
                                              </div>
                                          </div>
                                      );
                                  })
                                : false}
                        </div>
                    </div>

                    <div className='w-full xl:w-2/6 xl:flex-none py-10 flex flex-col gap-5 bg-gray-200'>
                        <div className='flex flex-col gap-5 px-2'>
                            <div className='flex flex-col  gap-1'>
                                <h2 className='text-gray-600 font-bold text-2xl'>
                                    Purchase summary
                                </h2>
                                <hr className='border-1 border-gray-300' />
                            </div>
                            <h4 className='text-gray-600 font-bold text-lg'>
                                Products({itemsCart})
                            </h4>
                            <span className='text-gray-600 font-bold text-lg'>Price: {total}</span>
                            <span className='text-gray-600 font-bold text-lg'>
                                Total price: {total}
                            </span>
                        </div>
                        <div className='shadow-lg flex items-center justify-center bg-white   border-primary  text-primary  h-12 xl:border-none xl:shadow-none xl:bg-secondary-light xl:h-12 xl:mt-10 '>
                            <a
                                href={link}
                                target='_blank'
                                onClick={() => handleSubmitOrder()}
                                className=' focus:outline-none max-h-full flex iltems-center justify-center content-center   text-lg font-bold w-full       sm:text-xl xl:text-primary xl:text-xl'
                            >
                                Go To Checkout
                            </a>
                        </div>
                        <div className=' flex items-center justify-center '>
                            <button
                                onClick={() => history.goBack()}
                                className=' focus:outline-none text-center text-xs font-bold w-full h-full text-gray-400 
                                        sm:text-sm        
                                            xl:text-md'
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
