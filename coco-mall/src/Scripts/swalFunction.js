import axios from "axios";
import Swal from "sweetalert2";
import { DELETE_PRODUCT } from "./constants";

export async function modalOptions(id, handleSubmit){
    
    const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            'edit': 'Edit product',
            'delete': 'Delete product',
          })
        }, 500)
      })
      
      const { value: action } = await Swal.fire({
        title: 'What would you want to do',
        input: 'radio',
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to choose something!'
          }
        }
      })
      
      if (action === 'edit') {
        
      }

      if(action === 'delete'){
        const { value: accept } = await Swal.fire({
            input: 'checkbox',
            icon: 'warning',
            inputValue: 1,
            inputPlaceholder:
              'I agree with the terms and conditions',
            confirmButtonText:
              'Delete',
            inputValidator: (result) => {
              return !result && 'You need to agree with T&C'
            }
          })
          
          if (accept) {
            axios.delete(`${DELETE_PRODUCT}/${id}`)
                .then(()=>Swal.fire({
                    icon: 'success',
                    title:'Successfully deleted'
                }))
                .catch((err)=> Swal.fire({
                    icon: 'error',
                    title:'Error'
                }))
            
          }
      }
}