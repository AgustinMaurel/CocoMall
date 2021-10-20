import { DELETE_STORE } from '../Scripts/constants'
import Swal from 'sweetalert2';
import axios from 'axios';
export async function swalDelete (id, setFlag2, flag2, ) {

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