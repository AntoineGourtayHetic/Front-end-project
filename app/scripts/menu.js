let menuIcon = document.querySelector('.menu__burger'),
    menu     = document.querySelector('.menu'),
    links    = menu.querySelectorAll('.menu__link')
    ;

menuIcon.addEventListener('click', menuAppear);
links.forEach(function(element) {
    element.addEventListener('click', menuDisappear);
}, this);
function menuAppear() {
     if(menu.classList.length == 1) {
         menu.classList.add('open');
     } else {
         menu.classList.remove('open');
     }
     if(menuIcon.classList.length == 1) {
         menuIcon.classList.add('open');
     } else {
         menuIcon.classList.remove('open');
     }
}

function menuDisappear() {
    if(menu.classList.length == 2) {
         menu.classList.remove('open');
     } 
     if(menuIcon.classList.length == 2) {
         menuIcon.classList.remove('open');
     } 
}