import React from 'react';
import './display.css';
const Display = props => {
	//This is a stateless component used in the AppContainer container
    //This component contains the HTML to display the title and artist of the sound which is currently playing.
    
    //To this component, we pass in the following states as properties (These states are defined in AppContainer):
    //currentSoundIndex (integer)

    //We also pass in the sounds array of JSON data which is passed in as a property to the AppContainer in src/index.js
    //sounds (array)

    let title = null;
    let artist = null;

	if(props.sounds[props.currentSoundIndex]){
		title = props.sounds[props.currentSoundIndex].title;
		artist = props.sounds[props.currentSoundIndex].artist;
	}else{
		title = "";
		artist = "";

	}
	 return (<div id="display-area">
				<span className="sound-title">
					{title}
				</span>
				<span className="sound-artist">
					{artist}
				</span>	
		
			</div>          	
    	);
}

export default Display;
