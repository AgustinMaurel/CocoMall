import axios from 'axios';
import { LOGIN, LOGOUT, SET_CART } from './actionTypes.js';
import { auth, googleProvider, facebookProvider } from '../../firebase/firebaseConfig.js';

import Swal from 'sweetalert2';
import { SHOPPING_CART } from '../../Scripts/constants.js';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: err.code,
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
            });
    };
};

export const login = (uid, displayName) => {
    return {
        type: LOGIN,
        payload: {
            uid,
            displayName,
        },
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        auth.signInWithPopup(googleProvider)
            .then(({ user }) => {
                
                dispatch(login(user.uid, user.displayName));
                axios.get(`http://localhost:3001/user/${user.uid}`);
            })
            .catch((err) =>
                Swal.fire({
                    title: 'Error!',
                    text: err.code,
                    icon: 'error',
                    confirmButtonText: 'Close',
                }),
            );
    };
};

export const startFacebookLogin = () => {
    return (dispatch) => {
        auth.signInWithPopup(facebookProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            })
            .catch((err) =>
                Swal.fire({
                    title: 'Error!',
                    text: err.code,
                    icon: 'error',
                    confirmButtonText: 'Close',
                }),
            );
    };
};

export const startRegisterWithEmailPasswordName = (email, password, name, lastName) => {
    return async (dispatch) => {
        try {
            let aux = await auth.createUserWithEmailAndPassword(email, password);
            let userF = {
                id: aux.user.uid,
                Name: name,
                LastName: lastName,
                Mail: email,
            };
            axios.post('http://localhost:3001/user/create', userF);
            await aux.user.sendEmailVerification();
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.code,
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await auth.signOut().then(dispatch(logout()));
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};

export const setCart = (user) => {
    return async (dispatch) => {
        console.log('entre')
        const result = await axios.post(SHOPPING_CART.GET_PRODUCTS, { idUser: user });
        console.log(result.data)
        dispatch({ type: SET_CART, payload: result.data });
    };
};
