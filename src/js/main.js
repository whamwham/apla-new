/*!
 *
 * Created by Искандер on 15.01.2017.
 *
 * Routines specific to this site
 *
 *
 */
//window.$ = window.jQuery = require("jquery");


//global.jQuery = require('jquery');
var videojs = require('video.js');
var vide = require('vide');

var Swiper = require('swiper');

//window.slick = require('slick-carousel');

var waypoints = require('../../node_modules/waypoints/lib/jquery.waypoints.min');

var lazy = require('jquery-lazy');


const clang = "en";
window.anim = {};


(function ($) {

    /*
        var preBootstrap = document.getElementById("pre-bootstrap");
        setTimeout(function removeLoadingScreen() {
            preBootstrap.className = "loaded";
            preBootstrap.remove();
        }, 2000);
    */


    $(".lazy").Lazy();


// ************************** Header menu handlers ***************************/
    $(window).scroll(() => {
        const pos = $(window).pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        (pos > 100) ? $("app-header").addClass("fixed") : $("app-header").removeClass("fixed");
    });

    $("app-header .menu").on('click', () => {
        $("app-header").toggleClass("active")
    });


// ************************** Analitics click handler ***************************/
    $(".yga").on("click", function (e) {
        var label = $(this).data("ga-l"),
            action = $(this).data("ga-a"),
            cat = $(this).data("ga-c");

        //yaCounter47467984
        if ($(this).data("ga")) {
            if (typeof(ga) !== 'undefined') ga('send', 'event', cat, action, label);
        }

        if ($(this).data("fbq")) {
            if (typeof(fbq) !== 'undefined') fbq('track', label);
        }

//        console.log("Track:" + cat +"/"+ action +"/"+ label);
    });

    var historySwiper = new Swiper('.swiper-container.history-story', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        grabCursor: true,
        keyboard: false,
        mousewheel: true,
        scrollbar: false,
        navigation: false,
        pagination: false
    });

    var clientsSaySwiper = new Swiper('.swiper-container.clients-say', {
        direction: 'horizontal',
        slidesPerView: 1,
        loop: true,
        keyboard: false,
        mousewheel: false,
        scrollbar: false,
        pagination: {el: '.swiper-pagination'},
        navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}
    });

    var teamSwiper = new Swiper('.swiper-container.team-style222', {
        direction: 'horizontal',
        slidesPerView: 4,
        slidesPerGroup: 4,
        loop: true,
        keyboard: false,
        mousewheel: false,
        scrollbar: false,
        //pagination: { el: '.swiper-pagination' },
        navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
        //pagination: {
        //    el: '.swiper-pagination',
        //   type: 'bullets',
        //   clickable: true
        //},
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
        },
        watchOverflow: true,
        observer: true,
        breakpoints: {
            1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            900: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            700: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            450: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                centeredSlides: true
            }
        }

    });



    $('.swiper-container.hor-videos-style .swiper-wrapper').slick({
        infinite: false,
        autoplay: false,
        dots: false,
        speed: 700,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '.swiper-button-prev',
        nextArrow: '.swiper-button-next',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                    //,
                    //centerMode: true
                }
            }
        ]
    });




    $('.swiper-container.team-style').each(function (index, el) {
        const uid = $(el).attr('id');
        $('.swiper-container.team-style#' + uid + ' .swiper-wrapper').slick({
            infinite: true,
            autoplay: true,
            dots: false,
            speed: 700,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: '#' + uid + ' .swiper-button-prev',
            nextArrow: '#' + uid + ' .swiper-button-next',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }, {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                        //,
                        //centerMode: true
                    }
                }
            ]
        });

        var blockMouseOver = false;

        $('.swiper-container.team-style#' + uid + ' .swiper-wrapper').on("beforeChange", function (e) {
            blockMouseOver = true;
        });

        $('.swiper-container.team-style#' + uid + ' .swiper-wrapper').on("afterChange", function (e) {
            blockMouseOver = false;
        });

        $('.swiper-container.team-style#' + uid + ' .swiper-wrapper .swiper-slide').on("mouseleave", function (e) {
            //console.log($(this).find('.descr-ov').html());
            $('.team-rotator-popup').removeClass('active');
        });

        $('.swiper-container.team-style#' + uid + ' .swiper-wrapper .swiper-slide').on("mousemove", function (e) {

            if(blockMouseOver) return;

            const curr_idx = $('.swiper-container.team-style#' + uid).data('idx');
            const idx = $(this).data('idx');
            const popup = $('.team-rotator-popup');

            $(popup).addClass('active');

            //if (idx !== curr_idx) {
                $('.swiper-container.team-style#' + uid).data('idx', idx);
                $(popup).html($(this).find('.descr-ov').html()).addClass('active');
                //let top =
                $(popup).css('top', $(this).offset().top + $(this).height());
                $(popup).css('left', $(this).offset().left);
                $(popup).css('width', $(this).width());
                //console.log($(this).offset().top, $(window).scrollTop());
            //}

            //console.log($(this).find('.descr-ov').html());

        })
    });


    $('.swiper-container.team-style22 .swiper-wrapper').slick(
        {
            infinite: true,
            autoplay: true,
            dots: false,
            speed: 700,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: '.swiper-button-prev',
            nextArrow: '.swiper-button-next',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }, {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });


    $(".mat-tab-label").on('click', function (e) {
        const sel = $(this).data('idx');
        if ($("#tab_body_" + sel).hasClass("mat-tab-body-active")) return;

        $(".mat-tab-body.mat-tab-body-active").addClass("mat-tab-body-removed").removeClass("mat-tab-body-active").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            $(".mat-tab-body.mat-tab-body-removed").removeClass("mat-tab-body-removed");
        });
        $("#tab_body_" + sel).addClass("mat-tab-body-active");

        $(".mat-tab-label-active").removeClass("mat-tab-label-active");
        $(this).addClass("mat-tab-label-active");


    });

