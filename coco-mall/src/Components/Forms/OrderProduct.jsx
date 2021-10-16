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
import Address from '../Cards/Address'
import InputMaps from '../Inputs/InputMaps';
import ReactModal from 'react-modal';

const OrderProduct = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [placeSelected, setPlaceSelected] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: 'onTouched' });

   
    const { userCart, uid, userInfoDB } = useSelector((state) => state.auth);

    let priceCart;
    let itemsCart;
    if (userCart.length) {
        let itemsQuantity = userCart?.map((item) => item.quantity);
        itemsCart = itemsQuantity.reduce((a, b) => a + b);
        let itemsPrice = userCart?.map((item) => item.quantity * item.price);
        priceCart = itemsPrice.reduce((a, b) => a + b);
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

    useEffect(() => {
        dispatch(userInfo(uid));
    }, [dispatch, uid]);

    //hay que mostrar las direcciones al usuario que estan en la DB,
    //para que el usuario pueda seleccionar donde quiere que le llegue el envio (este es un array)
    //hay que darle la opcion de poner una direccion nueva (Cuando llegue aca le aviso a Chris)
    //el user id del usuario actual se lo paso por params
    //los datos del usuario los saco del usuario
    //el monto y los productos estan en el cart

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

    const userAddress = userInfoDB[0]?.Addresses;
    const postAddressCreate = () => {
        const obj = {
            id: uid,
            address: placeSelected.name,
            cords: placeSelected.coord
        }
         axios.post(`/address/create`, obj)
    }
    const onSubmit = (data) => {
        postAddressCreate()
    };
    return (
        <div className='w-full flex flex-col justify-center items-center m-auto px-10 lg:px-24 xl:p-0'>
            <div className='w-full flex bg-gray-200 shadow mb-10'>
                <NavBar />
            </div>
            <div className='flex justify-center m-auto w-3/4 h-full'>
                <form
                    className='w-full flex flex-col justify-top items-center'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h3 className='mb-12 sm:mb-10 text-2xl md:text-3xl'>Order Product</h3>
                    <div>
                        <h4>Enviar a</h4>
                        <span>
                            {userAddress?.length ? (
                                userAddress[0].address
                            ) : (
                                <>
                                    <div className='w-4/5 flex flex-col 2xl:w-3/5'>
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
                                                            place.address_components[5]?.long_name,
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
                                    </div>
                                </>
                            )}
                        </span>
                        <button onClick={()=> setModalIsOpen(true)}>Editar o elegir otro</button>
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
                            <Address address={userAddress} placeSelected={placeSelected} setPlaceSelected={setPlaceSelected} />
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
                    <button type="submit">Continuar lleva a elegir metodo de pago</button>
                </form>

                <div className='bg-gray-300 h-screen flex flex-col justify-top items-center -mt-10'>
                    <h2>Resumen de compra</h2>
                    <h4>Product's({itemsCart})</h4>
                    <span>Price: {priceCart}</span>
                    <span>Total price: {priceCart}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
