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
    setKeyBindings: function()
    {
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
        
        // add level display
        this.addLevelDisplay();
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
    // ADD LEVEL DISPLAY
    // --------------------------------------------------------------------------------------------------------------------------
    // Creates and adds the level display panel with current level
    // ===========================================================================================================================
    addLevelDisplay: function()
    {
        var level = 1;
        var levelPanel = game.add.sprite(10,10,'ui-atlas','glassPanel',this.hud);
        levelPanel.scale.setTo(1.25,.3);
        var level = game.add.text(18,7,'Level ' + level,{ fontSize: '32px', fill: '#000' },this.hud);
    },
    
    // ===========================================================================================================================
    // ADD STATUS PANEL
    // --------------------------------------------------------------------------------------------------------------------------
    // Creates and adds the status panel sprites: panel, health bar (init 100%), weapon heat bar (init 0%)
    // ===========================================================================================================================
    addStatusPanel: function(){
        
        // status panel sprite
        
        /*
        var statusPanel = new Phaser.NinePatchImage(game, 10, game.height - 90, game.height/2, 'glassPanel');
        // Set the measures for image - [AUTOMATICALLY UPDATED]
        statusPanel.targetWidth  = 500;
        statusPanel.targetHeight = 500;
        // Set anchor for image - [NEEDS MANUAL UPDATE] 
        statusPanel.anchor.setTo(0, 0);
        statusPanel.UpdateImageSizes();
        */
        var statusPanel = game.add.sprite(10,game.height - 90, 'ui-atlas','glassPanel',this.hud); // glass option
        statusPanel.scale.setTo(1.8,.8);
        
        // track number of status bars
        this.numStatusBars = 0;
        
        // add health and heat bars
        this.graphics = game.add.graphics(0,0,this.hud);
        this.drawHealthBar(100,100);
        this.drawHeatBar(0,100);
    },
    
    // ===========================================================================================================================
    // DRAW HEALTH BAR
    // --------------------------------------------------------------------------------------------------------------------------
    // Uses graphics to draw health bar with fill percentage current/total
    // ===========================================================================================================================
    drawHealthBar: function(current,total)
    {
        // health bar colors
        var borderColor = 0x00AA00;
        var fillColor = 0x00FF00;
        
        // draw function
        this.drawStatusBar(current,total,borderColor,fillColor);
    },
    
    // ===========================================================================================================================
    // DRAW HEAT BAR
    // --------------------------------------------------------------------------------------------------------------------------
    // Uses graphics to draw heat bar with fill percentage current/total
    // ===========================================================================================================================
    drawHeatBar: function(current,total)
    {
        // health bar colors
        var borderColor = 0xAA0000;
        var fillColor = 0xFF0000;
        
        // draw function
        this.drawStatusBar(current,total,borderColor,fillColor);
    },
    
    // ===========================================================================================================================
    // DRAW STATUS BAR
    // --------------------------------------------------------------------------------------------------------------------------
    // Generic function to draw a status bar in the status panel
    // ===========================================================================================================================
    drawStatusBar: function(current,total,borderColor,fillColor)
    {
        // status bar constants
        var ulx = 30;
        var uly = game.height - 78 + (this.numStatusBars * 38);
        var width = 143;
        var fillWidth = width * (current/total);
        var height = 18;
        var cornerRadius = 5;
        
        // fill bar
        this.graphics.beginFill(fillColor);
        this.graphics.drawRect(ulx,uly,fillWidth,height);
        
        // border
        this.graphics.beginFill(borderColor);
        
        // left vertical bar
        this.graphics.drawRect(ulx-cornerRadius,uly,cornerRadius,height);
        // right vertical bar
        this.graphics.drawRect(ulx+width,uly,cornerRadius,height);
        // top horizontal bar
        this.graphics.drawRect(ulx,uly-cornerRadius,width,cornerRadius);
        // bottom horizontal bar
        this.graphics.drawRect(ulx,uly+height,width,cornerRadius);
        
        // upper left corner
        this.graphics.arc(ulx,uly,cornerRadius,game.math.degToRad(180),game.math.degToRad(270),false);
        this.graphics.drawPolygon( new Phaser.Polygon([ulx,uly, ulx,uly-cornerRadius, ulx-cornerRadius,uly]) );
        // lower left corner
        this.graphics.arc(ulx,uly+height,cornerRadius,game.math.degToRad(90),game.math.degToRad(180),false);
        this.graphics.drawPolygon( new Phaser.Polygon([ulx,uly+height, ulx,uly+height+cornerRadius, ulx-cornerRadius,uly+height]) );
        // upper right corner
        this.graphics.arc(ulx+width,uly,cornerRadius,game.math.degToRad(270),game.math.degToRad(0),false);
        this.graphics.drawPolygon( new Phaser.Polygon([ulx+width,uly, ulx+width+cornerRadius,uly, ulx+width,uly-cornerRadius]) );
        // lower right corner
        this.graphics.arc(ulx+width,uly+height,cornerRadius,game.math.degToRad(0),game.math.degToRad(90),false);
        this.graphics.drawPolygon( new Phaser.Polygon([ulx+width,uly+height, ulx+width+cornerRadius,uly+height, ulx+width,uly+height+cornerRadius]) );
        
        this.numStatusBars++;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////