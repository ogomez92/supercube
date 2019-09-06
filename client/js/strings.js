import "babel-polyfill";
'use strict';
import {lang} from './main';
import {utils} from './utilities';
import {speech} from './tts';
import {ScrollingText} from './scrollingText';

class Strings {
	constructor() {
		this.strings = {};
		this.strings[1] = {
			// New English
codeOver:"Game over! Your biggest code was comprised of %2 moves, and you cracked %1 codes.",
codeOverZero:"Game over! You did not crack any codes. Go back to robbing your local school lockers!",
			reviewCube1: "Round %1. Level %2 of %3. Use the arrow keys to review this cube, and enter when you are done. The space bar repeats the top value",
			reviewCube2: "Round %1. Use the arrow keys to review this cube, and enter when you are done. The space bar repeats the top value. The goal of the game is to memorize as many moves as you can.",
reviewCube3:"Welcome to code breaker! You will need to find the right combination of moves before the time runs out. You start with a code of 4 moves, and the first move is not necessarily your starting value. Every time you make a wrong move, you'll have to find the top value you started with. How many codes can you crack?",
			scoreReader: "%1 lives. Your score is %2 points, with an average reaction time of %3.",
			
			menu_intro:"Welcome to supercube! This is the main menu. Use the traditional keys to navigate this menu. You can also press the first letter of a menu option for faster navigation.",
			"menu_startgame": "Cube the music",
			"menu_memory": "Memory man",
			"menu_cb": "Code breaker",
selectVoice:"%1 voices available, use the up and down arrows to select a voice, enter when you're done.",
	    mSelectVoice:"text to speech voice",
	    mLang: 'Change language',
	    newUpdate: 'There is a new version available! You have version %1, version %2 is available.',

	    rating: 'Press right and left arrow keys to change the rate. Press enter when done',
	    mRate: 'Change speech rate',

	    lang: 'English',
	    langs: 'Select your language',
	    mSelect: 'Please select',
	    mBack: 'go back',
	    mStart: 'Start Game',
	    yes: 'Yes',
	    no: 'no',
	    ok: 'ok',
		};
		this.strings[2] = {
			// New Spanish

yes:"Sí",
no:"no",
lang:"Español",
langs:"Selecciona tu idioma",
			codeOver: "Has terminado! El código más grande que has conseguido romper fue de %2 movimientos, y has roto %1 códigos!",
reviewCube1:"Ronda %1: Nivel %2 de %3. Usa las flechas para examinar este cubo, y enter para empezar a jugar. La barra espaciadora repite el valor actual.",
reviewCube2:"Ronda %1: Usa las flechas para examinar este cubo, y enter para empezar a jugar. La barra espaciadora repite el valor actual. El objetivo es memorizar tantos movimientos como puedas.",
mRate:"Cambiar velocidad de tts",
mBack:"Volver",
ok: "ok",
reviewCube3: "Bienvenido a rompecódigos! Tendrás que encontrar los movimientos correctos antes que se termine tu tiempo... Empiezas con 4 movimientos en el código, y el primero no tiene porque ser el color con el que has empezado. ten cuidado, pues tienes un límite de tiempo y cada vez que falles tendrás que buscar el color con el que empezaste. ¿Cuántos códigos puedes romper?",
menu_intro: "Bienvenido a cubus Máximus! Este es el menú principal. Usa las flechas para moverte por el menú. También puedes usar la primera letra de una opción para moverte más rápido.",
menu_startgame:"Jugar al musicubo",
codeOverZero:"Has terminado! No has conseguido romper ningún código... Mejor vete a robar las taquillas del cole.",
scoreReader:"%1 vidas. Tu puntuación es %2 puntos, con un tiempo de media de reacción de %3.",

menu_memory:"El memorión",
menu_cb: "Rompecódigos",
mSelectVoice:"Cambiar voz de la tts",

selectVoice:"%1 voces disponibles. Usa las flechas para cambiarla y enter para seleccionar una.",
mLang: "Cambio de idioma",
newUpdate: "Hay una nueva versión disponible! Tienes la %1, y la %2 está ya disponible.",
rating:"Pulsa las flechas izquierda y derecha para cambiar la velocidad, enter cuando hayas terminado.",
mSelect:"Por favor, selecciona.",
mStart:"Jugar",

		};
	}

	get(what, rep = []) {
		let str;
		if (typeof this.strings[lang][what] !== 'undefined') {
			str = this.strings[lang][what];
		} else if (typeof this.strings[1][what] !== 'undefined') {
			str = this.strings[1][what];
		} else {
			return what;
		}
		rep.forEach((v, i) => {
				const i1 = Number(i) + 1;
				str = str.replace('%' + i1, v);
				});
		return str;
	}

	speak(what, rep = []) {
		let str;
		if (typeof this.strings[lang][what] !== 'undefined') {
			str = this.strings[lang][what];
		} else if (typeof this.strings[1][what] !== 'undefined') {
			str = this.strings[1][what];
		} else {
			speech.speak(what);
		}
		rep.forEach((v, i) => {
				const i1 = Number(i) + 1;
				str = str.replace('%' + i1, v);
				});
		speech.speak(str);
	}

	async check(lng) {
		const len = utils.objSize(this.strings) - 2;
		for (const i in this.strings[1]) {
			if (!this.strings[lng].hasOwnProperty(i)) {
				await new ScrollingText(i + ': ' + this.strings[1][i]);
			}
		}
	}
}
export var strings = new Strings();
