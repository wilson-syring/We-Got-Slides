//this function is for controlling the scroll event, so it saves on performance
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//variable for grabbing the image elements
const sliderImages = document.querySelectorAll('.slide-in');

//function for checking where you have scrolled to on the page and sliding images in and out.
function checkSlide(e) {
    sliderImages.forEach(sliderImage => {
        //sets a breakpoint to halfway through the image
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        //sets another breakpoint to the bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        //variable for determining if image is half  way shown
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        //variable for determining if image is not scrolled past yet
        const isNotScrolledPast = window.scrollY < imageBottom;
        //if statement for toggling the active class to the image element
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}

//event listener for scrolling the page
window.addEventListener('scroll', debounce(checkSlide));