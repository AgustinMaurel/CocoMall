import React from 'react'

function MainButton({text}) {
    return (
        
            <div className="flex items-center justify-center bg-primary w-24 h-8 p-2 rounded-md ">
                <button className="text-white text-center">{text}</button>
            </div>
        
    )
}

export default MainButton
