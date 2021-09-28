import React from 'react'

function MainButton({text}) {
    return (
        
            <div className="flex items-center justify-center bg-primary w-20 h-8 p-2 rounded-lg ">
                <button className="text-white text-center text-sm">{text}</button>
            </div>
        
    )
}

export default MainButton
