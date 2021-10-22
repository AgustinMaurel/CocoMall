import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getStores, getProductTypes } from './Redux/actions/stores';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { login } from './Redux/actions/auth';
import { setCart } from './Redux/actions/shoppingActions';
import StorePanel from './Views/StorePanel';
import firebase from 'firebase/compat/app';
import Landing from './Views/Landing';
import LoginScreen from './Views/Auth/LoginScreen';
import RegisterScreen from './Views/Auth/RegisterScreen';
import Home from './Views/Home';
import ShopCreation from './Views/ShopCreation';
import StoreDetail from './Views/StoreDetail';
import Cart from './Views/Cart';
import Checkout from './Views/Checkout';
import OrderProduct from './Components/Forms/OrderProduct';
import EditUser from './Components/Forms/EditUser';
import Error404 from './Views/Error404';
import OrderSuccess from './Views/OrderSuccess';

function App() {
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.auth);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(async () => {
        const auth = getAuth();
        const userId = await axios.get(`http://localhost:3001/user/${uid}`);
        let remember = userId?.data?.Remember;
        remember
            ? firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                  .then(() => {
                      auth.onAuthStateChanged((user) => {
                          if (user?.uid) {
                              axios
                                  .get(`/user/${user.uid}`)
                                  .then((res) => {
                                      dispatch(setCart(res.data.Cart));
                                  })
                                  .catch((err) => console.log(err));
                              dispatch(login(user.uid, user.displayName));
                              setIsLoggedIn(true);
                          }
                      });
                  })
                  .catch((error) => {
                      // Handle Errors here.
                    const errorCode =  error.code;
                    const errorMessage =  error.message;
                  })
            : setPersistence(auth, browserSessionPersistence)
                  .then(() => {
                      auth.onAuthStateChanged((user) => {
                          if (user?.uid) {
                              axios
                                  .get(`/user/${user.uid}`)
                                  .then((res) => {
                                      dispatch(setCart(res.data.Cart));
                                  })
                                  .catch((err) => console.log(err));
                              dispatch(login(user.uid, user.displayName));
                              setIsLoggedIn(true);
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
                <Route path='/' exact component={Landing} />
                <Route path='/auth/login' exact component={LoginScreen} />
                <Route path='/auth/register' exact component={RegisterScreen} />
                <Route path='/home' exact component={Home} />
                <Route path='/home/store/:id' exact component={StoreDetail}></Route>

                <Route path='/storePanel'>
                    {isLoggedIn ? <StorePanel /> : <Redirect to='/auth/login' />}
                </Route>
                <Route path='/cart' exact>
                    {isLoggedIn ? <Cart /> : <Redirect to='/auth/login' />}
                </Route>
                <Route path='/create/shop' exact>
                    {isLoggedIn ? <ShopCreation /> : <Redirect to='/auth/login' />}
                </Route>
                <Route path='/checkout/:id' exact component={Checkout}>
                    {isLoggedIn ? <Checkout /> : <Redirect to='/auth/login' />}
                </Route>
                <Route path='/create/order' exact component={OrderProduct}>
                </Route>
                <Route path='/order/:success' exact component={OrderSuccess} />
                <Route path='/profile' exact component={EditUser}>
                    {isLoggedIn ? <EditUser /> : <Redirect to='/auth/login' />}
                </Route>
                <Route path='*' component={Error404}></Route>
            </Switch>
        </>
    );
}

export default App;
