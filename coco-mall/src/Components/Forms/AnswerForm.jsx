import React from "react";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


export default function Answer(questionId) {
    const [answer, setAnswer] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setAnswer(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {
            id: questionId,
            answer: answer
        }
        const response = await axios.post('/question/update', body)
        alert(response)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="answer"
                name="answer"
                minlength="5"
                placeholder="Answer this question..."
                value={answer}
                onChange={handleChange}
            />
            <button type="submit">Reply!</button>
        </form>
    )
}