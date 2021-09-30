import { LOGIN } from './actionTypes.js'
import { auth, googleProvider } from '../../firebase/firebaseConfig.js'

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


export const startRegisterWithEmailPasswordName = ( email, password, name )=>{
    return ( dispatch ) => {

        auth.createUserWithEmailAndPassword(email, password)
        .then ( async ( {user} )=> {
            console.log(user)
            await user.updateProfile({displayName: name})
            dispatch( login(user.uid, user.displayName))
            
            //del user sacamos el user.accessToken para mandarlo al back
        })
        .catch((err)=> console.log(err))
    }
}