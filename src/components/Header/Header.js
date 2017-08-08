import React from 'react';
import './header.css';

const Header = props => {
	//This is a stateless component used in the AppContainer container
    //This component contains the HTML to display the header of the application
    
    //To this component, we pass in the following method as a property (defined in AppContainer):
	//toggleSidePanel (parameters: none)

	return (<header>
			<ul className="header-nav" >
				<li className="header-menu-item">
					<a className="header-menu-link">
						
					</a>
				</li>
				<li className="header-menu-item">
					<a className="header-menu-link">
						
					</a>
				</li>
        			<li className="header-menu-item navicon" onClick={props.toggleSidePanel} >
					<span className="header-menu-link">
						<i className="fa fa-navicon"></i>
					</span>
				</li>  	        	 	
			</ul>
			</header>
	);
  
}

export default Header;
