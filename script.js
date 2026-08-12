
// =================================
// LifeOS AI Main JavaScript Engine
// =================================


// Check application loading

document.addEventListener("DOMContentLoaded",()=>{

    console.log("LifeOS AI System Activated");


    updateDate();


    animateCards();


});




// ===============================
// Dynamic Date
// ===============================


function updateDate(){

    const date = new Date();


    const options = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    };


    console.log(
        date.toLocaleDateString(
            "en-US",
            options
        )
    );

}




// ===============================
// Module Navigation
// ===============================


function openModule(page){

    window.location.href = page;

}


// ===============================
// AI Status System
// ===============================


function aiOnline(){


    const status =
    document.querySelector(".ai-status span");


    if(status){

        status.innerHTML =
        "AI Learning...";


        setTimeout(()=>{

            status.innerHTML =
            "AI Online";

        },2000);

    }

}


// ===============================
// Card Animation
// ===============================


function animateCards(){


const cards =
document.querySelectorAll(".card");


cards.forEach((card,index)=>{


    card.style.opacity="0";


    setTimeout(()=>{


        card.style.transition=".5s";


        card.style.opacity="1";


    },index*150);


});


}
// =================================
// AI PLANNER TASK SYSTEM
// =================================



let tasks =
JSON.parse(localStorage.getItem("lifeosTasks"))
|| [];




// Load tasks when page opens

document.addEventListener(
"DOMContentLoaded",
()=>{

displayTasks();

});



// Add Task


function addTask(){


let input =
document.getElementById("taskInput");


let priority =
document.getElementById("priority");



if(!input || input.value.trim()===""){

alert("Please enter task");

return;

}



let task={


id:Date.now(),


name:input.value,


priority:priority.value,


completed:false


};



tasks.push(task);



saveTasks();


displayTasks();



input.value="";


}







// Display Tasks


function displayTasks(){


let container =
document.getElementById("taskList");


if(!container)
return;



container.innerHTML="";



tasks.forEach(task=>{


let div =
document.createElement("div");


div.className =
"task-item " +
(task.completed?"completed":"");



div.innerHTML=`

<div class="task-info">

<i data-lucide="check-circle"></i>


<div>

<h3>
${task.name}
</h3>


<span>
${task.priority} Priority
</span>


</div>


</div>



<div class="task-buttons">


<button 
class="complete-btn"
onclick="completeTask(${task.id})">

✓

</button>


<button
class="delete-btn"
onclick="deleteTask(${task.id})">

×


</button>


</div>

`;



container.appendChild(div);


});



updateProgress();


if(window.lucide){

lucide.createIcons();

}


}








// Complete Task


function completeTask(id){


tasks =
tasks.map(task=>{


if(task.id===id){

task.completed=
!task.completed;

}


return task;


});



saveTasks();


displayTasks();


}








// Delete Task


function deleteTask(id){


tasks =
tasks.filter(
task=>task.id!==id
);



saveTasks();


displayTasks();


}







// Save Data


function saveTasks(){


localStorage.setItem(

"lifeosTasks",

JSON.stringify(tasks)

);


}








// Productivity Progress


function updateProgress(){


let text =
document.getElementById("progressText");


let bar =
document.getElementById("progress");



if(!text || !bar)
return;



let completed =
tasks.filter(
task=>task.completed
).length;



let percentage =
tasks.length===0
?0
:
Math.round(
(completed/tasks.length)*100
);



bar.style.width =
percentage+"%";



text.innerHTML =
percentage+
"% Completed";


}
// =================================
// AI FINANCE SYSTEM
// =================================



let financeData =
JSON.parse(localStorage.getItem("lifeosFinance"))
||
{

income:0,

expenses:[]

};







document.addEventListener(
"DOMContentLoaded",
()=>{


updateFinance();


});









function addFinance(){



let income =
document.getElementById(
"incomeInput"
);



let expense =
document.getElementById(
"expenseInput"
);



let category =
document.getElementById(
"expenseCategory"
);




if(!income || !expense)

return;





if(income.value){

financeData.income =
Number(income.value);

}






if(expense.value){


financeData.expenses.push({

amount:Number(expense.value),

category:category.value


});


}





saveFinance();


updateFinance();




income.value="";

expense.value="";


}








function updateFinance(){



let income =
document.getElementById(
"totalIncome"
);



let expense =
document.getElementById(
"totalExpense"
);



let saving =
document.getElementById(
"totalSaving"
);



let advice =
document.getElementById(
"moneyAdvice"
);




if(!income)

return;





let totalExpense =
financeData.expenses.reduce(

(sum,item)=>

sum+item.amount,

0

);





let remaining =
financeData.income-totalExpense;





income.innerHTML =
"$ "+financeData.income;



expense.innerHTML =
"$ "+totalExpense;



saving.innerHTML =
"$ "+remaining;







// AI Advice


if(remaining<0){


advice.innerHTML =
"⚠ Your expenses are higher than income. Reduce unnecessary spending.";


}


else if(totalExpense >
financeData.income*0.7){


advice.innerHTML =
"Your spending is high. Try saving at least 30% of income.";


}


else{


advice.innerHTML =
"Excellent! Your financial health is improving.";

}




}









