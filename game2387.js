function login(action) {

}
var bestscore="";
var score100="";
var scoretext="1'st:"+bestscore+" 100's:"+score100;

function refr(dosend) {
	document.body.style.overflow = "auto";
	
	if(fb_id=="" && mode !== "home" && text !== 0){
		console.log(text);
		printScoreToLeftSide(TZ, mode, null, text, "anon");
	}
}




// Load PBs from localStorage
if (typeof window.personalBests === 'undefined') {
    window.personalBests = {};
    let saved = localStorage.getItem("scorePBs");
    if (saved) {
        window.personalBests = JSON.parse(saved);
    }
	let scoreContainer = document.getElementById("scorePanel");
	if (!scoreContainer) {
        scoreContainer = document.createElement("div");
        scoreContainer.id = "scorePanel";
        scoreContainer.style.position = "absolute";
        scoreContainer.style.left = "10px";
        scoreContainer.style.top = "10px";
        scoreContainer.style.width = "280px";
        scoreContainer.style.backgroundColor = "rgba(0,0,0,0.85)";
        scoreContainer.style.color = "white";
        scoreContainer.style.fontFamily = "monospace";
        scoreContainer.style.fontSize = "11px";
        scoreContainer.style.zIndex = "9999";
        scoreContainer.style.borderRadius = "3px";
        
        // Header with hide button
        let header = document.createElement("div");
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";
        header.style.padding = "6px 8px";
        header.style.borderBottom = "1px solid #333";
        header.style.backgroundColor = "rgba(0,0,0,0.9)";
        
        let title = document.createElement("span");
        title.innerHTML = "scores";
        title.style.fontSize = "11px";
        
        let hideBtn = document.createElement("button");
        hideBtn.innerHTML = "[-]";
        hideBtn.style.cursor = "pointer";
        hideBtn.style.backgroundColor = "transparent";
        hideBtn.style.color = "white";
        hideBtn.style.border = "none";
        hideBtn.style.fontSize = "11px";
        hideBtn.style.fontFamily = "monospace";
        
        let contentDiv = document.createElement("div");
        contentDiv.id = "scorePanelContent";
        contentDiv.style.padding = "6px 8px";
        contentDiv.style.maxHeight = "400px";
        contentDiv.style.overflowY = "auto";
        
        hideBtn.onclick = function() {
            if (contentDiv.style.display === "none") {
                contentDiv.style.display = "block";
                hideBtn.innerHTML = "[-]";
            } else {
                contentDiv.style.display = "none";
                hideBtn.innerHTML = "[+]";
            }
        };
        
        header.appendChild(title);
        header.appendChild(hideBtn);
        scoreContainer.appendChild(header);
        scoreContainer.appendChild(contentDiv);
        
        document.body.appendChild(scoreContainer);
		updatePBDisplay(contentDiv);
    }
}

// Save PBs to localStorage
function savePBs() {
    localStorage.setItem("scorePBs", JSON.stringify(window.personalBests));
}

// Function to print scores on the left side
function printScoreToLeftSide(TZ, mode, fb_id, score, userName) {
    // Create or get the score display container
    let scoreContainer = document.getElementById("scorePanel");
    
    
    let contentDiv = document.getElementById("scorePanelContent");
    
    // Check for Personal Best (lower score is better)
    let isPB = false;
    let scoreNum = parseFloat(score);
    if (!isNaN(scoreNum) && mode) {
        let currentPB = window.personalBests[mode];
        if (!currentPB || scoreNum < currentPB) {
            window.personalBests[mode] = scoreNum;
            savePBs();
            isPB = true;
        }
    }
    
    // Update PB display at top
    updatePBDisplay(contentDiv);
    
    // Create score entry
    let scoreEntry = document.createElement("div");
    scoreEntry.style.marginBottom = "4px";
    scoreEntry.style.padding = "2px 0";
    scoreEntry.style.borderBottom = "1px solid #222";
    scoreEntry.style.color = "white";
    
    if (isPB) {
        scoreEntry.style.color = "#ffcc00";
    }
    
    // Format score info
    let infoText = "";
    if (score) infoText += `${score} | `;
    if (mode) infoText += `${mode}`;
    infoText = infoText.replace(/ \| $/, "");
    
    let timestamp = new Date().toLocaleTimeString();
    let pbMarker = isPB ? "*PB* " : "";
    scoreEntry.innerHTML = `<span style="color:#666">[${timestamp}]</span> ${pbMarker}${infoText}`;
    
    contentDiv.insertBefore(scoreEntry, contentDiv.firstChild.nextSibling);
    
    // Limit entries
    while (contentDiv.children.length > 51) {
        contentDiv.removeChild(contentDiv.lastChild);
    }
}

