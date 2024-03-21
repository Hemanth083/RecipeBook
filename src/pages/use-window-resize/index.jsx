import { useEffect, useState } from "react";

export default function UseWindowResize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0 // Corrected typo here
    });

    function handleResize() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        handleResize(); // Call the function once to set the initial window size
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to run the effect only once on mount

    return windowSize;
}