function saveFinance(){


localStorage.setItem(

"lifeosFinance",

JSON.stringify(financeData)

);


}
// =================================
// AI HEALTH SYSTEM
// =================================



let healthData =

JSON.parse(
localStorage.getItem("lifeosHealth")
)

||

{

sleep:0,

steps:0,

water:0

};







document.addEventListener(

"DOMContentLoaded",

()=>{


calculateHealth();


}

);








function addHealthData(){



let sleep =
document.getElementById(
"sleepInput"
);



let steps =
document.getElementById(
"stepsInput"
);



let water =
document.getElementById(
"waterInput"
);





if(!sleep)

return;





healthData.sleep =
Number(sleep.value);



healthData.steps =
Number(steps.value);



healthData.water =
Number(water.value);





localStorage.setItem(

"lifeosHealth",

JSON.stringify(healthData)

);




calculateHealth();



}









function calculateHealth(){



let score = 0;



// Sleep score

if(
healthData.sleep>=7
)

{

score +=35;

}

else if(
healthData.sleep>=5
)

{

score +=20;

}






// Steps score

if(
healthData.steps>=8000
)

{

score +=35;

}

else if(
healthData.steps>=4000
)

{

score +=20;

}






// Water score

if(
healthData.water>=2
)

{

score +=30;

}

else if(
healthData.water>=1
)

{

score +=15;

}







let scoreBox =
document.getElementById(
"healthScore"
);



let energy =
document.getElementById(
"energyLevel"
);



let advice =
document.getElementById(
"healthAdvice"
);





if(!scoreBox)

return;





scoreBox.innerHTML =
score+"%";





if(score>=80){


energy.innerHTML =
"High";


advice.innerHTML =
"Excellent lifestyle balance. Maintain your routine.";


}


else if(score>=50){


energy.innerHTML =
"Medium";


advice.innerHTML =
"Improve sleep and increase physical activity.";


}


else{


energy.innerHTML =
"Low";


advice.innerHTML =
"Your AI suggests improving sleep, water and movement.";


}



}
// =================================
// AI BRAIN INTELLIGENCE SYSTEM
// =================================



function analyzeLife(){



// Get Planner Data

let tasks =

JSON.parse(

localStorage.getItem("lifeosTasks")

)

||

[];





// Get Finance Data

let finance =

JSON.parse(

localStorage.getItem("lifeosFinance")

)

||

{

income:0,

expenses:[]

};






// Get Health Data


let health =

JSON.parse(

localStorage.getItem("lifeosHealth")

)

||

{

sleep:0,

steps:0,

water:0

};








// ==========================
// Calculate Scores
// ==========================



let taskScore = 0;


if(tasks.length>0){


let completed =

tasks.filter(

task=>task.completed

).length;



taskScore =

(completed/tasks.length)*100;


}






let financeScore = 50;



if(finance.income>0){


let expense =

finance.expenses.reduce(

(sum,item)=>

sum+item.amount,

0

);



let saving =

finance.income-expense;



financeScore =

(saving/finance.income)*100;


}








let healthScore=0;



if(health.sleep>=7)

healthScore+=35;


else if(health.sleep>=5)

healthScore+=20;




if(health.steps>=8000)

healthScore+=35;


else if(health.steps>=4000)

healthScore+=20;




if(health.water>=2)

healthScore+=30;


else if(health.water>=1)

healthScore+=15;








// Final AI Score


let finalScore = Math.round(

(

taskScore+

financeScore+

healthScore

)/3

);






// Display Result


let score =

document.getElementById(
"lifeScore"
);



let productivity =

document.getElementById(
"productivity"
);



let insight =

document.getElementById(
"aiInsight"
);




if(!score)

return;






score.innerHTML =
finalScore+"%";





if(finalScore>=80){


productivity.innerHTML =
"Excellent";


insight.innerHTML =
"Your lifestyle balance is strong. Continue your current habits and focus on growth.";


}



else if(finalScore>=50){


productivity.innerHTML =
"Good";


insight.innerHTML =
"Your progress is positive. Improve consistency in tasks and health habits.";


}



else{


productivity.innerHTML =
"Needs Improvement";


insight.innerHTML =
"AI recommends improving daily planning, savings and wellness routines.";


}




}
// =================================
// AI ASSISTANT CHAT SYSTEM
// =================================







// =================================
// Animated Dashboard Counter
// =================================


function animateCounters(){


const counters =
document.querySelectorAll(".counter");



counters.forEach(counter=>{


counter.innerText="0%";


const target =
Number(counter.dataset.target);



let count = 0;



const speed = 20;



const updateCounter = () =>{


if(count < target){


count++;


counter.innerText =
count + "%";



setTimeout(
updateCounter,
speed
);


}

else{


counter.innerText =
target + "%";


}


};



updateCounter();



});


}





// Run Counter when page loads

document.addEventListener(
"DOMContentLoaded",
()=>{


animateCounters();


});

// =================================
// AI LIFE ANALYSIS SYSTEM
// =================================


