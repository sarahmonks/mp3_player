import React from 'react';
import './header.css';

const Header = function(props) {

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
