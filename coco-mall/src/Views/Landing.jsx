import React from 'react';
import MainButton from '../Components/MainButton';
import SecondaryButton from '../Components/SecondaryButton';

function Landing() {
    return (
        <div className="flex container p-10">
            <MainButton text='Hello' />
            <SecondaryButton text="Bye"/>
        </div>
    );
}

export default Landing;