function analyzeLife(){



let scoreElement =
document.getElementById("lifeScore");


let productivity =
document.getElementById("productivity");


let insight =
document.getElementById("aiInsight");


let recommendation =
document.getElementById("recommendations");





let score = 0;



let finalScore = 92;





let counter = setInterval(()=>{


score++;


scoreElement.innerHTML =
score+"%";



if(score>=finalScore){

clearInterval(counter);


}


},20);






setTimeout(()=>{


productivity.innerHTML =
"Excellent ⚡";



insight.innerHTML =

"Your AI detected strong productivity habits, balanced finances and healthy lifestyle patterns.";



recommendation.innerHTML = `


<li>
🌅 Complete important tasks before 12 PM when your focus is highest.
</li>


<li>
💰 Increase monthly savings by reducing unnecessary expenses.
</li>


<li>
🏃 Maintain 8,000+ daily steps for better energy.
</li>


<li>
📚 Spend 30 minutes daily learning a new skill.
</li>


`;



},1200);



}
// =============================
// BACK TO DASHBOARD
// =============================


function goDashboard(){

window.location.href="../index.html";

}
// ===============================
// AI PLANNER SYSTEM
// ===============================


function generateTasks(){


let container =
document.getElementById("taskContainer");



container.innerHTML = `


<div class="task-card blue">

<div class="task-icon">

<i data-lucide="code"></i>

</div>

<h3>
Build AI Feature
</h3>

<p>
AI detected this as your highest priority task.
</p>


<span class="high">
High Priority
</span>


<button onclick="completeTask(this)">
Complete
</button>


</div>




<div class="task-card purple">

<div class="task-icon">

<i data-lucide="brain"></i>

</div>


<h3>
Learn New Skill
</h3>


<p>
Spend 45 minutes improving your knowledge.
</p>


<span class="medium">
Medium Priority
</span>


<button onclick="completeTask(this)">
Complete
</button>


</div>




<div class="task-card green">

<div class="task-icon">

<i data-lucide="activity"></i>

</div>


<h3>
Health Break
</h3>


<p>
Take a walk and refresh your mind.
</p>


<span class="low">
Low Priority
</span>


<button onclick="completeTask(this)">
Complete
</button>


</div>


`;



lucide.createIcons();


}






function completeTask(button){


let card =
button.parentElement;


card.classList.add("completed");


button.innerHTML="Completed ✓";


}
// =====================================================
//              LIFEOS AI FINANCE SYSTEM
//              JAVASCRIPT PART 1
// =====================================================



// ===============================
// ANIMATED FINANCE COUNTERS
// ===============================


const financeCounters = document.querySelectorAll(".finance-card .counter");


financeCounters.forEach(counter => {


    let target = Number(counter.dataset.target);

    let current = 0;


    let speed = target / 80;


    let updateCounter = () => {


        current += speed;


        if(current < target){


            counter.innerHTML = 
            "$" + Math.floor(current).toLocaleString();


            requestAnimationFrame(updateCounter);


        }

        else{


            counter.innerHTML =
            "$" + target.toLocaleString();


        }


    };


    updateCounter();


});








// ===============================
// SAVINGS GOAL ANIMATION
// ===============================


const savingProgress = document.getElementById(
"savingProgress"
);



if(savingProgress){


setTimeout(()=>{


    savingProgress.style.width="82%";


},500);



}









// ===============================
// FINANCIAL HEALTH SCORE ANIMATION
// ===============================


const score =
document.getElementById(
"financeScore"
);



if(score){


let number = 0;


let animateScore = () =>{


number++;


score.innerHTML = number;


if(number < 91){


requestAnimationFrame(animateScore);


}


};


animateScore();



}









// ===============================
// AI FINANCE INSIGHTS
// ===============================


const financeInsights = [


"Your savings increased by 18%. Keep maintaining this habit.",


"AI detected unnecessary spending in subscriptions.",


"Your monthly budget is healthy. You are saving efficiently.",


"Reducing entertainment expenses can increase savings by $120.",


"Your financial stability score improved this week."



];





const insightBox =
document.getElementById(
"financeInsight"
);



if(insightBox){


setInterval(()=>{


let randomInsight =

financeInsights[
Math.floor(
Math.random()*financeInsights.length
)
];



insightBox.style.opacity="0";



setTimeout(()=>{


insightBox.innerHTML =
randomInsight;


insightBox.style.opacity="1";


},400);



},5000);



}









// ===============================
// ASK AI BUTTON
// ===============================


const askButton =
document.querySelector(
".ask-ai-btn"
);



if(askButton){


askButton.addEventListener(
"click",
()=>{


askButton.innerHTML =
"Analyzing Finance...";



setTimeout(()=>{


askButton.innerHTML =
"AI Analysis Complete ✓";



},2000);



});



}









// ===============================
// CARD LOAD ANIMATION
// ===============================


const financeElements =
document.querySelectorAll(

".finance-card, .health-card, .chart-card, .recommend-card, .forecast-card"

);



financeElements.forEach(
(element,index)=>{


element.style.opacity="0";


element.style.transform=
"translateY(30px)";



setTimeout(()=>{


element.style.transition=
"0.6s ease";


element.style.opacity="1";


element.style.transform=
"translateY(0)";



},
index*120);



});
// =====================================================
//              FINANCE CHART SYSTEM
//              JAVASCRIPT PART 2
// =====================================================



// ===============================
// INCOME VS EXPENSE CHART
// ===============================


