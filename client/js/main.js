import "babel-polyfill";
import {LanguageSelector} from './languageSelector';
export var gameID="cube";
export let id =0;

import Hammer from 'hammerjs';
import {strings} from './strings';
import {speech} from './tts';
	import {NumberSpeaker} from './numberSpeaker';

	export var vo=new NumberSpeaker();
		vo.prepend="speaker_"+lang+"_num_";
		vo.and=false;
		if (lang==2) vo.and=true;
export var packs={
	"default":{
		bgm:30,
}
}
import {SoundHandler} from './soundHandler';
import {utils} from './utilities';
import {Cube} from './classes';
import {KeyboardInput} from './input';
import {KeyEvent} from './keycodes';
export var pack="default";
import {so} from './soundObject';
export var lang=0;
import {Memory,Game} from './game';
import {Pusher} from './pusher';
export var version="1.0";
export var version2="";
import {Menu} from './menu';
import {MenuItem,AudioItem,MenuTypes} from './menuItem';
export var ttsVoice;
export var ttsRate=1;
import $ from 'jquery';
document.addEventListener('DOMContentLoaded', setup);
async function setup() {
	id=document.getElementById('touchArea');
//the below is an example of a new version notifier. The version2 variable can be used and compared inside a menu or wherever, and would contain the new version of your game based on what your server returns.
/*let prom=new Promise((resolve,reject)=> {
fetch('http://yourserver.com/versions.php?gameVersionRequest='+gameID)
						 .then(event => event.text()) //convert http response into text
			.then(data => {
				version2=data;
				resolve(data); //resolve promise let go.
			});
});*/
let langs=new LanguageSelector("langSelect",(result)=> {
	lang=result;
vo.prepend="speaker_"+lang+"_num_";
vo.and=false;
if (lang==2) vo.and=true;
speech.setLanguage(lang);
start();
});
}
export async function speak(what) {
	let sl="speaker_"+lang+"_";
	let snd=so.create(sl+what);
	await snd.playSync();
	snd.destroy();
}

export async function start() {
so.kill();
let music=so.create("menu_music");
music.volume=0.8;
music.loop=true;
speech.ducker=music;
music.play();
let sl="speaker_"+lang+"_";
let items=[];
items.push(new MenuItem("s",strings.get("menu_startgame")));
items.push(new MenuItem("m",strings.get("menu_memory")));
items.push(new MenuItem("v",strings.get("mSelectVoice")));
items.push(new MenuItem("p",strings.get("menu_pusher")));
let mainMenu=new Menu(strings.get("menu_intro"),items);
mainMenu.run(async(s) => {
	await music.fade(800);
if (s.selected=="s") {
startgame();
}
else if (s.selected=="v") {
	speech.setVoice(()=> {
		start();
	});
}
else if (s.selected=="m") {
memory();
}
else if (s.selected=="p") {
pusher();
}

mainMenu.destroy();
});
             	}
function memory() {
const memory=new Memory();
memory.init();
}
function pusher() {
const pusher=new pusher();
pusher.init();
}
function loadGame() {
	speech.speak("ok");
const game=new Game();
	game.start();
}
function startgame() {
	let prog=so.create("progress");
	prog.loop=true;
	prog.play();
for (let i=1;i<=packs[pack]["bgm"];i++) {
	so.enqueue(pack+"/bgm"+i);
}
for (let i=1;i<=6;i++) {
so.enqueue(pack+"/color"+i);
}
so.enqueue(pack+"/fail");
so.enqueue(pack+"/good");
so.enqueue(pack+"/goodExtra");
so.setQueueCallback(()=> {
	prog.stop();
loadGame();
});
so.loadQueue();
}
export async function practice(cube=new Cube(),round=1,lev,max) {
	let inp=new KeyboardInput();
let pool=new SoundHandler();
inp.init();
speech.speak(strings.get("reviewCube",[round,lev,max]));
while (!inp.isJustPressed(KeyEvent.DOM_VK_RETURN)) {
await utils.sleep(5);
if (inp.isJustPressed(KeyEvent.DOM_VK_SPACE)) {
	speech.stop();

pool.playStatic(pack+"/color"+cube.color,false);
}

if (inp.isJustPressed(KeyEvent.DOM_VK_UP)) {
	speech.stop();
cube.move(1);
pool.playStatic(pack+"/color"+cube.color,false);
}
if (inp.isJustPressed(KeyEvent.DOM_VK_DOWN)) {
	speech.stop();

cube.move(2);
pool.playStatic(pack+"/color"+cube.color,false);
}
if (inp.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
	speech.stop();

cube.move(4);
pool.playStatic(pack+"/color"+cube.color,false);
}
if (inp.isJustPressed(KeyEvent.DOM_VK_RIGHT)) {
	speech.stop();

cube.move(3);
pool.playStatic(pack+"/color"+cube.color,false);
}

}
speech.stop();
return cube;
}
