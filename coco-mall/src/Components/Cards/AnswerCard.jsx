import React from "react";
import AnswerForm from '../Forms/AnswerForm'
import { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

export default function AnswerCard({ storeId }) {
    const [questions, setQuestions] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(async () => {
        const allQuestion = await axios.get(`/question/store/${storeId}`)
        setQuestions(allQuestion.data)
    }, [flag])

    return (
        <div className="flex flex-wrap gap-5 justify-center  h-full w-full">
            {questions.length ? questions.map(q => {
                return (<>
                    <div className="flex border text-left border-gray-200 rounded-md">
                        <div className="p-2">

                        <h2 className="inline-block">User name: {q.User.Name}</h2>
                        <h3>Product: {q.Product.productName}</h3>
                        <span>Question: {q.question}</span>
                        <AnswerForm setFlag={setFlag} flag={flag} questionId={q.id} />

                        </div>
                        <Image
                            cloudName='cocomalls'
                            publicId={q.Product.cloudImage[0]}
                            width='150'
                            alt='not found'
                            crop='scale'
                        />
                        
                    </div>
                    
                </>)
            }) : null
            }
        </div>
    )
}