const incomeCanvas = document.getElementById(
"incomeChart"
);



if(incomeCanvas){


new Chart(incomeCanvas, {


type:"bar",


data:{


labels:[

"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun"

],


datasets:[


{


label:"Income",


data:[

3200,
3500,
3400,
3800,
4000,
4200

],


backgroundColor:

"rgba(0,229,255,0.55)",


borderColor:

"#00E5FF",


borderWidth:2,


borderRadius:10


},



{


label:"Expenses",


data:[

2100,
2400,
2200,
2500,
2300,
2180

],


backgroundColor:

"rgba(249,115,22,0.55)",


borderColor:

"#F97316",


borderWidth:2,


borderRadius:10


}



]


},





options:{


responsive:true,


maintainAspectRatio:false,



animation:{


duration:2000,


easing:"easeOutQuart"


},



plugins:{


legend:{


position:"bottom",


labels:{


color:"#CBD5E1"


}


},



tooltip:{


backgroundColor:

"rgba(15,23,42,.95)",


titleColor:"#00E5FF",


bodyColor:"#fff"


}


},



scales:{


x:{


ticks:{


color:"#94A3B8"


},


grid:{


display:false


}



},



y:{


beginAtZero:true,


ticks:{


color:"#94A3B8",


callback:function(value){


return "$"+value;


}


},


grid:{


color:

"rgba(148,163,184,.1)"


}



}



}



}



});


}









// ===============================
// SPENDING DISTRIBUTION CHART
// ===============================



const expenseCanvas = document.getElementById(
"expenseChart"
);



if(expenseCanvas){



new Chart(expenseCanvas,{



type:"doughnut",



data:{


labels:[


"Housing",

"Food",

"Shopping",

"Travel",

"Bills"


],




datasets:[


{


data:[


35,
25,
15,
10,
15


],



backgroundColor:[


"rgba(0,229,255,.75)",


"rgba(139,92,246,.75)",


"rgba(249,115,22,.75)",


"rgba(34,197,94,.75)",


"rgba(236,72,153,.75)"



],



borderWidth:2,


borderColor:

"rgba(255,255,255,.15)"



}


]



},





options:{


responsive:true,


maintainAspectRatio:false,



cutout:"65%",




animation:{


animateRotate:true,


duration:2200


},



plugins:{



legend:{


position:"bottom",


labels:{


color:"#CBD5E1",


padding:20


}


},



tooltip:{


backgroundColor:

"rgba(15,23,42,.95)",


bodyColor:"#fff"


}



}



}



});


}









// ===============================
// TRANSACTION INTERACTION
// ===============================



const transactions = document.querySelectorAll(
".transaction"
);



transactions.forEach(transaction=>{


transaction.addEventListener(
"click",
()=>{


transaction.style.transform =
"scale(1.03)";



setTimeout(()=>{


transaction.style.transform =
"";


},300);



});


});









// ===============================
// AI FINANCE SCAN EFFECT
// ===============================



function analyzeFinance(){



let messages=[


"Analyzing spending habits...",


"Checking savings pattern...",


"Predicting future expenses...",


"Generating AI recommendations..."


];



let insight =
document.getElementById(
"financeInsight"
);



let index=0;



let interval=setInterval(()=>{


if(index < messages.length){


insight.innerHTML =
messages[index];


index++;


}


else{


clearInterval(interval);



insight.innerHTML =

"Analysis Complete ✓ Your financial health is excellent.";


}



},900);



}
// =====================================================
//          LIFEOS AI HEALTH SYSTEM
//          JAVASCRIPT PART 1
// =====================================================



// ===============================
// ANALYZE HEALTH FUNCTION
// ===============================


function analyzeHealth(){


const result = document.getElementById(
"healthResult"
);


const summary = document.getElementById(
"healthSummary"
);



let messages=[


"Scanning lifestyle patterns...",


"Analyzing sleep quality...",


"Checking activity level...",


"Evaluating hydration habits...",


"Generating AI wellness report..."


];



let index=0;



result.classList.add(
"scan-loading"
);



let scan = setInterval(()=>{


if(index < messages.length){


result.innerHTML = messages[index];


index++;


}


else{


clearInterval(scan);



result.classList.remove(
"scan-loading"
);



result.innerHTML =

"✓ Health analysis completed successfully";



generateHealthReport();


}



},1000);



}









// ===============================
// HEALTH SCORE COUNTER
// ===============================


function animateHealthScore(){


const score =
document.getElementById(
"healthScore"
);



if(!score) return;



let value=0;


let target=92;



let counter=setInterval(()=>{


value++;


score.innerHTML=value;



if(value>=target){


clearInterval(counter);


}



},25);



}









// ===============================
// AI HEALTH REPORT
// ===============================


function generateHealthReport(){


animateHealthScore();



const summary =
document.getElementById(
"healthSummary"
);



if(summary){


summary.innerHTML=

`
<b>AI Health Report Generated:</b>
<br><br>

✓ Sleep quality is excellent (87%) 
<br>
✓ Activity level is above average
<br>
✓ Stress level is controlled
<br>
✓ Hydration needs slight improvement
<br><br>

AI Recommendation:
Maintain your current routine and
increase daily water intake.
`;



}





animateWellnessGoal();


}









