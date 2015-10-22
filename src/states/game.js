// ================================================================================================================================
// game.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// 
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Game = function () {};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Game.prototype = 
{
    // ===========================================================================================================================
    // INIT
    // --------------------------------------------------------------------------------------------------------------------------
    // Initialize game
    // ===========================================================================================================================
    init: function()
    {
        
    },
    
    // ===========================================================================================================================
    // PRELOAD
    // --------------------------------------------------------------------------------------------------------------------------
    // Pre-loads the game's assets.
    // ===========================================================================================================================
    preload: function() 
    {
  
    },

    // ===========================================================================================================================
    // CREATE
    // --------------------------------------------------------------------------------------------------------------------------
    // Called after everything is ready.
    // ===========================================================================================================================
    create: function() 
    {
        // set background sprite
        game.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'game');
        
        // set background to scroll downwards
        game.background.autoScroll(0,50);
        
        // create hud group, add hud sprites
        
        this.hud = game.add.group();
        game.add.sprite(game.width - 80,game.height - 175,'primary-icon',this.hud).scale.setTo(0.75,0.75);
        game.add.sprite(game.width - 80,game.height - 85,'secondary-icon',this.hud).scale.setTo(0.75,0.75);
        game.add.sprite(game.width - 80,10,'menu-icon',this.hud).scale.setTo(0.75,0.75);
        
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////