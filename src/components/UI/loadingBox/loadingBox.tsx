import "./loadingBox.css"
import { memo } from 'react'
const LoadingBox: React.FC = () => {
    return (
        <div className="loader">
            <div className="cell d-0"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>
            <div className="cell d-2"></div>
            <div className="cell d-3"></div>
            <div className="cell d-3"></div>
            <div className="cell d-4"></div>
        </div>
    );
};

export default memo(LoadingBox);









