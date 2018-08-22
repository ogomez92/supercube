export var gameID="cube";
import {SoundHandler} from './soundHandler';
import {utils} from './utilities';
import {Cube} from './classes';
import {KeyboardInput} from './input';
import {KeyEvent} from './keycodes';
export var pack=1;
import {so} from './soundObject';
export var lang=0;
import {Game} from './game';
export var version="1.0";
export var version2="";
import {Menu} from './menu';
import {AudioItem,MenuTypes} from './menuItem';
export var ttsVoice;
export var ttsRate=1;
import $ from 'jquery';
document.addEventListener('DOMContentLoaded', setup);
async function setup() {
//the below is an example of a new version notifier. The version2 variable can be used and compared inside a menu or wherever, and would contain the new version of your game based on what your server returns.
let prom=new Promise((resolve,reject)=> {
fetch('http://yourserver.com/versions.php?gameVersionRequest='+gameID)
						 .then(event => event.text()) //convert http response into text
			.then(data => {
				version2=data;
				resolve(data); //resolve promise let go.
			});
});
let langs=so.create("ui/lang_select");
langs.play();
let linput=new KeyboardInput();
linput.init();
while (lang==0) {
await utils.sleep(16);
if (linput.isJustPressed(KeyEvent.DOM_VK_1)) {
lang=1;
}
if (linput.isJustPressed(KeyEvent.DOM_VK_2)) {
lang=2;
}
}
langs.destroy();
langs=so.create("ui/forms_"+lang);
await langs.playSync();
start();
}
export function start() {
so.kill();
let music=so.create("menu_music");
music.volume=0.8;
music.loop=true;
music.play();
let items=[];
items.push(new AudioItem("s","menu_startgame"));
items.push(new AudioItem("m","menu_memory"));
items.push(new AudioItem("p","menu_practice"));
let mainMenu=new Menu("menu_intro",items,true);
mainMenu.run((s)=> {
if (s.selected=="s") {
startgame();
}
else if (s.selected=="m") {
memory();
}
else if (s.selected=="p") {
practice();
}
music.stop();
mainMenu.destroy();
});
             	}
function startgame() {
const game=new Game();
game.start();
}
async function practice() {
let inp=new KeyboardInput();
let pool=new SoundHandler();
let cube=new Cube();
inp.init();
if (pack==1) pool.playStatic("speaker_"+lang+"_color_1_"+cube.color,false);
while (!inp.isJustPressed(KeyEvent.DOM_VK_Q)) {
await utils.sleep(5);
if (inp.isJustPressed(KeyEvent.DOM_VK_UP)) {
cube.move(1);
if (pack==1) pool.playStatic("speaker_"+lang+"_color_1_"+cube.color,false);
}
if (inp.isJustPressed(KeyEvent.DOM_VK_DOWN)) {
cube.move(2);
if (pack==1) pool.playStatic("speaker_"+lang+"_color_1_"+cube.color,false);
}
if (inp.isJustPressed(KeyEvent.DOM_VK_LEFT)) {
cube.move(4);
if (pack==1) pool.playStatic("speaker_"+lang+"_color_1_"+cube.color,false);
}
if (inp.isJustPressed(KeyEvent.DOM_VK_RIGHT)) {
cube.move(3);
if (pack==1) pool.playStatic("speaker_"+lang+"_color_1_"+cube.color,false);
}

}
so.kill(()=> {
start();
});
}