let observer = new IntersectionObserver( entries => {
    console.log(entries);
    entries.forEach(entry => {
        entry.target.classList.toggle('hideImage');
        entry.target.classList.toggle('showImage');
    });

}, {
    threshold: [0.5]
});

const elems = document.querySelectorAll('.hideImage');

elems.forEach((item) => {
    observer.observe(item);
});