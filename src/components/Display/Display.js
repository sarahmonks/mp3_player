import React from 'react';
import './display.css';
const Display = function(props) {
	//This component displays the title and artist of the sound which is currently playing.
	var title;
	var artist;
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
