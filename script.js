//     // a Promise API for Battery status
// window.navigator.addEventListener('onchargingchange', chargingChanged);
window.navigator.getBattery()
    .then(Battery => startApp(Battery))
    .catch(err => console.log(err));

    // get the #battery canvas element and make 2d context
const canvas_battery = document.getElementById('#battery');
const battery_ctx = canvas_battery.getContext('2d');

    // outer frame of battery
const battery_frame = {
    x: canvas_battery.width * 0.25,
    y: canvas_battery.height * 0.50,
    w: canvas_battery.width * 0.50,
    h: canvas_battery.height * 0.25
}
    // progress bar
const battery_progress = {
    x : battery_frame.x,
    y : battery_frame.y,
    w : 0,
    h : battery_frame.h
}
    // draws the frame for the battery progress
function frame(){
    battery_ctx.lineWidth = 1;
    battery_ctx.strokeStyle = 'rgb(50, 50, 50)';
    battery_ctx.strokeRect(battery_frame.x, battery_frame.y, battery_frame.w, battery_frame.h);
    battery_ctx.lineWidth = 15;
    battery_ctx.strokeStyle = 'rgb(10, 50, 50)';
    battery_ctx.beginPath();
    battery_ctx.moveTo(battery_frame.x+battery_frame.w, battery_frame.y+battery_frame.h/2);
    battery_ctx.lineTo(battery_frame.x+3+battery_frame.w, battery_frame.y+battery_frame.h/2);
    battery_ctx.stroke();
}
frame();

    // draws the battery level lively
        // with requestanimationframe for loadChargingvalue and warning low battery 
        //and event to handle change in value
        // onlevelchange
        // onchargingchange
        
function drawBattery(Battery) {
        if( Battery.level > 0.5 ) {
            battery_ctx.fillStyle = 'rgb(0, 230, 0)'; // healthy green
        } else if( Battery.level > 0.15 ) {
            battery_ctx.fillStyle = 'rgb(230, 170, 0)'; // warning yellow-orange
        } else {
            battery_ctx.fillStyle = 'rgb(210, 50, 0)'; // danger red
        }
    battery_progress.w = Battery.level * (battery_frame.w);
    battery_ctx.fillRect(battery_progress.x, battery_progress.y, battery_progress.w, battery_progress.h);

    textInfo(Battery);
}

// loads from 0% up to x% onload && charging || charging
function loadCharging(Battery) {
    battery_ctx.beginPath();
    battery_ctx.moveTo(battery_frame.x, battery_frame.y+battery_frame.h/2);
    battery_ctx.lineTo(battery_frame.x+50, battery_frame.y+battery_frame.h/2);
    battery_ctx.fillStyle = 'rgb(100, 200, 100)';
    
    textInfo(Battery);
    // requestAnimationFrame(loadCharging);
}

// Displays the verbose information of the battery status on the canvas
function textInfo(Battery){
    let state = Battery.charging ? 'charging' : 'not charging';
}
// this is a method for onchargingchange property of battery
function chargingChanged(e){
    console.log(e);
}

function startApp(Battery){
    if(Battery.charging){
        loadCharging(Battery);
    } else {
        drawBattery(Battery);       
    }
}