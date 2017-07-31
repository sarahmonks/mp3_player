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
		console.log('mounted');
	
    	}
	secondsToMins(seconds){
		//As the length/duration of the mp3 sounds is stored in seconds in the array, 
		//we will use this function to display a more readable format of the duration to the user
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
		var sidePanelIsOpen = this.state.sidePanelIsOpen;
		this.setState({sidePanelIsOpen: !sidePanelIsOpen});
		
	}
	loadPlayer(){
		this.player.load();
	}
	playSound(){
		//var x = document.getElementById("src_mp3").getAttribute("src");
		console.log(document.getElementById("src_mp3").getAttribute("src"));
		clearInterval(this.currentWidthInterval);
		this.setState({isPlaying: true}); 	
		this.player.play();
	
		var sounds = this.props.sounds; 
		
		var currentIndex = this.state.currentSoundIndex;
		var duration = sounds[currentIndex].length; //this.player.duration;
		//calculate what the width of the timer bar will be per second.
		//98% is the total with of the timer bar
		//we will change the width of the timer bar with CSS while the sound is playing. see the TimerBar component.
		var widthPerSecond = 98/duration;
		//need to store "this" into a variable as it will otherwise be out of scope in the setInterval method
		var self = this; 
		
		this.currentWidthInterval = setInterval(function (){self.updateTimer(widthPerSecond);}, 100);	
	}
	pauseSound(){
		this.setState({isPlaying: false}); 	
		this.player.pause();
		clearInterval(this.currentWidthInterval);
	}
	stopPlayer() {
		this.player.pause();
		this.player.currentTime = 0;
		this.setState({currentWidthOfTimerBar: 0});
		this.setState({currentTime: this.secondsToMins(this.player.currentTime)});
		clearInterval(this.currentWidthInterval);
		
	}
	playPauseSound(){
		//this function is called when the play/pause toggle button is pressed. 
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
		
		//console.log('this.player.duration ' +  this.player.duration);

		this.setState({currentWidthOfTimerBar: currentWidthOfTimerBar});
		this.setState({currentTime: this.secondsToMins(currentTime)});


		if((this.player.duration > 0) && (this.player.currentTime === this.player.duration)){
			//if we have reached the end of the sound then we will want the player to automatically navigate to play the next sound.
			console.log('this.player.duration ' +  this.player.duration);
			console.log('this.player.currentTime ' + this.player.currentTime);

			//we stop the player. this will also clear the interval that is running this method 
			this.stopPlayer();
			
			
			var sounds = this.props.sounds; 
			var currentIndex = this.state.currentSoundIndex;
			if(currentIndex === sounds.length - 1){
				//therefore we are at the end of the last sound of the array so we should navigate to the first sound
				//ie set the current sound index to 0.
				this.setState({currentSoundIndex: 0}, () => {
					this.loadPlayer();
     					if(this.state.isPlaying){
						//if the player is in a state of playing already then play the sound
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
						//if the player is in a state of playing then play the sound
						this.playSound();
					}
    				});
			}
		}
	}
	selectSound(i){
		//if user selects a sound then we should firstly stop the player
		this.stopPlayer();
		
		//set the currentSoundIndex to be the index of the selected list item
		this.setState({currentSoundIndex: i}, () => {
			//we need to load the player as a new src has been inserted.
			this.loadPlayer();
			if(this.state.isPlaying){
				//if the player is in a state of playing come here
				this.playSound();
			}		
		});	
	}
	goToPreviousSound(){
		//this function is called when the user presses the back button in the controls.	
		//firstly disable back button
		this.setState({backButtonIsDisabled: true});
		
		var currentIndex = this.state.currentSoundIndex;
		var currentTime = this.player.currentTime;	
		//stop the player. this will set the currentTime to 0 also.
		this.stopPlayer();

		console.log("currentTime " + currentTime);
		if(currentTime > 3 || currentIndex === 0){
			
			//if the current time of the current sound is greater than 3 seconds then we will go back 
			//to the start of this song rather than navigating to a previous song
			//we also do this if the current song is the first sound of the playlist ie the currentIndex is 0.
			
			this.setState({backButtonIsDisabled: false});
			if(this.state.isPlaying){
				//if the player is in a state of playing we come here
				//we dont need to load the player because we havent changed the src.
				this.playSound();
			}

		}else if(currentIndex > 0){
			//if the current sound is not the first one of the playlist we will navigate to a previous song
			//also if the current time of the current sound is less than 3 seconds then we will navigate to a previous song
			
			var sounds = this.props.sounds;   //make a copy of the state of the sounds

			//get the index of the previous sound in the array
			var previousIndex = currentIndex - 1;

			//set the new currentSoundIndex state to be the previous index
			this.setState({currentSoundIndex: previousIndex}, () => {
				//we need to load the player as a new src has been inserted.	
				
    				this.loadPlayer();
				this.setState({backButtonIsDisabled: false});
     				if(this.state.isPlaying){
					//if the player is in a state of playing already then play the sound
					this.playSound();
				}
			});
		}
	}
	goToNextSound (){
		//this function is called when the user presses the forward button in the controls.	
		//firstly disable forward button
		this.setState({forwardButtonIsDisabled: true});
		this.stopPlayer();
		
		//it sets the currentIndex to be the next index
		var sounds = this.props.sounds;   //make a copy of the state of the sounds
		var currentIndex = this.state.currentSoundIndex;

		if(currentIndex < (sounds.length - 1)){
			var nextIndex = currentIndex + 1;
			//set the new currentSoundIndex state to be the next index
			this.setState({currentSoundIndex: nextIndex}, () => {
				//we need to load the player as a new src has been inserted.	
    				this.loadPlayer();
				//re-enable the forward button
				this.setState({forwardButtonIsDisabled: false});	
     				if(this.state.isPlaying){
					//if the player is in a state of playing then play the sound
					this.playSound();
				}
    			});
		}else if(currentIndex === (sounds.length - 1)){
			//the user has pressed forward but we are currently playing the last sound in the playlist.
			//therefore navigate back to the first sound.
			
			this.setState({currentSoundIndex: 0}, () => {
				//we need to load the player as a new src has been inserted.	
    				this.loadPlayer();
				//re-enable the forward button
				this.setState({forwardButtonIsDisabled: false});	
     				if(this.state.isPlaying){
					//if the player is in a state of playing then play the sound
					this.playSound();
				}
    			});
    
		}
	}
	render() {
    

		return(<div>
				<div id="main-container" className={this.state.sidePanelIsOpen === true ? 'swipe-left' : ''}>
					<div className="ovrlay">
						<Header toggleSidePanel={this.toggleSidePanel} sidePanelIsOpen={this.state.sidePanelIsOpen} />
						<SoundsList selectSound={this.selectSound} sounds={this.props.sounds} currentSoundIndex={this.state.currentSoundIndex} />
				
						<AudioPlayer sounds={this.props.sounds} currentSoundIndex={this.state.currentSoundIndex} />
						<div id="controls-area">
							<div className="overlay">
								<Display sounds={this.props.sounds} currentSoundIndex={this.state.currentSoundIndex} />
								<TimerBar secondsToMins={this.secondsToMins} currentWidth={this.state.currentWidthOfTimerBar}
									currentTime={this.state.currentTime} sounds={this.props.sounds} 
									currentSoundIndex={this.state.currentSoundIndex}/>	
				
								<Controls secondsToMins={this.secondsToMins}  currentWidth={this.state.currentWidthOfTimerBar} 
									currentTime={this.state.currentTime} sounds={this.props.sounds} 
									currentSoundIndex={this.state.currentSoundIndex} 
									backButtonIsDisabled={this.state.backButtonIsDisabled} 
									playButtonIsDisabled={this.state.playButtonIsDisabled} 
									forwardButtonIsDisabled={this.state.forwardButtonIsDisabled} 
									isPlaying={this.state.isPlaying} playPauseSound={this.playPauseSound} 
									goBack={this.goToPreviousSound} goForward={this.goToNextSound} />
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
