let harry_potter; // song 1
let peter_pan; // song 2
let leftWristX;
let leftWristY;
let rightWristX;
let rightWristY;
let harry_potter_isPlaying;
let peter_pan_isPlaying;
let scoreLeftWrist;
function preload() {
    harry_potter = loadSound('harry_potter.mp3');
    peter_pan = loadSound('peter_pan.mp3');
}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(440, 250);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 500, 400);
    toNumleftWristX = Number(leftWristX);
    toNumleftWristY = Number(leftWristY);
    stroke('#ff0000');
    fill('#ff0000');
    harry_potter_isPlaying = harry_potter.isPlaying();
    peter_pan_isPlaying = peter_pan.isPlaying();
    if (scoreLeftWrist > 0.2) {
        circle(toNumleftWristX, toNumleftWristY, 15);
        peter_pan.stop();
        if (harry_potter_isPlaying == false) {
            harry_potter.play();
            document.getElementById("song").innerHTML= "Song Name = Harry Potter";
        } else if (peter_pan_isPlaying == true) {
            harry_potter.stop();
            document.getElementById("song").innerHTML= "Song Name";
        }
    }
}

function modelLoaded() {
    console.log('PoseNet is initialised!');
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("LeftWristX = " + leftWristX + ", LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("RightWristX = " + rightWristX + ", RightWristY = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score left wrist = " + scoreLeftWrist);
    }
}