// Function to display PBs at the top of the log
function updatePBDisplay(container) {
    // Remove existing PB display if present
    let existingPB = document.getElementById("pbHeader");
    if (existingPB) {
        existingPB.remove();
    }
    
    // Create PB display section
    let pbDiv = document.createElement("div");
    pbDiv.id = "pbHeader";
    pbDiv.style.marginBottom = "8px";
    pbDiv.style.paddingBottom = "6px";
    pbDiv.style.borderBottom = "1px solid #444";
    pbDiv.style.fontSize = "10px";
    
    let hasPB = false;
    let pbText = "";
    
    for (let mode in window.personalBests) {
        hasPB = true;
        pbText += `${mode}: ${window.personalBests[mode]}  `;
    }
    
    if (hasPB) {
        pbDiv.innerHTML = `<span style="color:#ffcc00">PBs</span><br><span style="color:#888">${pbText}</span>`;
    } else {
        pbDiv.innerHTML = `<span style="color:#666">no PBs yet</span>`;
    }
    
    // Insert at the top of container
    if (container.firstChild) {
        container.insertBefore(pbDiv, container.firstChild);
    } else {
        container.appendChild(pbDiv);
    }
}

var text = 0;
var date1;
var date2;
var hidemem = true;
var showmem = true;
var runningGO = false;
var diff = 0;
var numorig = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
var menuit = ["","react","light","light_r","orig","orig_r","memory"];

var num = numorig.slice();
var mode = "home";
var godown = new Array();
var arrNum = new Array();
var arrTime = new Array();
var memt = new Array();
//var num = numorig;
var numdum = ["","","","","","","","","","","","","","","","","","","","","","","","",""];
var expect = 0;
var lastTime=0;
var allowclick=false;
if (BABYLON.Engine.isSupported()) {} else {alert("Schulte-Table can't run on your browser, please use last versions of Google Chrome, FireFox, IE or Safari.");}

function getNum() {    var randno = Math.floor(Math.random() * num.length);    var retval = num[randno];    num.splice(randno,1);    return retval;}
function fixTime(){ arrTime[expect]=text-lastTime; lastTime=text;}

function drawTime() {
	document.getElementById("chart_div").style.display="inline";
	//document.getElementById("chart_div").style.left = document.getElementById('renderCanvas').getBoundingClientRect().left+window.scrollX+"px";
	drawDualY();

}
function hideTime() {

    document.getElementById("chart_div").style.display = "none";

}
function startGO() {
	hideTime();
//	if(document.getElementById("userdiv").innerHTML=="Anonymous") {$('#windowTitleDialog').modal('show'); return;}
	if(mode=="home") {mode="react";	 $('.nav-tabs a[href="#' + mode + '"]').tab('show');}
 	hidemem = true;
	showmem = true;
	document.body.style.overflow = "hidden";
	num = numorig.slice();
	arrNum = new Array();
	arrTime = new Array();
	lastTime=0;
	idx=0;
	for(var vx=-2; vx<3; vx++) {
		for(var vy=-2; vy<3; vy++) {
			arrNum[idx]=getNum();
			writeonbox(arrNum[idx],vy,vx);
			idx++;
		}
	}
	box[0].position.x=-6.0;
	document.getElementById("hint_div").style.display="none";
	hideMenu();
	expect = 1;
	if(mode=="light_r" || mode=="orig_r") expect=25;
	runningGO = true;
	if(mode=="react") {
    if (box[1].material) box[1].material.dispose();
    box[1].material=getRedMaterial();
}
	date1 = new Date();
	godown = new Array();
        context2.clearRect(0,0,420,40);
	context2.font = "bold 20px Arial";
	context2.fillText("Next #: "+expect, 10, 30);
	context2.fillText("Score:", 310, 30);
	window.scrollTo(0,0);
}
window.onscroll=function () { if(runningGO) {window.scrollTo(0,0); return;} }
function stopGO() {
	if(text=="60.000" || expect==0 || expect == 26 || mode == "home" || text=="0") {} else {
		console.log("try to cheat? why? please, play fair!");
		return;
  }
	hideTime();
	hidemem=false;
	box[0].scaling.z = 1;
	box[0].scaling.x = 1;
//	box[0].position.x=-6.0;
	box[0].scaling.y = 1;
	box[0].position.x=0;
	box[0].position.z=0;
	if(mode=="home") {box[0].position.x=-6.0;document.getElementById("hint_div").style.display="none";showMenu(); document.getElementById("brand").innerHTML=brand_str;} else {
		document.getElementById("brand").innerHTML="<span class='glyphicon glyphicon-arrow-left' aria-hidden='true'></span> "+back_str;
		document.getElementById("hint_div").innerHTML=descr[mode];
                document.getElementById("hint_div").style.display="inline";
		//document.getElementById("hint_div").style.left = document.getElementById('renderCanvas').getBoundingClientRect().left+window.scrollX+"px";
		hideMenu();
		if(runningGO) drawTime();
	}
	runningGO = false;

	memtclear();
	refr();
	ifps = 0;
	xfps = 0;
	godown = new Array();
	for(key in box) if(key>0) box[key].position.y=-11; 
//	selectedondown = false;
//	oselectedondown = false;
BABYLON.Tools.QueueNewFrame(renderLoop);
BABYLON.Tools.QueueNewFrame(renderLoop);


}

