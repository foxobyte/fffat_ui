import React from 'react';
import './containers.css';

interface SingleValueContainerProps {
    label: string,
    value: string
}

const SingleValueContainer = (props: SingleValueContainerProps) => {
    return(
        <div className="single-value-container container flexc vapor-wave-theme">
            <div className="container-label">
                {props.label}
            </div>
            <div className="container-value">
                {props.value}
            </div>
        </div>
    )
}

export default SingleValueContainer;