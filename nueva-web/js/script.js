$(function() {
    "use strict";
    document.getElementById("loading").classList.add("loaded");


    // Background colors of the diferent sections
    let backgroundColors = {
        header: {background: "#EBEBEB", particles: "#FAFAFA"}, 
        aboutme: {background: "#EBEBEB", particles: "#90A4AE"}, 
        skills: {background: "#FC6600", particles: "#FFE0B2"}, 
        timeline: {background: "#003D5B", particles: "#C5CAE9"}, 
        portfolio: {background: "#EBEBEB", particles: "#E57373"}, 
        yunemy: {background: "#007A6B", particles: "#B2DFDB"}, 
        blog: {background: "#EBEBEB", particles: "#81C784"}, 
        contact: {background: "#2B454E", particles: "#CFD8DC"}
    };

    let lastElement;

    // Init Particles.js
    particlesJS.load('particles', 'assets/particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
        checkBackground();
    });

    replaceSVG();


    // TODO: Window resize event
    // TODO: Create the nav code. For the scroll events, the first answer on this link might be useful: https://stackoverflow.com/questions/18564187/using-jquery-find-the-div-class-that-the-top-of-the-viewport-is-inside

    // Source: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    $(window).scroll(function() {
        checkBackground();
        checkIllustrationPosition();
    });

    

    initScrollReveal();

    initPortfolio();

    function initScrollReveal() {
        let hi = {
            origin   : "top",
            distance : "24px",
            duration : 700,
            delay    : 0,
            scale    : 1.05,
        };

        let myName = {
            origin   : "bottom",
            distance : "24px",
            duration : 700,
            delay    : 600,
            scale    : 1.05,
        };

        let name = {
            origin   : "top",
            distance : "5px",
            duration : 1500,
            delay    : 1000,
            scale    : 1.2,
        };

        let and = {
            origin   : "bottom",
            distance : "35px",
            duration : 700,
            delay    : 1700,
            scale    : 1.05,
        };

        let job = {
            origin   : "top",
            distance : "35px",
            duration : 1500,
            delay    : 2200,
            scale    : 1.1,
        };

        let scroll = {
            origin   : "bottom",
            distance : "35px",
            duration : 700,
            delay    : 2800,
            scale    : 1.05,
        };

        let general = {
            origin   : "bottom",
            distance : "1px",
            duration : 700,
            delay    : 500,
            scale    : 1.01,
            viewFactor: 0.001,
            useDelay: 'once'
        };

        let items = {
            origin   : "bottom",
            distance : "5px",
            duration : 800,
            delay    : 900,
            scale    : .9,
        };

        // Titles section
        let number = {
            origin   : "left",
            distance : "30px",
            duration : 600,
            scale    : .9,
        };
        let subtitule = {
            origin   : "left",
            distance : "35px",
            delay    : 100,
            duration : 600,
            scale    : .9,
        };
        let title = {
            origin   : "bottom",
            distance : "40px",
            delay    : 500,
            duration : 800,
            scale    : 1, 
            afterReveal: function (domEl) {
                sr.reveal('.section > .content > p, .section > .content > img, .navigation', general); // class="scroll-general"
                sr.reveal('.portfolio-item', items, 200);
                sr.reveal('.icon-contact', items, 200); 
                sr.reveal('.skill-container', items, 150);

                // Titles section
                

                // Buttons
                sr.reveal('#yunemy .button', yunemyButton);
                sr.reveal('#blog .button', blogButton, 100);

                // Timeline
                sr.reveal('.timeline-element .line', line);
            }
        };

        // Buttons
        let yunemyButton = {
            origin   : "bottom",
            distance : "40px",
            //delay    : 200,
            duration : 800,
            scale    : 1,
        };

        let blogButton = {
            origin   : "right",
            distance : "40px",
            delay    : 500,
            duration : 800,
            scale    : 1,
        };

        // Timeline
        let line = {
            origin   : "top",
            distance : "1px",
            delay    : 400,
            duration : 400,
            scale    : 1,
            afterReveal: function (domEl) {
                sr.reveal('.timeline-element .circle', circle);
                sr.reveal('.timeline-element .job-title', jobTitle);
                sr.reveal('.timeline-element .date', date);
                sr.reveal('.timeline-element .company', company);
                sr.reveal('.timeline-element .job-description', jobInfo);
            }
        };
        

        let circle = {
            origin   : "bottom",
            distance : "5px",
            delay    : 50,
            duration : 400,
            scale    : 1
        };

        let jobTitle = {
            origin   : "right",
            distance : "40px",
            delay    : 200,
            duration : 600,
            scale    : 1
        };

        let date = {
            origin   : "left",
            distance : "35px",
            delay    : 500,
            duration : 500,
            scale    : 1
        };

        let company = {
            origin   : "bottom",
            distance : "5px",
            delay    : 800,
            duration : 500,
            scale    : 1
        };

        let jobInfo = {
            origin   : "bottom",
            distance : "5px",
            delay    : 1000,
            duration : 500,
            scale    : 1
        };

        window.sr = ScrollReveal();

        if (sr.isSupported()) {
            document.documentElement.classList.add('sr');
        }

        
        sr.reveal('#header .hi', hi);
        sr.reveal('#header .my-name-is', myName);
        sr.reveal('#header .name', name);
        sr.reveal('#header .and', and);
        sr.reveal('#header .job', job);
        sr.reveal('#header .scroll', scroll);

        sr.reveal('.section .number', number);
        sr.reveal('.section .subtitule', subtitule);
        sr.reveal('.section h2', title);

        
    }

    /**
     * Check the background color/gradient according to the section that is in the viewport
     */
    function checkBackground() {
        let windowTop = Math.max($('body').scrollTop(), $('html').scrollTop());

        // If there are more than one element in the viewport, all of them are saved
        let visibleElements = [];

        // For each section we will check if they are in the viewport to save or not save it in the array
        $('.section').each(function (index) {
            if (windowTop > ($(this).position().top - 150)) {
                visibleElements.push(this);
            }
        });

        // Get the last element visible in the viewport. This element will define the body's background
        let currentElement = visibleElements.pop();

        // Is the current element is different that the last element
        if (lastElement != currentElement) {
            lastElement = currentElement; // Update de last element

            // Change the background color of the body according to the section
            $('body').css('background', backgroundColors[currentElement.id].background);

            // Change the color of the particles
            if (typeof pJSDom[0] != 'undefined') {
                pJSDom[0].pJS.particles.color.value = backgroundColors[currentElement.id].particles;
                pJSDom[0].pJS.fn.particlesRefresh();
            }
            
            // If the current element is the header and it's not visible, it will be visible
            if (currentElement.id == $('.section')[0].id) {
                if ($('.background').hasClass('is-not-visible')) {
                    $('.background').removeClass('is-not-visible');
                    $('.background').addClass('is-visible');
                }
            } else {
                // Is the current element is other, and the gradient is visible, it will be not visible
                if (!$('.background').hasClass('is-not-visible')) {
                    $('.background').removeClass('is-visible');
                    $('.background').addClass('is-not-visible');
                }
            }
        }
    }

    function initPortfolio() {
        let container = $('.portfolio-gallery');

        $('.navigation li').click(function() {
            $(this).addClass('active');
            $('.navigation li').not($(this)).removeClass('active');
        });

        console.log("InitPortfolio");

        var mixed = mixitup($('.portfolio-gallery .elements'), {
            animation: {
                duration: 400,
                //feffects: 'fade translateZ(-360px) stagger(34ms)',
                easing: 'ease'
            },
            callbacks: {
                onMixStart: function(state, futureState){
                    console.log('Animation starting');
                },onMixEnd: function(state){
                    console.log('Operation ended');
                },onMixFail: function(state){
                    console.log('No elements found matching '+state.activeFilter);
                },onMixBusy: function(state){
                    console.log('MixItUp busy');
                }
            }
        });

        $('.portfolio-item', container).click(function() {
            $('#' + $(this).data('item')).parent().css('display', 'flex');
            $('body').addClass('modal-open');
            $('#' + $(this).data('item')).css('display', 'flex').animateCss('fadeIn', function() {
                revealModal();
                
            });

            // Force the click event to reset the slider
            $('#' + $(this).data('item') + ' .navigation label:first-child').trigger('click');
            
        });

        $('.close-button a').click(function() {
            $('body').removeClass('modal-open');
            $(this).parent().parent().animateCss('fadeOut', function() {
                $('.modal').css('display', 'none');
                $('.portfolio-modal-container').css('display', 'none');
            });
        });
    }

    function revealModal() {
        let slider = {
            origin   : "left",
            distance : "40px",
            duration : 600,
            container: '.portfolio-modal-container',
            reset    : true,
            viewFactor: 0.001,
            scale    : 1
        };

        let navigation = {
            origin   : "bottom",
            distance : "10px",
            duration : 200,
            container: '.portfolio-modal-container',
            reset    : true,
            viewFactor: 0.001,
            scale    : 1
        };

        let client = {
            origin   : "right",
            distance : "20px",
            duration : 1000,
            container: '.portfolio-modal-container',
            reset    : true,
            scale    : 1
        };

        let title = {
            origin   : "right",
            distance : "35px",
            duration : 600,
            delay    : 300,
            container: '.portfolio-modal-container',
            reset    : true,
            scale    : 1
        };

        let general = {
            origin   : "top",
            distance : "10px",
            duration : 600,
            delay    : 600,
            container: '.portfolio-modal-container',
            reset    : true,
            scale    : 1
        };

        let text = {
            origin   : "bottom",
            distance : "30px",
            duration : 600,
            delay    : 900,
            container: '.portfolio-modal-container',
            reset    : true,
            viewFactor: 0.001,
            scale    : 1
        };

        // Modals
        sr.reveal('.csslider', slider);
        sr.reveal('.navigation', navigation);
        sr.reveal('.client', client);
        sr.reveal('h3', title);
        sr.reveal('.close-button', general);
        sr.reveal('.main-info', text);
    }

    function checkIllustrationPosition() {
        let sections = $('section.section .illustration-bg');
        let pageY = $(window).scrollTop();

        for (let i = 0; i < sections.length; i++) {
            let element = $(sections[i]);
            let speed = element.data('speed');
            let parentSection = element.data('parent-section');
            let newY = (pageY - $('#' + parentSection).offset().top) * speed / 120;

            element.css('transform', "translate3d(0px, " + newY + "px, 0px)");
        }
    }

    function replaceSVG() {
        jQuery('img.svg').each(function() {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    }

    $.fn.extend({
        animateCss: function(animationName, callback) {
            var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
            })(document.createElement('div'));

            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);

                if (typeof callback === 'function') callback();
            });
            
            return this;
        },
    });
});