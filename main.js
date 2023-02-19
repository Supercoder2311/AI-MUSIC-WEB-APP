music="";
music2="";
leftWristX=0;
leftWristY=0;
RightWristX=0;
RightWristY=0;
song="";

function preload(){
    song = loadSound('music.mp3');
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('posenet is intialized!');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(" scoreLeftWrist = " + scoreLeftWrist);

       leftWristX= results[0].pose.leftWrist.x;
       leftWristY= results[0].pose.leftWrist.y;
       console.log(" leftWristX = "+leftWristX+" leftWristY = "+leftWristY);
        
       rightWristX= results[0].pose.rightWrist.x;
       rightWristY= results[0].pose.rightWrist.y;
       console.log(" rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}

function draw()
    image(video, 0, 0, 600, 500);

    fill("#1cff08");
    stroke("#1cff08");
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML= " Volume = " + volume;
        song.setVolume(volume);
}

function playSound(){
    song.play();
}
