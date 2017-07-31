import React from 'react';


import './controls.css';
const Controls = function(props) {
	//This is a stateless component	which contains the controls of the music player. i.e play/pause, back and forward buttons
	return (<div id="controls">					
			<button onClick={props.goBack} className="btn-control" disabled={props.backButtonIsDisabled}><i className="fa fa-backward"></i></button>
			<button onClick={props.playPauseSound} className="btn-control" disabled={props.playButtonIsDisabled}><i className={"fa " + (props.isPlaying ? 'fa-pause' : 'fa-play')}></i></button>
			<button onClick={props.goForward} className="btn-control" disabled={props.forwardButtonIsDisabled}><i className="fa fa-forward"></i></button>
		</div>  	
	);
  
}

export default Controls;
