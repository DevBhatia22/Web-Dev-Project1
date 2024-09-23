const scores = document.querySelector("#score");
const gameStats = JSON.parse(localStorage.game);

scores.textContent = JSON.parse(localStorage[gameStats.level]).slice(-1)[0].score;

const ps = document.querySelector("#pastScores");

for(let i = 1; i <= 3; i++){
    let mainDiv = document.createElement("div");
    try{
        const vals = JSON.parse(localStorage[i]);
        vals.forEach(element => {
            let div = document.createElement("div");
            let date = document.createElement("div");
            let score = document.createElement("div");
            let time = document.createElement("div");
            date.innerText = element.date;
            score.innerText = element.score;
            time.innerText = element.time + " s";
            
            date.className = "ele";
            score.className = "ele";
            time.className = "ele";
            
            div.append(date, score, time);
            div.className = "eles"
            mainDiv.append(div);
        });
        mainDiv.className = "mainDiv"
        let title = document.createElement("div");
        title.innerText = `Level ${i}`;
        mainDiv.append(title);
    }
    catch{
        continue;
    }
    
    ps.append(mainDiv);
}

const redirect = () => {
    window.location.href = "index.html";
}