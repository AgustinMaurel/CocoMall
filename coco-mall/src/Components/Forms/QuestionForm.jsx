import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


export default function Question(productId) {
    const [Question, setQuestion] = useState("")
    const { uid } = useSelector(state => state.auth)

    const handleChange = (e) => {
        e.preventDefault()
        setQuestion(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {
            userId: uid,
            productId: productId,
            question: Question
        }
        const response = await axios.post('/question/create', body)
        alert(response)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="question"
                name="question"
                minlength="5"
                placeholder="Make your question..."
                value={Question}
                onChange={handleChange}
            />
            <button type="submit">Ask!</button>
        </form>
    )
}