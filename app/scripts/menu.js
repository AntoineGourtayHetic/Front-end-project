let menuIcon = document.querySelector('.menu__burger'),
    menu     = document.querySelector('.menu')
    ;

menuIcon.addEventListener('click', menuAppear);
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