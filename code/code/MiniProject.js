// The last played key number
let last_mouse_key_number = -1;

// Map the key with the key number
let key_mapping = {
    // White keys of the first octave
    "z":  0, "x":  2, "c":  4, "v":  5, "b":  7, "n":  9, "m": 11,
    // Black keys of the first octave
    "s":  1, "d":  3, "g":  6, "h":  8, "j": 10,
    // White keys of the second octave
    "w": 12, "e": 14, "r": 16, "t": 17, "y": 19, "u": 21, "i": 23,
    // Black keys of the second octave
    "3": 13, "4": 15, "6": 18, "7": 20, "8": 22
}

// Signal the key is down
//let key_down_status = new Array(23);
let stop = true;
let timerIds = [];
let btns=[];
let last_pattern="No demo";
let label1 = document.getElementById("bar1");
let label2 = document.getElementById("bar2");
let label3 = document.getElementById("bar3");
let label4 = document.getElementById("bar4");

function handleNoteOn(key_number) {
	//if (stop == false){
	let pitch = key_number;
    var volume=parseInt(document.getElementById("volume").value);
    //console.log("volume is "+volume);
    MIDI.noteOn(0, pitch, volume);//}
}

function handleNoteOff(key_number) {
	//if (stop == false){
	let pitch = key_number;
    MIDI.noteOff(0, pitch);//} 
}

function handlePianoMouseDown(evt) {
    // Determine which piano key has been clicked on
    // evt.target tells us which item triggered this function
    // The piano key number is extracted from the key id (0-23)
   

	if (typeof($(evt.target).attr("id")) == "string" && $(evt.target).attr("id")!="play" &&
	$(evt.target).attr("id")!= "record" && $(evt.target).attr("id")!= "save" && $(evt.target).attr("id")!= "import"){
	let clicked = $(evt.target).attr("value").substring(2);
    let key_number = $(evt.target).attr("value").substring(0,2);
	
    key_number = parseInt(key_number);

	if(clicked == "f"){
	handleNoteOn(key_number);
    console.log("Piano mouse down event for key " + key_number + "!");

    // Remember the key number
    last_mouse_key_number = key_number;
	}
	}
}

function handlePianoMouseUp(evt) {
    
	if (typeof($(evt.target).attr("id")) == "string" && $(evt.target).attr("id")!="play" &&
	$(evt.target).attr("id")!= "record" && $(evt.target).attr("id")!= "save" && $(evt.target).attr("id")!= "import"){
    // last_key_number is used because evt.target does not necessarily
    // equal to the key that has been clicked on 
    if (last_mouse_key_number < 0) return;
    
    // Stop the note
    handleNoteOff(last_mouse_key_number);

    // Show a simple message in the console
    console.log("Piano mouse up event for key " + last_mouse_key_number + "!");

    // Reset the key number
    last_mouse_key_number = -1;}
}

function arrayNum(num){
	if(document.getElementById("reverse").checked){
		num = 17 - num;
	}
	return num;
}

/*function turnOnLabel(num){
	console.log("num: "+num);
	if(0 < num <= 4){
		label2.style.backgroundColor = "#C38C9F";
	}
	else if(4 < num <= 8){
		label1.style.backgroundColor = "#C38C9F";
	}
	else if(8 < num <= 12){
		label3.style.backgroundColor = "#C38C9F";
	}
	else{
		label4.style.backgroundColor = "#C38C9F";
	}
}

function turnOffLabel(num){
	if(0 < num <= 4){
		label2.style.backgroundColor = "rgb(255, 255, 255)";
	}
	else if(4 < num <= 8){
		label1.style.backgroundColor = "rgb(255, 255, 255)";
	}
	else if(8 < num <= 12){
		label3.style.backgroundColor = "rgb(255, 255, 255)";
	}
	else{
		label4.style.backgroundColor = "rgb(255, 255, 255)";
	}
}*/

