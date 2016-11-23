let loader = document.querySelector('.loaderWrapper');
let mustAppear = document.querySelectorAll('.views__homeViewLine .hidden');

window.addEventListener('load',()=>{ 
      loader.className += ' fade';
      setTimeout(()=>{
        loader.className += ' hidden';
        mustAppear.forEach(function(elem){
            //keep the class of the element that must remain == remove class hidden
            elem.className = getClassToKeep(elem);
        });
    }, 1000);
});

function getClassToKeep (element) {
    //retun the first class of the element
    return element.className.split(" ")[0];
}