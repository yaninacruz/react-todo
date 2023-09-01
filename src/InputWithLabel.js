import React, { useRef, useEffect } from 'react';
import style from './InputWithLabel.module.css';

const InputWithLabel = ({
    todoTitle,
    handleTitleChange,
    title,
    type,
    id,
    children,
}) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    },);


    return (
        <>
            <label className={style.label} htmlFor={id}> {children}</label> 
            <input
                className={style.input}
                type={type}
                id={id}
                name={title}
                value={todoTitle}
                onChange={handleTitleChange}
                ref={inputRef}
            />
        </>
    );
};



export default InputWithLabel;
