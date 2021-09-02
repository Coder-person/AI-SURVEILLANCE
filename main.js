
object = [];
status = "";

function preload(){
    video = createVideo("video.mp4");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.position(500,250);
    video.hide();
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
    video.loop();
}

function draw(){
    image(video,0,0,500,400);

    r = random(255);
    g = random(255);
    b = random(255);

    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0;i < object.length;i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("detectedObjects").innerHTML = "Number of Objects: "+object.length;
            fill(r,g,b);
            stroke(r,g,b);
            noFill();
            strokeWeight(1);
            push();
            strokeWeight(5);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            pop();
            percent = floor(object[i].confidence * 100);
            text(object[i].label+" "+percent+"%", object[i].x + 15, object[i].y + 15);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        object = results
        console.log(object);
    }
}