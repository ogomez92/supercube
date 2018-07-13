export var gameID="cube";
import {so} from './soundObject';
export var lang=1;
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
console.log("Success!");
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