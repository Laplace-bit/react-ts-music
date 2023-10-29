
import React from 'react';
import "./button.css"

interface ButtonProps {
    text: string,
    hoverText: string,
    clickHandle: Function
}

const Button: React.FC<ButtonProps> = (props) => {
    const { text, hoverText, clickHandle } = props;
    const handleClick = () => {
        clickHandle()
    }

    return (
        <button onClick={handleClick} className="button" data-text="Awesome">
            <span className="actual-text">&nbsp;{text}&nbsp;</span>
            <span aria-hidden="true" className="hover-text">&nbsp;{hoverText}&nbsp;</span>
        </button>
    )
};

export default Button;