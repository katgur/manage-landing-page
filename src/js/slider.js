// var slider = document.getElementsByClassName('slider')[0];
// var items = document.getElementsByClassName('slider__item');
// var start;
// function onDown(event) {
//     start = event.screenX;
// }
// function onUp() {
//     start = null;
// }
// function onMove(event) {
// }
// slider.addEventListener('mousedown', onDown);
// slider.addEventListener('mouseup', onUp);
// slider.addEventListener('mousemove', onMove);

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});