import { LOGIN, LOGOUT } from './actionTypes.js'
import { auth, googleProvider } from '../../firebase/firebaseConfig.js'

export const startLoginEmailPassword = (email, password)=>{
    return (dispatch) => {

        setTimeout(()=>{

            dispatch(login(123, 'pedro') );
        }, 3500)
    }
}

export const login = (uid, displayName) => {
    return {
        type: LOGIN,
        payload: {
            uid,
            displayName
        }
    }
}

export const startGoogleLogin = () => {
    return  ( dispatch )=>{
        auth.signInWithPopup(googleProvider)
        .then(({user})=>{
            dispatch (
                login(user.uid, user.displayName)
            )
        })
    }
}