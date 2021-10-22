import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import QuestionCard from '../Cards/QuestionCard'

export default function QuestionAndAnswer({ productId }) {
    const [question, setQuestion] = useState([])

    useEffect(async () => {
        const response = await axios.get(`/question/${productId}`)
        setQuestion(response.data)
    }, [productId])

    return (
        <div>
            {
                question.length ? question.map(q => {
                    return <QuestionCard question={q.question} answer={q.answer} userName={q.User.Name}/>
                }) : null
            }
        </div>
    )
}