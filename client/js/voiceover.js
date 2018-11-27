import fs from 'fs';
export default class Voiceover //we define our object of type voClass.
{
constructor () //raa! here goes our constructor to be used if no parameters are specified by the script that creates the voClass object.
{
this.buffer=[]; //we create an array into which we will queue strings to be spoken
this.extention=".ogg";
this.speechDir="speech/"; //this variable of type string will point to the path relative to the voiceover script in which the sounds for this object to use for speech are located. It is possible to create multiple voiceover objects and modify this property to run it on speech files in alternative directories.
this.delay=0; //this is the integer variable that will tell us how long before the currently playing file is playing we will start playing the next one. Not to confuse this with processDelay.
this.processDelay=0; //This is used by the delayProcessing method and the process method to keep track of whether we are being instructed to hold off on speech output for some time.
this.interrupt=false; //this is a boolian variable that, if set to true by any of the methods later on, will inform the script that we need to interrupt any ongoing speech.
this.errorState=""; //do not know what this is yet
this.sounds=[];
this.soundSelected=0; //this is an integer variable that we use to figure out which sound object we last used (see above) this way we know which one to use next.
this.speechDir="speech/"; this.soundSelected = 1; this.delay=60; this.interrupt = false; this.errorState = "";
this.voSound1=so.create(this.speechDir+"0");
this.voSound2=so.create(this.speechDir+"0");
 }


process (callback) //we start our method that scripts using voClass objects must call in a farely high resolution loop to keep the code in this script opperational. Failure of scripts to call this method on every iteration of a loop will result in absolute failure to speak.
{
if (this.processDelay<=0)
{//make sure there is not a delay timer set. If there isn't, we can process now. otherwise we do nothing except decrement the delay value so we'll eventually hit 0 and then be able to run this part of the code.
if (this.buffer.length==0) {
callback();
return;
}
if (this.buffer.length> 0) //is there anything in our speechQueue that needs to be spoken?
{
if (fs.existsSync(this.speechDir+this.buffer[0]+this.extention)) {this.output ();} //we check if a file exists who's name is the same as the text in the first item in our queue, if so we run our output method created below to play it.
else {console.log("Voiceover script error", "File "+this.speechDir+this.buffer[0]+this.extention+" doesn't exist. Program will now exit."); exit();} //if no sound can be found who's name is the same as the text of the first item in our queue we throw an error and kill the program.
}
} //end of the code pertaining to process delay being 0 in which we process speech as normal
else
{ //our delay was not less than or equal to 0 meaning someone has set things up for us to wait a certain amount of time before we start speaking what's in our queue. Here we subtract time from the value given, heading for 0. As seen above, when we hit 0 the main part of the code runs and speech is processed as normal.
this.processDelay-=1/60; //in order for the delay to be accurate to what the code calling the delay method specifies, make sure the process method is, well, processed, every 5ms. Only important if you care whether specifying a delay of 1800ms really turns out to be pretty close to 1800ms.
} //end of the code pertaining to our delay being greater than 0 where we subtract the delay and don't process yet
this.process();
}

delayProcessing(howLong)
{ //this is how we handle setting a delay timer that causes the process method to not actually process anything just decrement the value supplied here. Keep calling process in the loop from the main code and when the timer has reached 0 the main code of the process method will run. Note that calling delayProcessing, or setting the processDelay property directly, repeatedly will result in the first timer being lost. Call process every 5ms from the main code or figure out what the multiplication or division should be to get the timer to be more accurate as it decrements 5 every how ever many ms you call it. Or if you don't care about that just test it and change the delay amount from the main code.
this.processDelay=howLong; //5 line discription for a 1 line method. Brilliant!
} //this is the end of delayProcessing

output () //this is the function that actually runs our sound objects and really results in speech actually being heard.
{
if (this.soundSelected == 1) //not much explanation for this, see below
{
if (this.voSound2.duration - this.voSound2.position < this.delay || !this.voSound2.playing) //is the current playback position in the sound less than delay in distance from the end of the sound or is the sound not playing any more?
{
this.voSound1=so.create(this.speechDir+this.buffer[0]); //load our sound into the first sound object
this.voSound1.play(); //play it
this.buffer.splice(0,1); //remove the now playing file from the beginning of our buffer so next time we process (see above process function) we'll then be opperating on the next string to be handled.
this.soundSelected = 2; //this is object 1 we're playing so now we will set soundSelected to 2 which will cause our fellow sound object to handle the next sound that comes along.
}
}
else if (this.soundSelected == 2) //see if we have selected to have our second sound object run next.
{
if (this.voSound1.duration - this.voSound1.position < this.delay || !this.voSound1.playing) //see the similar line above
{
this.voSound2=so.create(this.speechDir+this.buffer[0]); //see the similar line above
this.voSound2.play(); //see the similar line above
this.soundSelected = 1; //and now that we have the second sound object off and running we'll cycle back to using the first sound object for the next one.
this.buffer.splice(0,1); //just like above we remove the item we just played from the buffer so the process method above won't just make us play the same sound again.
}
}
}

queue (voFile) //our speak methods all use this method here to get strings of text added to the end of our speech buffer to be acted upon by our process method above when it has a chance.
{
if (fs.existsSync(this.speechDir+voFile+this.extention)) { this.buffer.push(voFile);
} //see if there's a sound the same as the text to be queued.
else { console.log("File "+this.speechDir+voFile+this.extention+" doesn't exist")} //we make note of an error.
}

spell(toSpell) //and now we get to our spell method which, obviously enough will take care of spelling strings character by character. This is called by other methods automatically if they can't find files who's names match the text they're trying to speak but can also be called directly by the script that created the object to force the spelling of something. And btw, toSpell is the string variable that stores the string to spell.
{
while (toSpell != "") //loop until there is nothing left to spell in the string.
{
let character=toSpell.substr(0,1); //create a string variable called character and assign the first letter of our string to it.
/*the lines below handle speaking of punctuation. For instance the first one is and &. We have a speech file called and.wav, or we hope we do anyway, so we queue the word and. Make sense? anyway no more comments until all of these are done because it's kind of self explanatory.*/
if (character=="&") {this.queue("and"); }
else if (character=="'") {this.queue("apostrophe");}
else if (character == "@") {this.queue("at");}
else if (character == "\\") {this.queue("back slash");}
else if (character == "^") {this.queue("carot");}
else if (character == ":") {this.queue("colon");}
else if (character==",") {this.queue("comma");}
else if (character=="-") {this.queue("dash");}
else if (character=="$") {this.queue("dollar");}
else if (character==".") {this.queue("dot");}
else if (character=="=") {this.queue("equals");}
else if (character=="!") {this.queue("exclaim");}
else if (character=="`") {this.queue("grave accent");}
else if (character==">") {this.queue("greater than");}
else if (character=="{") {this.queue("left brace");}
else if (character=="[") {this.queue("left bracket");}
else if (character=="(") {this.queue("left parenthesis");}
else if (character=="<") {this.queue("less than");}
else if (character=="#") {this.queue("number");}
else if (character=="%") {this.queue("percent");}
else if (character=="+") {this.queue("plus");}
else if (character == "?") {this.queue("question");}
else if (character == "\"") {this.queue("quote");}
else if (character == "}") {this.queue("right brace");}
else if (character == "]") {this.queue("right bracket");}
else if (character == ")") {this.queue("right parenthesis");}
else if (character == ";") {this.queue("semicolon");}
else if (character == "/") {this.queue("slash");}
else if (character==" ") {this.queue("space");}
else if (character == "*") {this.queue("star");}
else if (character == "~") {this.queue("tilda");}
else if (character=="_") {this.queue("underline");}
else if (character == "|") {this.queue("vertical line");}
/*whew, that's all english punctuation that I could think of btw, other things will probably cause the program to crash or maybe it just won't say anything. Well actually other things except alphabetical letters that can be properly handled by the below line*/
else {queue(character);} //ok, what ever we have that didn't turn out to be a punctuation symbol that we recognized, just queue it up as is. If that happens to be a letter or a number, we hope we have a file who's name is the same as that, r.wav or 0.wav for instance.
toSpell =toSpell.substr(1);
}
}

speakWholeNumber(number) //this is our method that handles speaking a whole number up to 18 digits long not counting the leading minus sign and any trailing decimal places. The main program can use this directly if required but it should never be needed.
{
number=String(number);
if (number.length == 10) //1 billion's place
{
this.queue(number.substr(0,1)); number=number.substr(1); this.queue("billion");
while (number.substr(0,1) == "0") { number=number.substr(1); }
}

if (number.length == 9) //100 million's place
{
this.queue(number.substr(0,1)); number=number.substr(1);
this.queue("hundred");
if (number.substr(0,1) == "0") { number=number.substr(1);
if (number.substr(0,1) == "0") { number=number.substr(1); this.queue("million");}
while (number.substr(0,1) == "0") { number=number.substr(1); }
}

if (number.length == 8) //10 million's place
{
if (number.substr(0,1) == "1") //is a teen, take the number plus that to the right to get something like 12
{this.queue (number.substr(0,2)); number =number.substr(2); this.queue("million");}
else //Number not a teen, speak with 0 appended, like 20
{this.queue (number.substr(0,1) + "0"); number = number.substr(1);
if (number.substr(0,1) == "0") //have to remove following 0 if there is 1, and queue thousand to be spoken
{number = number.substr(1); this.queue("million");}
}
while (number.substr(0,1) == "0") { number=number.substr(1); }
}

if (number.length == 7) //1 million's place
{
this.queue(number.substr(0,1)); number=number.substr(1); this.queue("million");
while (number.substr(0,1) == "0") { number=number.substr(1); }
}

if (number.length == 6) //100 thousand's place
{
this.queue(number.substr(0,1)); number=number.substr(1);
this.queue("hundred");
if (number.substr(0,1) == "0") { number=number.substr(1);
if (number.substr(0,1) == "0") { number=number.substr(1); this.queue("thousand");}
while (number.substr(0,1) == "0") { number=number.substr(1); }
}

if (number.length == 5) //10 thousand's place
{
if (number.substr(0,1) == "1") //is a teen, take the number plus that to the right to get something like 12
{this.queue(number.substr(0,2)); number = number.substr(2); this.queue("thousand");}
else //Number not a teen, speak with 0 appended, like 20
{this.queue (number.substr(0,1) + "0"); number = number.substr(1)
if (number.substr(0,1) == "0") //have to remove following 0 if there is 1, and queue thousand to be spoken
{number = number.substr(1); this.queue("thousand");}
}
while (number.substr(0,1) == "0") { number=number.substr(1); }
}

if (number.length == 4) //1 thousand's place
{
this.queue (number.substr(0,1)); number = number.substr(1)
this.queue ("thousand");
while (number.substr(0,1) == "0") { number=number.substr(1); }
}

if (number.length == 3) //100's place
{
this.queue (number.substr(0,1));
this.queue ("hundred");
number = number.substr(1)
if (number.substr(0,1) == "0") {number = number.substr(1)}
if (number.substr(0,1) == "0") {number = number.substr(1)}
}

if (number.length == 2) //10's place
{
if (number.substr(0,1) == "1") //is a teen, take the number plus that to the right to get something like 12
{this.queue (number.substr(0,2)); number = number.substr(2);}
else //Number not a teen, speak with 0 appended, like 20
{queue (number.substr(0,1) + "0"); number = number.substr(1)
if (number.substr(0,1) == "0") {number = number.substr(1)} //have to remove following 0 if there is 1
}
}

if (number.length == 1) //omg! that's it! the 1's place! woooohoooo!!! Raa! yes! yes!
{this.queue (number.substr(0,1));}
}
cancelSpeech() //this method can be called by the script that created the object to stop any ongoing speech.
{
this.buffer=[]; this.voSound1.destroy(); this.voSound2.destroy(); //easy enough, we resize the buffer to 0 which affectively deletes all strings that might have been queued for speaking, then we stop both sound objects from playing anything that they may have been playing at the time.
}

speakInterrupt(what) //Aha, now we're gettin' to the fun stuff. This one is our speakInterrupt method yeah I know you know already.
{
this.cancelSpeech(); this.speak(what); //Oo, cool! It runs the above created cancelSpeech method, then it runs the speak method defined below, then it does that return error state thing
}
speak (what) //This is the most likely used method and just handles, well, speaking, in general. You'll notice that speakWait and speakInterrupt use this method themselves after they perform certain activities to facilitate what ever it is that they do differently.
{
if (fs.existsSync(this.speechDir+what+this.extention)) //is there a file who's name is the same as the text in the what variable which you'll recall was assigned as an argument to this method?
{this.queue (what); what = "";} //if there is a file with the right name, add it to the queue and null out the what variable.
else
{let test = 0; let test2 = what; //this particular section of code is confusing to me and I made it.
if (test2.substr(0,1) == "-") {test2 = test2.substr(1);} //we're trying to figure out if we have a minus or dash sign at the beginning of test2, which holds the same value as what at this point.
while (test2 != "") //until test2 is empty
{if (stringDigits(test2.substr(0,1)) || test2.substr(0,1) == ".") {test = 1;} //we set test to 1 if test2 variable's first character is a digit or a period.
else {test = 0; break;} //it's not a digit or a period.
test2 = test2.substr(1);} //remove that first character we were just examining from the beginning of test2.

if (test == 1) //it's 1 if we had a period or a digit at the beginning of our string above.
{
number = Number(what); //create a variable of type string and call it number and assign the value of the what variable to it.
if (number.substr(0,1) == "-") {this.queue("negative"); number = number.substr(1)} //if it's a minus sign at the beginning of the string speak negative and remove the minus sign from the number variable.
else {this.speakWholeNumber(number);} //and otherwise we probably can handle it so we try to use the speakWholeNumber method.
}
else {this.spell(what);
} //and if it's not determined to be a number we try to spell it. Remember we attempt to find a file who's name is the same as the what variable before this point, so if that fails we get to this point where we resort to making an attempt to spell it.

speaking() //method that can be called by the including program to find out if the object is actively producing speech.
{
if (!this.voSound1.playing && !this.voSound2.playing) {return false;} else {return true;} //if we have nothing in our buffer and neither sound object is playing we say no otherwise yes.
}
}
}