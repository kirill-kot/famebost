jQuery(document).ready(function ($) {
    var frontTopSliderDesktop = new Swiper('#frontTopSlider', {
        pagination: {
            el: '.frontTopPagination',
            clickable: true
        },
        navigation: {
            nextEl: '.frontTopNext',
            prevEl: '.frontTopPrev',
        },
        slidesPerView: 1,
        observer: true,
        simulateTouch: false,
    });


    var frontTopSliderText = new Swiper('#frontTopSliderTextM', {
        pagination: {
            el: '.frontTopMPagination',
            clickable: true
        },
        navigation: {
            nextEl: '.frontTopMNext',
            prevEl: '.frontTopMPrev',
        },
        slidesPerView: 1,
        observer: true,
        simulateTouch: false,
    });

    var frontTopSliderImg = new Swiper('#frontTopSliderImgM', {
        slidesPerView: 1,
        centeredSlides: true,
        observer: true,
        simulateTouch: false,
    });

    var techNonRotarySlider = new Swiper('#techNonRotarySlider', {
        pagination: {
            el: '.techNonRotaryPagination',
            clickable: true
        },
        navigation: {
            nextEl: '.techNonRotaryNext',
            prevEl: '.techNonRotaryPrev',
        },
        slidesPerView: 1,
        observer: true,
        simulateTouch: false,
    });



    window.onscroll = changePos;

    function changePos() {
        var header = document.getElementById("header");
        if (window.pageYOffset > 70) {
            header.style.position = "fixed";
            header.style.top = "0";
            header.classList.add('fixed');
        } else {
            header.style.position = "";
            header.style.top = "";
            header.classList.remove('fixed');
        }
    }

    $('.card').on('mouseenter', function(){
        $(this).find('.content').css({'transform': 'rotateY(180deg)'});
    }).on('mouseleave', function(){
        $(this).find('.content').css({'transform': 'rotateY(0deg)'});
    }).on('touchstart', function(){
        $(this).find('.content').css({'transform': 'rotateY(180deg)'});
    }).on('touchend', function(){
        $(this).find('.content').css({'transform': 'rotateY(0deg)'});
    });

    $('.nav-link[href*="#"]').not('.why-tab').not('.step_m').on('click', function (el) {
        el.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 500, 'linear');
    });

    $('.modal').on('shown.bs.modal', function(){
        // var $tempShow = displayHeight($('.image-big'),$('.image-big .img-fluid'),'coff');
        $('.preview .overlay').css({'height': displayHeight($('.image-big'),$('.image-big .img-fluid'),'coff') + '%'}).css({'width': $('.preview img').width()});
        function displayHeight(wrap,content,type) {
            let $tempCof = $(content).outerHeight() / 100;
            let $tempWrap = $(wrap).outerHeight() / $tempCof;
            let $tempScroll = $('.image-big').scrollTop() / $tempCof;
            if (type == 'coff'){
                return $tempWrap;
            } else if (type == 'height'){
                return $tempCof;
            } else if (type == 'scroll'){
                return $tempScroll;
            }
        }
        $(window).on('resize', function(){
            $('.preview .overlay').css({'height': displayHeight($('.image-big'),$('.image-big .img-fluid'),'coff') + '%'}).css({'width': $('.preview img').width()});
        });
        $('.image-big').on('scroll', function(){
            $('.preview .overlay').animate({'top': displayHeight($('.image-big'),$('.image-big .img-fluid'),'scroll') + '%'}, 0, 'linear');
        });
    });

    $('.collapse').on('show.bs.collapse', function(){
        $(this).parents('.card').addClass('shown')
    }).on('hide.bs.collapse', function(){
        $(this).parents('.card').removeClass('shown')
    });



    var form = $('#form');
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
        // Serialize the form data.
        var formData = $(form).serialize(),
            result = $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: formData,
                beforeSend: function () {
                    console.log(formData);
                    $('#send').text('Sending');
                    $('#send').attr('disabled', true);
                },
                success: function (response, textStatus, jqXHR) {
                    $('#send').attr('disabled', false);
                    console.log(response);
                    if (response === "success") {
                        $('#send').text('Sent').attr('disabled', false);
                        $('.formMessages').html('');
                        $('.formMessages').html('<p class="text-center">Thank you for your message</p>');
                    } else {
                        result = response;
                        setTimeout(function(){
                            $('#send').text('Try again');
                            $('.formMessages').html('<p class="text-center">Error: Sending failed. Please try again later.</p>');
                        }, 1000);
                    }
                }
            });

    });

    var form2 = $('#form2');
    $(form2).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
        // Serialize the form data.
        var form2Data = $(form2).serialize(),
            result = $.ajax({
                type: 'POST',
                url: form2.attr('action'),
                data: form2Data,
                beforeSend: function () {
                    $('#send2').text('Sending');
                    $('#send2').attr('disabled', true);
                },
                success: function (response, textStatus, jqXHR) {
                    console.log(response);
                    if (response === "success") {
                        $('#send2').text('Sent').attr('disabled', false);
                        $('.form2Messages').html('');
                        $('.form2Messages').html('<p class="text-center">Thank you for your message</p>');
                    } else {
                        result = response;
                        setTimeout(function(){
                            $('#send2').text('Try again');
                            $('.form2Messages').html('<p class="text-center">Error: Sending failed. Please try again later.</p>');
                        }, 1000);
                    }
                }
            });

    });

});