// ===============================
// WELLNESS GOAL ANIMATION
// ===============================


function animateWellnessGoal(){


const progress =
document.querySelector(
".health-progress"
);



if(progress){


setTimeout(()=>{


progress.style.width="80%";


},500);


}



}









// ===============================
// AI HEALTH BUTTON EFFECT
// ===============================


const healthButton =
document.querySelector(
".analyze-btn"
);



if(healthButton){



healthButton.addEventListener(
"click",
()=>{


healthButton.innerHTML=

`
<i data-lucide="loader-circle"></i>
Analyzing...
`;



setTimeout(()=>{


healthButton.innerHTML=

`
<i data-lucide="check-circle"></i>
Analysis Complete
`;



lucide.createIcons();



},6000);



});



}









// ===============================
// HEALTH CARD HOVER AI MESSAGE
// ===============================


const healthCards =
document.querySelectorAll(
".health-card"
);



healthCards.forEach(card=>{


card.addEventListener(
"mouseenter",
()=>{


card.style.transform=
"translateY(-12px) scale(1.03)";



});



card.addEventListener(
"mouseleave",
()=>{


card.style.transform=
"";



});


});
// =====================================================
//          HEALTH ANALYTICS CHARTS
//          JAVASCRIPT PART 2
// =====================================================


// ===============================
// WEEKLY ACTIVITY CHART
// ===============================


const activityChart =
document.getElementById("activityChart");


if(activityChart){


new Chart(activityChart, {


type:"line",


data:{


labels:[

"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat",
"Sun"

],


datasets:[

{


label:"Steps",


data:[

5200,
6800,
7200,
8000,
7600,
9200,
8450

],


borderColor:"#22C55E",


backgroundColor:
"rgba(34,197,94,0.12)",


borderWidth:3,


pointRadius:5,


pointHoverRadius:8,


tension:0.4,


fill:true


},



{


label:"Energy Level",


data:[

65,
72,
78,
85,
80,
92,
88

],


borderColor:"#00E5FF",


backgroundColor:
"rgba(0,229,255,0.08)",


borderWidth:3,


pointRadius:5,


tension:0.4,


fill:true


}


]


},





options:{


responsive:true,


maintainAspectRatio:false,



plugins:{


legend:{


position:"bottom",


labels:{


color:"#CBD5E1"


}


}



},



scales:{


x:{


ticks:{


color:"#94A3B8"


},


grid:{


display:false


}


},



y:{


beginAtZero:true,


ticks:{


color:"#94A3B8"


},


grid:{


color:"rgba(148,163,184,0.1)"


}


}



}



}



});


}










// ===============================
// SLEEP ANALYSIS CHART
// ===============================



const sleepChart =
document.getElementById("sleepChart");



if(sleepChart){



new Chart(sleepChart,{



type:"bar",



data:{


labels:[

"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat",
"Sun"

],



datasets:[


{


label:"Sleep Hours",


data:[

6.5,
7,
6,
8,
7.5,
9,
7.8

],



backgroundColor:

"rgba(139,92,246,0.65)",


borderColor:

"#8B5CF6",


borderWidth:2,


borderRadius:10


}



]



},





options:{


responsive:true,


maintainAspectRatio:false,



animation:{


duration:1800


},



plugins:{


legend:{


position:"bottom",


labels:{


color:"#CBD5E1"


}


}


},



scales:{


x:{


ticks:{


color:"#94A3B8"


},


grid:{


display:false


}



},



y:{


beginAtZero:true,


max:10,


ticks:{


color:"#94A3B8",


callback:function(value){

return value+"h";

}

},



grid:{


color:"rgba(148,163,184,.1)"


}



}



}



}



});


}
// =====================================================
//          LIFEOS AI ASSISTANT SYSTEM
//          JAVASCRIPT
// =====================================================



// ===============================
// AI CHAT SYSTEM
// ===============================


function sendMessage(){


const input =
document.getElementById("userInput");


const chatBox =
document.getElementById("chatBox");



if(!input || input.value.trim()=="")
return;



let userText=input.value;



// USER MESSAGE

let userMessage=document.createElement("div");


userMessage.className=
"user-message-bubble";


userMessage.innerHTML=

`
<p>${userText}</p>
`;



chatBox.appendChild(userMessage);



input.value="";



chatBox.scrollTop=
chatBox.scrollHeight;





// AI TYPING EFFECT


let typing=document.createElement("div");


typing.className=
"ai-message-bubble";


typing.innerHTML=

`
<i data-lucide="bot"></i>

<p>
AI is thinking...
</p>
`;



chatBox.appendChild(typing);


lucide.createIcons();



setTimeout(()=>{


typing.remove();



generateAIReply(
userText
);



},1500);



}









// ===============================
// AI RESPONSE GENERATOR
// ===============================



