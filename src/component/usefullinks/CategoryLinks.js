import React, {Component} from 'react';
import './CategoryLinks.css';
import Link from './Link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Collapsible from 'react-collapsible';

class CategoryLinks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: props.links,
            category_label: props.category_label,
            collapse: props.idx === 0,
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }
    toggleCollapse() {
        this.setState({ collapse: !this.state.collapse });
    }
    render() {
        const { collapse, links, category_label } = this.state;
        return (
            <div className="category_links">
                <div className={"category_name" + (collapse ? " open" : "")} onClick={this.toggleCollapse}>
                    {category_label} <FontAwesomeIcon icon={collapse ? "angle-up" : "angle-down"}/>
                </div>
                <Collapsible open={collapse}>
                    <div className="links">
                        {links.map((link, i) =>
                            <Link link={link} key={i} />
                        )}
                    </div>
                </Collapsible>
            </div>
        );
    }
}
export default CategoryLinks;