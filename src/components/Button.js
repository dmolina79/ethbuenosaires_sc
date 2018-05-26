import React from 'react';

const Button = ({ text, onClick }) => {
    return (
        <div>
            <button onClick={onClick}>Dale click!</button>
        </div>

    );
}

export default Button;