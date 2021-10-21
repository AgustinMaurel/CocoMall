import React from "react";


export default function QuestionCard({ question, answer }) {
    
    return (
        <div className="">
            <div>
                <h3 className="text-lg">+{question}</h3>
            </div>
            <div>
                {answer !== "null" ? <h3>-{answer}</h3> : <p className="text-cocoMall-600">-This question has not been answered yet.</p>}
            </div>
        </div>
    )
}