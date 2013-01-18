
require.config({
    baseUrl: '../../js/'
});

define('robot', '../ChoreoJS/examples/robot.js');

require([
    "mo/lang", 
    "dollar", 
    "eventmaster", 
    "robot", 
    "mo/domready"
], function(_, $, Event, robot){

    var bot = robot();

    bot.born($('.bot1'));

    setTimeout(function(){

        //bot.rotateShank('left', '30deg', 4000, 'easeInOut');
        bot.rotateHam('left', '30deg', 2000, 'easeInOut').then(function(){
            return bot.rotateHam('left', '-30deg', 400);
        }).follow().then(function(){
            return bot.rotateHam('right', '-100deg', 400);
        }).follow().then(function(){
        
        });

    }, 400);
    
});