function generateAIReply(message){



const chatBox =
document.getElementById("chatBox");



let reply="";



message =
message.toLowerCase();




if(message.includes("productivity")){


reply=

"Your productivity is highest in the morning. I recommend scheduling deep work between 9 AM and 12 PM.";


}



else if(message.includes("health")){


reply=

"Your health score is 91%. Maintain sleep consistency and increase hydration.";


}



else if(message.includes("finance")
|| message.includes("money")){


reply=

"Your spending pattern shows improvement. Consider increasing monthly savings by 10%.";


}



else if(message.includes("goal")){


reply=

"You have 8 active goals. Focus on completing your top priority task today.";


}



else{


reply=

"I analyzed your request. Based on your lifestyle data, I recommend planning your day and focusing on important priorities.";


}






let aiMessage=document.createElement("div");


aiMessage.className=
"ai-message-bubble";



aiMessage.innerHTML=

`
<i data-lucide="bot"></i>

<p>${reply}</p>

`;



chatBox.appendChild(aiMessage);



lucide.createIcons();



chatBox.scrollTop=
chatBox.scrollHeight;


}









// ===============================
// ENTER KEY CHAT
// ===============================



const assistantInput =
document.getElementById(
"userInput"
);



if(assistantInput){


assistantInput.addEventListener(
"keypress",
function(event){


if(event.key==="Enter"){


sendMessage();


}


});


}









// ===============================
// QUICK ACTION BUTTONS
// ===============================



const actionCards =
document.querySelectorAll(
".action-card"
);



actionCards.forEach(card=>{


card.addEventListener(
"click",
()=>{


let action =
card.querySelector("h3").innerText;



let input =
document.getElementById(
"userInput"
);



if(input){


input.value =
action;



sendMessage();



}



});


});









// ===============================
// PERSONALITY MODE SWITCH
// ===============================



const personalityCards =
document.querySelectorAll(
".personality-card"
);



personalityCards.forEach(card=>{


card.addEventListener(
"click",
()=>{


personalityCards.forEach(item=>{


item.classList.remove(
"active"
);


});



card.classList.add(
"active"
);



let mode =
card.querySelector("h3").innerText;



alert(
"AI switched to "+mode
);



});


});









// ===============================
// ANALYTICS COUNTER
// ===============================



function animateAssistantCounters(){


const counters =
document.querySelectorAll(
".analytics-card h1"
);



counters.forEach(counter=>{


let target =
parseInt(counter.innerText);



counter.innerText="0";



let count=0;



let timer=setInterval(()=>{


count += Math.ceil(
target/60
);



if(count>=target){


counter.innerText=target;


clearInterval(timer);


}

else{


counter.innerText=count;


}



},30);



});


}




// Run counter when page loads


if(document.querySelector(
".analytics-card"
)){


animateAssistantCounters();


}









// ===============================
// VOICE ASSISTANT
// ===============================



const voiceButton =
document.querySelector(
".voice-ai button"
);



if(voiceButton){



voiceButton.addEventListener(
"click",
()=>{


voiceButton.innerHTML=
"🎙 Listening...";



setTimeout(()=>{


voiceButton.innerHTML=
"Start Listening";



alert(
"AI Voice Assistant is ready!"
);



},3000);



});


}
// =====================================================
//      LIFEOS AI PERSONAL DASHBOARD CONNECTION
// =====================================================


function generateLifeOSBriefing(){


const message =
document.getElementById(
"initialAIMessage"
);



if(!message) return;



setTimeout(()=>{


message.innerHTML = `

Good Morning 👋

<br><br>

I analyzed your LifeOS dashboard:

<br><br>

🧠 Productivity:
<b>82%</b>

<br>

❤️ Health:
<b>91%</b>

<br>

💰 Finance:
<b>76%</b>

<br>

🎯 Active Goals:
<b>8/10 completed</b>

<br><br>

AI Recommendation:

Focus on your priority tasks before noon
and review your monthly budget tonight.

`;



},1500);



}




if(
document.querySelector(".assistant-page")
){


generateLifeOSBriefing();


}

/* =========================================================
   LIFEOS AI — SETTINGS JAVASCRIPT
========================================================= */


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Create Lucide icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // Load previously saved settings
    loadSettings();

});


/* =========================================================
   BACK TO DASHBOARD
========================================================= */

function goDashboard() {

    window.location.href = "../index.html";

}


/* =========================================================
   EDIT PROFILE
========================================================= */

function editProfile() {

    const newName = prompt(
        "Enter your name:",
        "Malaika Shahid"
    );


    if (newName === null) {
        return;
    }


    const trimmedName = newName.trim();


    if (trimmedName === "") {

        alert("Please enter a valid name.");

        return;

    }


    const profileName =
        document.querySelector(".profile-details h3");


    if (profileName) {

        profileName.textContent = trimmedName;

    }


    localStorage.setItem(
        "lifeosUserName",
        trimmedName
    );


    showSettingsMessage(
        "Profile updated successfully."
    );

}


/* =========================================================
   LOAD PROFILE NAME
========================================================= */

function loadProfileName() {

    const savedName =
        localStorage.getItem("lifeosUserName");


    const profileName =
        document.querySelector(".profile-details h3");


    if (
        savedName &&
        profileName
    ) {

        profileName.textContent = savedName;

    }

}


/* =========================================================
   SAVE SETTINGS
========================================================= */

