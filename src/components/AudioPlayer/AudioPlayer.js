import React from 'react';

const AudioPlayer = props => {
	//This is a stateless component used in the AppContainer container
    //This component contains the HTML for the audio tag that will be used when playing sounds from the sounds array.
    
    //To this component, we pass in the following states as properties (These states are defined in AppContainer):
    //currentSoundIndex (integer)

    //We also pass in the sounds array of JSON data which is passed in as a property to the AppContainer in src/index.js
    //sounds (array)

	var mp3Src = props.sounds[props.currentSoundIndex].mp3;

		return (<audio id="audio_player">
					<source id="src_mp3" type="audio/mp3" src={mp3Src} />
					<source id="src_ogg" type="audio/ogg" src={mp3Src} />
					<object id="audio_object" type="audio/x-mpeg" width="200px" height="45px" data={mp3Src}>
						<param id="param_src" name="src" value={mp3Src} />
						<param id="param_src" name="src" value={mp3Src} />
						<param name="autoplay" value="false" />
						<param name="autostart" value="false" />
					</object>
				</audio>	
		);
  
}



export default AudioPlayer;
