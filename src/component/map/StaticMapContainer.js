import  React from  'react';

const StaticMapContainer = (props) => {
    const img_src = "https://api.mapbox.com/styles/v1/buildings/cjxyjvjf9034o1cqpoj373eoz/static/url-https%3A%2F%2Fimg.icons8.com%2Fcolor%2F48%2F000000%2Fmarker.png("+props.longitude+","+props.latitude+")/"+props.longitude+","+props.latitude+",17/1000x600?access_token=" + process.env.REACT_APP_MAPBOX_TOKEN;
    return (
        <div className="static_map">
            <img src={img_src} alt="Static map" />
        </div>
    );
}

export default StaticMapContainer;