function saveSettings() {

    const settings = {

        workingTime:
            getValue("workingTime"),

        productivityStyle:
            getValue("productivityStyle"),

        aiCommunication:
            getValue("aiCommunication"),

        dailyGoal:
            getValue("dailyGoal"),


        aiInsights:
            getChecked("aiInsights"),

        aiPredictions:
            getChecked("aiPredictions"),

        aiAssistant:
            getChecked("aiAssistant"),


        plannerNotifications:
            getChecked("plannerNotifications"),

        financeNotifications:
            getChecked("financeNotifications"),

        healthNotifications:
            getChecked("healthNotifications"),

        dailySummary:
            getChecked("dailySummary"),


        performanceAnalytics:
            getChecked("performanceAnalytics"),

        dashboardRecommendations:
            getChecked("dashboardRecommendations"),

        quickStats:
            getChecked("quickStats")

    };


    localStorage.setItem(
        "lifeosSettings",
        JSON.stringify(settings)
    );


    showSettingsMessage(
        "✓ Settings saved successfully!"
    );


    // Small visual feedback

    const saveButton =
        document.querySelector(
            ".save-settings-btn"
        );


    if (saveButton) {

        const originalText =
            saveButton.innerHTML;


        saveButton.innerHTML =
            '<i data-lucide="check"></i> Saved!';


        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }


        setTimeout(function () {

            saveButton.innerHTML =
                originalText;

            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }

        }, 2000);

    }

}


/* =========================================================
   LOAD SETTINGS
========================================================= */

function loadSettings() {

    loadProfileName();


    const saved =
        localStorage.getItem(
            "lifeosSettings"
        );


    if (!saved) {

        return;

    }


    try {

        const settings =
            JSON.parse(saved);


        setValue(
            "workingTime",
            settings.workingTime
        );


        setValue(
            "productivityStyle",
            settings.productivityStyle
        );


        setValue(
            "aiCommunication",
            settings.aiCommunication
        );


        setValue(
            "dailyGoal",
            settings.dailyGoal
        );


        setChecked(
            "aiInsights",
            settings.aiInsights
        );


        setChecked(
            "aiPredictions",
            settings.aiPredictions
        );


        setChecked(
            "aiAssistant",
            settings.aiAssistant
        );


        setChecked(
            "plannerNotifications",
            settings.plannerNotifications
        );


        setChecked(
            "financeNotifications",
            settings.financeNotifications
        );


        setChecked(
            "healthNotifications",
            settings.healthNotifications
        );


        setChecked(
            "dailySummary",
            settings.dailySummary
        );


        setChecked(
            "performanceAnalytics",
            settings.performanceAnalytics
        );


        setChecked(
            "dashboardRecommendations",
            settings.dashboardRecommendations
        );


        setChecked(
            "quickStats",
            settings.quickStats
        );


    } catch (error) {

        console.error(
            "Unable to load settings:",
            error
        );

    }

}


/* =========================================================
   HELPER — GET SELECT VALUE
========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {

        return "";

    }


    return element.value;

}


/* =========================================================
   HELPER — SET SELECT VALUE
========================================================= */

function setValue(id, value) {

    const element =
        document.getElementById(id);


    if (
        element &&
        value !== undefined &&
        value !== null
    ) {

        element.value = value;

    }

}


/* =========================================================
   HELPER — GET CHECKBOX VALUE
========================================================= */

function getChecked(id) {

    const element =
        document.getElementById(id);


    if (!element) {

        return false;

    }


    return element.checked;

}


/* =========================================================
   HELPER — SET CHECKBOX VALUE
========================================================= */

function setChecked(id, value) {

    const element =
        document.getElementById(id);


    if (
        element &&
        value !== undefined
    ) {

        element.checked = value;

    }

}


/* =========================================================
   SETTINGS MESSAGE
========================================================= */

function showSettingsMessage(message) {

    const messageBox =
        document.getElementById(
            "settingsMessage"
        );


    if (!messageBox) {

        return;

    }


    messageBox.textContent =
        message;


    messageBox.style.color =
        "#22C55E";


    setTimeout(function () {

        messageBox.textContent =
            "Your changes will be saved locally.";

        messageBox.style.color =
            "";

    }, 3000);

}


/* =========================================================
   THEME SELECTION
========================================================= */

function selectTheme(button, theme) {

    const themeButtons =
        document.querySelectorAll(
            ".theme-option"
        );


    themeButtons.forEach(function (item) {

        item.classList.remove("active");

    });


    button.classList.add("active");


    localStorage.setItem(
        "lifeosTheme",
        theme
    );


    applyTheme(theme);


    showSettingsMessage(
        themeName(theme) +
        " selected."
    );

}


/* =========================================================
   APPLY THEME
========================================================= */

function applyTheme(theme) {

    document.body.classList.remove(
        "theme-dark",
        "theme-midnight",
        "theme-light"
    );


    if (theme === "midnight") {

        document.body.classList.add(
            "theme-midnight"
        );

    }


    else if (theme === "light") {

        document.body.classList.add(
            "theme-light"
        );

    }


    else {

        document.body.classList.add(
            "theme-dark"
        );

    }

}


/* =========================================================
   THEME NAME
========================================================= */

