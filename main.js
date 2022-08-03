img="";
status= "";
objects= [];

function preload() {
    img= loadImage("dog_cat.jpg");
}

function setup() {
    canvas= createCanvas(640, 420);
    canvas.center();
    objectdetect= ml5.objectDetector("cocossd", modlod);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
}

function modlod() {
    console.log("model loaded!!!!!!!");
    status= true;
    objectdetect.detect(img, Results);
}

function Results(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects= results;
}

function draw() {
    image(img, 0, 0, 640, 420);
    if(status != "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML= "Status: Objects Detected";
            fill("#42f57b");
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#42f57b");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}