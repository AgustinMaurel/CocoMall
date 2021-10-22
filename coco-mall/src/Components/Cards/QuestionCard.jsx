import React from "react";


export default function QuestionCard({ question, answer, userName}) {
  
    return (
        <div className="">
            <div className="flex">
                <h3 className="text-xl text-cocoMall-800">+{userName}: </h3>
                <p className="text-lg text-gray-600 ml-2">{question}</p>
            </div>
            <div>
                {answer !== "null" ? <p className="text-cocoMall-400">-{answer}</p> : <p className="text-cocoMall-600">-This question has not been answered yet.</p>}
            </div>
        </div>
    )
}