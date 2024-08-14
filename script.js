//states

let level = 1;
let negMark = false;

//functions

const setTheLevel = (lvl) => {
    level = lvl;
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
}