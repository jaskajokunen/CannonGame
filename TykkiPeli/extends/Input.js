var Input={Input:{keyBuffer:[],cacheKeyBuffer:[],_keyFunctions:{},_keyPress:{},_keyUp:{},_keyType:{},_keyPressed:{},_lock:{},_rules:{},_key:function(e,key,callback){if(typeof key=="function"){key(e);}
else{if(key instanceof Array){for(var i=0;i<key.length;i++){if(e.which==key[i]){if(callback)callback(e);}}}
else if(e.which==key){if(callback)callback(e);}}},press:function(key,onPressKey){this._press('keyPress',key,onPressKey);this.keyUp(key);},clearKeys:function(key){this.press(key,function(){});},keyDown:function(key,onPressKey){this._press('keyDown',key,onPressKey);},keyUp:function(key,onKeyUp){var self=this;if(key instanceof Array){for(var i=0;i<key.length;i++){self._keyUp[key[i]]=onKeyUp;}}
else{self._keyUp[key]=onKeyUp;}
document.onkeyup=function(e){self._keyPress[e.which]=0;self._keyPressed[e.which]=false;if(self._keyUp[e.which]){self._keyUp[e.which](e);}};},_press:function(type,key,onPressKey){var self=this;if(typeof key=="string"){key=this._rules[key];}
if(key instanceof Array){for(var i=0;i<key.length;i++){assignKey(key[i],type);}}
else{assignKey(key,type);}
if(this._lock.canvas){var canvas=this._lock.canvas;canvas.onkeydown=onkeydown;canvas.onfocus=function(e){document.onkeydown=function(){return false;}
if(self._lock.onFocus)self._lock.onFocus(e,canvas);}
canvas.onblur=function(e){document.onkeydown=null;if(self._lock.onBlur)self._lock.onBlur(e,canvas);}}
else{document.onkeydown=onkeydown;}
function onkeydown(e){if(!self._keyPress[e.which])self._keyPress[e.which]=0;self._keyPress[e.which]++;if(self._keyPress[e.which]>1&&self._keyType[e.which]=='keyPress')return;self._keyPressed[e.which]=true;if(self._keyFunctions[e.which])self._keyFunctions[e.which](e);}
function assignKey(_key,type){self._keyType[_key]=type;self._keyFunctions[_key]=onPressKey;}},reset:function(keys){this._keyPressed={};if(keys){for(var i=0;i<keys.length;i++){this._keyFunctions[keys[i]]=null;}}
else{this._keyFunctions={};}},lock:function(canvas,focus_start,onFocus,onBlur){var dom=document.getElementById(canvas);dom.setAttribute('tabindex',1);if(focus_start){dom.focus();document.onkeydown=function(){return false;}}
this._lock.canvas=dom;this._lock.onFocus=onFocus;this._lock.onBlur=onBlur;},isPressed:function(key){if(!(key instanceof Array)){key=[key];}
for(var i=0;i<key.length;i++){if(this._keyPressed[key[i]]){return true;}}
return false;},addKey:function(id,keycode){Input[id]=keycode;},memorize:function(){this.cacheKeyBuffer=this.keyBuffer;},restore:function(){this.keyBuffer=this.cacheKeyBuffer;},trigger:function(key,type,canvas){var ev,element,dom;if(type=="press"){this.trigger(key,"down");this.trigger(key,"up",canvas);return;}
if(this._lock.canvas){element=this._lock.canvas;}
else{element=document;}
if(document.createEventObject){ev=document.createEventObject();ev.keyCode=key;element.fireEvent("onkey"+type,ev);}
else if(document.createEvent){ev=document.createEvent("Events");ev.initEvent("key"+type,true,true);ev.which=key;element.dispatchEvent(ev);}
if(canvas){dom=document.getElementById(canvas.id+'-dom');dom.focus();}},addRule:function(name,inputs){this._rules[name]=inputs;},Gamepad:{_listener:{},gamepad:null,_onConnect:null,_onDisconnect:null,_connectState:false,init:function(onConnect,onDisconnect){this._onConnect=onConnect;this._onDisconnect=onDisconnect;return this;},getState:function(pos){this.gamepad=Gamepad.getStates()[pos];if(this.gamepad&&!this._connectState){if(this._onConnect)this._onConnect();this._connectState=true;}
else if(!this.gamepad&&this._connectState){if(this._onDisconnect)this._onDisconnect();this._connectState=false;}},addListener:function(obj,onDown,onUp){var _Input=Input.Input;if(typeof onDown!="function"){var _input=onDown;onDown=function(){_Input.trigger(_input,"down");};onUp=function(){_Input.trigger(_input,"up");};}
this._listener[obj]={onDown:onDown,onUp:onUp,state:false};},update:function(){this.getState(0);if(!this.gamepad)return;for(var key in this._listener){if(this.gamepad[key]==1&&!this._listener[key].state){if(this._listener[key].onDown)this._listener[key].onDown();this._listener[key].state=true;}
else if(this.gamepad[key]==0&&this._listener[key].state){if(this._listener[key].onUp)this._listener[key].onUp();this._listener[key].state=false;}}}},accelerometer:function(callback){if(window.DeviceOrientationEvent){window.addEventListener('deviceorientation',function(eventData){orientationHandler(eventData.alpha,eventData.beta,eventData.gamma);},false);}
else if(window.OrientationEvent){window.addEventListener('MozOrientation',function(eventData){orientationHandler(eventData.x,eventData.y,eventData.z);},false);}
function orientationHandler(x,y,z){callback(x,y,z);}}}};Input.A=65;Input.Z=90;Input.E=69;Input.Q=81;Input.Esc=27;Input.Enter=13;Input.Shift=16;Input.Ctrl=17;Input.Alt=18;Input.Space=32;Input.Back=8;Input.F1=112;Input.F2=113;Input.F11=122;Input.F12=123;Input.Left=37;Input.Up=38;Input.Right=39;Input.Bottom=40;