// ******************************* Animation 1 handler *************************/

    if ($("app-home .private").length) {

        window.anim = {
            currPos: 0,
            currDir: 0, // 0 - ahead, 1 - back
            currStep: 0,
            isBefore: false,
            isAfter: false,
            alreadyRun: false,
            container: 'screen4',
            containerRef: null,
            object: 'container4',
            objRef: null,
            started: false
        };


        $(window).scroll(() => {
            const pos = $(window).pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (!window.anim.objRef) {
                window.anim.objRef = document.getElementById(window.anim.object);
            }
            if (!window.anim.containerRef) {
                window.anim.containerRef = document.getElementById(window.anim.container);
            }

            window.anim.currDir = (window.anim.currPos > pos) ? 0 : 1;
            window.anim.isBefore = ((window.anim.containerRef.offsetTop - $(window).innerHeight()) > pos);
            window.anim.isAfter = ((window.anim.containerRef.offsetTop + window.anim.containerRef.clientHeight) < pos);
            const inSide = (!window.anim.isAfter && !window.anim.isBefore);

            //console.log(window.anim.containerRef.offsetTop, $(window).innerHeight(), window.anim.containerRef.clientHeight);

            const objCenter = window.anim.objRef.offsetTop + window.anim.objRef.clientHeight / 2 - $(window).innerHeight() / 2;

            if (window.anim.started) {
                if (window.anim.isBefore || window.anim.isAfter) {
                    window.anim.started = false;
                    window.anim.containerRef.classList.remove('animation-started');
                    window.anim.containerRef.classList.remove('animation-stopped');
                    console.log('STOPPED');
                } else {
                    const stepDist = Math.floor(((pos - window.anim.containerRef.offsetTop) * 10 / $(window).innerHeight()));
                    console.log(stepDist);
                    if (stepDist >= 0) {
                        if (stepDist < 7) {
                            window.anim.objRef.classList.remove('step-' + window.anim.currStep);
                            window.anim.objRef.classList.add('step-' + stepDist);
                            window.anim.currStep = stepDist;
                        }
                        if (stepDist > 7) {
                            window.anim.containerRef.classList.add('animation-stopped');
                            window.scrollBy(0, -$(window).innerHeight() * .7);
                            window.anim.containerRef.classList.remove('animation-started');
                            window.anim.started = false;
                        }
                    }
                }
            } else {
                if (objCenter > pos - 50 && objCenter < pos + 50 && window.anim.currDir) {
                    window.anim.started = true;
                    window.anim.alreadyRun = true;
                    window.anim.containerRef.classList.add('animation-started');
                    window.anim.containerRef.classList.remove('animation-stopped');
                    window.anim.objRef.classList.remove('step-6');
                    console.log('STARTED');
                }
                else {
                    if (window.anim.isAfter && !window.anim.currDir && !window.anim.alreadyRun) {
                        window.anim.objRef.classList.add('step-6');
                    }
                    if (window.anim.isBefore && window.anim.currDir && !window.anim.alreadyRun) {
                        window.anim.objRef.classList.remove('step-6');
                    }
                }
            }

            window.anim.currPos = pos;
            //console.log(window.anim.isBefore, window.anim.isAfter, inSide);
        });
    }


