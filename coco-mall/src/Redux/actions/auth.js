import axios from 'axios';
import { LOGIN, LOGOUT } from './actionTypes.js';
import { auth, googleProvider, facebookProvider } from '../../firebase/firebaseConfig.js';
import { CREATE_USER_URL } from '../../Scripts/constants.js';

import Swal from 'sweetalert2';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                Swal.fire({
                    title: 'Do you want to stay logged in?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      axios.put(`http://localhost:3001/user/update/${user.uid}`, {
                        Remember: true
                      })
                    } else if (result.isDenied) {
                      axios.put(`http://localhost:3001/user/update/${user.uid}`, {
                        Remember: false
                      })
                    }
                  })
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
    //Antes de despachar el login le tiro un Salert preguntando si quiere que se quede en remember en la cuenta
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
                console.log(user)
                let aux = {
                    Name: user.displayName,
                    id: user.uid,
                    Mail: user.email,
                };
                axios.post(CREATE_USER_URL, aux);
                dispatch(login(user.uid, user.displayName));
                Swal.fire({
                    title: 'Do you want to stay logged in?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      axios.put(`http://localhost:3001/user/update/${user.uid}`, {
                        Remember: true
                      })
                    } else if (result.isDenied) {
                      axios.put(`http://localhost:3001/user/update/${user.uid}`, {
                        Remember: false
                      })
                    }
                  })
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
                console.log(user)
                let aux = {
                    Name: user.displayName,
                    id: user.uid,
                    Mail: user.email,
                };
                axios.post(CREATE_USER_URL, aux);
                dispatch(login(user.uid, user.displayName));
                Swal.fire({
                    title: 'Do you want to stay logged in?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: `No`,
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      axios.put(`http://localhost:3001/user/update/${user.uid}`, {
                        Remember: true
                      })
                    } else if (result.isDenied) {
                      axios.put(`http://localhost:3001/user/update/${user.uid}`, {
                        Remember: false
                      })
                    }
                  })
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
            let aux = await auth.createUserWithEmailAndPassword(email, password)
            //hay que arreglar que hasta no recargar se queda en null el displayName
            await aux.user.updateProfile({displayName: name})
            let userF = {
                id: aux.user.uid,
                Name: name,
                LastName: lastName,
                Mail: email,
            };
            Swal.fire({
                title: 'Do you want to stay logged in?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  axios.put(`http://localhost:3001/user/update/${aux.user.uid}`, {
                    Remember: true
                  })
                } else if (result.isDenied) {
                  axios.put(`http://localhost:3001/user/update/${aux.user.uid}`, {
                    Remember: false
                  })
                }
              })
            axios.post(CREATE_USER_URL, userF);
            await aux.user.sendEmailVerification();
            dispatch(login(aux.user.uid, name))
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
