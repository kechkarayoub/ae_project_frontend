import React from 'react';
import './Link.css';



const Link = (props) => (

    <div className="link">
        <a href={props.link.url} target="_blank"><div className="link_url">{props.link.label}</div></a>
    </div>
)
export default Link;