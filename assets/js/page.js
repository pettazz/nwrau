$(document).ready(function(){
    // Konami loader
    var eggloader = new Konami(function(){
        clippy.load('Clippy', function(agent) {
            // Do anything with the loaded agent
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