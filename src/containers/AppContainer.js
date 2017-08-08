import React, { Component } from 'react';

import Header from '../components/Header/Header';

import SoundsList from '../components/SoundsList/SoundsList';

import AudioPlayer from '../components/AudioPlayer/AudioPlayer';

import Controls from '../components/Controls/Controls';

import Display from '../components/Display/Display';

import TimerBar from '../components/TimerBar/TimerBar';

import SidePanel from '../components/SidePanel/SidePanel';


class AppContainer extends Component {
	//This class is the main component of the application.
	constructor(props) {
    		super(props);
    		this.state = {
			sidePanelIsOpen: false,
			currentSoundIndex: 0,
			isPlaying: false,
			playerDuration: 0,
			currentTime: "0:00",
			currentWidthOfTimerBar: 0,
			backButtonIsDisabled: false,
			forwardButtonIsDisabled: false,
			playButtonIsDisabled: false
		};
		this.toggleSidePanel = this.toggleSidePanel.bind(this);
		this.loadPlayer = this.loadPlayer.bind(this);
		this.playSound = this.playSound.bind(this);
		this.pauseSound = this.pauseSound.bind(this);
		this.stopPlayer = this.stopPlayer.bind(this);
		this.playPauseSound = this.playPauseSound.bind(this);
		this.updateTimer = this.updateTimer.bind(this);
		this.goToPreviousSound = this.goToPreviousSound.bind(this);
		this.selectSound = this.selectSound.bind(this);
		this.goToNextSound = this.goToNextSound.bind(this);
  	}	
	componentDidMount() {
       	this.player = document.getElementById('audio_player');
    }
	secondsToMins(seconds){
		//As the length/duration of the mp3 sounds is stored in seconds in the array, 
		//we will use this method to display a more readable format of the duration to the user
		//we will also use it when displaying the current time of the player
		var first_part; 
		var second_part; 
		var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
		var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
		if (seconds > 599.5){
			first_part = "10";
		}else if (seconds > 539.5){
			first_part = "9";
		}else if (seconds > 479.5){
			first_part = "8";
		}else if (seconds > 419.5){
			first_part = "7";
		}else if (seconds > 359.5){
			first_part = "6";
		}else if(seconds > 299.5){
			first_part = "5";

		}else if(seconds > 239.5){
			first_part = "4";
		}else if(seconds > 179.5){
			first_part = "3";
		}else if(seconds > 119.5){
			first_part = "2";
		}else if(seconds > 59.5){
			first_part = "1";
		}else{
			first_part = "0";
		}
		if (seconds % 60 > 59.5){
			second_part = "00";
		}else if (seconds % 60 < 9.5){
			second_part = "0" + Math.round(numseconds);
		}else{
			second_part = "" + Math.round(numseconds);
		}
	
		var full_string = first_part + ":" + second_part;
		return full_string;
	}

