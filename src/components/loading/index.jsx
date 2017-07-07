import * as React from 'react';
import './index.css';
const Loading = () => {
    return (
        <div className="loading-container">
            <div className="outside-circle">
                <div className="inside-circle">
                    
                </div>
            </div>
            <p className="circle-text">
                <span className="text"></span>
            </p>
        </div>
    )
}
export default Loading;