function hideMenu() {	for(key in dmenu) dmenu[key].position.x=-6.0; }

function getRedMaterial() {
	var material2 = new BABYLON.StandardMaterial("default", scene);
	material2.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
	var dynamicTexture2 = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
	dynamicTexture2.hasAlpha = true;
	material2.diffuseTexture = dynamicTexture2;
	var textureContext2 = dynamicTexture2.getContext();
	var size = dynamicTexture2.getSize();
	textureContext2.save();
	textureContext2.fillStyle = "red";
	textureContext2.fillRect(0, 0, size.width, size.height);
            textureContext2.font = "320px Calibri";
            var textSize = textureContext2.measureText(expect);
            textureContext2.fillStyle = "black";
            textureContext2.fillText(expect, (size.width - textSize.width) / 2, (size.height + 120) / 2);

	textureContext2.restore();
	dynamicTexture2.update();
	return material2;
}

var box = new Array();
var dmenu = new Array();
var material2;

function bornbox(text,posx,posz) {
            box[text] = BABYLON.Mesh.CreateBox("box_"+text, 0.98, scene);
	    material2 = new BABYLON.StandardMaterial("default", scene);
            material2.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
            var dynamicTexture2 = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
            dynamicTexture2.hasAlpha = true;
            material2.diffuseTexture = dynamicTexture2;
            var textureContext2 = dynamicTexture2.getContext();
	    var size = dynamicTexture2.getSize();
             
            textureContext2.save();
            textureContext2.fillStyle = "white";
            textureContext2.fillRect(0, 0, size.width, size.height);

            textureContext2.font = "320px Calibri";
            var textSize = textureContext2.measureText(text);
            textureContext2.fillStyle = "black";
            textureContext2.fillText("", (size.width - textSize.width) / 2, (size.height + 120) / 2);
            textureContext2.restore();
          
            dynamicTexture2.update();
	box[text].material = material2;
	    box[text].position.x=posx;
	    box[text].position.z=posz;
	    box[text].position.y=-11;
	    material2.alpha = 0.5;

	}
	function writeonbox(BOX_ID,posx,posz) {
//	console.log(BOX_ID);
	if(isNaN(BOX_ID) || BOX_ID<1 || BOX_ID>25) return; 
//            box[BOX_ID] = BABYLON.Mesh.CreateBox("box_"+BOX_ID, 0.9, scene);
            var material3 = new BABYLON.StandardMaterial("default", scene);
            material3.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
            var dynamicTexture2 = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
            dynamicTexture2.hasAlpha = true;
            material3.diffuseTexture = dynamicTexture2;
            var textureContext2 = dynamicTexture2.getContext();
	    var size = dynamicTexture2.getSize();
             
            textureContext2.save();
            textureContext2.fillStyle = "white";
            textureContext2.fillRect(0, 0, size.width, size.height);

            textureContext2.font = "320px Calibri";
            var textSize = textureContext2.measureText(BOX_ID);
            textureContext2.fillStyle = "black";
            if(mode!="react" && showmem) textureContext2.fillText(BOX_ID, (size.width - textSize.width) / 2, (size.height + 120) / 2);
            textureContext2.restore();
          
            dynamicTexture2.update();
            if (box[BOX_ID].material) {
    box[BOX_ID].material.dispose();
}
box[BOX_ID].material = material3;
	    box[BOX_ID].position.x=posx;
	    box[BOX_ID].position.z=posz;
	    box[BOX_ID].position.y=0;

	}
	function clearbox(BOX_ID,posx,posz) {
//	console.log(BOX_ID);
	if(BOX_ID=="") return;
	if(expect>BOX_ID) return; 
	if(text<3) return;
	if(runningGO) {} else return;
//            box[BOX_ID] = BABYLON.Mesh.CreateBox("box_"+BOX_ID, 0.9, scene);
            var material2 = new BABYLON.StandardMaterial("default", scene);
            material2.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
            var dynamicTexture2 = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
            dynamicTexture2.hasAlpha = true;
            material2.diffuseTexture = dynamicTexture2;
            var textureContext2 = dynamicTexture2.getContext();
	    var size = dynamicTexture2.getSize();
             
            textureContext2.save();
            textureContext2.fillStyle = "white";
            textureContext2.fillRect(0, 0, size.width, size.height);

            textureContext2.font = "320px Calibri";
            var textSize = textureContext2.measureText(BOX_ID);
            textureContext2.fillStyle = "black";
            textureContext2.restore();
          
            dynamicTexture2.update();
            if (box[BOX_ID].material) {
    box[BOX_ID].material.dispose();
}
box[BOX_ID].material = material2;
	    box[BOX_ID].position.x=posx;
	    box[BOX_ID].position.z=posz;
	    box[BOX_ID].position.y=0;

	}
