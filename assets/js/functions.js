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
        '<audio autoplay="autoplay" style="display:none;">'
          + '<source src="' + arguments[0] + '" />'
          + '<embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false" class="playSound" />'
        + '</audio>'
      ).appendTo('body');
    }
  });

})(jQuery);

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

    if(window.location.href.indexOf('the-proposal') > -1){
        var image = $('img[src="/assets/images/proposal1.JPG"]');

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