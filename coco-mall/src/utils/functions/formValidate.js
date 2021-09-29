export function validate(state) {
    let errors = {}
    
    if (!state.name) {
        errors.name = 'Name is required'
    }
    else if (!/[a-zA-Z ]{2,254}/.test(state.name)) {
        errors.name = 'Name is invalid';
    }
    

    if (!state.password) errors.password = 'Password is required'
    else if (state.password !== state.password2){ 
        errors.password = 'Passwords not matches'
    }

        
    return errors

}