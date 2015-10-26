// ================================================================================================================================
// engine.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Engine for the game that keeps things churning.
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create the game and engine
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'), 
        Engine = function () {},
        gameOptions =
        {
            playSound: true,
            playMusic: true
        },
        musicPlayer;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Engine.prototype = 
{

    /**==========================================================================================================================
    * @name PRELOAD
    * 
    * @description Preload the splash screen's assets
    *///=========================================================================================================================
    preload: function() 
    {
        // Loads splash screen assets
        game.load.image('loading', 'assets/images/ui/progress-bar.png');
        game.load.image('brand', 'assets/images/ui/polymorphix-banner.png');
        
        // Loas splash screen scripts
        game.load.script('webFont', 'vendor/webfontloader.min.js');
        game.load.script('splash', 'src/states/splash.js');
        game.load.script('gameUtils', 'src/utility/game.utils.js');
    },

    /**==========================================================================================================================
    * @name CREATE
    * 
    * @description Called after everything is loaded. Adds and starts the splash screen.
    *///=========================================================================================================================
    create: function() 
    {
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }

};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
// Basically, it allows us to take screenshots of the canvas even if we're using the WebGL renderer
game.preserveDrawingBuffer = true;

// Add and start the engine state
game.state.add('Engine', Engine);
game.state.start('Engine');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////