function getOffset( el ) {    var _x = 0;    var _y = 0;   while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {        _x += el.offsetLeft - el.scrollLeft;        _y += el.offsetTop - el.scrollTop;        el = el.offsetParent;    }    return { y: _y, x: _x };}

  var canvas2 = document.getElementById("scoreCanvas");
  var context2 = canvas2.getContext("2d");
  context2.fillStyle = "white";
  context2.font = "bold 20px Arial";
  context2.fillText("Next #: "+expect, 10, 30);
  context2.fillText("Score: 0", 310, 30);
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.3, 10, new BABYLON.Vector3(0, 0, 0), scene);
//	    BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.HighDegradationAllowed());
//	    camera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 1.0);
            var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 0), scene);
            light.diffuse = new BABYLON.Color3(1, 1, 1);
	    light.specular = new BABYLON.Color3(0,0, 0);
//	    light.position.y=1;
            camera.setPosition(new BABYLON.Vector3(0.01, 7, 0));
          //  camera.attachControl(canvas);
//********************************************************************************************
//********************************************************************************************
  var plane = BABYLON.Mesh.CreatePlane("plane", 16, scene);
    plane.position.y = -11;
    plane.position.x = 0;
    plane.position.z = 0;
plane.rotation.x = Math.PI / 2;
	var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
	materialPlane.diffuseTexture = new BABYLON.Texture("brokenstupidimage.png", scene);
	 plane.material = materialPlane;

var materials = new Array();
var dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
dynamicTexture.hasAlpha = true;
var material = new BABYLON.StandardMaterial("default", scene);

addCenterBox();
addMenuBoxes();


for(var vx=-2; vx<3; vx++) {
	for(var vy=-2; vy<3; vy++) {
		bornbox(getNum(),vy,vx);
	}
}

var infobox;
function addCenterBox() {
        box[0] = BABYLON.Mesh.CreateSphere("Box1", 32, 3, scene);
	//box[0] = BABYLON.Mesh.CreateBox("Box1", 2.0, scene);
        material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        material.diffuseTexture = dynamicTexture;
        
	material.alpha = 0.7;
	material.specularPower = 16;

	material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
	material.reflectionFresnelParameters.bias = 0.1;

	material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
	material.emissiveFresnelParameters.bias = 0.6;
	material.emissiveFresnelParameters.power = 4;
	material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
	material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

	material.opacityFresnelParameters = new BABYLON.FresnelParameters();
	material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
	material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();
	box[0].material = material;
	box[0].position.x=-6;
	box[0].position.z=0;

}

function addInfoBox() {
	infobox = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);
