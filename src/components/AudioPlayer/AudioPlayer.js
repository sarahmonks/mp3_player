import React from 'react';

const AudioPlayer = props => {

	var mp3Src = props.sounds[props.currentSoundIndex].mp3;
	console.log(mp3Src);
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
