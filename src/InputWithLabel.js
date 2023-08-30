import React, { useRef, useEffect } from 'react';
import style from './InputWithLabel.module.css';

const InputWithLabel = ({ children, value, onChange }) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    },);


    return (
        <div className={style.inputContainer}>
        <label className={style.label} htmlFor="todoTitle">{children}</label>
        <input
        ref={inputRef}
            id="todoTitle"
            type="text"
            value={value}
            onChange={onChange}
            name="todoTitle"
            
        />
        </div>
    );
};



export default InputWithLabel;
