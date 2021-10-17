import axios from 'axios';
import { LOGIN, LOGOUT, USER_INFO } from './actionTypes.js';
import { auth, googleProvider, facebookProvider } from '../../firebase/firebaseConfig.js';
import { CREATE_USER_URL } from '../../Scripts/constants.js';

import Swal from 'sweetalert2';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(userInfo(user.uid));
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

export const login = (uid, displayName, state, country) => {
    return {
        type: LOGIN,
        payload: {
            uid,
            displayName,
            state,
            country,
        },
    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        auth.signInWithPopup(googleProvider)
            .then(({ user }) => {
                let aux = {
                    Name: user.displayName,
                    id: user.uid,
                    Mail: user.email,
                    State: '',
                    Country: '',
                };
                axios.post(CREATE_USER_URL, aux);
                dispatch(login(user.uid, user.displayName, aux.State, aux.Country));
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

//ver State & Country in Facebook
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

export const startRegisterWithEmailPasswordName = ( 
    email,
    password,
    name,
    lastName,
    state,
    country,
) => {
    return async (dispatch) => {
        try {
            let aux = await auth.createUserWithEmailAndPassword(email, password);
            await auth.currentUser.updateProfile({ displayName: name });

            let userF = {
                id: aux.user.uid,
                Name: name,
                LastName: lastName,
                Mail: email,
                State: state,
                Country: country,
            };
            console.log('user enviado al back', userF);
            axios
                .post(CREATE_USER_URL, userF)
                .then((res) => res.data)
                .then((userCreated) => {
                    dispatch(
                        login(
                            userCreated.id,
                            userCreated.Name,
                            userCreated.State,
                            userCreated.Country,
                        ),
                    );
                    console.log('user creado en DB: ', userCreated);
                });

            await aux.user.sendEmailVerification();
            dispatch(userInfo(userF.id));
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

export const userInfo = (uid) => {
    return async (dispatch) => {
        const response = await axios.get(`/user/${uid}`);
        dispatch({ type: USER_INFO, payload: response.data });
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};
