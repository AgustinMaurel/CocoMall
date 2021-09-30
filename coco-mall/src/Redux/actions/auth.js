import axios from 'axios';
import { LOGIN, LOGOUT, FIREBASE_ERR } from './actionTypes.js';
import { auth, googleProvider } from '../../firebase/firebaseConfig.js';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                console.log(user);
                dispatch(login(user.uid, user.displayName));
                //mandar el acces token al back
            })
            .catch((err) => {
                console.log(err.code)
                dispatch({ type: FIREBASE_ERR, payload: err.code });

                //Usar el err.code para validar!!
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
        auth.signInWithPopup(googleProvider).then(({ user }) => {
            console.log(user);
            dispatch(
                login(user.uid, user.displayName),
                //mandar el accessToken al back
            );
        });
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

            return axios.post('http://localhost:3001/user/create', userF);
        } catch (err) {
            dispatch({ type: FIREBASE_ERR, payload: err.code });
            //Usar el err.code para validar!!
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
