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


function drawText() {
    var inputTop = document.getElementById('top').value;
    gMeme.txts[0].line = inputTop;
    var inputBottom = document.getElementById('bottom').value;
    gMeme.txts[1].line = inputBottom;
    drawImage();
}

function alignText() {
    var inputAlignTop = document.getElementById('align-top').value
    var inputAlignBottom = document.getElementById('align-bottom').value
    gMeme.txts[0].align = inputAlignTop;
    gMeme.txts[1].align = inputAlignBottom;
    drawImage();
}

function changeFontSize() {
    var inputSizeTop = document.getElementById('mm-size-top').value;
    var inputSizeBottom = document.getElementById('mm-size-bottom').value;
    gMeme.txts[0].size = inputSizeTop;
    gMeme.txts[1].size = inputSizeBottom;
    drawImage();
}

function changeColor() {
    var colorTop = document.getElementById("color-top").value;
    var colorBottom = document.getElementById("color-bottom").value;
    gMeme.txts[0].color = colorTop;
    gMeme.txts[1].color = colorBottom;
    drawImage();
}


function addShadow() {
    var isTopChecked = document.getElementById("switch-top").checked;
    var isBottomChecked = document.getElementById("switch-bottom").checked;

    if (isTopChecked) {
        gMeme.txts[0].shadow = 'black';
    } else {
        gMeme.txts[0].shadow = 'rgba(0, 0, 0, 0)';
    };
   drawImage();

    if (isBottomChecked) {
        gMeme.txts[1].shadow = 'black';
    } else {
        gMeme.txts[1].shadow = 'rgba(0, 0, 0, 0)';
    };
    drawImage();
}


function changeFont(){
    var fontTop = document.getElementById("font-top").value;
    var fontBottom = document.getElementById("font-bottom").value;
    gMeme.txts[0].font = fontTop;
    gMeme.txts[1].font = fontBottom;
    drawImage();
}

function move(idx, jumpHeight){
    gMeme.txts[idx].posY += jumpHeight;
   
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
