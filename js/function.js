/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device


$(document).ready(function() {
    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	// Запрет "отскока" страницы при клике по пустой ссылке с href="#"
	$('[href="#"]').click(function(event) {
		event.preventDefault();
	});

    // Inputmask.js
    $('[type=tel]').inputmask("+7(999)999-99-99",{ showMaskOnHover: false });
    formSubmit();

    $('.estimate__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        draggeble: false,
        infinite: false,
        prevArrow: '<div class="slick-arrow slick-prev" />',
        nextArrow: '<div class="slick-arrow slick-next" />',
        asNavFor: '.estimate__thumps',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    draggeble: true,
                    dots: true
                }
            }
        ]
    });

    $('.estimate__thumps').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.estimate__slider',
        draggeble: false,
        arrows: false,
        focusOnSelect: true,
        infinite: false,
        // vertical: true
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    draggeble: true,
                    arrows: true,
                    prevArrow: '<div class="slick-arrow slick-prev" />',
                    nextArrow: '<div class="slick-arrow slick-next" />',
                    dots: false
                }
            }
        ]
    });

    checkOnResize();

});

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) { return; }
    TempApp.resized = windowWidth;

	checkOnResize();
});

function checkOnResize() {
    // fontResize();
    reiinitServiseSlider()
}

function reiinitServiseSlider() {
    let slider = $('.service .service__content ,.station__content .wow__list, .place__content .service__content ');

    if (isXsWidth()) {
        if (!slider.hasClass('slick-initialized')) {
            slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: '<div class="slick-arrow slick-prev" />',
                nextArrow: '<div class="slick-arrow slick-next" />',
                dots: true,
                infinite: false,
                adaptiveHeight: true
            });
        }
    } else {
        if (slider.hasClass('slick-initialized')) {
            slider.slick('destroy');
        }
    }

}

// Простая проверка форм на заполненность и отправка аяксом
function formSubmit() {
    $("[type=submit]").on('click', function (e){
        e.preventDefault();
        var form = $(this).closest('.form');
        var url = 'send.php';
        var form_data = form.serialize();
        var field = form.find('[required]');
        // console.log(form_data);

        empty = 0;

        field.each(function() {
            if ($(this).val() == "") {
                $(this).addClass('invalid');
                $(this).removeClass('valid');
                // return false;
                empty++;
            } else {
                $(this).removeClass('invalid');
                $(this).addClass('valid');
            }
        });

        // console.log(empty);

        if (empty > 0) {
            return false;
        } else {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "html",
                data: form_data,
                success: function (response) {
                    document.location.href = "success.html";
                },
                error: function (response) {
                    // console.log('error');
                }
            });
        }

    });

    $('[required]').on('blur', function() {
        if ($(this).val() != '') {
            $(this).removeClass('invalid');
        }
    });

}
