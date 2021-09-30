import axios from 'axios'
import { LOGIN, LOGOUT } from './actionTypes.js'
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



export const startRegisterWithEmailPasswordName =  ( email, password, name, lastName )=>{
    return async ( dispatch ) => {
    try{
       let aux = await auth.createUserWithEmailAndPassword(email, password) 
       console.log(aux)
            let userF = {
                id: aux.user.uid,
                Name: name,
                LastName: lastName,
                Mail: email
            } 
            return axios.post('http://localhost:3001/user/create', userF)
        }
        catch(err){
           console.log(err)
        }
            
      
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