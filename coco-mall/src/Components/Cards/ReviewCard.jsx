import React from 'react'

function ReviewCard ({username, qualification, description}){
    return (
        <div className="container">
            <div className="user-info">
                <div className= "name">
                    <span>{username}</span>
                </div>
                <div className= "qualification">
                    <span>{qualification}</span>
                </div>
            </div>
            <div className="description">
                <div>
                    <span>{description}</span>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard