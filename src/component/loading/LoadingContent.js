import gif_loading from "../images/loading/gif_loading.gif";
import React from 'react';
import './LoadingContent.css';

const LoadingContent = ({t}) => (
    <div className="loading_container">
        <img src={gif_loading} alt={t("global.loading")}/>
    </div>
)

export default LoadingContent;
