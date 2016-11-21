const arrows          = document.querySelectorAll('.arrow'),
      arrowsContainer = document.querySelectorAll('.navArrow'),
      viewsContainer  = document.querySelector('.container__views'),
      touristBtn      = document.querySelector('.home__tourist'),
      firewatcherBtn  = document.querySelector('.home__firewatcher');

let resizeTimeout,
    userTouchStartCoord = {
        clientX: 0,
    },
    userTouchMoveCoord = {
        clientX: 0,
    },
    viewCoords = {
        x: 0,
    };


    function resizeThrottler() {

        let width = getWidth(),
            viewsContainerComputedStyle = window.getComputedStyle(viewsContainer),

            // GET THE TRANSLATE VALUE VIA FUNCTION getTranslateValue (IT RETURNS A MATRIX())
            translateValues = getTranslateValue(viewsContainerComputedStyle.getPropertyValue('transform'));

        console.log(width);

        if(viewCoords.x > 0) {
            viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + ( - (width * (viewCoords.x + 2))) + ', 0)';
            console.log( - ((width * (viewCoords.x + 2))));
        } else {
            viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + ( + (width * (Math.abs(viewCoords.x) - 2))) + ', 0)';
            console.log(((width * 2) + getWidth() * viewCoords.x));
        }


    }

//DETECT WHEN THE USER RESIZES HIS WINDOW TO UPDATE THE VARIABLES
window.addEventListener('resize', resizeThrottler, false);
// DETECT WHEN THE USER PRESSES A KEY TO MOVE THE VIEWS
window.addEventListener('keyup', keyboardNav);
// DETECT WHEN THE USER STARTS TOUCHING HIS SCREEN
window.addEventListener('touchstart', (e) => {
    userTouchStartCoord.clientX = e.touches[0].clientX;
});
// DETECT WHEN THE USER MOVES HIS FINGER ON HIS SCREEN
window.addEventListener('touchmove', (e) => {

    userTouchMoveCoord.clientX = e.touches[0].clientX;
});
// DETECT WHEN THE USER DOESN'T TOUCH HIS SCREEN ANYMORE
window.addEventListener('touchend', touchNav);

// SET LISTENERS ON THE ARROWS
setArrows();
function setArrows() {
    arrows.forEach((arrow, i) => {
        arrow.addEventListener('click', moveView);
        arrow.style.transform = setTransforms(i);
    });
}

// SET LISTENERS ON THE BTNS
touristBtn.addEventListener('click', btnNav);
firewatcherBtn.addEventListener('click', btnNav);




// FUNCTION TO MOVE THE VIEWS CONTAINER
function moveView(e) {

        let target;
        // IF THE USER USES THE HTML ARROWS
        if(typeof e === 'object') {
            // GET THE LAST OF ITS CLASS TO GUESS WHICH ARROW HE CLICKED
            target = e.target.classList[e.target.classList.length - 1];
        } else {
            // IF HE DOESN'T USE THE ARROWS WE ALREADY KNOW THANKS TO THE PARAM
            target = e;
        }

        if((viewCoords.x <= 1 && target === 'navArrow__rightArrow') || (viewCoords.x >= -1 && target === 'navArrow__leftArrow')) {
            // GET THE CSS VALUES OF THE ARROW
            let viewsContainerComputedStyle = window.getComputedStyle(viewsContainer),

            // GET THE TRANSLATE VALUE VIA FUNCTION getTranslateValue (IT RETURNS A MATRIX())
                translateValues = getTranslateValue(viewsContainerComputedStyle.getPropertyValue('transform'));
            
            switch (target) {

                case 'home__tourist'       :
                case 'navArrow__rightArrow':
                    viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + (parseInt(translateValues[4]) - getWidth()) + ', 0)';
                    console.log(viewsContainer.style.transform);
                    break;

                case 'navArrow__leftArrow':
                case 'home__firewatcher'  :
                    viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + (parseInt(translateValues[4]) + getWidth()) + ', 0)';
                    console.log(viewsContainer.style.transform);
                    break;

            }
            updateViewCoords(target);
        }
}

// RETURN AN ARRAY OF THE TRANSLATE VALUES
function getTranslateValue(matrix) {
    var values = matrix.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

    return values;
}


// get the current viewportWidth
function getWidth() {
    return window.innerWidth;
}

// FUNCTION TO HANDLE TOUCH NAV DEPENDING ON THE GESTURE
function touchNav(e) {

 let redirect = redirectTouchNav();

    switch(redirect) {

        case 'RIGHT TO LEFT':
            moveView('navArrow__rightArrow');
            break;
        case 'LEFT TO RIGHT':
            moveView('navArrow__leftArrow');
            break;
        case 'BOTTOM TO TOP':
            moveView('navArrow__bottomArrow');
            break;
        case 'TOP TO BOTTOM':
            moveView('navArrow__topArrow');
            break;

    }

}

// FUNCTION TO INTERPRET THE GESTURE
function redirectTouchNav() {
    /*
     * COMPARE THE GAP BETWEEN THE TOUCH START COORDS AND THE TOUCH END COORDS
     * AND THE DIFF BETWEEN THE SOUSTRACTION OF THE TOUCH START AND TOUCH END X AND THE TOUCH START Y AND TOUCH START Y
     * */
    if((userTouchMoveCoord.clientX > userTouchStartCoord.clientX)) {

        return 'LEFT TO RIGHT';

    } else {

        return 'RIGHT TO LEFT';

    }
}

// FUNCTION TO HANDLE KEYBOARD NAV
function keyboardNav(e) {
    // GET KEYCODE OF PRESSED KEY
    const key = e.keyCode;

    switch(key) {

        // LEFT AND Q

        case 37:
        case 81:
            moveView('navArrow__leftArrow');
        break;

        // RIGHT AND D

        case 39:
        case 68:
            moveView('navArrow__rightArrow');
        break;

    }
}

function updateViewCoords(checker) {
    switch(checker) {

        case 'navArrow__rightArrow':
            viewCoords.x++;
        break;

        case 'navArrow__leftArrow':
            viewCoords.x--;
        break;
    }
    console.log(viewCoords);
}


function setTransforms(id) {
    switch(id) {

        case 0:
            return "rotate(90deg)";
        break;

        case 1:
            return "rotate(-90deg)";
        break;

    }
}

function btnNav(e) {

    const btnClass = e.target.classList[0];

    moveView(btnClass);
}