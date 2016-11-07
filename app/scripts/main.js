var arrows         = document.querySelectorAll('.arrow'),
    viewsContainer = document.querySelector('.container__views'),
    userViewWidth  = updateUserViewPort('width'),
    userViewHeight = updateUserViewPort('height'),
    userTouchStartCoord = {
        clientX: 0,
        clientY: 0
    },
    userTouchMoveCoord = {
        clientX: 0,
        clientY: 0
    };

//DETECT WHEN THE USER RESIZES HIS WINDOW TO UPDATE THE VARIABLES
window.addEventListener('resize', updateUserViewPort);
// DETECT WHEN THE USER PRESSES A KEY TO MOVE THE VIEWS
window.addEventListener('keyup', keyboardNav);
// DETECT WHEN THE USER STARTS TOUCHING HIS SCREEN
window.addEventListener('touchstart', function(e) {
    userTouchStartCoord.clientX = e.touches[0].clientX;
    userTouchStartCoord.clientY = e.touches[0].clientY;
});
// DETECT WHEN THE USER MOVES HIS FINGER ON HIS SCREEN
window.addEventListener('touchmove', function(e) {

    userTouchMoveCoord.clientX = e.touches[0].clientX;
    userTouchMoveCoord.clientY = e.touches[0].clientY;
});
// DETECT WHEN THE USER DOESN'T TOUCH HIS SCREEN ANYMORE
window.addEventListener('touchend', touchNav);

// SET LISTENERS ON THE ARROWS
for(var i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener('click', moveView);
}


// FUNCTION TO MOVE THE VIEWS CONTAINER
function moveView(e) {

    var target;
    // IF THE USER USES THE HTML ARROWS
    if(typeof e === 'object') {
        // GET THE LAST OF ITS CLASS TO GUESS WHICH ARROW HE CLICKED
        target = e.target.classList[e.target.classList.length - 1];
    } else {
        // IF HE DOESN'T USE THE ARROWS WE ALREADY KNOW THANKS TO THE PARAM
        target = e;
    }

    // GET THE CSS VALUES OF THE ARROW
    var viewsContainerComputedStyle = window.getComputedStyle(viewsContainer),

        // GET THE TRANSLATE VALUE VIA FUNCTION getTranslateValue (IT RETURNS A MATRIX())
        translateValues = getTranslateValue(viewsContainerComputedStyle.getPropertyValue('transform'));

    switch(target) {

        case 'navArrow__topArrow':
            viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + parseInt(translateValues[4] ) + ', ' + (parseInt(translateValues[5]) + userViewHeight) + ')';
            break;

        case 'navArrow__rightArrow':
            viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + (parseInt(translateValues[4]) - userViewWidth) + ', ' + parseInt(translateValues[5]) + ')';
            break;

        case 'navArrow__bottomArrow':
            viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + parseInt(translateValues[4]) + ', ' + parseInt(translateValues[5] - userViewHeight) + ')';
            break;

        case 'navArrow__leftArrow':
            viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + (parseInt(translateValues[4]) + userViewWidth) + ', ' + parseInt(translateValues[5]) + ')';
            break;

    }

}

// RETURN AN ARRAY OF THE TRANSLATE VALUES
function getTranslateValue(matrix) {
    var values = matrix.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

    return values;
}


// UPDATE THE VIEWPORT VALUE WHEN THE USER RESIZES HIS WINDOW
function updateUserViewPort(arg) {
    if(arg == 'width') {
        return window.innerWidth;
    } else {
        return window.innerHeight;
    }

}

// FUNCTION TO HANDLE TOUCH NAV DEPENDING ON THE GESTURE
function touchNav(e) {


    var redirect = redirectTouchNav();

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
    if((userTouchMoveCoord.clientY > userTouchStartCoord.clientY) && ((userTouchMoveCoord.clientY - userTouchStartCoord.clientY) > (userTouchMoveCoord.clientX - userTouchStartCoord.clientX))) {

        return 'TOP TO BOTTOM';

    } else if((userTouchMoveCoord.clientY < userTouchStartCoord.clientY) && ((userTouchMoveCoord.clientY - userTouchStartCoord.clientY) < (userTouchMoveCoord.clientX - userTouchStartCoord.clientX))) {

        return  'BOTTOM TO TOP';

    } else if((userTouchMoveCoord.clientX > userTouchStartCoord.clientX) && ((userTouchMoveCoord.clientY - userTouchStartCoord.clientY) < (userTouchMoveCoord.clientX - userTouchStartCoord.clientX))) {

        return 'LEFT TO RIGHT';

    } else if((userTouchMoveCoord.clientX < userTouchStartCoord.clientX) && ((userTouchMoveCoord.clientY - userTouchStartCoord.clientY) > (userTouchMoveCoord.clientX - userTouchStartCoord.clientX))) {

        return 'RIGHT TO LEFT';

    }
}

// FUNCTION TO HANDLE KEYBOARD NAV
function keyboardNav(e) {
    // GET KEYCODE OF PRESSED KEY
    var key = e.keyCode;

    switch(key) {

        // UP AND Z

        case 38:
        case 90:
            moveView('navArrow__topArrow');
            break;

        // LEFT AND Q

        case 37:
        case 81:
            moveView('navArrow__leftArrow');
            break;

        // DOWN AND S

        case 40:
        case 83:
            moveView('navArrow__bottomArrow');
            break;

        // RIGHT AND D

        case 39:
        case 68:
            moveView('navArrow__rightArrow');
            break;

    }
}
