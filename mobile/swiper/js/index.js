$(function(){
    var swiperW = new Swiper('.swiper-container-w', {
        pagination: '.swiper-pagination-h',
        paginationClickable: true,
        spaceBetween: 50,
        direction: 'vertical',

        paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
        
    });
    $('.click').click(function(){
    	swiperW.slideTo(2);
    })
    var swiperH = new Swiper('.swiper-container-h', {
        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        direction: 'vertical',
        nested:true,
        spaceBetween: 50
    });
    var swiperV = new Swiper('.swiper-container-v', {
        pagination: '.swiper-pagination-v',
        paginationClickable: true,
        // direction: 'vertical',
        spaceBetween: 50
    });
})