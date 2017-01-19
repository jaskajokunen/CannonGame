if(typeof exports!="undefined"){var CE=require("canvasengine").listen(),CanvasEngine=false,Class=CE.Class;}
Class.create("Point",{initialize:function(px,py){this.x=px;this.y=py;}});Class.create("Polygon",{initialize:function(c){this.points=[];this.center=c;},addPoint:function(p){this.points.push(p);},addAbsolutePoint:function(p){this.points.push({"x":p.x-this.center.x,"y":p.y-this.center.y});},getNumberOfSides:function(){return this.points.length;},rotate:function(rads){for(var i=0;i<this.points.length;i++){var x=this.points[i].x;var y=this.points[i].y;this.points[i].x=Math.cos(rads)*x-Math.sin(rads)*y;this.points[i].y=Math.sin(rads)*x+Math.cos(rads)*y;}},containsPoint:function(pnt){var nvert=this.points.length;var testx=pnt.x;var testy=pnt.y;var vertx=new Array();for(var q=0;q<this.points.length;q++){vertx.push(this.points[q].x+this.center.x);}
var verty=new Array();for(var w=0;w<this.points.length;w++){verty.push(this.points[w].y+this.center.y);}
var i,j=0;var c=false;for(i=0,j=nvert-1;i<nvert;j=i++){if(((verty[i]>testy)!=(verty[j]>testy))&&(testx<(vertx[j]-vertx[i])*(testy-verty[i])/(verty[j]-verty[i])+vertx[i]))
c=!c;}
return c;},intersectsWith:function(other){var axis=Class.New("Point");var tmp,minA,maxA,minB,maxB;var side,i;var smallest=null;var overlap=99999999;for(side=0;side<this.getNumberOfSides();side++)
{if(side==0)
{axis.x=this.points[this.getNumberOfSides()-1].y-this.points[0].y;axis.y=this.points[0].x-this.points[this.getNumberOfSides()-1].x;}
else
{axis.x=this.points[side-1].y-this.points[side].y;axis.y=this.points[side].x-this.points[side-1].x;}
tmp=Math.sqrt(axis.x*axis.x+axis.y*axis.y);axis.x/=tmp;axis.y/=tmp;minA=maxA=this.points[0].x*axis.x+this.points[0].y*axis.y;for(i=1;i<this.getNumberOfSides();i++)
{tmp=this.points[i].x*axis.x+this.points[i].y*axis.y;if(tmp>maxA)
maxA=tmp;else if(tmp<minA)
minA=tmp;}
tmp=this.center.x*axis.x+this.center.y*axis.y;minA+=tmp;maxA+=tmp;minB=maxB=other.points[0].x*axis.x+other.points[0].y*axis.y;for(i=1;i<other.getNumberOfSides();i++)
{tmp=other.points[i].x*axis.x+other.points[i].y*axis.y;if(tmp>maxB)
maxB=tmp;else if(tmp<minB)
minB=tmp;}
tmp=other.center.x*axis.x+other.center.y*axis.y;minB+=tmp;maxB+=tmp;if(maxA<minB||minA>maxB){return false;}else{var o=(maxA>minB?maxA-minB:maxB-minA);if(o<overlap){overlap=o;smallest={x:axis.x,y:axis.y};}}}
for(side=0;side<other.getNumberOfSides();side++)
{if(side==0)
{axis.x=other.points[other.getNumberOfSides()-1].y-other.points[0].y;axis.y=other.points[0].x-other.points[other.getNumberOfSides()-1].x;}
else
{axis.x=other.points[side-1].y-other.points[side].y;axis.y=other.points[side].x-other.points[side-1].x;}
tmp=Math.sqrt(axis.x*axis.x+axis.y*axis.y);axis.x/=tmp;axis.y/=tmp;minA=maxA=this.points[0].x*axis.x+this.points[0].y*axis.y;for(i=1;i<this.getNumberOfSides();i++)
{tmp=this.points[i].x*axis.x+this.points[i].y*axis.y;if(tmp>maxA)
maxA=tmp;else if(tmp<minA)
minA=tmp;}
tmp=this.center.x*axis.x+this.center.y*axis.y;minA+=tmp;maxA+=tmp;minB=maxB=other.points[0].x*axis.x+other.points[0].y*axis.y;for(i=1;i<other.getNumberOfSides();i++)
{tmp=other.points[i].x*axis.x+other.points[i].y*axis.y;if(tmp>maxB)
maxB=tmp;else if(tmp<minB)
minB=tmp;}
tmp=other.center.x*axis.x+other.center.y*axis.y;minB+=tmp;maxB+=tmp;if(maxA<minB||minA>maxB){return false;}else{var o=(maxA>minB?maxA-minB:maxB-minA);if(o<overlap){overlap=o;smallest={x:axis.x,y:axis.y};}}}
function offset(poly,pt){return{x:pt.x+poly.center.x,y:pt.y+poly.center.y};}
var a1,a2,coincident_result=[],lines=[],k=0;function testInteraction(type,a1,a2){var j,b1,b2,result,coincident=[];for(j=0;j<other.getNumberOfSides();j++){b1=offset(other,other.points[j]);b2=offset(other,other.points[j+1]?other.points[j+1]:other.points[0]);result=Polygon.intersectLineLine(a1,a2,b1,b2);if(result=="Coincident"){coincident.push({sides:j});}
lines[k].push(result);}
k++;return coincident;}
for(i=0;i<this.getNumberOfSides();i++){lines[k]=[];a1=offset(this,this.points[i]);a2=offset(this,this.points[i+1]?this.points[i+1]:this.points[0]);coincident_result.push(testInteraction(null,a1,a2));}
return{overlap:overlap+0.001,axis:smallest,lines:lines,coincident:coincident_result};}});var Polygon={};Polygon.intersectLineLine=function(a1,a2,b1,b2){var ua_t=(b2.x-b1.x)*(a1.y-b1.y)-(b2.y-b1.y)*(a1.x-b1.x);var ub_t=(a2.x-a1.x)*(a1.y-b1.y)-(a2.y-a1.y)*(a1.x-b1.x);var u_b=(b2.y-b1.y)*(a2.x-a1.x)-(b2.x-b1.x)*(a2.y-a1.y);if(u_b!=0){var ua=ua_t/u_b;var ub=ub_t/u_b;if(0<=ua&&ua<=1&&0<=ub&&ub<=1){return{x:a1.x+ua*(a2.x-a1.x),y:a1.y+ua*(a2.y-a1.y)};}else{return false;}}else{if(ua_t==0||ub_t==0){return"Coincident";}else{return"Parallel";}}};Class.create("EntityModel",{x:0,y:0,_memorize:{x:0,y:0},hitState:{over:0,out:0},_polygon:{},_frame:"0",position:function(x,y){if(x!==undefined&&y!==undefined){this.x=x;this.y=y;var poly=this._polygon[this._frame];if(poly){poly.center.x=this.x;poly.center.y=this.y;}}
return{x:this.x,y:this.y};},savePosition:function(){this._memorize.x=this.x;this._memorize.y=this.y;},restorePosition:function(){this.x=this._memorize.x;this.y=this._memorize.y;},polygon:function(array){if(array instanceof Array){array={"0":array};}
for(var key in array){this._polygon[key]=Class.New("Polygon",[{x:array[key][0][0],y:array[key][0][1]}]);for(var i=0;i<array[key].length;i++){this._polygon[key].addPoint({x:array[key][i][0],y:array[key][i][1]});}}},rect:function(x,y,w,h){if(!w&&!h){w=x;h=y;x=0;y=0;}
if(!h){h=w;}
this.polygon([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);},hit:function(entity_model){var result=this._polygon[this._frame].intersectsWith(entity_model._polygon[entity_model._frame]);this.hitState.result=result;if(result){this.hitState.out=0;this.hitState.over++;}
else if(this.hitState.over>0){this.hitState.out=1;this.hitState.over=0;}
else{this.hitState.out=0;this.hitState.over=0;}
return this.hitState;},getPoints:function(frame){frame=frame||this._frame;return this._polygon[frame].points;},getPolygonReg:function(frame){frame=frame||this._frame;return this._polygon[frame].center;},getPolygon:function(frame){frame=frame||this._frame;return this._polygon[frame];},frame:function(frame){if(frame){this._frame=frame;}
return this._frame;},});Class.create("Entity",{stage:null,params:{},el:null,mode:null,hit_entities:[],initialize:function(stage,params,model){if(model===undefined)model=true;this.stage=stage;this.params=params;this.el=this.stage.getScene().createElement();if(model){this.setModel(Class.New("EntityModel"));}
this.testHit();},setModel:function(_class){this.model=_class;},position:function(x,y,move){var pos=this.model.position(x,y);if(x!==undefined){this.el.x=pos.x;this.el.y=pos.y;}
return{x:pos.y,y:pos.y};},move:function(x,y){var pos=this.model.position();if(!x)x=0;if(!y)y=0;return this.position(x+pos.x,y+pos.y,true);},polygon:function(array){this.model.polygon(array);},rect:function(x,y,w,h){this.model.rect(x,y,w,h);this.el.width=w;this.el.height=h;},onHit:function(event_name,entities,callback){this.hit_entities=this.hit_entities.concat(entities);this.el.on("entity:hit:"+event_name,callback);},testHit:function(){var self=this;this.el.attr("entity:testHit",function(){self.hit(self.hit_entities);});},testAnimHit:function(){var self=this;this.el.on("animation:draw",function(frame){});},hit:function(entities,callback){var state,self=this;function _call(e){if(callback)callback.call(self,e,self.el);self.el.trigger("entity:hit:"+e,[self.el]);}
for(var i=0;i<entities.length;i++){state=this.model.hit(entities[i].model);if(state.over==1){_call("over");}
else if(state.out==1){_call("out");}}}});var Matrix={};Class.create("Grid",{_rows:0,_cols:0,cell:{width:0,height:0,prop:[],},_matrix:null,_transform:null,_func:null,initialize:function(rows,cols){if(rows instanceof Array){this._matrix=rows;this.cell.prop=rows;cols=rows[0].length;rows=rows.length;}
this._rows=rows;this._cols=cols;},transform:function(func){this._func=func;},convert:function(x,y){if(!this._func){return{x:x,y:y};}
return this._func.call(this,x,y);},setPropertyCell:function(prop){if(typeof(PF)!="undefined"){this._pf_grid=false;this._pf_prop=(CanvasEngine||CE.Core).rotateMatrix(prop);}
this.cell.prop=prop;},getPropertyByCell:function(col,row){if(!this.cell.prop[col]){return undefined;}
return this.cell.prop[col][row];},setPropertyByCell:function(col,row,prop){if(!this.cell.prop[col]){return undefined;}
this.cell.prop[col][row]=prop;if(typeof(PF)!="undefined"){this._pf_grid=false;this._pf_prop=(CanvasEngine||CE.Core).rotateMatrix(this.cell.prop);}
return this;},getPropertyByPos:function(x,y){var cell=this.getCellByPos(x,y);return this.getPropertyByCell(cell.col,cell.row);},testCell:function(cell,entity,params){params=params||{};if(!entity.getPolygon){entity=entity.model;}
var result=[],poly=entity.getPolygon(),self=this;function offset(poly,pt){return{x:pt.x+poly.center.x,y:pt.y+poly.center.y};}
function testInteraction(type,a1,a2,poly){var j,b1,b2,lines=[],k=0,result,coincident=[],coincident_points=null,obj={};for(j=0;j<poly.getNumberOfSides();j++){b1=offset(poly,poly.points[j]);b2=offset(poly,poly.points[j+1]?poly.points[j+1]:poly.points[0]);result=Polygon.intersectLineLine(a1,a2,b1,b2);if(result=="Coincident"){if(a1.x==b1.x&&a1.y==b1.y){coincident_points={x:a1.x,y:a1.y};}
else if(a2.x==b2.x&&a2.y==b2.y){coincident_points={x:a2.x,y:a2.y};}
else if(a1.x==b2.x&&a1.y==b2.y){coincident_points={x:a1.x,y:a1.y};}
else if(a2.x==b1.x&&a2.y==b1.y){coincident_points={x:a2.x,y:a2.y};}
coincident.push({sides:j,points:coincident_points});}}
if(true){return coincident;}
else{obj[type]=coincident;return obj;}}
function real(cell){return{x:cell.x*self.cell.width,y:cell.y*self.cell.height};}
if(!cell.getPolygon){entity=entity.model;}
var points_cell=[{y:cell.row,x:cell.col},{y:cell.row,x:cell.col+1},{y:cell.row+1,x:cell.col+1},{y:cell.row+1,x:cell.col}];var a1,a2;for(j=0;j<points_cell.length;j++){a1=real(points_cell[j]);a2=real(points_cell[j+1]?points_cell[j+1]:points_cell[0]);result.push(testInteraction(null,a1,a2,poly));}
return result;},getEntityCells:function(entity,params){var i,j,p,points,reg,poly,px,py,_cells=[],ep={min_x:99999999,max_x:0,min_y:99999999,max_y:0};params=params||{};if(entity.model){points=entity.model.getPoints();reg=entity.model.getPolygonReg();poly=entity.model.getPolygon();}
else{points=entity.getPoints();reg=entity.getPolygonReg();poly=entity.getPolygon();}
for(i=0;i<points.length;i++){p=points[i];px=p.x+reg.x;py=p.y+reg.y;if(px<ep.min_x){ep.min_x=px;}
if(px>ep.max_x){ep.max_x=px;}
if(py<ep.min_y){ep.min_y=py;}
if(py>ep.max_y){ep.max_y=py;}}
var cell=[this.getCellByPos(ep.min_x,ep.min_y),this.getCellByPos(ep.max_x,ep.min_y),this.getCellByPos(ep.max_x,ep.max_y),this.getCellByPos(ep.min_x,ep.max_y)];var nbrows=cell[2].row-cell[0].row,nbcols=cell[1].col-cell[0].col;for(i=0;i<nbcols-1;i++){for(j=0;j<nbrows-1;j++){cell.push({row:cell[0].row+j,col:cell[0].col+i});}}
return{cells:cell};},getCellByPos:function(x,y){if(this.cell.width==0||this.cell.height==0){throw"Set the size of the cell prior with setCellSize method";}
var col=Math.floor(this.convert(x,y).x/this.cell.width),row=Math.floor(this.convert(x,y).y/this.cell.height);return{col:col,row:row};},setCellSize:function(w,h){this.cell.width=w;this.cell.height=h;},getRows:function(){return this._rows;},getCols:function(){return this._cols;},getNbCell:function(){return this.getRows()*this.getCols();},passableCell:function(x,y,max,array_exception){array_exception=array_exception||[];var H_MAP=this._cols;var W_MAP=this._rows;var mapData=this.cell.prop;var tab_move_passable=[];function init_tab_move(){for(var i=0;i<H_MAP*2+1;i++){tab_move_passable[i]=[];for(var j=0;j<H_MAP*2+1;j++){tab_move_passable[i][j]=-1;}}
var middle=Math.floor(tab_move_passable.length/2);tab_move_passable[middle][middle]=0;}
var pos_temporaire=[];var pos_semi_tempor=[[x,y]];var path=0;var diff_x=pos_semi_tempor[0][0]-H_MAP;var diff_y=pos_semi_tempor[0][1]-H_MAP;var tab_move=[];var id=0;init_tab_move();function inArray(x,y){for(var j=0;j<array_exception.length;j++){if(array_exception[j][0]==x&&array_exception[j][1]==y){return true;}}
return false;}
while(!pos_semi_tempor.length==0&&path<max){pos_temporaire=[];for(var i=0;i<pos_semi_tempor.length;i++){var new_pos_x=pos_semi_tempor[i][0];var new_pos_y=pos_semi_tempor[i][1];var tab_x=new_pos_x;var tab_y=new_pos_y;for(var j=0;j<4;j++){switch(j){case 0:if(mapData[new_pos_x][new_pos_y+1]!=undefined&&mapData[new_pos_x][new_pos_y+1]==id&&!inArray(new_pos_x,new_pos_y+1)&&tab_move_passable[tab_x][tab_y+1]==-1){pos_temporaire.push([new_pos_x,new_pos_y+1]);tab_move.push([new_pos_x,new_pos_y+1]);tab_move_passable[tab_x][tab_y+1]=0;}
break;case 1:if(mapData[new_pos_x+1]!=undefined&&mapData[new_pos_x+1][new_pos_y]!=undefined&&mapData[new_pos_x+1][new_pos_y]==id&&!inArray(new_pos_x+1,new_pos_y)&&tab_move_passable[tab_x+1][tab_y]==-1){pos_temporaire.push([new_pos_x+1,new_pos_y]);tab_move.push([new_pos_x+1,new_pos_y]);tab_move_passable[tab_x+1][tab_y]=0;}
break;case 2:if(mapData[new_pos_x][new_pos_y-1]!=undefined&&mapData[new_pos_x][new_pos_y-1]==id&&!inArray(new_pos_x,new_pos_y-1)&&tab_move_passable[tab_x][tab_y-1]==-1){pos_temporaire.push([new_pos_x,new_pos_y-1]);tab_move.push([new_pos_x,new_pos_y-1]);tab_move_passable[tab_x][tab_y-1]=0;}
break;case 3:if(mapData[new_pos_x-1]!=undefined&&mapData[new_pos_x-1][new_pos_y]!=undefined&&mapData[new_pos_x-1][new_pos_y]==id&&!inArray(new_pos_x-1,new_pos_y)&&tab_move_passable[tab_x-1][tab_y]==-1){pos_temporaire.push([new_pos_x-1,new_pos_y]);tab_move.push([new_pos_x-1,new_pos_y]);tab_move_passable[tab_x-1][tab_y]=0;}
break;}}}
pos_semi_tempor=pos_temporaire;path+=1;}
return tab_move;},pathfinding:function(x0,y0,x1,y1,type,options){type=type||"AStarFinder";if(!this._pf_grid){this._pf_grid=new PF.Grid(this._rows,this._cols,this._pf_prop);}
if(x0===undefined){return this._pf_grid;}
return new PF[type](options).findPath(x0,y0,x1,y1,this._pf_grid.clone());}});var Hit={Grid:{"new":function(rows,cols){return Class.New("Grid",[rows,cols]);}}}
if(typeof exports!="undefined"){exports.Class=Hit;}