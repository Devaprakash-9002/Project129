function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if(results.length < 0) {  
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("score left wrist = " + scoreLeftWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist x: " + leftWristX + ", left wrist y = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right wrist x: " + rightWristX + ", right wrist y = " + rightWristY);
    }
}

function modelLoaded() {
    console.log("Model has initialized!")
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if (setLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    InNumberLeftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberLeftWristY);
    volume = remove_decimals/50.0;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

song = ["music 1.jpg", "music 2.jpg"];
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("music 1.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}