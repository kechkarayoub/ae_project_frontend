import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import './NotFoundPage.css';

class NotFoundPage extends React.Component{
	constructor(props){
		super(props);
        document.title = props.t('notFound.title');
	}
    render(){
        return <div id="notFound">
		    <div className="notFound">
			    <div className="notFound-404">
				    <h1>404</h1>
				    <h2>{this.props.t('notFound.message1')}</h2>
			    </div>
			    <Link to="/">{this.props.t('notFound.message2')}</Link>
		    </div>
	    </div>
    }
}
export default withTranslation('common')(NotFoundPage);
