import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({ children, value, onChange }) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    },);


    return (
        <>
        <label htmlFor="todoTitle">{children}</label>
        <input
        ref={inputRef}
            id="todoTitle"
            type="text"
            value={value}
            onChange={onChange}
            name="todoTitle"
            
        />
        </>
    );
};



export default InputWithLabel;