//	infobox.material = material;
	infobox.position.x=0;
	infobox.position.z=0;
	infobox.position.y=-11;

}
function addMenuBoxes() {
	    addMenuBox(1," Reaction",-1.7,-1.2);
	    addMenuBox(2,"Classic Light",-1.7,1.2);
	    addMenuBox(3,"Classic Light Reverse",0,-1.2);
	    addMenuBox(4,"Classic Original",0,1.2);
	    addMenuBox(5,"Classic Original Reverse",1.7,-1.2);
	    addMenuBox(6," Memory",1.7,1.2);
}
function showMenu() {
    dmenu[1].position.x=-1.7;
    dmenu[2].position.x=-1.7;
    dmenu[3].position.x=0;
    dmenu[4].position.x=0;
    dmenu[5].position.x=1.7;
    dmenu[6].position.x=1.7;  
}

function addMenuBox(m_id,m_text,m_x,m_y) {
            dmenu[m_id] = BABYLON.Mesh.CreateBox("menu_"+m_id, 2.2, scene);          
            var material2 = new BABYLON.StandardMaterial("texture1", scene);

//            material2.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
            var dynamicTexture2 = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
  //          dynamicTexture2.hasAlpha = true;

            material2.diffuseTexture  = dynamicTexture2;
//            material2.diffuseTexture  = new BABYLON.Texture("img/but_"+m_id+".jpg", scene);
//    material2.alpha = 0.8;
 //   material2.specularPower = 16;
            var textureContext2 = dynamicTexture2.getContext();
	    var size = dynamicTexture2.getSize();
             
//	var imageObj = new Image();
//	imageObj.src = 'img/woodbut.jpg';
//	imageObj.onload = function(){
//         textureContext2.drawImage(imageObj, 10, 10,size.width, size.height);
//         textureContext2.font = "40pt Calibri";
//         textureContext2.fillText("My TEXT!", 20, 20);
 //    };
//	textureContext2.drawImage(img1, 0, 0);//, size.width, size.height);
//            textureContext2.fillStyle = "red";
  //          textureContext2.fillRect(0, 0, size.width, size.height);



    material2.alpha = 0.8;
    material2.specularPower = 16;

material2.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    material2.reflectionFresnelParameters.bias = 0.1;

    material2.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    material2.emissiveFresnelParameters.bias = 0.6;
    material2.emissiveFresnelParameters.power = 4;
    material2.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
    material2.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

    material2.opacityFresnelParameters = new BABYLON.FresnelParameters();
    material2.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
    material2.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

            textureContext2.save();

		textureContext2.fillStyle = "silver";
//		if(!runningGO)  textureContext.fillStyle = "red";  else textureContext.fillStyle = "black";
                textureContext2.fillRect(0, 0, size.width, size.height);
                
            textureContext2.font = "110px Calibri";
            var textSize = textureContext2.measureText(text);
            textureContext2.fillStyle = "black";
	    awords=m_text.split(" ");
	    var step=0;
	    for(key in awords) {
		var textSize = textureContext2.measureText(awords[key]);
		    step+=110;
	            textureContext2.fillText(awords[key], 260-textSize.width/2, 80+step);
	    }
       	    textureContext2.restore();
          
            dynamicTexture2.update();

	    dmenu[m_id].material = material2;
	    dmenu[m_id].position.x=m_x;
	    dmenu[m_id].position.z=m_y;
            dmenu[m_id].scaling.x = 0.6;
/*
            materials[m_id] = new BABYLON.StandardMaterial("default", scene);
            materials[m_id].emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
            materials[m_id].diffuseTexture = dynamicTexture;
  
            dmenu[m_id] = BABYLON.Mesh.CreateBox("menu_"+m_id, 1.5, scene);
            dmenu[m_id].material = materials[m_id];
	    dmenu[m_id].position.x=m_x;
	    dmenu[m_id].position.z=m_y;

/*	    var size = dynamicTexture.getSize();
            var textureContext = dynamicTexture.getContext();        
	    textureContext.fillText(m_text, 60, (size.height - 120) / 2);
            textureContext.font = "50px Calibri";
            textureContext.fillText("click here to start!", 80, (size.height + 320) / 2);
*/
}

//******************EVENTS*******************************************
var selectedondown = false;
var oselectedondown = false;
var ismousedown = false;
var scored = 0;
canvas.addEventListener("click", function (evt) {
//   var pickResult = scene.pick(evt.clientX, evt.clientY);
// alert(pickResult.pickedMesh.id);
//count++;
});

