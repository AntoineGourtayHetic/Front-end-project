var arrows = document.querySelectorAll('.arrow'),
    viewsContainer = document.querySelector('.container__views'),
    userViewWidth = updateUserViewPort('width'),
    userViewHeight = updateUserViewPort('height');

window.addEventListener('resize', updateUserViewPort);

// SET LISTENERS
for(var i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener('click', moveView);
}

function moveView(e) {

    // CREATE AN ARRAY TO CHECK IF THE ARROW IS ACTIVE

    var classes = e.target.className.split(' ');

    // CHECK IF THE CLASS ACTIVE EXISTS

    if(classes.indexOf('active') >= 0) {

        console.log('exists');

        // GET THE CLASS TO KNOW WHICH ARROW IS CLICKED
        var target = e.target.classList[e.target.classList.length - 1],

            //GET THE CSS OF THE ARROW
            viewsContainerComputedStyle = window.getComputedStyle(viewsContainer),

            //GET THE TRANSLATE VALUE VIA FUNCTION getTranslateValue
            translateValues = getTranslateValue(viewsContainerComputedStyle.getPropertyValue('transform'));
            console.log(e.target.classList.length);
        switch(target) {

            case 'navArrow__topArrow':
                var value = viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + parseInt(translateValues[4] ) + ', ' + (parseInt(translateValues[5]) + userViewHeight) + ')';
            break;

            case 'navArrow__rightArrow':
                var value = viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + (parseInt(translateValues[4]) - userViewWidth) + ', ' + parseInt(translateValues[5]) + ')';
            break;

            case 'navArrow__bottomArrow':
                viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + parseInt(translateValues[4]) + ', ' + parseInt(translateValues[5] - userViewHeight) + ')';
            break;

            case 'navArrow__leftArrow':
                var value = viewsContainer.style.transform = 'matrix(1, 0, 0, 1, ' + (parseInt(translateValues[4]) + userViewWidth) + ', ' + parseInt(translateValues[5]) + ')';
            break;

        }
    }
}

function getTranslateValue(matrix) {
    var values = matrix.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

    return values;
}

function changeClassName() {

}

function updateUserViewPort(arg) {
    if(arg == 'width') {
        return window.innerWidth;
    } else {
        return window.innerHeight;
    }

}