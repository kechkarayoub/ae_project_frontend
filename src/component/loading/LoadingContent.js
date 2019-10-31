import React from 'react';
import gif_loading from "../images/loading/gif_loading.gif";
import './LoadingContent.scss';

const LoadingContent = () => (
    <div className="loading_container">
        <img src={gif_loading} alt="Loading ..."/>
    </div>
)

export default LoadingContent;
