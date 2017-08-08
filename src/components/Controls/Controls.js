import React from 'react';


import './controls.css';
const Controls = props => {
	//This is a stateless component used in the AppContainer container
    //This component contains the HTML of the controls area of the music player. i.e play/pause, back and forward buttons
    
    //To this component, we pass in the following states as properties (These states are defined in AppContainer):
	//isPlaying (boolean)
	//backButtonIsDisabled (boolean)
	//playButtonIsDisabled (boolean)
	//forwardButtonIsDisabled (boolean)

 	//And we pass in the following methods as properties (defined in AppContainer):
	//playPauseSound (parameters: none)
	//goBack (parameters: none)
	//goForward (parameters: none)

	return (<div id="controls">					
			<button onClick={props.goBack} className="btn-control" disabled={props.backButtonIsDisabled}><i className="fa fa-backward"></i></button>
			<button onClick={props.playPauseSound} className="btn-control" disabled={props.playButtonIsDisabled}><i className={"fa " + (props.isPlaying ? 'fa-pause' : 'fa-play')}></i></button>
			<button onClick={props.goForward} className="btn-control" disabled={props.forwardButtonIsDisabled}><i className="fa fa-forward"></i></button>
		</div>  	
	);
  
}

export default Controls;
