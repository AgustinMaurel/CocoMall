import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getStores, getProductTypes } from './Redux/actions/stores';
import StorePanel from './Views/StorePanel';
import { auth } from './firebase/firebaseConfig';
import {
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    browserSessionPersistence,
    inMemoryPersistence,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { login, rememberAction } from './Redux/actions/auth';
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
    const { uid } = useSelector((state) => state.auth);
    const [, setChecking] = useState(true);
    const [, setIsLoggedIn] = useState(false);

    useEffect(async () => {
        const auth = getAuth();
        const userId = await axios.get(`http://localhost:3001/user/${uid}`);
        let remember = userId?.data?.Remember
        remember ?
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                auth.onAuthStateChanged((user) => {
                    console.log("entre")
                    if (user?.uid) {
                        dispatch(login(user.uid, user.displayName));
                        setIsLoggedIn(true);
                        axios.get(`/user/${user.uid}`).then((res) => {
                            return (
                                res.data.length > 0 &&
                                res.data[0].Cart.map((el) => dispatch(setCart(el)))
                            );
                        });
                    }
                });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            })
        : setPersistence(auth, browserSessionPersistence)
              .then(() => {
                  auth.onAuthStateChanged((user) => {
                    console.log("entrEEEEE")
                      if (user?.uid) {
                          dispatch(login(user.uid, user.displayName));
                          setIsLoggedIn(true);
                          axios.get(`/user/${user.uid}`).then((res) => {
                              return (
                                  res.data.length > 0 &&
                                  res.data[0].Cart.map((el) => dispatch(setCart(el)))
                              );
                          });
                      }
                  });
              })
              .catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
              });
    }, [dispatch, uid]);

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
