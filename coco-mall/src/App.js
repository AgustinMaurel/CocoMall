import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Landing from './Views/Landing';
// import ShopCreate from './Views/ShopCreate';
import LoginScreen from './Views/Auth/LoginScreen';
import RegisterScreen from './Views/Auth/RegisterScreen';
import Home from './Views/Home';
import { auth } from './firebase/firebaseConfig';
import { login } from './Redux/actions/auth';
// import ProductsCreate from './Views/ProductsCreate';
import ShopCreation from './Views/ShopCreation';

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
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    return (
        <>
            <Switch>
                <Route path='/home' exact component={Home} />
                <Route path='/' exact component={Landing} />
                <Route path='/create/shop' exact component={ShopCreation} />
                <Route path='/auth/login' exact component={LoginScreen} />
                <Route path='/auth/register' exact component={RegisterScreen} />
            </Switch>
        </>
    );
}

export default App;
