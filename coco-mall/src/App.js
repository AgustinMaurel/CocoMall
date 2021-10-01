import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Landing from './Views/Landing';
import ShopCreate from './Views/ShopCreate';
import LoginScreen from './Views/Auth/LoginScreen';
import RegisterScreen from './Views/Auth/RegisterScreen';
import { auth } from './firebase/firebaseConfig';
import { login } from './Redux/actions/auth';
import NavBar from './Components/NavBar'

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
            <Route path="/" component={NavBar} />
            <Switch>
                <Route path='/' exact component={Landing} />
                <Route path="/create/shop" exact component={ShopCreate}/>
                <Route path='/auth/login' exact component={LoginScreen} />
                <Route path='/auth/register' exact component={RegisterScreen} />
            </Switch>
        </>
    );
}

export default App;
