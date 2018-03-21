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
            align: 'right',
            color: '#ffffff',
            shadow: 'none',
            posX: 250,
            posY: 70
        },
        {
            line: '',
            font: 'Impact',
            size: 50,
            align: 'right',
            color: '#ffffff',
            shadow: 'none',
            posX: 250,
            posY: 363
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
       
        context.drawImage(img, 0, 0, 500, 400);
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
        <input type="text" name="text${i}" id="top${i}" oninput= drawText(this.value,${i}) onsubmit="return false">

        <!-- ALIGN TEXT -->
        <div class="buttons">Change Your Text:
            <br>
            <label class="label" for="align">Align Text:</label>
            <select id="align${i}" onchange="alignText(${i})">
                <option value="right">Left</option>
                <option value="center">Center</option>
                <option value="left">Right</option>
            </select>
            <br>

            <!-- FONT SIZE -->
            <label class="label" for="font-size">Change Font Size:</label>
            <input id="mm-size${i}" type="number" name="size" value="50" min="1" max="999">
            <button class="sizeBtn" onclick="changeFontSize(${i})">apply size</button>

            <!-- TEXT COLOR -->
            <div class="color">
                <label class="label${i}" for="font-size">Change Font Color:</label>
                <input type="color" id="color${i}" name="color" value=#ffffff onchange="changeColor(${i})">
            </div>

            <!-- TEXT SHADOW -->
            <label class="switch${i}">Text Shadow:</label>
            <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" onclick=addShadow(${i}) id="switch${i}">
                </div>

            <!-- FONT CHANGE-->
            <label class="label" for="align">Change Font:</label>
            <select id="font${i}" onchange="changeFont(${i})" value="Impact">
                <option value="Ariel">Ariel</option>
                <option value="David">David</option>
                <option value="Segoe UI">Segoe UI</option>
                <option value="Impact">Impact</option>
            </select>
            <br>

            <!-- MOVE UP/DOWN-->
            <label class="label" for="moveTxt">Move Text Up/Down:</label>
            <button class="${i}down" onclick=move(${i},5)>&darr;</button>
            <button class="${i}up" onclick=move(${i},-5)>&uarr;</button><br><br>

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
        posX: 250,
        posY: 250
    }
gMeme.txts.push(newLine);
init();
}

function removeLine(line, i){
gMeme.txts.splice(line, i);
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
