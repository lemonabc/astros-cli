// @require jquery.flexslider
$(function() {
console.log(123);
    $('#slides a').show();
    $('.flexslider').flexslider({
        animation: "fade",
        touch: true,
        pauseOnHover: true,
        slideshowSpeed: 5000
            // controlNav:false
    });

    if ($.browser.msie) {
        $('body').addClass('ie-' + parseInt($.browser.version));
    }
});