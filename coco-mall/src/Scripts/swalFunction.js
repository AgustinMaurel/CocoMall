import axios from 'axios';
import Swal from 'sweetalert2';
import { DELETE_PRODUCT, DELETE_STORE, DELETE_ORDER, DELETE_USER, UPDATE_USER } from './constants';


export async function productOptions(id, setEditState, setFlag, flag) {
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                edit: 'Edit product',
                delete: 'Delete product',
            });
        }, 500);
    });

    const { value: action } = await Swal.fire({
        title: 'What would you like to do',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to choose something!';
            }
        },
    });

    if (action === 'edit') {
        setEditState(false);
    }

    if (action === 'delete') {
        const { value: accept } = await Swal.fire({
            input: 'checkbox',
            icon: 'warning',
            inputValue: 1,
            inputPlaceholder: 'Are you sure you want to delete this product',
            confirmButtonText: 'Delete',
            inputValidator: (result) => {
                return !result && 'You need to agree';
            },
        });

        if (accept) {
            axios
                .delete(`${DELETE_PRODUCT}/${id}`)
                .then(() => {
                    setFlag(!flag);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully deleted',
                    });
                })
                .catch((err) =>
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                    }),
                );
        }
    }
}

export async function storeOptions(id, setEditState, setFlag3, flag3, setFlag2, flag2) {

        const { value: accept } = await Swal.fire({
            input: 'checkbox',
            icon: 'warning',
            inputValue: 1,
            inputPlaceholder: 'Are you sure you want to delete this store',
            confirmButtonText: 'Delete',
            inputValidator: (result) => {
                return !result && 'You need to agree';
            },
        });

        if (accept) {
            axios
                .delete(`${DELETE_STORE}/${id}`)
                .then(() => {
                    setFlag2(!flag2);
                    setFlag3(!flag3);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully answer',
                    });
                })
                .catch((err) =>{
                console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                    })},
                );
        }
    
}

export async function ordersOptions(id, setEditState, setFlag3, flag3, setFlag2, flag2) {

    const { value: accept } = await Swal.fire({
        input: 'checkbox',
        icon: 'warning',
        inputValue: 1,
        inputPlaceholder: 'Are you sure you want to delete this product',
        confirmButtonText: 'Delete',
        inputValidator: (result) => {
            return !result && 'You need to agree';
        },
    });

    if (accept) {
        axios
            .delete(`${DELETE_ORDER}/${id}`)
            .then(() => {
                console.log("hoaaaaaaaaaaaaaaaaaaaaaaaaaa")
                setFlag2(!flag2);
                console.log("pepe 2")
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully deleted',
                });
            })
            .catch((err) =>{
            console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                })},
            );
    }
}

export async function userOptions(id, setEditState, setFlag3, flag3, setFlag2, flag2, SuperAdmin) {
console.log(id)
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                edit: 'Change role',
                delete: 'Delete user',           
            });
        }, 500);
    });

    const { value: action } = await Swal.fire({
        title: 'What would you like to do',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to choose something!';
            }
        },
    });

    if (action === 'edit') {
        const { value: accept } = await Swal.fire({
            input: 'checkbox',
            icon: 'warning',
            inputValue: 1,
            inputPlaceholder: 'Are you sure you want to change role',
            confirmButtonText: 'Send',
            inputValidator: (result) => {
                return !result && 'You need to agree';
            },
        });

        if (accept) {
            let aux= {
                SuperAdmin : !SuperAdmin
            }
            axios
                .put(`${UPDATE_USER}/${id}`,{...aux})
                .then(() => {
                    setFlag2(!flag2);
                    setFlag3(!flag3);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully updated',
                    });
                })
                .catch((err) =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                    })},
                );
        }
    }

    if (action === 'delete') {
        const { value: accept } = await Swal.fire({
            input: 'checkbox',
            icon: 'warning',
            inputValue: 1,
            inputPlaceholder: 'Are you sure you want to delete this user',
            confirmButtonText: 'Delete',
            inputValidator: (result) => {
                return !result && 'You need to agree';
            },
        });

        if (accept) {
            axios
                .delete(`${DELETE_USER}/${id}`)
                .then(() => {
                    setFlag2(!flag2);
                    setFlag3(!flag3);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully deleted',
                    });
                })
                .catch((err) =>{
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                    })},
                );
        }
    }
}

