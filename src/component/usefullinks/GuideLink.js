import React from 'react';
import './GuideLink.css';



const GuideLink = (props) => (

    <div className="link_guide">
        <div className="link_guide_url"><a href={props.link.url} target="_blank">{props.link.label}</a></div>
    </div>
)
export default GuideLink;