import {utils} from './utilities';
class Cube {
constructor() {
this.lastcolor=0;
this.color=0;
this.colors=[];
this.color=utils.randomInt(0,5);
this.lastcolor=this.color;
if (this.lastcolor==3 || this.lastcolor==5) this.lastcolor=0;
}
move(dir) {
switch(this.color) {
case 0:
switch(dir) {
case 1: this.color=1; break;
case 2: this.color=4; break;
case 3: this.color=3; break;
case 4: this.color=5; break;
}//direction
this.lastcolor=this.color;
break;
case 1:
switch(dir) {
case 1: this.color=2; break;
case 2: this.color=0; break;
case 3: this.color=3; break;
case 4: this.color=5; break;
}//direction
this.lastcolor=this.color;
break;
case 2:
switch(dir) {
case 1: this.color=4; break;
case 2: this.color=1; break;
case 3: this.color=5; break;
case 4: this.color=3; break;
}//direction
this.lastcolor=this.color;
break;
case 3:
switch(dir) {
case 1: this.color=1; break;
case 2: this.color=4; break;
case 3: this.color=2; break;
case 4: this.color=0; break;
}//direction
break;
case 4:
switch(dir) {
case 1: this.color=0; break;
case 2: this.color=2; break;
case 3: this.color=5; break;
case 4: this.color=3; break;
}//direction
this.lastcolor=this.color;
break;
case 5:
switch(dir) {
case 1: this.color=4; break;
case 2: this.color=1; break;
case 3: this.color=0; break;
case 4: this.color=2; break;

}//direction
break;
}//color
return this.color;
}//function
}//class
export {Cube}