let faceapi;
let detections = [];

let video;
let canvas;

function setup(){
canvas= createCanvas(480,360);
canvas.id('canvas');
video= createCapture(VIDEO);
video.id('video');
video.size(width, height);

const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    minConfidence : 0.5
};

faceapi = ml5.faceApi(video, faceOptions, faceReady);

function faceReady(){
    faceapi.detect(gotFaces);
}

function gotFaces(error, result){
if(error){
    console.log(error);
    return;
}
detections = result;
console.log(detections);
clear();
    drawBoxes(detections);
    drawLandmarks(detections);
    drawnExpressions(detections, 20, 250, 14);
faceapi.detect(gotFaces);
}


 function drawBoxes(detections){
    if(detections.length >0){
        for(f=0; f<detections.length;f++){
            let {_x, _y, _width, _height} = detections[0].alignedRect._box;

            stroke(44, 169, 255);
            strokeWeight(1);
            noFill();
            rect(_x, _y, _width, _height);

        }
    }

 }

 function drawLandmarks(detections){
     if(detections.length >0){
         for(f=0; f<detections.length; f++){
             let points = detections[f].landmarks.positions;
             for(let i=0; i<points.length; i++){
                stroke(44, 169, 255);
                strokeWeight(1);
                point(points[i]._x, points[i]._y);
             }

         }
     }

 }

 function drawnExpressions(detections, x, y, textYspace){

    textFront('Helvetica Neue');
    textSize(14);
    noStroke();
    fill(44, 196, 255);

    if(detections.length>0){
        let {neutral, happy, angry, sad, disgusted, surprised, fearful}
        =detections[0].expressions;

        text("neutral:" +nf(neutral * 100, 2,2) + "%", x, y);
        text("happy:" +nf(happy * 100, 2,2) + "%", x, y + textYspace);
        text("angry:" +nf(angry * 100, 2,2) + "%", x, y+ textYspace * 2);
        text("sad:" +nf(sad * 100, 2,2) + "%", x, y+ textYspace * 3);
        text("disgusted:" +nf(disgusted * 100, 2,2) + "%", x, y + textYspace * 4);
        text("surprised:" +nf(surprised * 100, 2,2) + "%", x, y + textYspace * 5);
        text("fearful:" +nf(fearful * 100, 2,2) + "%", x, y + textYspace * 6);
    }else{
        text("neutral:", x, y);
        text("happy:", x, y + textYspace);
        text("angry:", x, y + textYspace * 2);
        text("sad:", x, y + textYspace * 3 );
        text("disgusted:", x, y + textYspace * 4);
        text("surprised:", x, y + textYspace * 5);
        text("fearful:", x, y + textYspace * 6);
    }

 }

}
