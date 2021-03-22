"use strict";

// preloader timeout
var interval = 0;
var timeOut = setInterval(function(){preLoader();}, 2000);
function preLoader(){
    if (interval == 1) {
        clearInterval(timeOut);
        jQuery('.preloader').slideUp(300);
    }
}

jQuery(document).ready(function(){

    interval = 1;

    // add background image from html
    jQuery.each(jQuery('[data-bg]'), function(){
        if (jQuery(this).attr('data-bg').length > 0){
            jQuery(this).css('background-image', 'url('+ jQuery(this).attr('data-bg') +')');
        }
    });

    // starting animations on scroll
    new WOW().init();

    // popup youtube video
    jQuery.extend(true, $.magnificPopup.defaults, {
        iframe: {
            patterns: {
               youtube: {
                  index: 'youtube.com/',
                  id: 'v=',
                  src: 'http://www.youtube.com/embed/%id%?autoplay=1&vq=hd720'
              }
            }
        }
    });
    jQuery('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });

    setTimeout(function(){
        jQuery('#section0 .col-xl-6').addClass('animated fadeInLeftBig');
    }, 2000);

    // countdown
    (function(){
        if(jQuery('#counter').width() > 0 ) {
            var timer = jQuery('#counter').attr('data-countdown');

            jQuery('.countdown').downCount({
                date: timer,
                offset: +10
            }, function () {
                // alert('WOOT WOOT, done!');
            });
        }
    })(jQuery());

    // fullpage scroll functions
    if( jQuery('#fullPage').width() > 0 ){
        jQuery("#fullPage").fullpage({
            scrollBar: true,
            menu: '#menu',
            sectionSelector: '.crypto-section',
            slideSelector: false,
            verticalCentered: true,
            responsiveSlides: false,
            lockAnchors: false,
            scrollingSpeed: 800,
            responsiveWidth: 1025,
            anchors: ['platform', 'platform-subsection', 'platform-subsection', 'roadmap', 'team', 'faq', 'contact'],

            onLeave: function(index, nextIndex, direction){
                var leavingSection = jQuery(this);
                if(index == 3 && direction =='down'){
                   setTimeout(function(){
                    jQuery('.token-sale__graph').addClass('active');
                   }, 600);
                }
                jQuery('.navbar-brand').fadeOut(100);
            },
            afterLoad: function(anchorLink, index){
                jQuery('.navbar-brand').fadeIn(400);
                var loadedSection = jQuery(this);

                console.dir(anchorLink);
                console.dir(index);

                if(index == 4){
                    setTimeout(function(){
                        jQuery('.token-sale__graph').addClass('active');
                    }, 600);
                }
                else if(index == 12){
                    jQuery('.navbar-brand').addClass('fixed-bottom');
                } else {
                    jQuery('.navbar-brand').removeClass('fixed-bottom');
                }
                var activeItem;
                if(index == 1 || index == 2 || index == 3){
                    activeItem = jQuery('#menu').find('li').first()
                }else if(index == 4 || index == 5 ){
                    activeItem = jQuery('#menu').find('li[data-menuanchor="token-view"]')
                }else{
                    return false;
                }
                activeItem
                    .addClass('active')
                    .siblings().removeClass('active');
            },
        });
        jQuery(document).on('click', '.navbar-brand', function(){
            $.fn.fullpage.moveTo('1');
        });
        jQuery('.scrollDown').on('click', function () {
            $.fn.fullpage.moveSectionDown();
        });
    }

    if(jQuery(window).width() < 789 ){
        jQuery('.navbar-toggler').on('click', function() {
            jQuery('#fullPage').toggleClass('show-menu');
        });

        jQuery(window).scroll(function() {
            var scroll = jQuery(window).scrollTop();

            if (scroll >= 50) {
                jQuery(".navbar").addClass("scrolled");
            } else {
                jQuery(".navbar").removeClass("scrolled");
            }
        });
    }

    // roadmap chart
    (function(){
        var chart = AmCharts.makeChart("roadmapGraph", {
            "type": "gantt",
            "theme": "light",
            "marginRight": 60,
            "fontSize": 14,
            "fontFamily": "inherit",
            "period": "DD",
            "dataDateFormat": "YYYY-MM-DD",
            "columnWidth": 0.5,
            "valueAxis": {
                "type": "date"
            },
            "brightnessStep": 7,
            "graph": {
                "fillAlphas": 1,
                "lineAlpha": 1,
                "lineColor": "#fff",
                "fillAlphas": 0.85,
                "balloonText": "<b>[[task]]</b>:<br />[[open]] -- [[value]]"
            },
            "rotate": true,
            "responsive": {
                "enabled": true,
            },
            "categoryField": "category",
            "segmentsField": "segments",
            "colorField": "color",
            "startDateField": "start",
            "endDateField": "end",
            "dataProvider": [
                {
                    "category": "Market Validation & Research",
                    "segments": [
                        {
                            "start": "2021-01-01",
                            "end": "2021-01-14",
                            "color": "#b9783f",
                            "task": "Gathering requirements"
                        },
                        {
                            "start": "2021-01-16",
                            "end": "2021-01-27",
                            "task": "Producing specifications"
                        },
                        {
                            "start": "2021-02-05",
                            "end": "2021-03-18",
                            "task": "Sample User Validation"
                        },
                        {
                            "start": "2021-03-18",
                            "end": "2021-03-30",
                            "task": "Testing and QA"
                        }
                    ]
                },
                {
                    "category": "Graphics & UI/UX Development",
                    "segments": [
                        {
                            "start": "2021-04-06",
                            "end": "2021-04-10",
                            "color": "#cc4748",
                            "task": "Design Guide Manual Creation"
                        },
                        {
                            "start": "2021-04-12",
                            "end": "2021-04-16",
                            "task": "Low Fidelity Design Implementation"
                        },
                        {
                            "start": "2021-04-17",
                            "end": "2021-04-22",
                            "task": "High Fidelity Design Implementation"
                        },
                        {
                            "start": "2021-04-23",
                            "end": "2021-04-30",
                            "task": "Testing and Prototyping"
                        }
                    ]
                },
                {
                    "category": "Product Development",
                    "segments": [
                        {
                            "start": "2021-05-01",
                            "end": "2021-05-19",
                            "color": "#2f4074",
                            "task": "Coding of Web Frontend"
                        },
                        {
                            "start": "2021-05-20",
                            "end": "2021-06-15",
                            "task": "Coding of API Endpoint"
                        },
                        {
                            "start": "2021-06-15",
                            "end": "2021-06-30",
                            "task": "Testing and Deployment"
                        }
                    ]
                },
                {
                    "category": "Sale",
                    "segments": [
                        {
                            "start": "2021-07-01",
                            "end": "2021-07-07",
                            "color": "#f85068",
                            "task": "Sale Strategy implementation"
                        },
                        {
                            "start": "2021-07-08",
                            "end": "2021-07-16",
                            "task": "Preparing sales guide"
                        },
                        {
                            "start": "2021-07-17",
                            "end": "2021-07-20",
                            "task": "Sale expansion"
                        },
                    ]
                }
            ],
            "valueScrollbar": {
                "autoGridCount": true
            },
            "chartCursor": {
                "cursorColor": "#55bb76",
                "valueBalloonsEnabled": false,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.5,
                "valueLineBalloonEnabled": true,
                "valueLineEnabled": true,
                "zoomable": false,
                "valueZoomable": true
            },
        });
    })(jQuery());

    // contact form validation
    jQuery("#contacUs").validate({
        submitHandler: function () {
            $.ajax({
                type: 'POST',
                url: 'php/SendMail.php',
                data: jQuery("#contacUs").serialize(),
                complete: function(results) {
                    setTimeout(function(){
                        jQuery(".response-message.success").addClass("active");
                        jQuery("#contacUs")[0].reset();
                    }, 300);
                }
            });
        }
    });

    // autogrowing textarea based on how much you write in it
    var textarea = document.querySelector('textarea');
    textarea.addEventListener('keydown', autosize);
    function autosize(){
        var el = this;
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }

    // NORMAL SCROLLING PAGE FUNCTIONS
    if ( jQuery('#normalScroll').width() > 0 ) {

        // scroll next
        jQuery(".scrollDown").on('click', function(){
            jQuery('html, body').animate({
                scrollTop: jQuery("#platform2").offset().top
            }, 1200);
        });

        // smooth scroll to div in href
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        jQuery(window).scroll(function(){
            jQuery('.crypto-section').each(function(){
              if(isScrolledIntoView(jQuery(this))){
                jQuery(this).addClass("in-view");
              }
            });
          });

        function isScrolledIntoView(elem){
            var $elem = jQuery(elem);
            var $window = jQuery(window);

            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();

            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }
    }

});
// END DOCUMENT READY FUNCTIONS

//  LOAD BITCOIN WIDGET //
(function(b,i,t,C,O,I,N) {
    window.addEventListener('load',function() {
    if(b.getElementById(C))return;
    I=b.createElement(i),N=b.getElementsByTagName(i)[0];
    I.src=t;I.id=C;N.parentNode.insertBefore(I, N);
},false)
})(document,'script','https://widgets.bitcoin.com/widget.js','btcwdgt');
