import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonText: string;
    buttonUrl: string;
}

const Button: React.FC<ButtonProps> = ({ buttonText, buttonUrl, ...buttonProps }) => {
    const buttonLink = () => {
        window.open(buttonUrl, '_blank');
    };

    return (
        <div>
            <button
                onClick={buttonLink}
                className="inline-block min-w-[90px] px-3 py-1 bg-blue-500 text-white text-sm rounded-md cursor-pointer transition-transform duration-200 ease-in h-[40px] rounded px-3 py-2 hover:bg-blue-400"
                {...buttonProps}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default Button;
