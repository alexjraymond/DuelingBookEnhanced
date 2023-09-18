import React, { ButtonHTMLAttributes } from 'react';
import './button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonText: string;
    buttonUrl: string;
}

const Button: React.FC<ButtonProps> = ({buttonText, buttonUrl, ...buttonProps }) => {
    const buttonLink = () => {
        window.open(buttonUrl, '_blank');
    };


return (
    <div>
        <button onClick={buttonLink} {...buttonProps}>{buttonText}</button>
    </div>
    );
};

export default Button;
