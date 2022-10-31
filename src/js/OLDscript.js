// var name = "Ivan";

// const { eq } = require("semver");
// const { on } = require("undertaker");

// let number = 7;
// const pi = 3.14; 

// number
// string - "" '' ``
// true/false - boaling
// null - 
// undefined - 
// {}
// let obj = {
//     name: "apple",
//     color: "green",
//     weight: 200
// }
// Symbol 
//allert(1)
// console.log(number);
// let answer = confirm("Are you 18?");
// console.log(answer);

// let isChecked = true,
//     isClosed = false;

//     console.log(isChecked && isClosed);

// if (2*1 == 8*1) {
//     console.log("!")
// } else {
//     console.log("?")
// }

// let answer = confirm("Are you 18?");
// if (answer) {
//     console.log("Welcome");
// } else {
//     console.log("Go home")
// }


// const num = 50;

// if ( num< 49) {
//     console.log ("Nine")
// } else if (num> 100) {
//     console.log ("Yes")
// } else {
//     console.log ("Wow")
// }

// for (let i = 1; i < 8; i++) {
//     console.log(i);
// }

// function logging(a, b) {
//     console.log(222)
// }

// logging(3, 6)




// $(document).ready(function () {
//     $('.carousel__inner').slick({
//         speed: 1200,
//         adaptiveHeight: true,
//         prevArrow: <button type="button" class="slick-prev">Previous</button>, //not right arrow <img src="img/left.svg">
//         nextArrow: <button type="button" class="slick-next">Next</button>, //not right arrow <img src="img/left.svg">
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//             },

//         ]
//     });
// });


const slider = tns({
    container: '.carousel__inner',
    items: 3,
    slideBy: 'page',
    autoplay: true,
    controls: false,
    nav: false,
    responsive: {
        640: {
            edgePadding: 20,
            gutter: 20,
            items: 2
        },
        700: {
            gutter: 30
        },
        900: {
            items: 3
        }
    }
    // controlsText: [
    //     <img src="img/left.svg"></img>,
    //     <img src="img/left.svg"></img>
    // ]
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});

$(document).ready(function () {
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab__active)', function () {
        $(this)
            .addClass('catalog__tab__active').siblings().removeClass('catalog__tab__active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    })

    // $('.catalog-item__link').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // });

    // $('.catalog-item__back').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // })

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    // $('button_mini').on('click', function() {
    //     $('.overlay, #order').fadeIn('slow');
    // });
    $('button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // $('.feed-form').validate();
    // $('#consultation-form').validate();
    // $('#order form').validate({
    //     rules: {
    //         name: {
    //             required: true,
    //             minlength: 2
    //         },
    //         phone: "required",
    //         email: {
    //             required: true,
    //             email: true
    //         }
    //     },
    //     messages: {
    //         name: {
    //             required: "Пожалуйста, введите своё имя",
    //             minlength: jQuery.validator.format("Введите {0} символа!")
    //         },
    //         phone: "Пожалуйста, введите свой номер телефона",
    //         email: {
    //             required: "Пожалуйста, введите свою почту",
    //             email: "Неправильно введен адрес почты"
    //         }
    //     }
    // });
    // $('#consultation form').validate();


    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });

    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+38 (999) 999-9999");

    $('.feed').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        };

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // Scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });


});
