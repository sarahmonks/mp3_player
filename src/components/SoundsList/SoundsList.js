import React from 'react';
import './sounds-list.css';
const SoundsList = props => {
	//This is a stateless component used in the AppContainer container
    //This component contains the HTML for the list of sounds that can be played with the audio player.
    //You can navigate to a particular sound in the list by clicking it.

    //To this component, we pass in the following states as properties (These states are defined in AppContainer):
    //currentSoundIndex (integer)

 	//And we pass in the following methods as properties (defined in AppContainer):
	//selectSound (parameters: index (integer))

    //We also pass in the sounds array of JSON data which is passed in as a property to the AppContainer in src/index.js
    //sounds (array)

	 return (<div className="scrollable-container scrollable">
			<div id="list-of-sounds-container">
				<ul id="list-of-sounds">
				{props.sounds.map(function(sound, i) {
					//this is the current sound playing so add a class called selected
					return (
					<li key={i}  className={"sound-list-item " + (props.currentSoundIndex === i ? 'selected' : 'not-selected')}>
						<span className="sound-info-area" onClick={props.selectSound.bind(null, i)}>
							<span className="sound-title">{sound.title}</span>
							<span className="sound-artist">{sound.artist}</span>
						</span>
						<span><i className="fa fa-heart"></i></span>
					</li>
					);
				})}
				</ul>
			</div> 
		</div>         	
    	);
}
export default SoundsList;