canvas.addEventListener("pointerdown", function (evt) {
	if(mode=="orig" || mode=="orig_r") {
	// Reset all boxes y position to original
for(var i = 1; i <= 25; i++) {
    if(box[i]) {
        box[i].position.y = 0;
    }
}
	}
   // We try to pick an object
    ismousedown=true;
	scored = 0;
    if(runningGO && mode=="memory" && text<3) return;

   var pickResult = scene.pick(evt.clientX-getOffset(canvas).x, evt.clientY-getOffset(canvas).y);
	// alert(pickResult.pickedMesh.id);
	//&& pickResult.pickedMesh.id=="Box1"
	allowclick=false;
    if(pickResult.pickedMesh) {
	if(pickResult.pickedMesh.id.substr(0,4)=="menu") {
		var selid=pickResult.pickedMesh.id.substr(5);
		mode=menuit[selid];
		//re_link.click();
		text=0;diff=0;
		 $('.nav-tabs a[href="#' + mode + '"]').tab('show');
		box[0].position.x=0;
		hideMenu();
		stopGO();

	}

	if(pickResult.pickedMesh.id=="Box1") {startGO(); BABYLON.Tools.QueueNewFrame(renderLoop);}
//	if(pickResult.pickedMesh.id.substr(0,4)=="box_") {
//		if(expect == pickResult.pickedMesh.id.substr(4)) expect++;
//		if(expect==26) {expect=1; stopGO();}
//	}
	}

    if(pickResult.pickedMesh) {
	if(selectedondown) oselectedondown = selectedondown;
	selectedondown = pickResult.pickedMesh;
        if(pickResult.pickedMesh.id=="Box1") allowclick=true;
	if(pickResult.pickedMesh.id.substr(0,4)=="box_") {
	    if(mode=="light_r" || mode=="orig_r") {
		if(expect == pickResult.pickedMesh.id.substr(4)) {allowclick=true; fixTime(); expect--;}
		if(expect==0) {stopGO(); expect=25;}
	    } else {
		if(expect == pickResult.pickedMesh.id.substr(4)) {allowclick=true; fixTime(); expect++; scored = 1; if(mode=="react" && expect<26) {
    if (box[expect].material) box[expect].material.dispose();
    box[expect].material=getRedMaterial();
}}
		if(expect==26) {stopGO(); expect=1;}
	    }
	}
    }
        if(mode=="memory" && text>3) {
//		console.log(expect +"-"+ pickResult.pickedMesh.id.substr(4)+"-"+memt.length);
		if(expect < pickResult.pickedMesh.id.substr(4)-1+2+scored) writeonbox(pickResult.pickedMesh.id.substr(4),pickResult.pickedMesh.position.x,pickResult.pickedMesh.position.z);
		if(expect < pickResult.pickedMesh.id.substr(4)) memt[memt.length]=setTimeout("clearbox("+pickResult.pickedMesh.id.substr(4)+","+pickResult.pickedMesh.position.x+","+pickResult.pickedMesh.position.z+")",3000);
	}

	if(mode=="orig" || mode=="orig_r") {
		if(runningGO && pickResult.pickedMesh && allowclick && pickResult.pickedMesh.id.substr(0,4)=="box_") pickResult.pickedMesh.position.y=-0.5;
//		if(selectedondown) selectedondown.position.y=-0.5;
	} else {
		if(pickResult.pickedMesh && pickResult.pickedMesh.id=="Box1") {pickResult.pickedMesh.position.y=0; allowclick=false;}
		if(selectedondown && allowclick) godown[selectedondown.id.substr(4)]=true; //selectedondown.position.y=-11;
	}
       if(runningGO) evt.preventDefault(); else  BABYLON.Tools.QueueNewFrame(renderLoop);

//    if(pickResult.pickedMesh && allowclick) pickResult.pickedMesh.position.y=-0.5;
},false);

