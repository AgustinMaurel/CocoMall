import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getStores, getProductTypes } from './Redux/actions/stores';
import StorePanel from './Views/StorePanel';
import { auth } from './firebase/firebaseConfig';
import { login } from './Redux/actions/auth';
import { setCart } from './Redux/actions/shoppingActions';
import Landing from './Views/Landing';
import LoginScreen from './Views/Auth/LoginScreen';
import RegisterScreen from './Views/Auth/RegisterScreen';
import Home from './Views/Home';
import ShopCreation from './Views/ShopCreation';
import StoreDetail from './Views/StoreDetail';
import Cart from './Views/Cart';
import Checkout from './Views/Checkout';

function App() {
    const dispatch = useDispatch();

    const [, setChecking] = useState(true);
    const [, setIsLoggedIn] = useState(false);
    const user = useSelector(state => state.auth)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user?.uid) {
               
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    useEffect(() => {
        dispatch(getStores());
        dispatch(getProductTypes());
        
        user.uid && axios
        .get(`/user/${user.uid}`)
        .then((res) => {
            return res.data.length > 0 &&
                res.data[0].Cart.map((el) => dispatch(setCart(el)))
                
            
        })
        .catch((err) => console.log(err));
    }, [dispatch]);

    return (
        <>
            <Switch>
                <Route path='/storePanel' component={StorePanel} />
                <Route path='/home' exact component={Home} />
                <Route path='/' exact component={Landing} />
                <Route path='/cart' exact component={Cart} />
                <Route path='/create/shop' exact component={ShopCreation} />
                <Route path='/auth/login' exact component={LoginScreen} />
                <Route path='/auth/register' exact component={RegisterScreen} />
                <Route path='/home/store/:id' exact component={StoreDetail} />
                <Route path='/checkout/:id' exact component={Checkout} />
            </Switch>
        </>
    );
}

export default App;
