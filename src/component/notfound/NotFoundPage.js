import { Link } from 'react-router-dom';
import React from 'react';
import pageNotFoundImg from '../images/notfound/pageNotFoundImg.png';
import './NotFoundPage.scss';

class NotFoundPage extends React.Component{
    render(){
        return <div id="notFound">
		    <div className="notFound">
			    <div className="notFound-404">
				    <h1>404</h1>
				    <h2>Page not found</h2>
			    </div>
			    <Link to="/">Home page</Link>
		    </div>
	    </div>
    }
}
export default NotFoundPage;
