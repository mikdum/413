const iconWidth = 100,
    iconHeight = 100,
    numberIcons = 5,
    indexes = [0, 0, 0, 0],
    timePerSecond = 100;

const roll = (reel, ofset = 0) => {
    const delta = (ofset + 2) * numberIcons + Math.round(Math.random() * numberIcons);
    const style = getComputedStyle(reel),
        backgroundPositionY = parseFloat(style["background-position-y"]),
        targetBackgroundPositionY=backgroundPositionY+delta*iconHeight,
        normtargetBackgroundPositionY=targetBackgroundPositionY%(numberIcons*iconHeight);

    return new Promise((reseolve, reject) => {
        reel.style.transition = `background-position-y ${8 + delta * timePerSecond}ms`;
        reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
        setTimeout(() => {
            reel.style.transition=`none`;
            reel.style.backgroundPositionY=`${normtargetBackgroundPositionY}px`;

            reseolve(delta%numberIcons)

        }, 8 + delta * timePerSecond)
    }
    )
}


function rollAll() {
    let reelsList = document.querySelectorAll('.slots .reel');
    Promise.all( [...reelsList].map((reel, i) => 
        roll(reel, i))).then((deltas) => { 
            deltas.forEach((delta,i)=>indexes[i]=(indexes[i]+delta)%numberIcons)
            console.log(indexes) 
            setTimeout(rollAll,1000)
        
        })

   
   
}

// rollAll();

let lukitset=document.querySelectorAll('.lukitse');
lukitset[0].style.backgroundColor="rgb(155, 102, 102)";
lukitset[0].style.backgroundImage="url(./images/lock.png)";

lukitset[0].style.backgroundSize="40%";