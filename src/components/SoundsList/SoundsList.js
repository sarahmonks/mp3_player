import React from 'react';
import './sounds-list.css';
const SoundsList = function(props) {
	//This is a stateless component which contains a list of sounds.
	//You can navigate to a particular sound in the list by clicking it.
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
