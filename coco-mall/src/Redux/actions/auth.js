import { LOGIN, LOGOUT } from './actionTypes.js'
import { auth, googleProvider } from '../../firebase/firebaseConfig.js'
import axios from 'axios'

export const startLoginEmailPassword = (email, password)=>{
    return (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
        .then ( ({user}) => {
            console.log(user)
            dispatch(login(user.uid, user.displayName))
            //mandar el acces token al back
        })
        .catch((err)=> console.log(err))
       
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
            console.log(user)
            dispatch (
                login(user.uid, user.displayName)
                //mandar el accessToken al back
            )
        })
    }
}


export const startRegisterWithEmailPasswordName = ( email, password, name, lastName )=>{
    return ( dispatch ) => {

        auth.createUserWithEmailAndPassword(email, password)
        .then ( async ( {user} )=> {
            console.log(user)
            await user.updateProfile({displayName: name})
            let aux = {
                id: user.uid,
                Name: user.displayName,
                LastName: lastName,
                Mail: email
            }
            console.log(aux)
            axios.post('http//localhost:3001/user/create', aux)
            /* .then((boolean)=> {}
            dispatch( login(user.uid, user.displayName)))
            */
            
            //del user sacamos el user.accessToken para mandarlo al back
        })
        .catch((err)=> console.log(err))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await auth.signOut()
        dispatch( logout() )
    }
}

export const logout = () => {
    return {
        type: LOGOUT, 
    }
}