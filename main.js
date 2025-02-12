const iconWidth = 100,
    iconHeight = 100,
    numberIcons = 5,
    indexes = [0, 0, 0, 0],
    indexesLukitset = [false, false, false, false],
    timePerSecond = 100;
let pannos = 1;
let rahaa = 50;

const roll = (reel, i) => {

    const delta = (i + 2) * numberIcons + Math.round(Math.random() * numberIcons);
    const style = getComputedStyle(reel),
        backgroundPositionY = parseFloat(style["background-position-y"]),
        targetBackgroundPositionY = backgroundPositionY + delta * iconHeight,
        normtargetBackgroundPositionY = targetBackgroundPositionY % (numberIcons * iconHeight);

    return new Promise((reseolve, reject) => {
        if (!indexesLukitset[i]){

            reel.style.transition = `background-position-y ${8 + delta * timePerSecond}ms`;
            reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
            setTimeout(() => {
                reel.style.transition = `none`;
                reel.style.backgroundPositionY = `${normtargetBackgroundPositionY}px`;
                
                reseolve(delta % numberIcons)
                
            }, 8 + delta * timePerSecond)
        }
        else {reseolve(((i + 2) * numberIcons)*indexes[i]) % numberIcons}
    }
    )

}


function rollAll() {

    // let iconMap = [7,
    //     "meloni",
    //     "cherry",
    //     "päärynä",
    //     "omena"];
    let reelsList = document.querySelectorAll('.slots .reel');
    Promise.all([...reelsList].map((reel, i) =>
        roll(reel, i))).then((deltas) => {
            deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % numberIcons)
            // indexes.map((index) => { console.log(iconMap[index]) });
            checkwinner();

        })



}


// window.addEventListener('resize', (e) => {
//     console.log(window.innerWidth);
//     if (parseInt(window.innerWidth)<768){
//         console.log("YES");
//         var source = document.getElementById('pelaa');
//         var destination = document.getElementById('leftcontainer');
//         destination.appendChild(source);
//     }
//   });


function btn_lukitse(index) {
    indexesLukitset[index] = !indexesLukitset[index];
    let lukitset = document.querySelectorAll('.lukitse');
    if (indexesLukitset[index]) {
        lukitset[index].style.backgroundColor = "rgb(211, 211, 211)";
        lukitset[index].style.backgroundImage = "url(./images/lock.png)";
        lukitset[index].style.backgroundSize = "40%";
    } else {
        lukitset[index].style.backgroundColor = "";
        lukitset[index].style.backgroundImage = "";
        lukitset[index].style.backgroundSize = "";
    }

}
function setPannos(value) {
    if (value > rahaa) {

        document.getElementById("pannos").innerHTML = `can't set pannos: ${value} , pannos: 0€`;
        pannos = 0;
    }
    else {

        pannos = value;
        document.getElementById("pannos").innerHTML = `pannos: ${value}€`;
    }

}

function btn_pelaa() {
    if (rahaa <= 0) {
        document.getElementById('winner').innerHTML = "<h2>You can't play the game without money</h2>"
        document.getElementById('winner').style.display = "flex";
        document.getElementById('pannokset').style.display = "none";

    }
    else {

        rollAll();

    }



}

function checkvalues(value, i = 4) {
    filtered = indexes.filter(function (number) {
        return number == value;
    });
    return filtered.length == i;

}

function checkwinner() {

    document.getElementById('pelaa').disabled = true;

    setTimeout(() => {
        document.getElementById('winner').style.display = "flex";
        document.getElementById('pannokset').style.display = "none";
    }, 3000);
    setTimeout(() => {
        document.getElementById('pelaa').disabled = false;
        document.getElementById('pannokset').style.display = "flex";
        document.getElementById('winner').style.display = "none";
    }, 5000);
    let lahja = 0;

    // 0 -7
    // 1 meloni
    // 2 cherry
    // 3 päärynä
    // 4 omena
    if (checkvalues(0)) {
        lahja = pannos * 10;
    }
    if (checkvalues(3)) {
        lahja = pannos * 4;
    }
    if (checkvalues(2)) {
        lahja = pannos * 6;
    }
    if (checkvalues(1)) {
        lahja = pannos * 8;
    }
    if (checkvalues(0, 3)) {
        lahja = pannos * 5;
    }
    if (lahja > 0) {
        document.getElementById('winner').innerHTML = `<h2>You win ${lahja}€</h2>`;
        rahaa += lahja;
    }
    else {
        rahaa -= pannos;
        document.getElementById('winner').innerHTML = `<h2>You lost ${pannos}€</h2>`;

    }
    document.getElementById("rahaa").innerHTML = `rahaa: ${rahaa}€`;

}