function themeName(theme) {

    if (theme === "midnight") {

        return "Midnight AI";

    }


    if (theme === "light") {

        return "Light Mode";

    }


    return "Cyber Dark";

}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "lifeosTheme"
        );


    if (!savedTheme) {

        applyTheme("dark");

        return;

    }


    applyTheme(savedTheme);


    const themeButton =
        document.querySelector(
            `.theme-option[onclick*="'${savedTheme}'"]`
        );


    if (themeButton) {

        document
            .querySelectorAll(".theme-option")
            .forEach(function (button) {

                button.classList.remove(
                    "active"
                );

            });


        themeButton.classList.add(
            "active"
        );

    }

}


/* =========================================================
   MANAGE DATA
========================================================= */

function manageData() {

    const settings =
        localStorage.getItem(
            "lifeosSettings"
        );


    const userName =
        localStorage.getItem(
            "lifeosUserName"
        );


    let message =
        "LifeOS Local Data\n\n";


    message +=
        "Settings: " +
        (settings ? "Saved" : "Not saved") +
        "\n";


    message +=
        "Profile: " +
        (userName ? "Saved" : "Default") +
        "\n";


    message +=
        "\nYour data is currently stored locally in your browser.";


    alert(message);

}


/* =========================================================
   EXPORT DATA
========================================================= */

function exportData() {

    const settings =
        localStorage.getItem(
            "lifeosSettings"
        );


    const userName =
        localStorage.getItem(
            "lifeosUserName"
        );


    const theme =
        localStorage.getItem(
            "lifeosTheme"
        );


    const data = {

        application:
            "LifeOS AI",

        exportedAt:
            new Date().toLocaleString(),

        user: {

            name:
                userName ||
                "Malaika Shahid"

        },

        theme:
            theme ||
            "dark",

        settings:
            settings
                ? JSON.parse(settings)
                : {}

    };


    const json =
        JSON.stringify(
            data,
            null,
            4
        );


    const blob =
        new Blob(
            [json],
            {
                type: "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        "lifeos-settings.json";


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);


    URL.revokeObjectURL(url);


    showSettingsMessage(
        "✓ Your LifeOS data has been exported."
    );

}


/* =========================================================
   CLEAR DATA
========================================================= */

function clearData() {

    const confirmed =
        confirm(
            "Are you sure you want to clear your LifeOS settings?\n\nThis will remove your saved preferences from this browser."
        );


    if (!confirmed) {

        return;

    }


    localStorage.removeItem(
        "lifeosSettings"
    );


    localStorage.removeItem(
        "lifeosUserName"
    );


    localStorage.removeItem(
        "lifeosTheme"
    );


    // Reset selects

    const workingTime =
        document.getElementById(
            "workingTime"
        );


    const productivityStyle =
        document.getElementById(
            "productivityStyle"
        );


    const aiCommunication =
        document.getElementById(
            "aiCommunication"
        );


    const dailyGoal =
        document.getElementById(
            "dailyGoal"
        );


    if (workingTime) {

        workingTime.value =
            "morning";

    }


    if (productivityStyle) {

        productivityStyle.value =
            "focused";

    }


    if (aiCommunication) {

        aiCommunication.value =
            "friendly";

    }


    if (dailyGoal) {

        dailyGoal.value =
            "4";

    }


    // Reset all toggles

    document
        .querySelectorAll(
            '.toggle input[type="checkbox"]'
        )
        .forEach(function (checkbox) {

            checkbox.checked = true;

        });


    // Reset profile

    const profileName =
        document.querySelector(
            ".profile-details h3"
        );


    if (profileName) {

        profileName.textContent =
            "Malaika Shahid";

    }


    // Reset theme

    applyTheme("dark");


    document
        .querySelectorAll(".theme-option")
        .forEach(function (button) {

            button.classList.remove(
                "active"
            );

        });


    const darkTheme =
        document.querySelector(
            ".dark-preview"
        );


    if (darkTheme) {

        const darkButton =
            darkTheme.closest(
                ".theme-option"
            );


        if (darkButton) {

            darkButton.classList.add(
                "active"
            );

        }

    }


    showSettingsMessage(
        "✓ Settings have been reset."
    );

}


/* =========================================================
   TOGGLE INTERACTION
========================================================= */

function setupToggleFeedback() {

    const toggles =
        document.querySelectorAll(
            '.toggle input[type="checkbox"]'
        );


    toggles.forEach(function (toggle) {

        toggle.addEventListener(
            "change",
            function () {

                const item =
                    toggle.closest(
                        ".setting-item"
                    );


                if (item) {

                    item.classList.add(
                        "setting-changed"
                    );


                    setTimeout(function () {

                        item.classList.remove(
                            "setting-changed"
                        );

                    }, 500);

                }

            }
        );

    });

}


/* =========================================================
   AUTO SAVE INDICATOR
========================================================= */

function setupAutoSaveIndicator() {

    const controls =
        document.querySelectorAll(
            "select, .toggle input"
        );


    controls.forEach(function (control) {

        control.addEventListener(
            "change",
            function () {

                const message =
                    document.getElementById(
                        "settingsMessage"
                    );


                if (message) {

                    message.textContent =
                        "Unsaved changes";

                    message.style.color =
                        "#F59E0B";

                }

            }
        );

    });

}


/* =========================================================
   INITIALIZE SETTINGS FEATURES
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTheme();

        setupToggleFeedback();

        setupAutoSaveIndicator();

    }
);