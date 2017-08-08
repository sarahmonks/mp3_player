import React from 'react';
import './side-panel.css';
const SidePanel = props => {
	//This is a stateless component used in the AppContainer container
    //This component contains the HTML for the side panel area of the application
    //We don't need to pass in any properties to this component

	 return (<div id="side-panel-area" className="scrollable">		
			<div className="side-panel-container">
				<div className="side-panel-header"></div>
			</div>
		</div>        	
    	);
}

export default SidePanel;
