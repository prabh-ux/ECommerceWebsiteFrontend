import React, { useEffect, useRef, useState } from 'react'

const Transition = ({ selected }) => {

    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);

    const enterTimeoutRef = useRef(null);
    const exitTimeoutRef = useRef(null);
    const hideTimeoutRef = useRef(null);




    useEffect(() => {

        clearTimeout(enterTimeoutRef.current);
        clearTimeout(exitTimeoutRef.current);
        clearTimeout(hideTimeoutRef.current);


        setVisible(true);
      setAnimate(true);
       


        exitTimeoutRef.current = setTimeout(() => {
            setAnimate(false);
            hideTimeoutRef.current=setTimeout(() => {
                setVisible(false);

            }, 100);
        }, 1000);

        return () => {
            clearTimeout(enterTimeoutRef.current);
            clearTimeout(exitTimeoutRef.current);
            clearTimeout(hideTimeoutRef.current);
            
        };

    }, [selected])
    if (!visible) return null;
    return (
        <div
            className={`inset-0 fixed bg-white flex justify-center items-center transition-all duration-300  z-20
                
                ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                
                `}
        >
            <h1 className='text-9xl  '>{ selected.toUpperCase()}</h1>

        </div>
    )
}

export default Transition