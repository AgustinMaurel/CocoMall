import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import QuestionCard from '../Cards/QuestionAndAnswer'

export default function QuestionAndAnswer(productId) {
    const [question, setQuestion] = useState([])

    useEffect(() => {
        const allQuestion = axios.get(`/question/${productId}`)
        setQuestion(allQuestion)
        return setQuestion([])
    }, [])

    return (
        <div>
            {
                question.length ? question.forEach(q => {
                    <QuestionCard question={q.question} answer={q.answer} />
                }) : null
            }
        </div>
    )
}