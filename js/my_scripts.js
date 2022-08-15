AOS.init({
    once: true,
    easing: 'linear',
    /*disable: function () {
        var maxWidth = 1279;
        return window.innerWidth < maxWidth;
    }*/
});

if (document.querySelector('.sliderTop')) {
    var swiper = new Swiper(".sliderTop", {
        effect: "fade",
        loop: true,
        lazy: true,
        observer: true,
        observeParents: true,
        breakpoints: {
            320: {
                autoHeight: true,
            },
            640: {
                autoHeight: false,
            },
        },
        on: {
            lazyImageReady: function() {
                var swiper = this;
                setTimeout(function() {
                    swiper.updateAutoHeight();
                }, 1);
            }
        },

    });
}
/** **/
if (document.querySelector('.sliderBlock')) {
    var swiper = new Swiper(".sliderBlock", {
        lazy: true,
        watchSlidesProgress: true,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: ".js-next_1",
            prevEl: ".js-prev_1",
        },
        loop: true,
        slidesPerGroup: 1,
        observer: true,
        observeParents: true,
        breakpoints: {
            320: {
                centeredSlides: true,
                spaceBetween: 8,
                loop: true,
                slidesPerView: "auto",
            },
            401: {
                centeredSlides: true,
                spaceBetween: 32,
                loop: true,
                slidesPerView: "auto",
            },
            980: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },

    });
}
/** **/
if (document.querySelector('.sliderVideo')) {
    var swiper = new Swiper(".sliderVideo", {
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        breakpoints: {
            320: {
                centeredSlides: true,
                spaceBetween: 18,
                slidesPerGroup: 1,
                loop: true,
                slidesPerView: "auto",
            },
            980: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 15,
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 40,
            },
            1280: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 58,
            },
        },

    });
}
/** **/
if (document.querySelector('.video')) {
    function findVideos() {
        let videos = document.querySelectorAll('.video');
        for (let i = 0; i < videos.length; i++) {
            setupVideo(videos[i]);
        }
    }

    function setupVideo(video) {
        let link = video.querySelector('.video-link');
        let media = video.querySelector('.video-thumb');
        let button = video.querySelector('.video-button');
        let id = parseMediaURL(link);
        video.addEventListener('click', () => {
            let iframe = createIframe(id);
            link.remove();
            button.remove();
            video.appendChild(iframe);
        });
        link.removeAttribute('href');
        video.classList.add('video-enabled');
    }

    function parseMediaURL(media) {
        let url = media.href;
        let arr = url.split('/');
        let rslt = arr[arr.length - 1];
        return rslt;
    }

    function createIframe(id) {
        let iframe = document.createElement('iframe');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('src', generateURL(id));
        iframe.classList.add('video-thumb');
        return iframe;
    }

    function generateURL(id) {
        let query = '?rel=0&showinfo=0&autoplay=1';
        return 'https://www.youtube.com/embed/' + id + query;
    }
    findVideos();
}
/** **/
if (document.querySelector('.sliderNews')) {
    var swiper = new Swiper(".sliderNews", {
        lazy: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".js-next_4",
            prevEl: ".js-prev_4",
        },
        observer: true,
        observeParents: true,
        breakpoints: {
            320: {
                centeredSlides: true,
                spaceBetween: 15,
                slidesPerGroup: 1,
                loop: true,
                slidesPerView: "auto",
            },
            401: {
                centeredSlides: true,
                spaceBetween: 40,
                slidesPerGroup: 1,
                loop: true,
                slidesPerView: "auto",
            },
            980: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 15,
            },
            1200: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 41,
            },
        },

    });
}
/** **/
/*if(document.querySelector('.sliderArticles')){
    var swiper = new Swiper(".sliderArticles", {
        lazy: true,
        watchSlidesProgress: true,
        spaceBetween: 25,
        slidesPerGroup: 1,
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".js-next_2",
            prevEl: ".js-prev_2",
        },
    });
}*/
/** **/
if (document.querySelector('.sliderSimilar')) {
    var swiper = new Swiper(".sliderSimilar", {
        lazy: true,
        watchSlidesProgress: true,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: ".js-next_3",
            prevEl: ".js-prev_3",
        },
        observer: true,
        observeParents: true,
        breakpoints: {
            320: {
                centeredSlides: true,
                spaceBetween: 15,
                slidesPerGroup: 1,
                loop: true,
                slidesPerView: "auto",
            },
            401: {
                centeredSlides: true,
                spaceBetween: 32,
                slidesPerGroup: 1,
                loop: true,
                slidesPerView: "auto",
            },
            980: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 15,
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 27,
            },
            1280: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 27,
            },
        },

    });
}
/** **/
if (document.querySelector('.boxCard')) {
    var swiperSamall = new Swiper(".smallSlider", {
        lazy: true,
        watchSlidesProgress: true,
        slidesPerView: 3,
        slidesPerGroup: 1,
        loop: true,
        threshold: 10,
        preventInteractionOnTransition: true,
        navigation: {
            nextEl: ".js-smallSlider_next",
            prevEl: ".js-smallSlider_prev",
        },
        on: {
            lazyImageReady: function() {
                var swiper = this;
                setTimeout(function() {
                    swiper.updateAutoHeight();
                }, 1);
            }
        },
        breakpoints: {
            320: {
                direction: 'horizontal',
                spaceBetween: 8,
                slidesPerView: "auto",
                lazy: {
                    loadPrevNext: true,
                    loadOnTransitionStart: true,
                    loadPrevNextAmount: 3,
                },
            },
            769: {
                direction: 'vertical',
                spaceBetween: 22,
                slidesPerView: 3,
                centeredSlides: false,
            },
        }
    });
    var swiperBig = new Swiper(".bigSlider", {
        lazy: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: ".js-bigSlider_next",
            prevEl: ".js-bigSlider_prev",
        },
        breakpoints: {
            320: {
                allowTouchMove: true,
            },
            768: {
                allowTouchMove: true,
            },
            1281: {
                allowTouchMove: false,
            }
        },
        thumbs: {
            swiper: swiperSamall,
        },
        on: {
            lazyImageReady: function() {
                var swiper = this;
                setTimeout(function() {
                    swiper.updateAutoHeight();
                }, 1);
            }
        }
    });
    /*    swiperBig.on('slideChangeTransitionStart', function() {
            swiperSamall.slideTo(swiperBig.activeIndex);
        });
        swiperSamall.on('transitionStart', function(){
            swiperBig.slideTo(swiperSamall.activeIndex);
        });*/
    /*    swiperSamall.on('slideChangeTransitionStart', function() {
            swiperBig.slideTo(swiperSamall.activeIndex);
        });
        swiperBig.on('transitionStart', function(){
            swiperSamall.slideTo(swiperBig.activeIndex);
        });*/
}
$(document).ready(function() {
    if ($('.nav-menu').length) {
        $('.nav-menu > ul > li.dropdown').append('<button class="buttonDrop"></button>');
        $('.buttonDrop, .nav-menu li.dropdown > span').on('click', function() {
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('.dropMenu').slideUp(400);
            } else {
                element.addClass('open');
                element.children('.dropMenu').slideDown(400);
                element.siblings('li').children('.dropMenu').slideUp(400);
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('.dropMenu').slideUp(400);
            }
        });
    }
    /** **/
    if ($('.buttonMenu').length) {
        $(".buttonMenu").click(function() {
            var el = $(this).closest('html');
            if (el.hasClass("open-menu")) {
                el.removeClass('open-menu');
            } else {
                el.addClass('open-menu');
            }
        });
        $(document).mouseup(function(e) {
            var div = $(".mobile-menu, .buttonMenu");
            if (!div.is(e.target) &&
                div.has(e.target).length === 0) {
                div.closest('html').removeClass('open-menu');
            }
        });
        $(".mobile-menu_close").click(function() {
            $(this).closest('html').removeClass('open-menu');
        });
    }
    /** **/
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000,
            offset: 70,
            beginAt: 100,
            /*formatter: function (n) {
                return n.replace(/,/g, ',');
            }*/
        });
    }
    /** **/
    if ($('.boxBar').length) {
        $(".boxBar_button").click(function() {
            var el = $(this).parent();
            if (el.hasClass("open")) {
                el.removeClass('open');
                el.find('.boxBar_text').css('margin-bottom', 10);
            } else {
                el.addClass('open');
                var barHeight = $('.boxBar_item').outerHeight();
                console.log(barHeight);
                el.find('.boxBar_text').css('margin-bottom', barHeight + 22);
            }
        });
    }
    /** **/
    if ($('.button-filter_tablet').length) {
        $(".button-filter_tablet").click(function() {
            var el = $(this).closest('html');
            if (el.hasClass("open-filter")) {
                el.removeClass('open-filter');
            } else {
                el.addClass('open-filter');
            }
        });
    }
    /** **/
    if ($('.all-cardTabs').length) {
        $('.cardTabs').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('.all-cardTabs').find('.cardTabs_content').removeClass('active').eq($(this).index()).addClass('active');
        });
    }
    /** **/
    if ($('.bigSlider').length) {
        $('#slider-gallery').lightGallery({
            selector: '.swiper-slide .bigSlider_thumb',
            thumbnail: false,
            download: false,
            share: false,
            hash: false,
            autoplay: true,
            speed: 500,
        });
    }
    /** **/
    if ($('.phoneInput-1').length) {
        var input = document.querySelector(".phoneInput-1");
        window.intlTelInput(input, {
            preferredCountries: ["cy", "ua", "ru", "by", "us"]
        });
    }
    if ($('.phoneInput-2').length) {
        var input2 = document.querySelector(".phoneInput-2");
        window.intlTelInput(input2, {
            preferredCountries: ["cy", "ua", "ru", "by", "us"]
        });
    }
    if ($('.phoneInput-3').length) {
        var input3 = document.querySelector(".phoneInput-3");
        window.intlTelInput(input3, {
            preferredCountries: ["cy", "ua", "ru", "by", "us"]
        });
    }
    if ($('.phoneInput-4').length) {
        var input4 = document.querySelector(".phoneInput-4");
        window.intlTelInput(input4, {
            preferredCountries: ["cy", "ua", "ru", "by", "us"]
        });
    }
    /** **/
    if ($('.newOffers').length) {
        $(".js-showMore").click(function() {
            var el = $(this).closest('.newOffers');
            if (el.hasClass("open")) {
                el.removeClass('open');
            } else {
                el.addClass('open');
            }
        });

        /*        $(".js-showMore").click( function() {
                    var el = $(this).closest('.newOffers');
                    var button = el.find('.js-showMore');
                    button.hide();
                    button = el.find('.go_to_catalog');
                    button.show();
                    el.addClass('open');
                });*/
    }
    /** **/

    var Sticky = new hcSticky('.sidebar_left', {
        innerSticker: '.boxFilter_sticky',
        top: 77,
        bottomEnd: 80,
        followScroll: false,
        disable: true,
        responsive: {
            979: {
                disable: false,
            }
        }
    });




});