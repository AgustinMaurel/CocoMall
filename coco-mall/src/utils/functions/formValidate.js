export function validate(state) {
    let errors = {}
    let emailRegex= /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    if (!state.name) {
        errors.name = 'Name is required'
    }
    else if (!/[a-zA-Z ]{2,254}/.test(state.name)) {
        errors.name = 'Name is invalid';
    }

    if(!state.email){
        errors.email = 'Email is required'
    }
    else if(!emailRegex.test(state.email)){
        errors.email= 'Email is invalid'
    }

    if (!state.password) errors.password = 'Password is required'
    else if (state.password !== state.password2){ 
        errors.password = 'Passwords not matches'
    }
    else if (state.password.length < 6 ){
        errors.password = 'Password must be at least 6 characters'
    }
    
    return errors

}