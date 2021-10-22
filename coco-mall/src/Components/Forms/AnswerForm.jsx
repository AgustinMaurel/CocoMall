import React from "react";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";


export default function Answer({questionId, setFlag, flag}) {
    const [answer, setAnswer] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setAnswer(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            id: questionId,
            answer: answer
        }
         axios.put('/question/update', body)
         .then(()=>{
             setFlag(!flag)
             Swal.fire({
            icon: 'success',
            title: 'Successfully answer',
        })}
         )
         setAnswer("")
    }

    return (
        <form className="relative w-10/12" onSubmit={handleSubmit}>
            <input className="focus:outline-none"
                type="text"
                id="answer"
                name="answer"
                minlength="5"
                placeholder="Answer this question..."
                value={answer}
                onChange={handleChange}
            />
            <button className='min-w-max h-full focus:outline-none text-primary text-center text-sm text-md' type="submit">Reply!</button>
        </form>
    )
}