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

window.addEventListener('resize', updateUserViewPort);
window.addEventListener('keyup', keyboardNav);
window.addEventListener('touchstart', function(e) {
    userTouchStartCoord.clientX = e.touches[0].clientX;
    userTouchStartCoord.clientY = e.touches[0].clientY;
});

window.addEventListener('touchmove', function(e) {

    userTouchMoveCoord.clientX = e.touches[0].clientX;
    userTouchMoveCoord.clientY = e.touches[0].clientY;
});

window.addEventListener('touchend', touchNav);

// SET LISTENERS
for(var i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener('click', moveView);
}

function moveView(e) {

    // GET THE CLASS TO KNOW WHICH ARROW IS CLICKED
    var target;

    if(typeof e === 'object') {

        target = e.target.classList[e.target.classList.length - 1];
    } else {
        target = e;
    }

        //GET THE CSS OF THE ARROW
        var viewsContainerComputedStyle = window.getComputedStyle(viewsContainer),

        //GET THE TRANSLATE VALUE VIA FUNCTION getTranslateValue
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

    console.log(translateValues);
}

function getTranslateValue(matrix) {
    var values = matrix.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

    return values;
}

function updateUserViewPort(arg) {
    if(arg == 'width') {
        return window.innerWidth;
    } else {
        return window.innerHeight;
    }

}

function touchNav(e) {

    console.log('user start y ' + userTouchStartCoord.clientY);
    console.log('user end y ' + userTouchMoveCoord.clientY);
    console.log('user start x ' + userTouchStartCoord.clientX);
    console.log('user end x ' + userTouchMoveCoord.clientX);

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

    // FROM RIGHT TO LEFT IF((userTouchStartCoord.clientX - userTouchMoveCoord.clientX) > (userTouchStartCoord.clientY - userTouchMoveCoord.clientX))

}

function redirectTouchNav() {
    // TOUCH FROM TOP TO BOTTOM
    // TOUCH FROM BOTTOM TO TOP
    // TOUCH FROM LEFT TO RIGHT
    // TOUCH FROM RIGHT TO LEFT
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

function keyboardNav(e) {

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