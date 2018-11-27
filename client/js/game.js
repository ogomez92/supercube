import {speech} from './tts';
import {SoundHandler} from './soundHandler';
import {packs,pack,lang,start} from './main';
import {OldTimer} from './oldtimer';
import {Cube} from './classes';
import Timer from './timer';
import $ from 'jquery';
import {utils} from './utilities';
import {ScrollingText} from './scrollingText';
import {KeyboardInput} from './input.js';
import {KeyEvent} from './keycodes.js';
import {so} from './soundObject';

class Game {
	constructor() {
	this.sounds=new SoundHandler();
	this.levcount=0;
	this.score=0;
	this.lives=3;
this.level=0;
				this.input=new KeyboardInput();
		this.input.init();
this.levcap=4;
this.fail=so.create("fail_normal");
this.gamer=new Cube();
this.random=utils.randomInt(1,4);
this.mycube=new Cube();
this.gamer.move(this.random);
this.mycube.move(this.random);
this.pos=new OldTimer();;
this.level=1;
this.score=0;
this.gotit=false;
this.playing=true;
this.round=0;
this.levcount=1;
	}
	async start() {
		this.round++;
	while (this.round>=0 && this.round<4) {
	this.gm=so.create(pack+"/bgm"+this.level);
if (this.level<packs[pack]["bgm"]) so.enqueue(pack+"/bgm"+(Number(this.level)+1));
so.loadQueue();
this.sp=so.create("round"+lang);
await this.sp.playSync();
this.sp=so.create(lang+"num"+this.round);
await this.sp.playSync();
this.sp=so.create("startwith"+lang);
await this.sp.playSync();
this.sp=so.create(pack+"/color"+this.gamer.color);
await this.sp.playSync();
this.mycube=Object.assign( Object.create( Object.getPrototypeOf(this.gamer)), this.gamer);
this.mycube.move(utils.randomInt(1,4));
await utils.sleep(utils.randomInt(1400,2500));
if (!this.gm.playing) {
this.gm.play();
this.gm.loop=true;
}
this.pos.restart();
this.sp=so.create(pack+"/color"+this.mycube.color);
this.sp.play();
this.levcount=1;
this.gotit=false;
this.playing=true;
this.input.resume();
while (this.playing) {
await utils.sleep(5);
if (this.input.isJustPressed(KeyEvent.DOM_VK_Q)) {
this.gm.stop();
this.speakstats();
start();
this.playing=false;
return;
}
if (this.pos.elapsed>=(this.gm.duration/4)) {
this.pos.restart();
if (this.gamer.color==this.mycube.color) {
if (this.levcount==this.levcap) {
this.gotit=false;
this.levcount=1;
this.level++;
if (this.level<=11) this.levcap=4;
else if (this.level>11 && this.level<=20) this.levcap=8;
else if (this.level>20 && this.level<=29) this.levcap=12;
else if (this.level==30) this.levcap=16;
this.gm.destroy();
if (this.level>30) {
score+=10000;
this.win=so.create("winner");
this.gm.stop();
await win.playSync();
this.speakstats();
this.round=4;
start();
this.playing=false;
return;
}//win
else {//next level?
this.gotit=false;
this.gm=so.create(pack+"/bgm"+this.level);
this.gm.play();
this.gm.loop=true;
if (this.level<30) so.enqueue(pack+"/bgm"+(Number(this.level)+1));
so.loadQueue();
this.levcount=1;
this.mycube.move(utils.randomInt(1,4));
this.sp=so.create(pack+"/color"+this.mycube.color);
this.sp.play();
}//going for the next level, win
}//levcount
else {//levcount isn't capped...
this.levcount++;
this.mycube=Object.assign( Object.create( Object.getPrototypeOf(this.gamer)), this.gamer);
this.mycube.move(utils.randomInt(1,4));
this.sp=so.create(pack+"/color"+this.mycube.color);
this.sp.play();
this.gotit=false;
}//levcount
}//color
else {
this.mycube=Object.assign( Object.create( Object.getPrototypeOf(this.gamer)), this.gamer);
this.levcount=1;
this.gm.stop();
this.fail.play(); this.pos.pause();
this.input.pause();
this.round++;

this.fail.sound.once("end",()=> {
this.playing=false;
});
}//color
}//position timer
if (this.input.isJustPressed(KeyEvent.DOM_VK_UP) && !this.gotit) {
this.gamer.move(1);
if (this.gamer.color==this.mycube.color) {
this.gotit=true;
this.correct();
this.score+=1;
}
else {
this.mycube=Object.assign( Object.create( Object.getPrototypeOf(this.gamer)), this.gamer);
this.levcount=1;
this.gm.stop();
this.fail.play(); this.pos.pause();
this.input.pause();
this.round++;

this.fail.sound.once("end",()=> {
this.playing=false;
});
}
}
if (this.input.isJustPressed(KeyEvent.DOM_VK_DOWN) && !this.gotit) {
this.gamer.move(2);
if (this.gamer.color==this.mycube.color) {
this.gotit=true;
console.log("down");
this.correct();
this.score+=1;
}
else {
this.mycube=Object.assign( Object.create( Object.getPrototypeOf(this.gamer)), this.gamer);
this.levcount=1;
//round++;
this.gm.stop();
this.fail.play(); this.pos.pause();
this.input.pause();
this.round++;

this.fail.sound.once("end",()=> {
this.playing=false;
});

}
}
if (this.input.isJustPressed(KeyEvent.DOM_VK_RIGHT) && !this.gotit) {
this.gamer.move(3);

if (this.gamer.color==this.mycube.color) {
this.gotit=true;
console.log("right");
this.correct();
this.score+=1;
}
else {
this.mycube=Object.assign( Object.create( Object.getPrototypeOf(this.gamer)), this.gamer);
this.levcount=1;
//round++;
this.gm.stop();
this.fail.play(); this.pos.pause();
this.input.pause();
this.round++;

this.fail.sound.once("end",()=> {
this.playing=false;
});
}
}
if (this.input.isJustPressed(KeyEvent.DOM_VK_LEFT) && !this.gotit) {
this.gamer.move(4);

if (this.gamer.color==this.mycube.color) {
this.gotit=true;
console.log("left");
this.correct();
this.score+=1;
}
else {
this.mycube=Object.assign( Object.create( Object.getPrototypeOf(this.gamer)), this.gamer);
this.levcount=1;
this.gm.stop();
this.fail.play(); this.pos.pause();
this.input.pause();
this.round++;

this.fail.sound.once("end",()=> {
this.playing=false;
});
}
}
}//while
}//round loop
}
correct() {
this.sounds.playStatic("speaker_"+lang+"_good"+utils.randomInt(1,4),false);
this.sounds.playStatic("good"+utils.randomInt(1,2),false);
}
speakstats() {
}
	}
export {Game}