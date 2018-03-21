'use strict';


var inputBottom = document.getElementById('bottom').value;
var inputTop = document.getElementById('top').value;


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
            line: inputTop,
            size: 20,
            align: 'center',
            color: 'red'
        },
        {
            line: inputBottom,
            size: 20,
            align: 'center',
            color: 'red'
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
        context.font = "40px 'Segoe UI'";
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.lineWidth = 1.5; 
        context.strokeText(gMeme.txts[0].line, 40, 70);
        context.fillText(gMeme.txts[0].line, 40, 70);
        context.strokeText(gMeme.txts[1].line, 40, 350);
        context.fillText(gMeme.txts[1].line, 40, 350);
    };
}



function drawText() {
    var inputTop = document.getElementById('top').value;
    gMeme.txts[0].line = inputTop;
    var inputBottom = document.getElementById('bottom').value;
    gMeme.txts[1].line = inputBottom;
    drawImage();
    
    
    
}

function alignText(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.textAlign= gMeme.txts[0].align; 

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
