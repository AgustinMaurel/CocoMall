import React from "react";


export default function QuestionCard(question, answer) {
    return (
        <div>
            <div>
                <h3>{question}</h3>
            </div>
            <div>
                <h3>{answer}</h3>
            </div>
        </div>
    )
}