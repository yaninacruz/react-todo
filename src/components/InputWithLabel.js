import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
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

InputWithLabel.propTypes = {
    todoTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};



export default InputWithLabel;