function handlePattern(pattern){
    //ar option=$("#inputGroupSelect01 option:selected");
    //ar pattern=option.val();
    //onsole.log("pattern is"+pattern);
    keys=[];
    /*if(last_pattern!="No demo"){
        switch(last_pattern){
            case "Rock":{
                keys[0]="chihat1";
                keys[1]="chihat3";
                keys[2]="chihat5";
                keys[3]="chihat7";
                keys[4]="chihat9";
                keys[5]="chihat11";
                keys[6]="chihat13";
                keys[7]="chihat15";
                keys[8]="snare5";
                keys[9]="snare13";
                keys[10]="kick1";
                keys[11]="kick7";
                keys[12]="kick9";
                break;
            }
            case "Rock II":{
                keys[0]="chihat1";
                keys[1]="chihat3";
                keys[2]="chihat5";
                keys[3]="chihat7";
                keys[4]="chihat9";
                keys[5]="chihat11";
                keys[6]="chihat13";
                keys[7]="chihat15";
                keys[8]="snare5";
                keys[9]="snare13";
                keys[10]="kick1";
                keys[11]="kick4";
                keys[12]="kick7";
                keys[13]="kick10";
                keys[14]="kick11";
                break;
            }
            case "Funk":{
                keys[0]="chihat1";
                keys[1]="chihat2";
                keys[2]="chihat3";
                keys[3]="chihat4";
                keys[4]="chihat5";
                keys[5]="chihat6";
                keys[6]="chihat7";
                keys[7]="chihat8";
                keys[8]="chihat9";
                keys[9]="chihat10";
                keys[10]="chihat11";
                keys[11]="chihat12";
                keys[12]="chihat13";
                keys[13]="chihat14";
                keys[14]="chihat15";
                keys[15]="chihat16";
                keys[16]="snare5";
                keys[17]="snare13";
                keys[18]="kick1";
                keys[19]="kick2";
                keys[20]="kick7";
                keys[21]="kick8";
                break;
            }
            case "Funk II":{
                keys[0]="chihat1";
                keys[1]="chihat3";
                keys[2]="chihat5";
                keys[3]="chihat7";
                keys[4]="chihat9";
                keys[5]="chihat11";
                keys[6]="chihat13";
                keys[7]="chihat15";
                keys[8]="chihat16";
                keys[9]="snare5";
                keys[10]="kick1";
                keys[11]="kick8";
                keys[12]="kick10";
                keys[13]="kick11";
                break;
            }
            case "Funk III":{
                keys[0]="chihat1";
                keys[1]="chihat3";
                keys[2]="chihat5";
                keys[3]="chihat7";
                keys[4]="chihat8";
                keys[5]="chihat9";
                keys[6]="chihat13";
                keys[7]="chihat15";
                keys[8]="ohihat11";
                keys[9]="snare5";
                keys[10]="kick1";
                keys[11]="kick8";
                keys[12]="kick9";
                keys[13]="kick11";
                keys[14]="snare13";
                keys[15]="kick15";
                break;
            }
            case "Hip-Hop":{
                keys[0]="chihat1";
                keys[1]="chihat3";
                keys[2]="chihat5";
                keys[3]="chihat7";
                keys[4]="chihat9";
                keys[5]="chihat11";
                keys[6]="chihat13";
                keys[7]="chihat15";
                keys[8]="snare5";
                keys[9]="snare7";
                keys[10]="kick1";
                keys[11]="kick11";
                break;
            }
            case "Shuffle":{
                keys[0]="ltom1";
                keys[1]="ltom3";
                keys[2]="ltom9";
                keys[3]="ltom11";
                keys[4]="ltom15";
                keys[5]="snare5";
                keys[6]="snare7";
                keys[7]="snare13";
                keys[8]="tambourine5";
                keys[9]="tambourine13";
                break;
            }
        }
    }*/
    for(var i=0;i < btns.length;i++){
        //var key=document.getElementById(keys[i]);
        //key.style.backgroundColor = "#806290";
		//key.value = key.value.substring(0,2)+"f";
        btns[i].style.backgroundColor = "#806290";
		btns[i].value = btns[i].value.substring(0,2)+"f";
    }

    keys=[];
    switch(pattern){
        case "No demo":{
            break;
        }
        case "Rock":{
            keys[0]="chihat1";
            keys[1]="chihat3";
            keys[2]="chihat5";
            keys[3]="chihat7";
            keys[4]="chihat9";
            keys[5]="chihat11";
            keys[6]="chihat13";
            keys[7]="chihat15";
            keys[8]="snare5";
            keys[9]="snare13";
            keys[10]="kick1";
            keys[11]="kick7";
            keys[12]="kick9";
            break;
        }
        case "Rock II":{
            keys[0]="chihat1";
            keys[1]="chihat3";
            keys[2]="chihat5";
            keys[3]="chihat7";
            keys[4]="chihat9";
            keys[5]="chihat11";
            keys[6]="chihat13";
            keys[7]="chihat15";
            keys[8]="snare5";
            keys[9]="snare13";
            keys[10]="kick1";
            keys[11]="kick4";
            keys[12]="kick7";
            keys[13]="kick10";
            keys[14]="kick11";
            break;
        }
        case "Funk":{
            keys[0]="chihat1";
            keys[1]="chihat2";
            keys[2]="chihat3";
            keys[3]="chihat4";
            keys[4]="chihat5";
            keys[5]="chihat6";
            keys[6]="chihat7";
            keys[7]="chihat8";
            keys[8]="chihat9";
            keys[9]="chihat10";
            keys[10]="chihat11";
            keys[11]="chihat12";
            keys[12]="chihat13";
            keys[13]="chihat14";
            keys[14]="chihat15";
            keys[15]="chihat16";
            keys[16]="snare5";
            keys[17]="snare13";
            keys[18]="kick1";
            keys[19]="kick2";
            keys[20]="kick7";
            keys[21]="kick8";
            break;
        }
        case "Funk II":{
            keys[0]="chihat1";
            keys[1]="chihat3";
            keys[2]="chihat5";
            keys[3]="chihat7";
            keys[4]="chihat9";
            keys[5]="chihat11";
            keys[6]="chihat13";
            keys[7]="chihat15";
            keys[8]="chihat16";
            keys[9]="snare5";
            keys[10]="kick1";
            keys[11]="kick8";
            keys[12]="kick10";
            keys[13]="kick11";
            break;
        }
        case "Funk III":{
            keys[0]="chihat1";
            keys[1]="chihat3";
            keys[2]="chihat5";
            keys[3]="chihat7";
            keys[4]="chihat8";
            keys[5]="chihat9";
            keys[6]="chihat13";
            keys[7]="chihat15";
            keys[8]="ohihat11";
            keys[9]="snare5";
            keys[10]="kick1";
            keys[11]="kick8";
            keys[12]="kick9";
            keys[13]="kick11";
            keys[14]="snare13";
            keys[15]="kick15";
            break;
        }
        case "Hip-Hop":{
            keys[0]="chihat1";
            keys[1]="chihat3";
            keys[2]="chihat5";
            keys[3]="chihat7";
            keys[4]="chihat9";
            keys[5]="chihat11";
            keys[6]="chihat13";
            keys[7]="chihat15";
            keys[8]="snare5";
            keys[9]="snare7";
            keys[10]="kick1";
            keys[11]="kick11";
            break;
        }
        case "Shuffle":{
            keys[0]="ltom1";
            keys[1]="ltom3";
            keys[2]="ltom9";
            keys[3]="ltom11";
            keys[4]="ltom15";
            keys[5]="snare5";
            keys[6]="snare7";
            keys[7]="snare13";
            keys[8]="tambourine5";
            keys[9]="tambourine13";
            break;
        }
    }
    //console.log("keys lenght is "+keys.length);
    for(var i=0;i<keys.length;i++){
        var key=document.getElementById(keys[i]);
        key.style.backgroundColor = "#C38C9F";
		key.value = key.value.substring(0,2)+"t";
        //btns.push(key);
    }
}

