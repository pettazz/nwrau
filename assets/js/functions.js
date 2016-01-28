function scrollPercentage() {
    var winTop = $(window).scrollTop(),
        docHeight = $(document).height(),
        winHeight = $(window).height();

    return (winTop / (docHeight - winHeight)) * 100;
}

function scrollSteps(imagesNumber) {
    var steps = [];

    for (var i = 1; i < imagesNumber; i++) {
        steps[steps.length] = 100 / imagesNumber * i;
    }

    steps[steps.length] = 150;

    return steps;
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function(){
    // Konami loader
    var eggloader = new Konami(function(){
        $('img').each(function(){
            var rand = getRandomIntInclusive(1, 11);
            $(this).attr('src', '/assets/images/dogs/dog' + rand + '.jpg');
        });
    });

    var eggloader2 = new Konami(function(){
        $.onTheRitz();
    }, '8085847378');

    if(window.location.href.indexOf('the-proposal') > -1){
        var image = $('img[src="/assets/images/raunwendy/proposal01.jpg"]');

        image.click(function(){
            $('img.post-thumb').fadeOut('slow');

            $("html, body").animate({
                scrollTop: 0 
            }, 3000);

            image.css({
                maxWidth: '600px'
            })
            .animate({
                marginLeft: '-3300px',
                marginTop: '-3400px',
                width: '4000px',
                height: '7000px',
                maxWidth: '4000px'
            }, 3000);

            $.playSound('https://wompwompwomp.com/audio/sad-trombone.m4a');
        });
    }
});

/********************************************************************************
                            jquery plugin land
*********************************************************************************/

/**
 * @author Alexander Manzyuk <admsev@gmail.com>
 * Copyright (c) 2012 Alexander Manzyuk - released under MIT License
 * https://github.com/admsev/jquery-play-sound
 * Usage: $.playSound('http://example.org/sound.mp3');
**/

(function($){

  $.extend({
    playSound: function(){
      return $(
        '<audio autoplay="autoplay" style="display:none;" class="playSound">'
          + '<source src="' + arguments[0] + '" />'
          + '<embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false" />'
        + '</audio>'
      ).appendTo('body');
    },

    stopSound: function(){
        return $('body > audio.playSound').remove();
    }
  });

})(jQuery);

/**
 * Easings I stole from jquery-ui
**/

(function() {
    // based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

    var baseEasings = {};

    $.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
        baseEasings[ name ] = function( p ) {
            return Math.pow( p, i + 2 );
        };
    });

    $.extend( baseEasings, {
        Sine: function( p ) {
            return 1 - Math.cos( p * Math.PI / 2 );
        },
        Circ: function( p ) {
            return 1 - Math.sqrt( 1 - p * p );
        },
        Elastic: function( p ) {
            return p === 0 || p === 1 ? p :
                -Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
        },
        Back: function( p ) {
            return p * p * ( 3 * p - 2 );
        },
        Bounce: function( p ) {
            var pow2,
                bounce = 4;

            while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
            return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
        }
    });

    $.each( baseEasings, function( name, easeIn ) {
        $.easing[ "easeIn" + name ] = easeIn;
        $.easing[ "easeOut" + name ] = function( p ) {
            return 1 - easeIn( 1 - p );
        };
        $.easing[ "easeInOut" + name ] = function( p ) {
            return p < 0.5 ?
                easeIn( p * 2 ) / 2 :
                1 - easeIn( p * -2 + 2 ) / 2;
        };
    });
})();

/**
 * @author Nick Pettazzoni <@pettazz>
 * Released under MIT License
 * Usage: $.onTheRitz();
**/

(function($){

  $.extend({
    onTheRitz: function(){
        var isPutinOnTheLoose = $('#big-bad-vlad').length > 0;
        if(!isPutinOnTheLoose){
            var viewportWidth = $(window).width();
            var viewportHeight = $(window).height();
            var $vlad = $('<img src="/assets/images/nobleviewresident.png" id="big-bad-vlad" style="display:none;" />');

            $.playSound('/assets/anthem.mp3');
            $('#sb-site').fadeOut('fast', function(){
                $('body').append($vlad);
                $vlad.css({
                    position: 'absolute',
                    width: 60
                });
                $vlad.offset({
                    top: $(window).scrollTop() + viewportHeight / 4, 
                    left: viewportWidth + 100 
                });
                $vlad.show();

                $vlad.animate({ 
                    left: -600,
                    width: 600
                }, 10000, 'easeInQuart', function(){
                    $.stopSound();
                    $vlad.remove();
                    $('#sb-site').fadeIn('fast');
                });
            });
        }
    }
  });

})(jQuery);
