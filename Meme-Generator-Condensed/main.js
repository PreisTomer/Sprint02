'use strict';

var gImgs = [
    {
        id: 1,
        url: 'img/001.jpg',
        keywords: ['grandma', 'can\'t read']
    }
];
var gMeme = {
    selectedImgId: 1, txts: [
        {
            line: '',
            font: 'Impact',
            size: 50,
            align: 'center',
            color: '#ffffff',
            shadow: 'none',
            posX: 300,
            posY: 70
        },
        {
            line: '',
            font: 'Impact',
            size: 50,
            align: 'center',
            color: '#ffffff',
            shadow: 'none',
            posX: 300,
            posY: 470
        }
    ]
};

init();

function init(){
    drawImage();
    renderControlPanel();
}

function drawImage() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var img = new Image();
    img.src = gImgs[0].url;

    img.onload = function () {
       
        context.drawImage(img, 0, 0, 600, 500);
        gMeme.txts.forEach(function (txt, i) {

            context.font = ` ${txt.size}px ${txt.font}`;
            context.fillStyle = txt.color;
            context.shadowColor = txt.shadow;
            context.shadowBlur = 7;
            context.shadowOffsetX = 5;
            context.shadowOffsetY = 5;
            context.textAlign = txt.align;
            context.strokeText(txt.line, txt.posX, txt.posY);
            context.fillText(txt.line, txt.posX, txt.posY);
        })
    };
}

function renderControlPanel(){
    var strHtmls = '';
    var strHtml = '';
    gMeme.txts.forEach(function(txt, i){
     
      strHtml = `
<div class="controlPanel">
        <!-- INPUT TEXT FIELD -->
        <h2>Line ${i +1}</h2>
        <div class="group">
        <input type="text" class="text-input" name="text${i}" id="input" oninput= drawText(this.value,${i}) placeholder="Type your text here!" >
        <span class="highlight"></span>
        <span class="bar"></span>
        </div>

        <!-- ALIGN TEXT -->
        <h3>Change Your Text:</h3>
        <div class="label-and-select"> 
            <label class="label" for="align">Align Text:</label>
            <div class="styled-select">
            <select id="align${i}" onchange="alignText(${i})" value="center">
            <option value="center">Center</option>
                <option value="right">Left</option>
                <option value="left">Right</option>
            </select>
            </div>
            </div>
            <br>

            <!-- FONT SIZE -->
            <div class="label-and-select">
            <label class="label" for="font-size">Change Font Size:</label>
            <input class=size-input id="mm-size${i}" type="number" name="size" value="50" min="1" max="999">
            <div class="outsideBtns">
            <button class="outside-size" onclick="changeFontSize(${i})"><span>Apply</span></button>
            </div>
            </div>

            <!-- TEXT COLOR -->
            <div class="label-and-input">
                <label class="label" for="font-size">Change Font Color:</label>
            <div class="color-container">
                <input type="color" class="color" id="color${i}" name="color" value=#ffffff onchange="changeColor(${i})">
            </div>
            </div>

            <!-- TEXT SHADOW -->
            <div class="label-and-input"> 
            <label>Text Shadow:</label>
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" onclick=addShadow(${i}) id="switch${i}">
            </div>
            <br>

            <!-- FONT CHANGE-->
            <div class="label-and-select"> 
            <label class="label" for="align">Change Font:</label>
            <div class="styled-select">
            <select id="font${i}" onchange="changeFont(${i})" value="Impact">
                <option value="Ariel">Ariel</option>
                <option value="David">David</option>
                <option value="Segoe UI">Segoe UI</option>
                <option value="Impact">Impact</option>
            </select>
            </div>
            </div>
            <br>

            <!-- MOVE UP/DOWN-->
            <label class="label" for="moveTxt">Move Text Up/Down:</label>
            <button class="move" onclick=move(${i},5)>&darr;</button>
            <button class="move" onclick=move(${i},-5)>&uarr;</button><br><br>

            <button class="more-lines" onclick="removeLine(this,${i})">Click to Delete Line</button>
</div>
            `  
strHtmls += strHtml;
    })
   var elControlPanel = document.querySelector(".form");
   elControlPanel.innerHTML = strHtmls;

}

function addMoreLines(){
    var newLine = {
        line: '',
        font: 'Impact',
        size: 50,
        align: 'center',
        color: '#ffffff',
        shadow: 'none',
        posX: 300,
        posY: 250
    }
gMeme.txts.push(newLine);
init();
}

function removeLine(i){
gMeme.txts.splice(i, 1);
init();
}


function drawText(txt, i) {
    var input = txt
    gMeme.txts[i].line = input;
    drawImage();
}

function alignText(i) {
    var inputAlign = document.getElementById('align'+i).value
    gMeme.txts[i].align = inputAlign;
    drawImage();
}

function changeFontSize(i) {
    var inputSize = document.getElementById('mm-size'+i).value;
    gMeme.txts[i].size = inputSize;
    drawImage();
}

function changeColor(i) {
    var color = document.getElementById("color"+i).value;
    gMeme.txts[i].color = color;
    drawImage();
}

function addShadow(i) {
    var isChecked = document.getElementById("switch"+i).checked;
    if (isChecked) {
        gMeme.txts[i].shadow = 'black';
    } else {
        gMeme.txts[i].shadow = 'rgba(0, 0, 0, 0)';
    };
   drawImage();
}

function changeFont(i){
    var font = document.getElementById("font"+i).value;
    gMeme.txts[i].font = font;
    drawImage();
}

function move(i, jumpHeight){
    gMeme.txts[i].posY += jumpHeight;
    drawImage();
}

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'meme-generator-image.jpg');
}, false);



function clearCanvas() {
    var cnv = document.getElementById('canvas');
    var ctx = cnv.getContext('2d');     // gets reference to canvas context
    ctx.beginPath();    // clear existing drawing paths
    ctx.save();         // store the current transformation matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.restore();        // restore the transform
    var img = new Image();
    img.src = gImgs[0].url;

    img.onload = function () {
        ctx.drawImage(img, 0, 0, 500, 400);
    }
}


// ===============================CODE IN JS AND JQUERY TO MOVE TEXT ON CANVAS BY MOUSE==========================//
