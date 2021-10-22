import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo, login } from '../Redux/actions/auth';
import { useQueryParams } from '../Scripts/useQueryParams';
import { Redirect } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';
import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { clearCart } from '../Redux/actions/shoppingActions';

function OrderSuccess() {
    const auth = getAuth();
    let queries = useQueryParams();
    const dispatch = useDispatch();

    const { uid } = useSelector((state) => state.auth);

    const [counter, setCounter] = useState(7);
    const [active, setActive] = useState(true);

    useEffect(() => {
        let intervalo = null;
        if (active) {
            intervalo = setInterval(() => {
                setCounter((counter) => counter - 1);
            }, 1000);
        }

        if (counter === 0) {
            setActive(false);
        }

        return () => clearInterval(intervalo);
    }, [active, counter]);

    const [userData, setUserData] = useState({
        address: '',
        payment_id: undefined,
        mail: '',
        items: [],
        total: 0,
        status: '',
    });

    useEffect(() => {}, []);

    useEffect(() => {
        if (
            userData.address !== undefined &&
            userData.payment_id !== undefined &&
            userData.mail !== undefined &&
            userData.items !== undefined &&
            userData.total !== undefined &&
            userData.status !== undefined
        ) {
            axios.post('http://localhost:3001/checkout/feedback', userData);
        }
    }, [userData]);

    console.log(userData);

    useEffect(() => {
        firebase.auth();
        auth.onAuthStateChanged((user) => {
            if (user?.uid) {
                axios
                    .get(`/user/${user.uid}`)
                    .then((res) => {
                        console.log(res.data);
                        dispatch(login(user.uid, user.displayName));
                        dispatch(userInfo(uid));
                        setUserData({
                            address: res.data.Addresses[0].directions,
                            payment_id: queries.payment_id,
                            mail: res.data.Mail,
                            items: res.data.Cart?.map((el) => el.productName).join(', '),
                            total:
                                res.data.Cart &&
                                Object.values(res.data.Cart).reduce(
                                    (previous, key) => previous + key.price * key.quantity,
                                    0,
                                ),
                            status: queries.status,
                        });
                    }).then(()=> dispatch(clearCart(uid)))
                    .catch((err) => console.log(err));
            }
        });
        
    }, [uid]);

    return (
        <>
            {active ? (
                <div className=' overflow-hidden'>
                    <div className='z-10 shadow'>
                        <NavBar />
                    </div>

                    <div className='overflow-hidden z-0 absolute top-0 right-0 left-0 bottom-0 mx-auto flex flex-col justify-center items-center px-5 '>
                        <div className='text-2xl z-0 flex flex-col gap-10'>
                            <div
                                className=' z-0
                absolute w-64 h-64 bg-primary-light rounded-full -bottom-20 -left-20 
'
                            ></div>
                            <div
                                className=' z-0
                absolute w-64 h-64 bg-primary-light rounded-full top-20 -right-20 
                xl:top-0  xl:-right-20
'
                            ></div>
                            <p className='z-10'>
                                {' '}
                                <span className='font-bold text-cocoMall  '>Your</span> purchase was
                                successfully done, all the information was sent to your mailbox.
                            </p>
                            <p className='text-xl z-10'>
                                You will be redirected to the home page in{' '}
                                <span className='text-cocoMall text-3xl font-bold'>{counter} </span>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <Redirect to='/home' />
            )}
        </>
    );
}

export default OrderSuccess;
