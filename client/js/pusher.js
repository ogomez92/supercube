import "babel-polyfill";
import {speech} from './tts';
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
	class pusher {
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
			await vo.speakWait(this.score);
			await speak("points");
		}
		async speakstats() {
		}

		async init() {
		this.lastlevel=1;
		this.memtime=new OldTimer();
		this.levcap=4;
		this.fail=so.create(pack+"/fail");
		this.gamer=new Cube();
		this.random=utils.randomInt(1,4);
		this.mycube=new Cube();
		this.gamer.move(this.random);
		this.mycube.move(this.random);
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
			await speak("round");
			await vo.speakWait(this.round);
			this.gamer=await practice(this.gamer);
			this.sp=so.create("startwith"+lang);
			await this.sp.playSync();
			this.sp=so.create(pack+"/color"+this.gamer.color);
			await this.sp.playSync();
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
				await utils.sleep(5);
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
export {pusher}