// ******************************* Animation 2 handler *************************/

    if ($("app-about, app-home-new").length) {
        window.anim = {
            currPos: 0,
            currDir: 0, // 0 - ahead, 1 - back
            currStep: 0,
            isBefore: false,
            isAfter: false,
            alreadyRun: false,
            container: 'mission_container',
            containerRef: null,
            object: 'mission_object',
            objRef: null,
            started: false
        }

        $(window).scroll(() => {
            const pos = $(window).pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (!window.anim.objRef) {
                window.anim.objRef = document.getElementById(window.anim.object);
            }
            if (!window.anim.containerRef) {
                window.anim.containerRef = document.getElementById(window.anim.container);
            }

            window.anim.currDir = (window.anim.currPos > pos) ? 0 : 1;
            window.anim.isBefore = ((window.anim.containerRef.offsetTop - $(window).innerHeight()) > pos + 50);
            window.anim.isAfter = ((window.anim.containerRef.offsetTop + window.anim.containerRef.clientHeight) < pos - 50);
            const inSide = (!window.anim.isAfter && !window.anim.isBefore);

            const objCenter = window.anim.objRef.offsetTop + window.anim.objRef.clientHeight / 2 - $(window).innerHeight() / 2;

            if (window.anim.started) {
                if (window.anim.isBefore || window.anim.isAfter) {
                    window.anim.started = false;
                    window.anim.containerRef.classList.remove('animation-started');
                    window.anim.containerRef.classList.remove('animation-stopped');
                    console.log('STOPPED');
                } else {
                    const stepDist = Math.floor(((pos - window.anim.containerRef.offsetTop + $(window).innerHeight()) * 10 / $(window).innerHeight()));
                    console.log(stepDist);
                    if (stepDist >= 0) {
                        if (stepDist < 21) {
                            window.anim.containerRef.classList.remove('step-' + window.anim.currStep);
                            window.anim.containerRef.classList.add('step-' + stepDist);
                            window.anim.currStep = stepDist;
                        }
                        if (stepDist > 21) {
                            window.anim.containerRef.classList.add('animation-stopped');
                            window.anim.containerRef.classList.add('step-20');
                            window.scrollBy(0, -$(window).innerHeight() * 1.1);
                            window.anim.containerRef.classList.remove('animation-started');
                            window.anim.started = false;
                        }
                    }
                }
            } else {
                if ((window.anim.containerRef.offsetTop - window.anim.containerRef.clientHeight) > pos - 50 && (window.anim.containerRef.offsetTop - window.anim.containerRef.clientHeight) < pos + 50 && window.anim.currDir) {
                    window.anim.started = true;
                    window.anim.alreadyRun = true;
                    window.anim.containerRef.classList.add('animation-started');
                    window.anim.containerRef.classList.remove('animation-stopped');
                    window.anim.objRef.classList.remove('step-6');
                    console.log('STARTED');
                }
                /*            else {
                                if (window.anim.isAfter && !window.anim.currDir && !window.anim.alreadyRun) {
                                    window.anim.objRef.classList.add('step-6');
                                }
                                if (window.anim.isBefore && window.anim.currDir && !window.anim.alreadyRun) {
                                    window.anim.objRef.classList.remove('step-6');
                                }
                            }*/
            }

//            console.log(pos, window.anim.containerRef.offsetTop, window.anim.containerRef.clientHeight);

            window.anim.currPos = pos;
//        console.log(window.anim.isBefore, window.anim.isAfter, inSide);

        });
    }


// ******************************* Animation 2 handler *************************/

    if ($("app-career").length) {

        var waypoints = $('.is-animated').waypoint({
            handler: function (direction) {
                $(this.element).toggleClass("animated " + $(this.element).data('animation'));
            },
            offset: '100%'
        })

    }

