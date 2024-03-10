/*Variables used for timer*/
var minutes = 25;																//minutes variable
var seconds = 0;																//seconds variable
var counter; 																	//the counter is for the ms (1000) 								
var work = true;																//tell the program if its on work mode


/*Button variables*/
var startbtn = document.getElementById("startbutton");								//button variable for the start button
startbtn.disabled = false;															//enables the user to click the start button
var stopbtn = document.getElementById("stopbutton");								//button variable for the stop button
stopbtn.disabled = true;															//disables the user to click the stop button


/*Image and sound variables*/
var mp3 = "success.mp3" 															//sound when the user finishes time		
var img;
var index = 1;
var gallery = ["tomato1.png", "tomato2.png", "tomato3.png","tomato4.png", "tomato5.png"];
var done = [];
var current = [];
var upcoming = [];
var holder = [];
var hold = 0;
var show = '';
var comparer = 0;																
document.getElementById('timerdiv').innerHTML = minutes + ':' + seconds;		//initial display when html is opened

function begin(){								//this function will initiate when the user presses start, this starts the timer
	
	if(work==true){								//checks if on work mode
		setWork();								//this sets the timer's time for work (minute)
		startbtn.disabled=true;					//disables the user to click the start button again
		stopbtn.disabled=false;					//enables the uset to click stop button
		counter = setInterval(timer,1000);		//starts the timer function
		img = setInterval(imageChange, (minutes/5)*60000);
		if(current.length==0){
			update();
		}
	}
	
	else{										//if on break mode
		setBreak();								//this sets the timer's time for break (minute)
		startbtn.disabled=true;					//disables the user to click the start button again
		stopbtn.disabled=false;					//enables the uset to click stop button
		counter = setInterval(timer,1000);		//starts the timer function
		img = setInterval(imageChange, (minutes/5)*60000);
	}
	
}

function setWork(){								//this function takes the inputted value of the user for the work time
	var timegivenbyuser = document.getElementById("pomodorotime").value; //gets the inputted value of time 
	minutes = timegivenbyuser;											 //assigns the value of the minutes that will be used
}

function setBreak(){							//this function takes the inputted value of the user for the break time
	var timegivenbyuser = document.getElementById("pomodorobreak").value; //gets the inputted value of time 
	minutes = timegivenbyuser;											  //assigns the value of the minutes that will be used
}	

function atWork(){  							//this function sets it to work mode
	stop();										//if the user was on another mode, it will stop the previous interval
	seconds = 0;								//resets the value of seconds
	setWork();									//this function takes the inputted value of the user for the work time
	document.getElementById('timerdiv').innerHTML = minutes + ':' + '0' + seconds; //displays the amount of time provided
	index = 0;
	imageChange();
	startbtn.disabled=false;					//enables the user to click the start button
	stopbtn.disabled=true;						//disables the uset to click stop button
	work = true;								//tells the program that it is on work mode
}

function atBreak(){								//this function is for break mode
	stop();										//if the user was on another mode, it will stop the previous interval
	seconds = 0;								//resets the value of seconds
	setBreak();									//this function takes the inputted value of the user for the break time
	document.getElementById('timerdiv').innerHTML = minutes + ':' + '0' + seconds; //displays the amount of time provided
	index = 0;
	imageChange();
	startbtn.disabled=false;					//enables the user to click the start button
	stopbtn.disabled=true;						//disables the uset to click stop button
	work = false;								//tells the program that it is on break mode
}

function resettime(){							//this function resets the time to the original time
	if(work==true){								//checks if the program is on work mode
		stop();									//stops previous timer
		startbtn.disabled=false;				//enables the user to click the start button
		seconds = 0;							//resets the value of seconds
		index = 0;								//resets the value of index
		imageChange();							//changes the image of the tomato
		atWork();								//goes to work mode and displays the value for time
	}
	
	else{										//if the program is break mode
		stop();									//stops the previous timer
		startbtn.disabled=false;				//enables the user to click the start button
		seconds = 0;							//resets the value of seconds
		index = 0;								//resets the value of index
		imageChange();							//changes the image of the tomato
		atBreak();								//goes to break mode and displahys the value for time
	}
}


