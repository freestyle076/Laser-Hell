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
    // Called after everything is ready. Creates HUD and tiled background.
    // ===========================================================================================================================
    create: function() 
    {
        this.addBackground();
        this.addHUD();
    },
    
    // ===========================================================================================================================
    // ADD BACKGROUND
    // --------------------------------------------------------------------------------------------------------------------------
    // Adds the game background and scrolls it down.
    // ===========================================================================================================================
    addBackground: function()
    {
        // Set background sprite
        game.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'game');
        
        // Set background to scroll downwards
        game.background.autoScroll(0, 50);
    },
    
    // ===========================================================================================================================
    // ADD HUD
    // --------------------------------------------------------------------------------------------------------------------------
    // Creates HUD group and adds each part of the HUD to that group.
    // ===========================================================================================================================
    addHUD: function()
    {
        // Create hud group
        this.hud = game.add.group();
        
        // Add hud sprites
        game.add.sprite(game.width - 80, game.height - 175, 'ui-atlas', 'primary-icon', this.hud).scale.setTo(0.75, 0.75);
        game.add.sprite(game.width - 80, game.height - 85, 'ui-atlas','secondary-icon', this.hud).scale.setTo(0.75, 0.75);
        
        // Add special sprite, options, and add events when clicked and hovered on
        this.addOptionsSprite();
    },
    

    // ===========================================================================================================================
    // ADD OPTIONS SPRITE
    // --------------------------------------------------------------------------------------------------------------------------
    // Creates and adds a sprite that will move to the options state.
    // ===========================================================================================================================
    addOptionsSprite: function()
    {
        var optionsSprite = game.add.sprite(game.width - 80, 10, 'ui-atlas', 'options-icon', this.hud);
        optionsSprite.scale.setTo(0.75, 0.75);
        
        // Add callback function to go to another screen when clicked
        var callback = function()
        {
            // Take a screenshot of the screen to "fake" a pop-up and pass this to the options state
            game.state.states['Options'].canvasImage = gameUtils.getCanvasScreenshot();

            // Go to the options state
            game.state.start("Options");
        };
        
        // Add onInputOver function to change menu text
        var onOver = function(target) 
        {
            // Change to another sprite here to appear "hovered over"
        };
        
        // Add onInputOutfunction to change menu text
        var onOut = function(target) 
        {
            // Change back
        };
        
        // Add these functions to the menu text
        optionsSprite.inputEnabled = true;
        optionsSprite.events.onInputUp.add(callback);
        optionsSprite.events.onInputOver.add(onOver);
        optionsSprite.events.onInputOut.add(onOut);
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////