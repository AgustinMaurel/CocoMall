import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import LandingMobile from '../Components/ResponsiveComponents/Landing/LandingMobile';
import LandingDesktop from '../Components/ResponsiveComponents/Landing/LandingDesktop';

function Landing() {
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1024;

    useEffect(() => {
        Aos.init({ duration: 2500, offset: 0, once: true });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    return <>{width < breakpoint ? <LandingMobile /> : <LandingDesktop />}</>;
}

export default Landing;
