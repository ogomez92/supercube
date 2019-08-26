import "babel-polyfill";
import {speech} from './tts';
import {strings} from './strings';

import {SoundHandler} from './soundHandler';
import {practice,vo,packs,pack,lang,start} from './main';
import {OldTimer} from './oldtimer';
import {Cube} from './classes';
import Timer from './timer';
import $ from 'jquery';
import {utils} from './utilities';
import {ScrollingText} from './scrollingText';
import {KeyboardInput} from './input.js';
import {KeyEvent} from './keycodes.js';
import {so} from './soundObject';
import {speak} from './main';
class Game {
	constructor() {
	this.sounds=new SoundHandler();
	this.averageTotal=[];
	this.debug=false;
	this.levcount=0;
	this.score=0;
	this.lives=4;
this.level=0;
				this.input=new KeyboardInput();
		this.input.init();
this.levcap=4;
this.fail=so.create(pack+"/fail");
this.gamer=new Cube();
this.mycube=new Cube();
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
	while (this.round>=0 && this.round<this.lives) {
			this.gm=so.create(pack+"/bgm"+this.level);
//if (this.level<packs[pack]["bgm"]) so.enqueue(pack+"/bgm"+(Number(this.level)+1));
//so.loadQueue();
this.gamer=await practice(this.gamer,this.round,this.level,packs[pack]["bgm"]);
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
await utils.sleep(16);
if (this.input.isJustPressed(KeyEvent.DOM_VK_Q)) {
this.gm.stop();
await this.speakstats();
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
else if (this.level>20 && this.level<=29) this.levcap=8;
else if (this.level==30) this.levcap=8;
this.gm.destroy();
if (this.level>30) {
score+=10000;
this.win=so.create("winner");
this.gm.stop();
await win.playSync();
await this.speakstats();
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

this.fail.sound.once("end",async()=> {
	await this.failExtra();

this.playing=false;
});
}//color
}//position timer
if (this.input.isJustPressed(KeyEvent.DOM_VK_UP) && !this.gotit) {
this.gamer.move(1);
if (this.gamer.color==this.mycube.color || this.debug) {
this.gotit=true;
this.correct();
this.score+=1;
if (this.debug) this.gamer.color=this.mycube.color;
}
else {
this.mycube=Object.assign( Object.create( Object.getPrototypeOf(this.gamer)), this.gamer);
this.levcount=1;
this.gm.stop();
this.fail.play(); this.pos.pause();
this.input.pause();


this.round++;

this.fail.sound.once("end",async()=> {
	await this.failExtra();


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

this.fail.sound.once("end",async()=> {
	await this.failExtra();


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

this.fail.sound.once("end",async()=> {
	await this.failExtra();


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

this.fail.sound.once("end",async()=> {
	await this.failExtra();


this.playing=false;
});
}
}
}//while
}//round loop
}
correct() {
	this.mycube=utils.copyObject(this.gamer);
	this.averageTotal.push(this.pos.elapsed);
	let chance=utils.randomInt(0,this.pos.elapsed);
if (chance<180) {
		this.sounds.playStatic(pack+"/goodExtra",false);
		this.lives++;
} else {
	this.sounds.playStatic(pack+"/good",false);
}
}
async speakstats() {
}
async failExtra() {
	if (this.score<1) return;
	await new ScrollingText(strings.get("scoreReader",[this.lives-this.round,this.score,utils.averageInt(this.averageTotal)]));
}

	}
	class Memory {
		constructor() {
			this.sounds=new SoundHandler();
			this.score=0;
			this.colors=[];
			this.colors[0]=0;
			for (let i=1;i<=6;i++) {
				this.colors.push(so.create(pack+"/color"+i));
			}

		}
		async failExtra() {
			if (this.score<1) return;
			await vo.speakWait(this.score);
			await speak("points");
		}
		async speakstats() {
		}

		async start() {
		this.lastlevel=1;
		this.memtime=new OldTimer();
		this.levcap=4;
		this.fail=so.create(pack+"/fail");
		this.gamer=new Cube();
		
		this.mycube=new Cube();
		this.pos=new OldTimer();
		this.level=1;
		this.gm=so.create(pack+"/bgmm");
		this.input=new KeyboardInput();
		this.input.init();
		this.length=1;
		this.chain=[];
		this.score=0;
		this.playing=true;
		this.gotit=false;
		this.round=0;
						this.gm.loop=true;
		this.levcount=1;
		for (this.round=1;this.round<=3;this.round++) {
			this.gamer=await practice(this.gamer,this.round,this.level,packs[pack]["bgm"]);
			this.mycube=utils.copyObject(this.gamer);
			this.chain=[];
			let rand=0;
			for (let i=1;i<=this.length;i++) {
				rand=utils.randomInt(1,4);
				this.mycube.move(rand);
				this.chain.push(this.mycube.color);
			}//for
			await utils.sleep(1400,2500);
			if (!this.gm.playing) 				this.gm.play();
			this.pos.restart();
			this.memtime.restart();
			this.memtime.pause();
			this.input.pause();
			for (let i=0;i<this.length;i++) {
				await this.colors[this.chain[i]].playSync();
			}
			this.memtime.resume();
			this.input.resume();
			this.levcount=1;
			this.gotit=false;
			this.memtime.restart();
			this.playing=true;
			while (this.playing) {
				await utils.sleep(16);
				if (this.input.isJustPressed(KeyEvent.DOM_VK_ESCAPE)) {
					this.gm.stop();
					this.playing=false;
					this.speakstats();
					start();
					return;
				}
				if (this.memtime.elapsed>=3000) {
					this.playing=false;
					this.mycube=utils.copyObject(this.gamer);
					this.levcount=1;
					this.gm.stop();
					await this.fail.playSync();
					await this.failExtra();

				}
				if (this.input.isJustPressed(KeyEvent.DOM_VK_UP)) {
					this.gamer.move(1);
					this.memtime.restart();
					if (this.gamer.color==this.chain[0]) {
						this.correct();
						
						this.chain.splice(0,1);
						speech.speak(this.chain.length);
						this.score++;
					}
					else {
						this.playing=false;
						this.mycube=utils.copyObject(this.gamer);
						this.levcount=1;
						this.gm.stop();
						await this.fail.playSync();
						await this.failExtra();


					}
				}
				if (this.input.isJustPressed(KeyEvent.DOM_VK_DOWN)) {
					this.gamer.move(2);
					this.memtime.restart();
					if (this.gamer.color==this.chain[0]) {
						this.correct();
						this.chain.splice(0,1);
						this.score++;
					}
					else {
						this.playing=false;
						this.mycube=utils.copyObject(this.gamer);
						this.levcount=1;
						this.gm.stop();
						await this.fail.playSync();
						await this.failExtra();


					}
				}
				if (this.input.isJustPressed(KeyEvent.DOM_VK_RIGHT)) {
					this.gamer.move(3);
					this.memtime.restart();
					if (this.gamer.color==this.chain[0]) {
						this.correct();
						this.chain.splice(0,1);
						this.score++;
					}
					else {
						this.playing=false;
						this.mycube=utils.copyObject(this.gamer);
						this.levcount=1;
						this.gm.stop();
						await this.fail.playSync();
						await this.failExtra();


					}
				}
				if (this.input.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
					this.gamer.move(4);
					this.memtime.restart();
					if (this.gamer.color==this.chain[0]) {
						this.correct();
						this.chain.splice(0,1);
						this.score++;
					}
					else {
						this.playing=false;
						this.mycube=utils.copyObject(this.gamer);
						this.levcount=1;
						this.gm.stop();
						await this.fail.playSync();
					}
				}
				
if (this.chain.length<=0) {
	this.length++;
	this.chain=[];
				this.mycube=utils.copyObject(this.gamer);
	let rand=0;
	for (let i=1;i<=this.length;i++) {
		rand=utils.randomInt(1,4);
		this.mycube.move(rand);
		this.chain.push(this.mycube.color);
	}//for
this.pos.restart();
this.memtime.restart();
this.memtime.pause();
this.input.pause();
for (let i=0;i<this.length;i++) {
	await this.colors[this.chain[i]].playSync();
}
this.memtime.resume();
this.input.resume();
}
			}
		}
		this.playing=false;
		this.level=500;
		await this.speakstats();
start();
return;
		}
		correct() {
			this.mycube=utils.copyObject(this.gamer);
			this.sounds.playStatic(pack+"/good",false);
		
		}

	}//memory class, add an additional brace from the bgt file.
export {Game,Memory}