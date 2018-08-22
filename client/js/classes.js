import {utils} from './utilities';
class Cube {
constructor() {
this.ptop=1;
this.pbot =6;
this.pleft = 2;
this.pright = 4;
this.pforward = 3;
this.pback = 5;
this.top=1;
this.color=0;
this.bot =6;
this.left = 2;
this.right = 4;
this.forward = 3;
this.back = 5;
}
move(dir) {
if (dir==4) {
this.bot=this.pleft;
this.left=this.ptop;
this.top=this.pright;
this.right=this.pbot;
this.ptop=this.top;
this.pbot=this.bot;
this.pleft=this.left;
this.pright=this.right;
this.color=Number(this.top)-1; return this.top-1;
}
if (dir==3) {
this.top=this.pleft;
this.right=this.ptop;
this.left=this.pbot;
this.bot=this.pright;
this.ptop=this.top;
this.pbot=this.bot;
this.pleft=this.left;
this.pright=this.right;
this.color=Number(this.top)-1; return this.top-1;
}
if (dir==2) {
this.top=this.pforward;
this.back=this.ptop;
this.bot=this.pback;
this.forward=this.pbot;
this.ptop=this.top;
this.pbot=this.bot;
this.pforward=this.forward;
this.color=Number(this.top)-1; return this.top-1;
}
if (dir==1) {
this.top=this.pback;
this.back=this.pbot;
this.bot=this.pforward;
this.forward=this.ptop;
this.ptop=this.top;
this.pbot=this.bot;
this.pforward=this.forward;
this.pback=this.back;
this.color=Number(this.top)-1; return this.top-1;
}

}//function
}//class
export {Cube}