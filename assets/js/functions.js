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

$(document).ready(function(){
    // Konami loader
    var eggloader = new Konami(function(){
        clippy.load('Clippy', function(agent) {
            // Do anything with the loaded agent
            agent.moveTo(150, 300);
            agent.show();
            agent.speak('It looks like you\'re getting married.\n\nWould you like help?');
            window.setInterval(function(){
                agent.animate();
                if(Math.floor(Math.random() * 10) >= 5){
                    agent.speak('ya nervous?');
                }

            }, 6000);
        });
    });
});