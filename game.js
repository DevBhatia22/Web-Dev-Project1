let score = 0;
let questionNumber = 1;
//question function factory
let ct = 0;
let time = document.querySelector("#time");
setInterval(() => {
    ct++;
    time.textContent = `${ct} s`;
}, 1000);


const gameStat = JSON.parse(localStorage.game);
const quesFactory = () => {
    let ques = {
        "var1":0,
        "var2":0,
        "op":"",
        "answer":0
    }
    const op = ["+", "-", "*", "/", "%"];
    
    //multiplier decider
    let mul = 1;
    if(gameStat.level == 2){
        mul = 2;
    }
    if(gameStat.level == 3){
        mul = 4;
    }
    
    //oprator decider
    gameStat.level < 3 ? ques.op = op[Math.floor(Math.random() * 4)] : ques.op = op[Math.floor(Math.random() * 5)];
    //numbers decider
    if(ques.op == "*" || ques.op == "/"){
        ques.var1 = Math.floor(Math.random() * 20 * mul) + 1;
        ques.var2 = Math.floor(Math.random() * 20 * mul) + 1;
    }
    else if(ques.op == "%"){
        ques.var1 = (Math.floor(Math.random() * 19) + 1) * 5;
        ques.var2 = (Math.floor(Math.random() * 20) + 1) * 10;
    }
    else{
        ques.var1 = Math.floor(Math.random() * 100 * mul) + 1;
        ques.var2 = Math.floor(Math.random() * 100 * mul) + 1;
    }
    
    if(ques.op == "-"){
        if(ques.var1 < ques.var2){
            let temp = ques.var1;
            ques.var1 = ques.var2;
            ques.var2 = temp;
        }
    }
    if(ques.op == "/"){
        if(ques.var1 < ques.var2){
            let temp = ques.var1;
            ques.var1 = ques.var2;
            ques.var2 = temp;
        }
        ques.var1 *= 10;
        ques.var2 = Math.floor(ques.var2);
        ques.var1 = Math.floor(ques.var1 / ques.var2) * ques.var2 + ques.var2;
    
    }
    
    //solution
    switch (ques.op) {
        case "+":
            ques.answer = ques.var1 + ques.var2;
            break;
        case "-":
            ques.answer = ques.var1 - ques.var2;
            break;
        case "*":
            ques.answer = ques.var1 * ques.var2;
            break;
        case "/":
            ques.answer = ques.var1 / ques.var2;
            break;
                                
        default:
            ques.answer = Math.floor(ques.var1 * ques.var2) / 100;
            break;
    }
    
    return ques;
}

let changeScore = (score) => {
    return new Promise((res, rej) => {
        try{
            document.querySelector("#Score").textContent = `${score}`;
            res("Score Changed");
        }
        catch{
            rej("Score Didn't change");
        }
    })
}

const question = document.querySelector(".question");
let prob = quesFactory();
question.textContent = `${prob.var1} ${prob.op == "%"?"% of":prob.op} ${prob.var2}`;
const genrateQuestion = async() => {
    let answer = document.querySelector(".answer");
    if(prob.answer == answer.value){
        score += 10;
    }
    else if(gameStat.negMark){
        score -= 10;
    }
    
    try{
        let res = await changeScore(score);
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
    
    answer.value = "";
    if(questionNumber == 10) changeToScorePage(score);
    prob = quesFactory();
    document.querySelector(".qn").textContent = `Current Number of Question : ${++questionNumber} / 10`
    question.textContent = `${prob.var1} ${prob.op == "%"?"% of":prob.op} ${prob.var2}`;
}

let changeToScorePage = (score) => {
    try{
        let temp = JSON.parse(localStorage[gameStat.level]);
        let date = new Date;
        let newScore = {
            "date" : "" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
            "score" : score,
            "time" : ct
        }
        temp.push(newScore);
        localStorage.setItem(gameStat.level, JSON.stringify(temp));
    }
    catch{
        let date = new Date;
        const temp = [
            {
                "date" : "" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
                "score" : score,
                "time" : ct
            }
        ]
        console.log(temp);
        localStorage.setItem(gameStat.level , JSON.stringify(temp));
    }
    window.location.href = "result.html";
}