$(document).ready(function() {
    MIDI.loadPlugin({
        soundfontUrl: "./midi-js/soundfont/",
        instruments: [
            "acoustic_grand_piano"
           


            /*
             * You can preload the instruments here if you add the instrument
             * name in the list here
             */
        ],
        onprogress: function(state, progress) {
            console.log(state, progress);
        },
        onsuccess: function() {
            // Resuming the AudioContext when there is user interaction
            $("body").click(function() {
                if (MIDI.getContext().state != "running") {
                    MIDI.getContext().resume().then(function() {
                        console.log("Audio Context is resumed!");
                    });
                }
            });

            // Hide the loading text and show the container
            $(".loading").hide();
            $(".container").show();

            // At this point the MIDI system is ready
            MIDI.setVolume(0, 127);     // Set the volume level
            MIDI.programChange(0, 0);  // Use the General MIDI 'trumpet' number

            // Set up the event handlers for all the buttons
            $("button").on("mousedown", handlePianoMouseDown);
            $(document).on("mouseup", handlePianoMouseUp);
            //$("option").onclick(handlePattern);
            //var option =document.getElementById("inputGroupSelect01");
            //option.addEventListener('select',)
            $(" #inputGroupSelect01").change(function(){
                console.log($(this).val());
                handlePattern($(this).val());
            });
			//var option=$("#inputGroupSelect01 option:selected");
            //var a=option.val();
            //console.log(a);
            //handlePattern(a);

            btnList = document.querySelectorAll(".drumbutton");
			//label1.style.backgroundColor = "#C38C9F";
            
			for (let i = 0; i < btnList.length; i++){
				const btn = btnList[i];
				btn.onclick = () => {
					if (btn.style.backgroundColor != "rgb(195, 140, 159)"){
						btn.style.backgroundColor = "#C38C9F";
						btn.value = btn.value.substring(0,2)+"t";
						//console.log(btn.value);
					}
					else{
						btn.style.backgroundColor = "#806290";
						btn.value = btn.value.substring(0,2)+"f";
						//console.log(btn.value);
					}
				}
			}
            for(var i=0;i<btnList.length;i++){
                btns.push(btnList[i]);
            }
            //btns = document.querySelectorAll(".drumbutton");
			//for (let i = 0; i < btns.length; i++){
			//	const btn = btns[i];
			//	btn.onclick = () => {
			//		if (btn.style.backgroundColor != "rgb(195, 140, 159)"){
			//			btn.style.backgroundColor = "#C38C9F";
			//			btn.value = btn.value.substring(0,2)+"t";
			//			//console.log(btn.value);
			//		}
			//		else{
			//			btn.style.backgroundColor = "#806290";
			//			btn.value = btn.value.substring(0,2)+"f";
			//			//console.log(btn.value);
			//		}
			//	}
			//}
            console.log(btns.length);
            
			playBtn = document.getElementById("play");
			playBtn.onclick = () => {
					if(stop == false){
						//playBtn.className = "fa fa-play";
						for(let i = 0; i < timerIds.length; i++){
							clearTimeout(timerIds[i]);
						}
						timerIds.length = 0;
						stop = true;
						playBtn.className = "fa fa-play";
						label1.style.backgroundColor = "rgb(255, 255, 255)";
						label2.style.backgroundColor = "rgb(255, 255, 255)";
						label3.style.backgroundColor = "rgb(255, 255, 255)";
						label4.style.backgroundColor = "rgb(255, 255, 255)";
						return;
					}
					stop = false;
					playBtn.className = "fa fa-pause";
					let tempo = parseInt(document.getElementById("tempovalue").value);
					tempo *= 4;
					let smallPeriod = 1000 * 60 / tempo;
					let period = 1000 * 60 / tempo * 16;
					/*for(let i = 0; i < 16; i++){
						timerIds.push(setTimeout(function(){
							turnOnLabel(i+1);
						},smallPeriod*i));
						timerIds.push(setTimeout(function(){
							turnOffLabel(i+1);
						},smallPeriod*i+100));
					}*/
					if(!document.getElementById("reverse").checked){
					timerIds.push(setTimeout(function(){
							label1.style.backgroundColor = "#C38C9F";
						},smallPeriod*0));
					timerIds.push(setTimeout(function(){
							label1.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*0+200));
					timerIds.push(setTimeout(function(){
							label2.style.backgroundColor = "#C38C9F";
						},smallPeriod*4));
					timerIds.push(setTimeout(function(){
							label2.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*4+200));
					timerIds.push(setTimeout(function(){
							label3.style.backgroundColor = "#C38C9F";
						},smallPeriod*8));
					timerIds.push(setTimeout(function(){
							label3.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*8+200));
					timerIds.push(setTimeout(function(){
							label4.style.backgroundColor = "#C38C9F";
						},smallPeriod*12));
					timerIds.push(setTimeout(function(){
							label4.style.backgroundColor = "rgb(255, 255, 255)";
					},smallPeriod*12+200));}
					else{
						timerIds.push(setTimeout(function(){
							label4.style.backgroundColor = "#C38C9F";
						},smallPeriod*0));
					timerIds.push(setTimeout(function(){
							label4.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*0+200));
					timerIds.push(setTimeout(function(){
							label3.style.backgroundColor = "#C38C9F";
						},smallPeriod*4));
					timerIds.push(setTimeout(function(){
							label3.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*4+200));
					timerIds.push(setTimeout(function(){
							label2.style.backgroundColor = "#C38C9F";
						},smallPeriod*8));
					timerIds.push(setTimeout(function(){
							label2.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*8+200));
					timerIds.push(setTimeout(function(){
							label1.style.backgroundColor = "#C38C9F";
						},smallPeriod*12));
					timerIds.push(setTimeout(function(){
							label1.style.backgroundColor = "rgb(255, 255, 255)";
					},smallPeriod*12+200));
					}
					
					for (let i = 0; i < btns.length; i++){
						let btn = btns[i];
						//console.log(i);
						if(btn.value.substring(2) == "t"){
							//console.log("play");
							let key_number = parseInt(btn.value.substring(0,2));
							//tempo /= 60;//beats per seconds
							var numArr = parseInt(btn.id.match(/\d+/g).join(''));
							let t = (arrayNum(numArr) - 1) * 1000 * 60 / tempo;
							timerIds.push(setTimeout(function(){
								handleNoteOn(key_number);
								//turnOnLabel(numArr);
								//console.log("turn on "+numArr);
							},t));
							//console.log(timerIds);
							timerIds.push(setTimeout(function(){
								handleNoteOff(key_number);
								//turnOffLabel(numArr);
								//console.log("note off");
							},t+100));
							if (document.getElementById("repeat").checked){
								//console.log("checked");
								for(let j = 1; j <= 50; j++){
								timerIds.push(setTimeout(function(){
									handleNoteOn(key_number);
									//console.log("note on");
									//turnOnLabel(numArr);
									
								},t+j*period));
								timerIds.push(setTimeout(function(){
									handleNoteOff(key_number);
									//console.log("note off");
									//turnOffLabel(numArr);
								},t+j*period+100));}
							}
						}
					}
					if (!document.getElementById("repeat").checked){
						setTimeout(function(){
							for(let i = 0; i < timerIds.length; i++){
								clearTimeout(timerIds[i]);
							}
							timerIds.length = 0;
							stop = true;
							playBtn.className = "fa fa-play";
								},period + 100);						
					}
					else{
						if(!document.getElementById("reverse").checked){
						for (let k = 1; k <= 50; k++){
						timerIds.push(setTimeout(function(){
							label1.style.backgroundColor = "#C38C9F";
						},smallPeriod*0+k*period));
						timerIds.push(setTimeout(function(){
							label1.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*0+200+k*period));
						timerIds.push(setTimeout(function(){
							label2.style.backgroundColor = "#C38C9F";
						},smallPeriod*4+k*period));
						timerIds.push(setTimeout(function(){
							label2.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*4+200+k*period));
						timerIds.push(setTimeout(function(){
							label3.style.backgroundColor = "#C38C9F";
						},smallPeriod*8+k*period));
						timerIds.push(setTimeout(function(){
							label3.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*8+200+k*period));
						timerIds.push(setTimeout(function(){
							label4.style.backgroundColor = "#C38C9F";
						},smallPeriod*12+k*period));
						timerIds.push(setTimeout(function(){
							label4.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*12+200+k*period));}}
						else{
							for (let k = 1; k <= 50; k++){
						timerIds.push(setTimeout(function(){
							label4.style.backgroundColor = "#C38C9F";
						},smallPeriod*0+k*period));
						timerIds.push(setTimeout(function(){
							label4.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*0+200+k*period));
						timerIds.push(setTimeout(function(){
							label3.style.backgroundColor = "#C38C9F";
						},smallPeriod*4+k*period));
						timerIds.push(setTimeout(function(){
							label3.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*4+200+k*period));
						timerIds.push(setTimeout(function(){
							label2.style.backgroundColor = "#C38C9F";
						},smallPeriod*8+k*period));
						timerIds.push(setTimeout(function(){
							label2.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*8+200+k*period));
						timerIds.push(setTimeout(function(){
							label1.style.backgroundColor = "#C38C9F";
						},smallPeriod*12+k*period));
						timerIds.push(setTimeout(function(){
							label1.style.backgroundColor = "rgb(255, 255, 255)";
						},smallPeriod*12+200+k*period));}
						}
					}
					/*else{
						setTimeout(function(){
							for(let i = 0; i < timerIds.length; i++){
								clearTimeout(timerIds[i]);
							}
							timerIds.length = 0;
							stop = true;
								},period * 51 + 100);
					}*/
				}
			
        }
    });
});
