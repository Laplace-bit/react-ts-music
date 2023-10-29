import React from 'react';
import './loadingBox.css';

const LoadingBox: React.FC = () => {
    return (
        <div className="loader">
            {
                [0, 1, 2, 1, 2, 2, 3, 3, 4].map(
                    (i, index) => (
                        < div key={index} className={`cell d-${i}`}></div>
                    )
                )
            }
        </div>
    )
};

export default LoadingBox;