import React from 'react';

function SecondaryButton({ text }) {
    return (
        <div className="flex items-center justify-center text-primary w-24 h-8 p-2 rounded-md">
            <button className="text-center text-sm">{text}</button>
        </div>
    );
}

export default SecondaryButton;
