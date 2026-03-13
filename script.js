const calcScreen = document.getElementById('calc-screen');
const detailScreen = document.getElementById('detail-screen');
const calcBtn = document.getElementById('calculate-button');
const backBtn = document.getElementById('back-button');

const skippedInput = document.getElementById('skipped');
const subjectInput = document.getElementById('select-subject');
const batchInput = document.getElementById('select-batch');

var state = 0;

calcBtn.onclick = () => {

    if(/^-?\d+\.?\d*$/.test(skippedInput.value) == false){
        return;
    }

    calculateHours();
    

    detailScreen.classList.remove('hidden');
    detailScreen.classList.add('shown');

    calcScreen.classList.remove('shown');
    calcScreen.classList.add('hidden');

    state = 1;
};

backBtn.onclick = () => {
    detailScreen.classList.add('hidden');
    detailScreen.classList.remove('shown');

    calcScreen.classList.remove('hidden');
    calcScreen.classList.add('shown');

    state = 0;
};

const entInput = document.querySelector('input');

entInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && state == 0) {
    calculateHours();
    

    detailScreen.classList.remove('hidden');
    detailScreen.classList.add('shown');

    calcScreen.classList.remove('shown');
    calcScreen.classList.add('hidden');

    state = 1;
    }
});

//calculate stuff

function calculateHours(){
    var val = skippedInput.value;
    var subject = subjectInput.value;

    val = Math.round(val);

    if(val<0 || val==''){
        val=0;
    }
    var selSub = subListB[subject];

    if(batchInput.value == "cseB"){
        selSub.value == subListB[subject];
    }

    val = Math.min(val,selSub);

    //selSub[subject] = selSub[subject]-30;

    const attendanceP = 100 - (val/selSub * 100);

    const totalSkips = Math.floor(selSub*0.25);

    const skipLeft = Math.max(totalSkips-val,0);

    const skipPer = 100-(skipLeft/totalSkips)*100;


    setProgress(attendanceP.toFixed(1),"attendence");
    animateProgress(attendanceP.toFixed(1),"attendence");

    setProgress(skipPer.toFixed(1),"skips");
    animateProgress(skipPer.toFixed(1),"skips");

    const attendenceInfo1 = document.getElementById('attendence-info');
    const skipsUsed = document.getElementById('skips-info');
    const mainLabel = document.getElementById('main-label');

    attendenceInfo1.innerHTML = `<span id="attendence-info">${selSub-val}<span id="att-small-info" style="font-size: 17px; font-weight: 200;">/${selSub}</span><br>Attended</span>`
    skipsUsed.innerHTML = `<span id="skips-info">${skipLeft}<span id="skips-small-info" style="font-size: 17px; font-weight: 200;">/${totalSkips}</span><br>Skips Left</span>`

    if(subject=="oop"){
        mainLabel.innerText = "Object Oriented Programming";
    } else if(subject=="uid") {
        mainLabel.innerText = "User Interface Design";
    } else if(subject=="discrete") {
        mainLabel.innerText = "Discrete Mathematics";
    } else if(subject=="linear") {
        mainLabel.innerText = "Linear Algebra";
    } else if(subject=="physics") {
        mainLabel.innerText = "Modern Physics";
    } else if(subject=="adm") {
        mainLabel.innerText = "ADM";
    } else if(subject=="maom") {
        mainLabel.innerText = "MAOM";
    } else if(subject=="mech") {
        mainLabel.innerText = "Mechanical Workshop";
    }
    
}

function setProgress(percent, type){
    const circle = document.getElementById(type + '-circ');
    const text = document.getElementById(type + '-text');

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;

    if(type == "attendence"){
        if(percent == 100){
            circle.style.stroke = "#15d0ff";
            text.style.color = "#127c99";
        } else if (percent < 100 && percent > 90) {
            circle.style.stroke = "#0bb402";
            text.style.color = "#022700";
        } else if (percent < 90 && percent >= 80) {
            circle.style.stroke = "#80c500";
            text.style.color = "#213300";
        } else if (percent < 80 && percent >= 75) {
            circle.style.stroke = "#c5b500";
            text.style.color = "#353000";
        } else {
            circle.style.stroke = "#c50700";
            text.style.color = "#390200";
        }
        
    } else if(type == "skips") {
        if(percent == 0){
            circle.style.stroke = "#15d0ff";
            text.style.color = "#127c99";
        } else if (percent < 20 && percent > 0) {
            circle.style.stroke = "#0bb402";
            text.style.color = "#022700";
        } else if (percent < 50 && percent >= 20) {
            circle.style.stroke = "#80c500";
            text.style.color = "#213300";
        } else if (percent < 80 && percent >= 50) {
            circle.style.stroke = "#c5b500";
            text.style.color = "#353000";
        } else {
            circle.style.stroke = "#c50700";
            text.style.color = "#390200";
        }
    }

    text.innerText = `${percent}%`;

    
}


function animateProgress(targetPercent, type) {
    const circle = document.getElementById(type+'-circ');
    const text = document.getElementById(type+'-text');
    
    // 1. Circle Math
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.transition = 'none'; 
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference; 

    setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 1s ease-out, stroke 1s ease';
        var offset = 0
        if(type=="attendence"){
            offset = circumference - (targetPercent / 100 * circumference);
        } else {
            offset = 100;
        }
        circle.style.strokeDashoffset = offset;
    }, 10);




    let currentCount = 0;
    const duration = 50;

    const timer = setInterval(() => {
        currentCount+=targetPercent/duration;
        

        offset = circumference - (currentCount / 100 * circumference);


        circle.style.strokeDashoffset = offset;

        text.innerText = currentCount.toFixed(1) + "%";
        
        if (currentCount >= targetPercent) {
            text.innerText = `${targetPercent}%`;

            offset = circumference - (targetPercent / 100 * circumference);

            circle.style.strokeDashoffset = offset;

            clearInterval(timer);
        }
    }, 30);
}
