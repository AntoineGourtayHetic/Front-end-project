const menu_icon = document.querySelector('.menu-icon'),
      menu = document.querySelector('.menu');

menu_icon.addEventListener('click', menuAppear);

function menuAppear() {
    menu.classList.toggle('menu-opened');
    menu.classList.toggle('menu-closed');
    menu_icon.classList.toggle('menu-icon-opened');
    menu_icon.classList.toggle('menu-icon-closed');
}