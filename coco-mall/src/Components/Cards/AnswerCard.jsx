import React from "react";
import Answer from '../Forms/AnswerForm'
import { useState, useEffect } from "react";
import axios from "axios";

export default function AnswerCard({ storeId }) {
    const [questions, setQuestions] = useState([])

    useEffect(async () => {
        const allQuestion = await axios.get(`/question/store/${storeId}`)
        setQuestions(allQuestion.data)
    }, [])

    return (
        <div>
            {questions.length ? questions.map(q => {
                return (<>
                    <div>
                        <h3>User Name: {q.User.Name}</h3>
                        <h3>Product Name: {q.Product.productName}</h3>
                        <h3>Image: {q.Product.cloudImage}</h3>
                        <h3>Pregunta: {q.question}</h3>
                    </div>
                    <Answer questionId={q.id} />
                </>)
            }) : null
            }
        </div>
    )
}