canvas.addEventListener("pointerrawupdate", function(evt) {
	//console.log(ismousedown);
    if(runningGO && mode=="memory" && text<3) return;
    if(runningGO && ismousedown) {
   var pickResult = scene.pick(evt.clientX-getOffset(canvas).x, evt.clientY-getOffset(canvas).y);
		if(allowclick) {} else {
    if(pickResult.pickedMesh) {
	if(pickResult.pickedMesh.id.substr(0,4)=="box_") {
		//console.log(pickResult.pickedMesh.id.substr(4));
		if(expect == pickResult.pickedMesh.id.substr(4)) {
			    if(mode=="orig" || mode=="orig_r") {
                                 	 pickResult.pickedMesh.position.y=-0.5;
					if(selectedondown) oselectedondown = selectedondown;
					selectedondown = pickResult.pickedMesh;
					allowclick=true;

				} else {
				godown[pickResult.pickedMesh.id.substr(4)]=true;
				box[pickResult.pickedMesh.id.substr(4)].position.y=box[pickResult.pickedMesh.id.substr(4)].position.y-1; box[pickResult.pickedMesh.id.substr(4)].material.alpha=box[pickResult.pickedMesh.id.substr(4)].material.alpha-0.07;
				ifps = 0;
				xfps = 0;
			        ismousedown=false;
			    }
			    if(mode=="light_r" || mode=="orig_r") {
				 fixTime(); expect--;
				if(expect==0) {stopGO(); expect=25;}
			    } else {
				 fixTime(); expect++; 
				 if(mode=="react" && expect<26) {
    if (box[expect].material) box[expect].material.dispose();
    box[expect].material=getRedMaterial();
}
				if(expect==26) {stopGO(); expect=25;}
			    }
		}

	}

	}
}}
},false);

canvas.addEventListener("pointerup", function (evt) {
    ismousedown=false;
	if(runningGO) {
   var pickResult = scene.pick(evt.clientX-getOffset(canvas).x, evt.clientY-getOffset(canvas).y);
		if(allowclick) {
			if(mode=="orig" || mode=="orig_r") {
				
				if(pickResult.pickedMesh && pickResult.pickedMesh.id.substr(0,4)=="box_") pickResult.pickedMesh.position.y=0;
				if(selectedondown && selectedondown.id.substr(0,4)=="box_") selectedondown.position.y=0;
				if(oselectedondown && oselectedondown.id.substr(0,4)=="box_") oselectedondown.position.y=0;
			} else {
				if(pickResult.pickedMesh && pickResult.pickedMesh.id=="Box1") {pickResult.pickedMesh.position.y=0; allowclick=false;}
//				if(selectedondown && allowclick && pickResult.pickedMesh && pickResult.pickedMesh.id!="Box1") godown[selectedondown.id.substr(4)]=true; //selectedondown.position.y=-11;
			}
			allowclick=false;
		} else {
/*    if(pickResult.pickedMesh) {
	if(pickResult.pickedMesh.id.substr(0,4)=="box_") {
//		console.log(pickResult.pickedMesh.id.substr(4));
		if(expect == pickResult.pickedMesh.id.substr(4)) {
			    if(mode=="orig" || mode=="orig_r") {} else {
				godown[pickResult.pickedMesh.id.substr(4)]=true;
				box[pickResult.pickedMesh.id.substr(4)].position.y=box[pickResult.pickedMesh.id.substr(4)].position.y-1; box[pickResult.pickedMesh.id.substr(4)].material.alpha=box[pickResult.pickedMesh.id.substr(4)].material.alpha-0.07;
				ifps = 0;
				xfps = 0;
			    }

			    if(mode=="light_r" || mode=="orig_r") {
				expect--;
				if(expect==0) {expect=25; stopGO();}
			    } else {
				expect++; if(mode=="react" && expect<26) box[expect].material=getRedMaterial();
				if(expect==26) {expect=1; stopGO();}
			    }
		}

	}

	}
*/
}}
},false);


