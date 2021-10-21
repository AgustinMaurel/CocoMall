import React from "react";


export default function QuestionCard({ question, answer }) {
    return (
        <div>
            <div>
                <h3>{question}</h3>
            </div>
            <div>
                {answer !== 'null' ? <h3>{answer}</h3> : null}
            </div>
        </div>
    )
}