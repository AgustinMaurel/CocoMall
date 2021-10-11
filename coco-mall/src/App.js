import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig';
import { login } from './Redux/actions/auth';

import { getStores, getProductTypes } from './Redux/actions/stores';

import { addToCart } from './Redux/actions/shoppingActions';

import StorePanel from './Views/StorePanel';
import Landing from './Views/Landing';
import LoginScreen from './Views/Auth/LoginScreen';
import RegisterScreen from './Views/Auth/RegisterScreen';
import Home from './Views/Home';
import ShopCreation from './Views/ShopCreation';
import StoreDetail from './Views/StoreDetail';
import Cart from './Views/Cart';

// import ProductDetail from './Components/Product/ProductDetail'

function App() {
    const dispatch = useDispatch();

    const [, setChecking] = useState(true);
    const [, setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                axios
                    .get(`http://localhost:3001/user/${user.uid}`)
                    .then((res) => {
                        return res.data[0].Cart?.map((element) => {
                            return { idProduct: element.idproduct, quantity: element.cantidad };
                        });
                    })
                    .then((res) => {
                        let idProducts = res.map((el) => el.idProduct);
                        let aux = {
                            allIds: idProducts,
                        };
                        // let quantities = res.map((el) => );
                        let temp = res;
                        //mi res es un arreglo con los objetos que contienen el id producto y la cantidad
                        axios.post('http://localhost:3001/product/cart', aux).then((res) => {
                            //donde se cruce el temp.idProduct con el res.data[i].id --> agregar al res.data[i] la propiedad quantity que me llega en temp

                            //hacer un map de temp donde el ele

                            let result = res.data.find(
                                (product) =>
                                    product.id === temp.map((el) => el.idProduct).toString(),
                            );
                            console.log(result);

                            //ESTO ES INVIABLE TARDA MUCHO RESOLVER DESDE EL BACK JAJA SALU2
                            
                        });
                    });

                // .then((res) =>
                //     res.data.map((element) => {
                //         return { idProduct: element.id, quantity: element.cantidad };
                //     }),
                // )
                // .then((res) => axios.post('http://localhost:3001/product/cart', res));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    useEffect(() => {
        dispatch(getStores());
        dispatch(getProductTypes());
    }, [dispatch]);

    return (
        <>
            <Switch>
                <Route path='/storePanel' component={StorePanel} />
                <Route path='/home' exact component={Home} />
                <Route path='/' exact component={Landing} />
                <Route path='/cart/:id' exact component={Cart} />
                <Route path='/create/shop' exact component={ShopCreation} />
                <Route path='/auth/login' exact component={LoginScreen} />
                <Route path='/auth/register' exact component={RegisterScreen} />
                <Route path='/home/store/:id' exact component={StoreDetail} />
            </Switch>
        </>
    );
}

export default App;
