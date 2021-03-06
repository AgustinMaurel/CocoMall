import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from 'sweetalert2'

export default function Question({productId}) {
    const [Question, setQuestion] = useState("")
    const { uid } = useSelector(state => state.auth)

    const handleChange = (e) => {
        e.preventDefault()
        setQuestion(e.target.value)
    }

    const handleSubmit = async (e) => {
        if(Question.length > 5){
          const body = {
            userId: uid,
            productId: productId,
            bodyQuestion: Question
          }
          await axios.post('/question/create', body)
          setQuestion("")
          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: "Your question will be answered shortly."
          })
        }
      }
        
        function keyPress (e) {
          if (e.key === "Enter" && !e.shiftKey) {
          handleSubmit()
        }
      }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-start items-start">
            <textarea
                type="text"
                id="question"
                name="question"
                minlength="5"
                placeholder="Make your question..."
                value={Question}
                onChange={handleChange}
                className='resize-none w-3/4 p-1 outline-none border border-cocoMall rounded'
                onKeyDown={keyPress}
            />
            <button type="submit" className="font-bold">Ask!</button>
        </form>
    )
}