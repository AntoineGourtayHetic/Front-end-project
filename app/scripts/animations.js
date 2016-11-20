let observer = new IntersectionObserver( entries => {
    console.log(entries);
    entries.forEach(entry => {
        entry.target.classList.toggle('hideImageCircle');
        entry.target.classList.toggle('showImageCircle');
    });

}, {
    threshold: [0.5]
});

const elems = document.querySelectorAll('.criterionImageCircle');

elems.forEach((item) => {
    observer.observe(item);
});