	toggleSidePanel(){
		//This method is used to toggle the side panel. 
		//It is passed in as a property to the header component where it can be triggered with on onClick when the navicon symbol is pressed.
		//The side panel is currently blank however a navigation menu can easily be placed there in future iterations.

		var sidePanelIsOpen = this.state.sidePanelIsOpen;
		this.setState({sidePanelIsOpen: !sidePanelIsOpen});
		
	}
	loadPlayer(){
		//this method should be called when a new src attribute is inserted to an audio tag.
		this.player.load();
	}
	playSound(){
		//This method starts the audio player 
		this.player.play();
		//clear the currentWidthInterval in case the sound is already playing.
		clearInterval(this.currentWidthInterval);
		this.setState({isPlaying: true}); 	
	
		var sounds = this.props.sounds; //store the sounds property into a local variable
		var currentIndex = this.state.currentSoundIndex; //store the currentSoundIndex state into a local variable
		var duration = sounds[currentIndex].length; //we can also use this.player.duration to get the duration of the current song however it proves to be slower.
		//calculate what the width of the timer bar will be per second.
		//98% is the total with of the timer bar (in CSS)
		//we will change the width of the timer bar with CSS while the sound is playing. (see the TimerBar component.)
		var widthPerSecond = 98/duration;
		//need to store "this" into a variable as it will otherwise be out of scope in the setInterval method
		var self = this; 
		
		this.currentWidthInterval = setInterval(function (){self.updateTimer(widthPerSecond);}, 100);	
	}
	pauseSound(){
		//This method pauses the audio player.
		this.setState({isPlaying: false}); 	
		this.player.pause();
		clearInterval(this.currentWidthInterval);
	}
	stopPlayer() {
		//This method stops the audio player (i.e calls the pause method and also sets the currentTime of the player to 0)
		this.player.pause();
		this.player.currentTime = 0;
		//set the currentWidthOfTimerBar to 0 so the timer bar will go back to the starting position.
		this.setState({currentWidthOfTimerBar: 0});
		this.setState({currentTime: this.secondsToMins(this.player.currentTime)});
		clearInterval(this.currentWidthInterval);
		
	}
	playPauseSound(){
		//this method is called when the play/pause toggle button is pressed. 
		if(this.state.isPlaying){
			//if the player is in a state of "isPlaying" then we call the pauseSound() method
			this.pauseSound();	
		}else{	
			//if the player is currently paused (ie the state of "isPlaying" is false) then we call the playSound() method
			this.playSound();
		}
	}
	updateTimer(widthPerSecond){
		//Whenever the playSound() method is called, this method will run every 100 milliseconds.
		//it will update the timer bar so we can see the progress on the current sound.
		//it will also check to see if the current sound has reached the end of the duration so we can navigate to the next one.

		//get the current time of the current sound that is playing
		var currentTime = this.player.currentTime;

		//calculate the current width of the timer bar so that we can update the CSS width.
		var currentWidthOfTimerBar = currentTime*widthPerSecond;
		

		this.setState({currentWidthOfTimerBar: currentWidthOfTimerBar});
		this.setState({currentTime: this.secondsToMins(currentTime)});


		if((this.player.duration > 0) && (this.player.currentTime === this.player.duration)){
			//if we have reached the end of the sound then we will want the player to automatically navigate to play the next sound.

			//we stop the player. this will also clear the currentWidthInterval that is running this method (which was declared in playSound)
			this.stopPlayer();
			
			
			var sounds = this.props.sounds; //store the sounds property into a local variable
			var currentIndex = this.state.currentSoundIndex; //store the currentSoundIndex state into a local variable
			if(currentIndex === sounds.length - 1){
				//The currentIndex is equal to the length of the sounds array minus 1 
				//therefore we are at the end of the last sound of the array so we should navigate to the first sound
				//ie set the current sound index to 0.
				this.setState({currentSoundIndex: 0}, () => {
					//The following code will run as a callback, after the urrentSoundIndex state has been changed to 0.
					this.loadPlayer();
     				if(this.state.isPlaying){
						//if the player is in a state of playing already then play the sound, otherwise do nothing
						this.playSound();
					}	
				});
			}else{
				//we are in the middle of the playlist so navigate to the next sound
				var nextIndex = currentIndex + 1;
				//set the new currentSoundIndex state to be the next index
				this.setState({currentSoundIndex: nextIndex}, () => {
					//we need to load the player as a new src has been inserted.	
    				this.loadPlayer();
     				if(this.state.isPlaying){
						//if the player is in a state of playing then play the sound, otherwise do nothing
						this.playSound();
					}
    			});
			}
		}
	}
	selectSound(i){
		//This method is used fro when a user clicks on a sound from the list of sounds displayed.
		//It is passed in as a property to the SoundsList component.
		//if user selects a sound then we should firstly stop the player
		this.stopPlayer();
		
		//set the currentSoundIndex to be the index of the selected list item
		//The src will then be updated automatically in the AudioPlayer component
		this.setState({currentSoundIndex: i}, () => {
			//we need to load the player as a new src has been inserted.
			this.loadPlayer();
			if(this.state.isPlaying){
				//if the player is in a state of playing then play the sound, otherwise do nothing
				this.playSound();
			}		
		});	
	}
	goToPreviousSound(){
		//This method is called when the user presses the back button in the Controls component.
		//It is passed into the Controls component as a property	
		//It performs the operations necessary to navigate to the previous song.

		//firstly disable back button to prevents multiple requests
		this.setState({backButtonIsDisabled: true});
		
		var currentIndex = this.state.currentSoundIndex; //store the currentSoundIndex state into a local variable
		var currentTime = this.player.currentTime;	//store the currentTime of the player into a local variable
		//stop the player. this will set the currentTime to 0 also.
		this.stopPlayer();

		if(currentTime > 3 || currentIndex === 0){
			
			//if the current time of the current sound is greater than 3 seconds then we will go back 
			//to the start of this song rather than navigating to a previous song
			//we also do this if the current song is the first sound of the playlist ie the currentIndex is 0.
			//enable the back button
			this.setState({backButtonIsDisabled: false});
			if(this.state.isPlaying){
				//if the player is in a state of playing then play the sound, otherwise do nothing
				//we dont need to load the player because we havent changed the src.
				this.playSound();
			}

		}else if(currentIndex > 0){
			//if the current sound is not the first one of the playlist we will navigate to a previous song
			//also if the current time of the current sound is less than 3 seconds then we will navigate to a previous song
			
			var sounds = this.props.sounds;   //store the sounds property into a local variable

			//get the index of the previous sound in the array
			var previousIndex = currentIndex - 1;

			//set the new currentSoundIndex state to be the previous index
			this.setState({currentSoundIndex: previousIndex}, () => {
				//we need to load the player as a new src has been inserted.	
				
    			this.loadPlayer();
				this.setState({backButtonIsDisabled: false});
     			if(this.state.isPlaying){
					//if the player is in a state of playing already then play the sound, otherwise do nothing
					this.playSound();
				}
			});
		}
	}
	goToNextSound (){
		//This method is called when the user presses the forward button in the Controls component.	
		//It is passed into the Controls component as a property
		//It performs the operations necessary to navigate to the next song.

		//firstly disable forward button to prevents multiple requests
		this.setState({forwardButtonIsDisabled: true});
		//stop the player. this will set the currentTime to 0 also.
		this.stopPlayer();
		

		var sounds = this.props.sounds;   //store the sounds property into a local variable
		var currentIndex = this.state.currentSoundIndex; //store the currentSoundIndex state into a local variable

		if(currentIndex < (sounds.length - 1)){
			//If the currentSoundIndex is less than the index of the last sound of the array we come here
			//This prevents the player from navigating too far.
			var nextIndex = currentIndex + 1;
			//set the new currentSoundIndex state to be the next index
			this.setState({currentSoundIndex: nextIndex}, () => {
				//we need to load the player as a new src has been inserted.	
    			this.loadPlayer();
				//re-enable the forward button
				this.setState({forwardButtonIsDisabled: false});	
     			if(this.state.isPlaying){
					//if the player is in a state of playing then play the sound, otherwise do nothing
					this.playSound();
				}
    			});
		}else if(currentIndex === (sounds.length - 1)){
			//the user has pressed forward but we are currently playing the last sound in the playlist.
			//therefore navigate back to the first sound i.e set the currentSoundIndex to 0 as follows
			
			this.setState({currentSoundIndex: 0}, () => {
				//we need to load the player as a new src has been inserted.	
    			this.loadPlayer();
				//re-enable the forward button
				this.setState({forwardButtonIsDisabled: false});	
     			if(this.state.isPlaying){
					//if the player is in a state of playing then play the sound, otherwise do nothing
					this.playSound();
				}
    			});
    
		}
	}
	render() {
		return(<div>
				<div id="main-container" className={this.state.sidePanelIsOpen === true ? 'swipe-left' : ''}>
					<div className="ovrlay">
						<Header toggleSidePanel={this.toggleSidePanel} 
								sidePanelIsOpen={this.state.sidePanelIsOpen} />
						<SoundsList sounds={this.props.sounds} 
								currentSoundIndex={this.state.currentSoundIndex}
								selectSound={this.selectSound} />
				
						<AudioPlayer sounds={this.props.sounds} 
								currentSoundIndex={this.state.currentSoundIndex} />
						<div id="controls-area">
							<div className="overlay">
								<Display sounds={this.props.sounds} 
									currentSoundIndex={this.state.currentSoundIndex} />
								<TimerBar sounds={this.props.sounds} 
									currentTime={this.state.currentTime}
									currentSoundIndex={this.state.currentSoundIndex}
									currentWidth={this.state.currentWidthOfTimerBar}
									secondsToMins={this.secondsToMins} />	
				
								<Controls sounds={this.props.sounds} 
									isPlaying={this.state.isPlaying} 
									currentTime={this.state.currentTime} 
									currentSoundIndex={this.state.currentSoundIndex} 
									currentWidth={this.state.currentWidthOfTimerBar} 
									backButtonIsDisabled={this.state.backButtonIsDisabled} 
									playButtonIsDisabled={this.state.playButtonIsDisabled} 
									forwardButtonIsDisabled={this.state.forwardButtonIsDisabled} 
									secondsToMins={this.secondsToMins}  
									playPauseSound={this.playPauseSound} 
									goBack={this.goToPreviousSound} 
									goForward={this.goToNextSound} />
							</div>	
						</div>  
					</div>	
				</div>
				<SidePanel />
			</div>
		);	
	}
}

export default AppContainer;
