import { getAuth, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import axios from 'axios';
import { LOGIN, LOGOUT } from './actionTypes.js';
import { auth, googleProvider, facebookProvider, actionCodeSettings } from '../../firebase/firebaseConfig.js';

import Swal from 'sweetalert2';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                console.log(user);
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
                console.log(user);
                dispatch(
                    login(user.uid, user.displayName),
                    //mandar el accessToken al back
                );
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
                console.log(user);
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

// const auth2 = getAuth();
// sendSignInLinkToEmail(auth2, email, actionCodeSettings)
// .then((prueba) => {
//     console.log(prueba);
//     window.localStorage.setItem('emailForSignIn', email)
// })
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
            await aux.user.sendEmailVerification()
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
        await auth.signOut();
        dispatch(logout());
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};
