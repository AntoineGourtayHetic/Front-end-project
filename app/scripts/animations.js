let observer = new IntersectionObserver( entries => {
    console.log(entries);
});

const elems = document.querySelectorAll('.view');

elems.forEach((item) => {
    observer.observe(item);
});