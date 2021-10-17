import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import NavBar from '../NavBar/NavBar';
import { Image } from 'cloudinary-react';
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
    const [placeSelected, setPlaceSelected] = useState({});
    const { userCart, uid, userInfoDB } = useSelector((state) => state.auth);

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

    let objectToCheckout = {
        title: 'Cart Products',
        total: total,
        quantity: 1,
    };

    function handleCheckout() {
        return userCart.length > 0
            ? axios
                  .post('/checkout/mercadopago', objectToCheckout)
                  .then((order) => {
                      history.push(`/checkout/${order.data.response}`);
                  })
                  .catch((err) => console.log(err))
            : false;
    }

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
            address: placeSelected.name,
            cords: placeSelected.coord,
        };
        axios.post(`/address/create`, obj);
    };
    const onSubmit = (e) => {
        postAddressCreate();
        setModalIsOpen(false);
    };

    const userAddress = userInfoDB[0]?.Addresses;
    const userAddressFunc = (i) => {
        if (!i) {
            if (userAddress?.length) {
                setAddressSelect((prevData) => {
                    const state = {
                        ...prevData,
                    };
                    state.address = userAddress[0].address;
                    state.cords = userAddress[0].cords;
                    return state;
                });
            }
        } else {
            if (userAddress?.length) {
                setAddressSelect((prevData) => {
                    const state = {
                        ...prevData,
                    };
                    state.address = userAddress[i].address;
                    state.cords = userAddress[i].cords;
                    return state;
                });
            }
        }
    };
    //tengo que tener 2 useEffect porque sino rompe
    useEffect(() => {
        userAddressFunc()
    }, [userAddress?.length])

    useEffect(() => {
        dispatch(userInfo(uid));
        // userAddressFunc();
    }, [uid, modalIsOpen]);
    //uid, userInfoDB.length, modalIsOpen
    const handleSubmitOrder = () => {
        postOrder()
        handleCheckout()
    }
    const postOrder = () => {
        for (let storeId of storeOrders) {
            let totalStore = userCart
                .filter((filterStore) => filterStore.StoreId === storeId)
                .reduce((previous, key) => previous + key.price * key.quantity, 0);
            const obj = {
                userId: uid,
                storeId: storeId,
                address: addressSelect.address,
                cords: addressSelect.cords,
                amount: totalStore,
                orderState: 'Success',
            };
            axios.post('/order/create', obj);
        }
    };

    const addressModal = () => {
        setModalIsOpen(true);
        dispatch(userInfo(uid));
    };

    return (
        <div className='w-full flex flex-col justify-center items-center m-auto px-10 lg:px-24 xl:p-0'>
            
            <div className='w-full flex bg-gray-200 shadow mb-10'>
                <NavBar />
            </div>
            <div className='flex justify-center m-auto w-3/4 h-full'>
                <div
                    className='w-full flex flex-col justify-top items-center'
                >
                    <h3 className='mb-12 sm:mb-10 text-2xl md:text-3xl'>Order Product</h3>
                    <div>
                        <h4>Enviar a</h4>
                        <div>
                            {addressSelect?.address ? (
                                <span>{addressSelect.address}</span>
                            ) : (
                                <>
                                    <div className='w-4/5 flex flex-col 2xl:w-3/5'>
                                        <button onClick={() => userAddressFunc()}>Clickk</button>
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
                                            <button type='submit'>Crear direccion</button>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>
                        <button onClick={() => setModalIsOpen(true)}>Editar o elegir otro</button>
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

                    <div>
                        {userCart.length
                            ? userCart.map((item) => {
                                  //hacer que se divida por tiendas
                                  return (
                                      <div>
                                          <h3>{item.StoreId}</h3>
                                          <div className='flex'>
                                              <picture className='w-full h-1/3 rounded-md overflow-hidden'>
                                                  <Image
                                                      key={item.id}
                                                      cloudName='cocomalls'
                                                      publicId={item.cloudImage[0]}
                                                      width='150'
                                                      crop='scale'
                                                      className='object-cover h-44'
                                                  />
                                              </picture>
                                              <h4>{item.productName}</h4>
                                              <span>Quantity: {item.quantity}</span>
                                              <span>Price: {item.price}</span>
                                          </div>
                                      </div>
                                  );
                              })
                            : false}
                    </div>
                    <button onClick={() => handleSubmitOrder()}>
                        Continuar lleva a elegir metodo de pago
                    </button>
                </div>

                <div className='bg-gray-300 h-screen flex flex-col justify-top items-center -mt-10'>
                    <h2>Resumen de compra</h2>
                    <h4>Product's({itemsCart})</h4>
                    <span>Price: {total}</span>
                    <span>Total price: {total}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