//*********************************************************************************************
//*******************************Before Render ************************************************
var isclickstart = 0;
var ifps = 0;
var inaction=false;
scene.beforeRender = function() {
	ifps++;	if(ifps>60) ifps=1;
	inaction=false;
	for(key in godown) {
		
if(godown[key]) { 
    if(box[key].position.y > -11) {
        inaction = true; 
        var deltaTime = engine.getDeltaTime() / 1000;
        box[key].position.y -= 69 * deltaTime;
        box[key].material.alpha -= 0.21 * deltaTime;
        
        // Clamp position and alpha when reaching or passing the end point
        if(box[key].position.y <= -11) {
            box[key].position.y = -11;
            box[key].material.alpha = 0.3; // Adjust this value for desired dim effect (0.3 = slightly visible)
        }
    } else {
        godown[key] = false;
    }
}

//box[key].rotation.y=box[key].rotation.y-Math.PI / 12;
	}
        var textureContext = dynamicTexture.getContext();
        var size = dynamicTexture.getSize();
	date2 = new Date();
	if(runningGO) diff = date2 - date1;
	if(!diff) diff=0;		
        text = (diff/1000);
	if(text>60 && runningGO) {text="60.000"; stopGO();}
	if(text>60) text="60.000";
//        text = engine.fps + " fps";
if(!runningGO){
	if(ifps == 1) {
/*
	        context2.clearRect(80,0,200,40);
		context2.fillText(expect+"        Mode:"+mode, 80, 30);
	        context2.clearRect(370,0,400,30);
		context2.fillText(text, 380, 30);
*/
		if(mode!="home") {
		context2.font = "18px Arial";
	        context2.clearRect(0,0,480,40);
		//context2.fillText(mode_str+" "+mode+"    "+yourrecord_str+" "+bestscore+"    100's: "+score100, 10, 30);
		} else {
		context2.font = "18px Arial";
	        context2.clearRect(0,0,480,40);
		context2.fillText(choose_str, 60, 30);
		}
	}
} else {

	if(ifps % 15 == 0) {	
        	context2.clearRect(80,0,200,40);
		context2.fillText(expect+"        "+mode_str+mode, 80, 30);
	}
	if(ifps % 2 == 0) {	
	        context2.clearRect(370,0,400,30);
		context2.fillText(text, 380, 30);
	}
}
//if(!runningGO && ifps % 15 != 0) {} else { 
//if(ifps == 1) {	
         if(!runningGO) {
                textureContext.save();
		textureContext.fillStyle = "silver";
//		if(!runningGO)  textureContext.fillStyle = "red";  else textureContext.fillStyle = "black";
                textureContext.fillRect(0, 0, size.width, size.height);
                textureContext.font = "bold 90px Calibri";
                var textSize = textureContext.measureText(text);

        
	                textureContext.fillStyle = "black";
			if(text!=0) {
				textureContext.fillText(text, 400-size.width/2, (size.height + 340) / 2);
			}
//	                textureContext.fillStyle = "darkblue";
//		                textureContext.font = "28px Calibri";
//				textureContext.fillText(scoretext, 400-size.width/2, (size.height - 410) / 2);
//	                textureContext.fillStyle = "black";

	                textureContext.font = "bold 50px Calibri";
			if(text!=0) {
//				textureContext.fillText("score:", 80, (size.height + 280) / 2);
			} else {
				textureContext.fillText("Schulte-Table.com", 65, (size.height + 280) / 2);
			}
//			if(mode!="home") textureContext.fillText("mode:"+mode, 60, (size.height + 360) / 2);
//        		if(isclickstart<1 && !inaction) {
//				textureContext.fillText("click here to start!", 80, (size.height + 320) / 2);
//				isclickstart++;
//			} else {
		                textureContext.font = "50px Calibri";
				textureContext.fillText(click_str, 70, (size.height + 440)/2);
//				isclickstart++;
//				if(isclickstart>2) isclickstart=0;
//			}
                textureContext.restore();
                dynamicTexture.update();

		}
//}
		if(mode=="memory" && text>3 && hidemem) { ind=0; showmem=false;
			for(var vx=-2; vx<3; vx++) {
				for(var vy=-2; vy<3; vy++) {writeonbox(arrNum[ind],vy,vx);ind++;}
			}
			showmem=true;
			hidemem=false;
			if(!runningGO)  BABYLON.Tools.QueueNewFrame(renderLoop);
		}
            };
// ******************************Render loop**************************************
// *******************************************************************************
var xfps=0;
var doRender=true;
var renderLoop = function () {
	xfps++;	if(xfps>60) xfps=1;
	if(!runningGO && !inaction){if(xfps == 1) doRender=true; else doRender=false;} else {if(xfps % 2 == 0) doRender=true; else doRender=false;}
	if(doRender) {	engine.beginFrame();scene.render(); engine.endFrame();}
        if(runningGO) BABYLON.Tools.QueueNewFrame(renderLoop);
};
function memtclear() {	var index;	for (index = 0; index < memt.length; ++index) {clearTimeout(memt[index]);} memt = new Array();}

BABYLON.Tools.QueueNewFrame(renderLoop);