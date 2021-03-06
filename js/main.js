// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


/**
     *
     * Check if element exist on page
     *
     * @param el {string} jQuery object (#popup)
     *
     * @return {bool}
     *
*/
function exist(el){
    if ( $(el).length > 0 ) {
        return true;
    } else {
        return false;
    }
}


jQuery(document).ready(function($) {

    /*---------------------------
                                  Tabs
    ---------------------------*/
    if ( exist('.service-tabs') ) {
        $('.service-tabs').tabs();
    }

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
    
    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('.mainNav').toggleClass('active');
        $(this).parent().parent().toggleClass('active');
    });



    /*---------------------------
                                  Fancybox
    ---------------------------*/
    $(".fancybox").fancybox({
        onComplete: function( instance, slide ) {
            if ($(this).has('.slider-for')) {
                $('.slider-for').slick({
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: false,
                  arrows: false,
                  fade: true,
                  asNavFor: '.slider-nav'
                });
                $('.slider-nav').slick({
                  slidesToShow: 8,
                  slidesToScroll: 1,
                  asNavFor: '.slider-for',
                  dots: false,
                  arrows: true,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 6,
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 4,
                      }
                    },
                    {
                      breakpoint: 400,
                      settings: {
                        slidesToShow: 3,
                      }
                    }
                  ]
                });
            } 
        },
        afterClose: function( ) {
            $('.slider-for').slick('unslick');
            $('.slider-nav').slick('unslick');
        }
    });

    $('.question').click(function(){
        $(this).toggleClass('opened');
        $(this).children('.question__answer').slideToggle();
    });



    /*---------------------------
                                  Sliders
    ---------------------------*/
    
    $('.sertificates-slider').slick({
        arrows: false,
        dots: false,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
         responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 400,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
    });

    /*$(document).on('click', '.sertificates-slider a', function(e) {
        e.preventDefault();
        var $collection = $( '.sertificates-slider a' );
      
        $.fancybox.open( $collection, {}, $collection.index( this )  );
      
        return false;
    });*/



    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.fancybox.open([
            {
                src  : popup,
                type: 'inline',
                opts : {}
            }
        ], {
            loop : false
        });
    }

    $('.form').on('submit', function(event) {
        event.preventDefault();
        var data = new FormData(this);
        $(this).find('button').prop('disabled', true);
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        }).always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
                $(this).find('button').prop('disabled', false);
            });
        });
    });



    /*Google map init*/
    var map;
    function googleMap_initialize() {
        var lat = $('#map_canvas').data('lat');
        var long = $('#map_canvas').data('lng');

        var mapCenterCoord = new google.maps.LatLng(lat, long);
        var mapMarkerCoord = new google.maps.LatLng(lat, long);

        var mapOptions = {
            center: mapCenterCoord,
            zoom: 17,
            //draggable: false,
            disableDefaultUI: true,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var markerImage = new google.maps.MarkerImage('images/location.png');
        var marker = new google.maps.Marker({
            icon: markerImage,
            position: mapMarkerCoord, 
            map: map,
            title:"Чисто Строй"
        });
        
        $(window).resize(function (){
            map.setCenter(mapCenterCoord);
        });
    }

    if ( exist( '#map_canvas' ) ) {
        googleMap_initialize();
    }

}); // end file