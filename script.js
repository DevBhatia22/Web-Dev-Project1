//states

let level = 1;
let negMark = false;
let display = document.querySelector("#display");

//functions

const setTheLevel = (lvl) => {
    level = lvl;
    changeDisplay();
};

const toggleNegMark = () => {
    const button = document.querySelector(".negButton");
    if(negMark){
        button.textContent = "Neg Mark Not Included";
    }
    else{
        button.textContent = "Neg Mark Is Included";
    }
    negMark ^= 1;
    changeDisplay();
}

//dom rendering display

const changeDisplay = () => {
    display.innerHTML = '';
    const childLevel = document.createElement('div');
    childLevel.innerHTML = (`Your current selected Level : ${level == 1?"Newbie":level == 2?"Pupil":"Specilist"}`);
    const childNegMark = document.createElement('div');
    childNegMark.innerHTML = (`Negitive marking? : ${negMark == 1?"YES":"NO"}`);
    display.append(childLevel, childNegMark);
}
changeDisplay();

//start game forwarder

const start = () => {
    let gameStat = {
        "level" : level,
        "negMark" : negMark,
    }
    localStorage.setItem("game" , JSON.stringify(gameStat));
}

