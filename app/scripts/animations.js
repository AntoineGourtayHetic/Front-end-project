let observer = new IntersectionObserver( entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle('hideImage');
        entry.target.classList.toggle('showImage');
    });

}, {
    threshold: [0.5]
});

const elems          = document.querySelectorAll('.hideImage'),
      seeInvitations = document.querySelector('.see_locations');

elems.forEach((item) => {
    observer.observe(item);
});

seeInvitations.addEventListener('click', (e) => {

    scrollTop();

});

function scrollTop() {

    let view            = document.querySelector('.touristsViewsLine__view'),
        windowScrollTop = window.innerHeight,
        scroll          = 0;


    if(view.scrollTop == windowScrollTop) {
        return window.clearTimeout();
    }

    if(windowScrollTop !== 0)  {

        scroll          += 10;
        windowScrollTop -= 10;

        view.scrollTop = view.scrollTop += 10;

        window.setTimeout(scrollTop, 3);
    }
}