function stop(){								//stops the current timer
	stopbtn.disabled=true;						//disables the uset to click stop button
	clearInterval(counter);
	clearInterval(img);
}

function up(){									//when the timer is over
  counter=setInterval(timerUp, 1000);
}

function timerUp(){ 							//when the timer is over
  seconds++;
}

function timer(){
	//add stop here 
	 seconds--; 												//seconds will decrease
  
	 if(seconds<0){												//if seconds = 0 already
		 minutes--;												//it will decrease the minutes time
		 seconds = 59;											//it will reset seconds again
	 }
	 
	 if(seconds == 0 && minutes == 0){											//if it reaches 0:00 
		document.getElementById('timerdiv').innerHTML = minutes + ':' + '00'; 	//will display at the div of html
		clearInterval(counter);													//erases the value of setInterval() that was set
		var audio = new Audio(mp3);												//will be used to play the audio
		audio.play();															//audio playing indicating to the user time is up
		if(work==true){
			update();
		}
		up();																	//just adds a second.
	  }

	document.getElementById('timerdiv').innerHTML = minutes + ':' + seconds;	//displays the time running
	
	if(seconds < 10){															//this displays the time running na less than 10 seconds (ex: 6:01) 
		document.getElementById('timerdiv').innerHTML = minutes + ':' + '0' + seconds;}
	}
	
	if(minutes > 0 && seconds < 10){											//if the minutes ain't 0 and the value of the seconds is less than 10
	document.getElementById('timerdiv').innerHTML = minutes + ':' + '0' + seconds; 

}

function imageChange(){
	if (index === gallery.length){
		index = 0;
	}
	document.getElementById("images").src = gallery[index];
	index++;
}

function addTask() {
	if (document.getElementById("input").value.length != 0) {							// Makes sure input textbox is not empty
		upcoming.push(document.getElementById("input").value);							// Adds text inside textbox to upcoming array
		document.getElementById("upcomingList").innerHTML = upcoming.join("<br>");		// Displays the newly updated array in the website
		holder.push(document.getElementById("iter").value);
		document.getElementById("input").value = "";
	}
	else {
		alert("Please input something");
	}
}

// Sets current task as done, then makes the next upcoming task the current one
function update() {
	if(comparer==hold){
		comparer = 0;
		// If there is a current task, sets it as done
		if (current.length != 0) {
			done.push(current.shift());
		}

		// If there is an upcoming task, sets it as the current one
		if (upcoming.length != 0) {
			hold = holder.shift();
			current.push(upcoming.shift());
			show = "Current Task: " + current[0] + " " + comparer + "/" + hold;
		}
		else{
			show = "Done!";
		}
	}else {
		comparer++;
		show = "Current Task: " + current[0] + " " + comparer + "/" + hold;
		if(comparer==hold){
			update();
		}
	}
	
	// Displays each of the updated arrays in the website
	document.getElementById("doneList").innerHTML = done.join("<br>");
	document.getElementById("currentList").innerHTML = current.join("<br>");
	document.getElementById("upcomingList").innerHTML = upcoming.join("<br>");
	document.getElementById("show").innerHTML = show;
}

// Removes all tasks in the list
function resetList() {
	// Empties the three arrays
	done = [];
	current = [];
	upcoming = [];
	
	// Displays each of the updated arrays in the website
	document.getElementById("doneList").innerHTML = done.join("<br>");
	document.getElementById("currentList").innerHTML = current.join("<br>");
	document.getElementById("upcomingList").innerHTML = upcoming.join("<br>");
	document.getElementById("show").innerHTML = "Let's get productive!";
}

//Reference: JON GRANT'S CODE https://codepen.io/jong649/pen/NxPaLY
