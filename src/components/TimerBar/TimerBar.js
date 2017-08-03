import React from 'react';
import './timer-bar.css';

const TimerBar = props => {
	//This is a stateless component for the timer bar of the audio player. 
	//

	//To this component, we pass in the following states as properties (These states are defined in AppContainer):
    //currentSoundIndex (integer)
    //sounds (array)
    //currentWidthOfTimerBar (float)
    //currentTime (string)

    //And we pass in the following method as a property (defined in AppContainer):
    //secondsToMins (parameter: seconds (integer))


	//firstly we get the duration of the current sound in the player so we can display it in the controls area.
	var duration;
	if(props.sounds[props.currentSoundIndex]){
		duration = props.secondsToMins(props.sounds[props.currentSoundIndex].length);
	}else{
		duration = "0:00";
	}
	//we then update the styling of the timer bar in order to visually communicate the current time of the sound that is playing.
	//the currentWidth property will be updated every 100 milliseconds while a sound is playing.
	//This update occurs in the "updateTimer" function in the AppContainer container.
	var currentWidthStyle = {
		width: props.currentWidth + '%'
	};
	return (<div id="timer-area">
             	<div id="timer-bar-area">	
					<div className="timer-bar-outer"></div>
					<div className="timer-bar" style={currentWidthStyle}>
						<span className="timer-bar-circle">
							<i className="fa fa-circle"></i>
						</span>
					</div>
				</div>  
				<div id="time-of-audio">
					<p className="audio-current-time">{props.currentTime}</p>
					<p className="audio-duration">{duration}</p>
				</div>	
			</div>
	);
  
}
export default TimerBar;