// ******************************* Inline Form handler *************************/

    $.checkFormValidity = function (sel) {
        let isValid = true;
        $(sel).find(".form-control").each(function (idx, el) {
            if ($(this)[0].willValidate) {
                if (!$(this)[0].validity.valid) isValid = false;
            }
        });
        return isValid;
    };


    $("body").on("input", "#getstarted .form-control", function (event) {
        if (event.target.validity.valid) $(this).parent().children(".form-control-feedback").children().removeClass("active");
        else {
            if (event.target.validity.valueMissing) $(this).parent().children(".form-control-feedback").children(".required").addClass("active");
            else if (event.target.validity.patternMismatch) $(this).parent().children(".form-control-feedback").children(".incorrect").addClass("active");
        }
        event.preventDefault();
        if ($.checkFormValidity("#getstarted")) $("#getstarted button[type=submit]").prop("disabled", false);
        else $("#getstarted button[type=submit]").prop("disabled", true);
    });


    $("body").on("input", "#subscribeForm input", function (event) {
        if (event.target.validity.valid) $(this).parent().children(".form-control-feedback").children().removeClass("active");
        else {
            if (event.target.validity.valueMissing) $(this).parent().children(".form-control-feedback").children(".required").addClass("active");
            else if (event.target.validity.patternMismatch) $(this).parent().children(".form-control-feedback").children(".incorrect").addClass("active");
        }
        event.preventDefault();
        if ($.checkFormValidity("#subscribeForm")) $("#subscribeForm button[type=submit]").prop("disabled", false);
        else $("#subscribeForm button[type=submit]").prop("disabled", true);
    });


    $("body").on('submit', "#getstarted", function (e) {
        var formId = e.currentTarget.id;
        if (e.isDefaultPrevented()) {
            // handle the invalid form...
        } else {
            var dataOut = {};
            $("#" + formId + " .form-control").each(function () {
                dataOut[$(this).prop('name')] = $(this).val();
            });

            //if (typeof(ga) !== 'undefined') ga('send', 'event', 'form', 'submit', 'email');
            //if (typeof(fbq) !== 'undefined') fbq('track', 'InitiateCheckout');

            $("#" + formId + " .form-body, #" + formId + " .form-group, #" + formId + " .button, #" + formId + " .head").fadeOut(0);
            $("#" + formId + " .form-process").addClass("show");

            $.ajax({
                url: "/post/",
                method: "POST",
                dataType: "json",
                data: dataOut,

                success: function (data, textStatus, jqXHR) {
                    $("#" + formId + " .form-process").removeClass("show");
                    if (data.success) $("#" + formId + " .form-success").addClass("show");
                    else $("#" + formId + " .form-error").addClass("show");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#" + formId + " .form-process").removeClass("show");
                    $("#" + formId + " .form-error").addClass("show");
                }
            });
        }
        return false;
    });


    $("body").on('submit', "#subscribeForm, #subscribeFormAlt", function (e) {
        var formId = e.currentTarget.id;
        if (e.isDefaultPrevented()) {
            // handle the invalid form...
        } else {
            var dataOut = {};
            $("#" + formId + " .form-control").each(function () {
                dataOut[$(this).prop('name')] = $(this).val();
            });

            //if (typeof(ga) !== 'undefined') ga('send', 'event', 'form', 'submit', 'email');
            //if (typeof(fbq) !== 'undefined') fbq('track', 'InitiateCheckout');

            $("#" + formId + " .form-body, #" + formId + " .form-group, #" + formId + " .button").fadeOut(0);
            $("#" + formId + " .form-process").addClass("show");

            $.ajax({
                url: "https://apla.io/subscribe",
                method: "POST",
                dataType: "text",
                data: dataOut,

                success: function (data, textStatus, jqXHR) {
                    $("#" + formId + " .form-process").removeClass("show");
                    if (data === 'OK') $("#" + formId + " .form-success").addClass("show");
                    else if (data === 'DUP') $("#" + formId + " .form-duplicate").addClass("show");
                    else if (data === 'ERROR') $("#" + formId + " .form-error").addClass("show");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#" + formId + " .form-process").removeClass("show");
                    $("#" + formId + " .form-error").addClass("show");
                }
            });
        }
        return false;
    });


    $("video").each(function () {
        this.volume = 0.4
    });


    $(".openpopupform").on("click", function (e) {
        //window.location = "#popupform";
        $(".popup-form-wrapper").fadeIn(300);
        $(".popup-form-wrapper .backdrop").on("click", function (e) {
            $(".popup-form-wrapper").fadeOut(100);
        });

    });

// *************************** Smooth scroll cheap shit *************************/

    $('a.page-scroll').bind('click', function (event) {
        event.preventDefault();

        var $ele = $(this);
        var target = $($ele.attr('href'));
        var offset = parseInt((target.data('offset')) ? target.data('offset') : 120);

        $('html, body').stop().animate({scrollTop: ($($ele.attr('href')).offset().top - offset)}, 500, 'swing');
    });


    $.scrollPageTo = function (sel) {
        var target = $(sel);
        var offset = parseInt((target.data('offset')) ? target.data('offset') : 120);
        $('html, body').stop().animate({scrollTop: (target.offset().top - offset)}, 500, 'swing');

        event.preventDefault();
    };


})(jQuery);