import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getStores } from './Redux/actions/stores';
import { auth } from './firebase/firebaseConfig';
import { login } from './Redux/actions/auth';
import './App.css';

import Landing from './Views/Landing';
import LoginScreen from './Views/Auth/LoginScreen';
import RegisterScreen from './Views/Auth/RegisterScreen';
import Home from './Views/Home';
import ShopCreation from './Views/ShopCreation';
import StoreDetail from './Views/StoreDetail'

function App() {
    const dispatch = useDispatch();

    const [, setChecking] = useState(true);
    const [, setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false)
            }
            setChecking(false);
            
        });
    }, [ dispatch, setChecking, setIsLoggedIn]);

    useEffect(() => {
        dispatch(getStores())       
    }, [dispatch])

    return (
        <>
            <Switch>
                <Route path='/home' exact component={Home} />
                <Route path='/' exact component={Landing} />
                <Route path='/create/shop' exact component={ShopCreation} />
                <Route path='/auth/login' exact component={LoginScreen} />
                <Route path='/auth/register' exact component={RegisterScreen} />
                <Route path='/home/store/:id' exact component={StoreDetail} />
            </Switch>
        </>
    );
}

export default App;
