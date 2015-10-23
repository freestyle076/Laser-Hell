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
        this.setKeyBindings();
    },
    
    // ===========================================================================================================================
    // SET KEY BINDINGS
    // --------------------------------------------------------------------------------------------------------------------------
    // Sets the key bindings for the game
    // ===========================================================================================================================
    setKeyBindings: function(){
        var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escKey.onDown.add(this.optionsMenuCallback,this);
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
        
        // primary icon and backing glasspanel
        var primaryGlassPanel = game.add.sprite(game.width - 85, game.height - 180, 'ui-atlas', 'glassPanel', this.hud);
        primaryGlassPanel.scale.setTo(0.81,0.81);
        game.add.sprite(primaryGlassPanel.x + 3, primaryGlassPanel.y + 3, 'ui-atlas', 'primary-icon', this.hud).scale.setTo(0.75, 0.75);
        
        // secondary icon and backing glasspanel
        var secondaryGlassPanel = game.add.sprite(game.width - 85, game.height - 90, 'ui-atlas','glassPanel', this.hud);
        secondaryGlassPanel.scale.setTo(0.81, 0.81);
        game.add.sprite(secondaryGlassPanel.x + 3, secondaryGlassPanel.y + 3, 'ui-atlas','secondary-icon', this.hud).scale.setTo(0.75, 0.75);
        
        // Add special sprite, options, and add events when clicked and hovered on
        this.addOptionsSprite();
        
        // add status panel and contained status bar sprites
        this.addStatusPanel();
    },
    
    // ===========================================================================================================================
    //  CALLBACK FUNCTION TO LAUNCH OPTION MENU
    // --------------------------------------------------------------------------------------------------------------------------
    // Takes screenshot of game and transitions to options state
    // ===========================================================================================================================
    optionsMenuCallback: function()
    {
        // Take a screenshot of the screen to "fake" a pop-up and pass this to the options state
        game.state.states['Options'].canvasImage = gameUtils.getCanvasScreenshot();

        // Go to the options state
        game.state.start("Options");
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
        
        // Add onInputOver function to change option sprite
        var onOver = function(target) 
        {
            target.alpha = 0.5;
        };
        
        // Add onInputOut function to change option sprite
        var onOut = function(target) 
        {
            target.alpha = 1;
        };
        
        // Add these functions to the option sprite
        optionsSprite.inputEnabled = true;
        optionsSprite.events.onInputUp.add(this.optionsMenuCallback);
        optionsSprite.events.onInputOver.add(onOver);
        optionsSprite.events.onInputOut.add(onOut);
    },
    
    // ===========================================================================================================================
    // ADD STATUS PANEL
    // --------------------------------------------------------------------------------------------------------------------------
    // Creates and adds the status panel sprites: panel, health bar (init 100%), weapon heat bar (init 0%)
    // ===========================================================================================================================
    addStatusPanel: function(){
        
        // status panel sprite
        //var statusPanel = game.add.sprite(10,game.height - 90, 'ui-atlas','metalPanel',this.hud); // metal option
        var statusPanel = game.add.sprite(10,game.height - 90, 'ui-atlas','glassPanel_projection',this.hud); // glass option
        statusPanel.scale.setTo(1.8,.8);
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////