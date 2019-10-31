import  React, { Component } from  'react';
import LinksService from "../../services/LinksService";
import CategoryLinks from './CategoryLinks';
import './LinksList.scss';
import GuideLink from './GuideLink';
import TitlePage from '../utils/TitlePage';
import links_img from '../images/usefullinks/links_img.jpg';

const linksService = new LinksService();

class LinksList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            categories: {},
            guides: []
        };
    }

    componentDidMount() {
        var self = this;
        linksService.getLinks().then(function (result) {
            self.setState({ ready: true, categories: result.categories, guides: result.guides });
        });
    }


    render() {
        const { ready, categories, guides } = this.state;
        return (
            <div>
                {ready ?
                    <div className="links--container">
                        <TitlePage title={this.props.t('global.title_page.useful_links')}/>
                        <div className="list_links">
                            <h2>{this.props.t('global.title_page.useful_links')}</h2>
                            <div className="usefullinks">
                                {Object.keys(categories).map((key, i) => 
                                    <CategoryLinks key={i} category_label={key} idx={i} links={categories[key]}/>
                                )}
                                {Object.keys(categories).length === 0 &&
                                    <div className="no_useful_link">{this.props.t('useful_links.no_useful_link')}</div>
                                }
                            </div>
                        </div>
                        <div className="list_guides">
                            <h2>{this.props.t('useful_links.guides')}</h2>
                            <div className="guides">
                                {guides.map((guide, i) => 
                                    <GuideLink link={guide} key={i} />
                                )}
                            </div>
                            {links_img &&
                                <div className="links_img">
                                    <img src={links_img} />
                                </div>
                            }
                        </div>
                    </div >
                :
                    <div></div>
                }
            </div>
        );
    }
}
export default LinksList;