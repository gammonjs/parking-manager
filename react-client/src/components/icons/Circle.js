import React from 'react';

const Circle = props => {

    return (
        <svg 
                width="24" height="24"
                viewBox="0 0 24 24"
                fill={props.fill}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-circle">
            <circle cx="12" cy="12" r="10">
            </circle>
        </svg>
    );
}

export default Circle;
