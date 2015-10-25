// ================================================================================================================================
// game.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// @overview
// ===============================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Game = function () {},
        levelNumber = 1,
        statusBars = { "health" : null, "weaponHeat" : null };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Game.prototype = 
{
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // MAIN PHASER FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------

    /**==========================================================================================================================
    * @name INIT
    * 
    * @description Initialize game
    *///=========================================================================================================================
    init: function()
    {
        
    },
    
    /**==========================================================================================================================
    * @name PRELOAD
    * 
    * @description Preloads game state's assets
    *///=========================================================================================================================
    preload: function() 
    {
  
    },

    /**==========================================================================================================================
    * @name CREATE
    * 
    * @description Adds tile background, HUD, and sets key bindings.
    *///=========================================================================================================================
    create: function() 
    {
        this.addBackground();
        this.addHUD();
        this.setKeyBindings();
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE HELPERS
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name SET KEY BINDINGS
    * 
    * @description Sets the key bindings for the game
    *///=========================================================================================================================
    setKeyBindings: function()
    {
        var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escKey.onDown.add(this.optionsMenuCallback,this);
    },
    
    /**==========================================================================================================================
    * @name ADD BACKGROUND
    * 
    * @description Adds the game background and scrolls it down.
    *///=========================================================================================================================
    addBackground: function()
    {
        // Set background sprite
        game.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'game');
        
        // Set background to scroll downwards
        game.background.autoScroll(0, 50);
    },
    
    /**==========================================================================================================================
    * @name ADD HUD
    * 
    * @description Creates HUD group and adds each part of the HUD to that group.
    *///=========================================================================================================================
    addHUD: function()
    {
        // Create hud group
        this.hud = game.add.group();
        
        // Add primary and secondary skills
        this.addSkills();
        
        // Add special sprite, options, and add events when clicked and hovered on
        this.addOptions();
        
        // Add status panel and contained status bar sprites
        this.addStatusPanel();
        
        // Add level display
        this.addLevelDisplay();
        
        this.updateStatusBar("weaponHeat", 100, 100);
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ADD HUD HELPERS
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name ADD SKILLS
    * 
    * @description Add primary and secondary skill icons and adds a backing glass panel behind each one
    *///=========================================================================================================================
    addSkills : function()
    {
        // Primary icon and backing glasspanel
        var primaryGlassPanel = gameUtils.makeNinePatchPanel('glassPanel', game.width - 85, game.height - 180, 80, 80, 0, 0);
        primaryGlassPanel.alpha = 0.5;
        game.add.sprite(primaryGlassPanel.x + 3, primaryGlassPanel.y + 3, 'ui-atlas', 'primary-icon', this.hud).scale.setTo(0.75, 0.75);
        
        // Secondary icon and backing glasspanel
        var secondaryGlassPanel = gameUtils.makeNinePatchPanel('glassPanel', game.width - 85, game.height - 90, 80, 80, 0, 0);
        secondaryGlassPanel.alpha = 0.5;
        game.add.sprite(secondaryGlassPanel.x + 3, secondaryGlassPanel.y + 3, 'ui-atlas','secondary-icon', this.hud).scale.setTo(0.75, 0.75);
    },
        
    /**==========================================================================================================================
    * @name ADD OPTIONS
    * 
    * @description Creates and adds a sprite that will move to the options state.
    *///=========================================================================================================================
    addOptions: function()
    {
        var options = game.add.sprite(game.width - 80, 10, 'ui-atlas', 'options-icon', this.hud);
        options.scale.setTo(0.75, 0.75);
        
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
        
        // Add click, onOver, and onOut functions to the option sprite
        options.inputEnabled = true;
        options.events.onInputUp.add(this.optionsMenuCallback);
        options.events.onInputOver.add(onOver);
        options.events.onInputOut.add(onOut);
    },
    
    /**==========================================================================================================================
    * @name OPTIONS MENU CALLBACK
    * 
    * @description Takes screenshot of game and transitions to options state
    *///=========================================================================================================================
    optionsMenuCallback: function()
    {
        // Take a screenshot of the screen to "fake" a pop-up and pass this to the options state
        game.state.states['Options'].canvasImage = gameUtils.getCanvasScreenshot();
        
        // Add state that it will go back to
        game.state.states['Options'].backState = 'Game';

        // Go to the options state
        game.state.start("Options");
    },
    
    /**==========================================================================================================================
    * @name ADD LEVEL DISPLAY
    * 
    * @description Creates and adds the level display panel with current level
    *///=========================================================================================================================
    addLevelDisplay: function()
    {
        // Make glass panel
        var levelPanel = gameUtils.makeNinePatchPanel('glassPanel', 10, 10, 120, 30, 0, 0);
        levelPanel.alpha = 0.5;
        
        // Add label text and center it on panel
        var panelCenterX = levelPanel.x + 7;
        var panelCenterY = levelPanel.y + 7;
        var levelLabel = game.add.text(panelCenterX, panelCenterY, 'Level ' + levelNumber, { font: '16px Tron', fill: '#FFF' }, this.hud);
    },
    
    /**==========================================================================================================================
    * @name ADD STATUS PANEL
    * 
    * @description Creates and adds the status panel sprites: panel, health bar, and weapon heat bar 
    *///=========================================================================================================================
    addStatusPanel: function()
    {
        // Glass status panel
        var statusPanel = gameUtils.makeNinePatchPanel('glassPanel', 5, game.height - 90, 215, 85, 0, 0);
        statusPanel.alpha = 0.5;
        
        // Status bar helpers
        this.graphics = game.add.graphics(0, 0, this.hud);
        this.numStatusBars = 0;
        var upperLeftX = statusPanel.x + 10;
        var upperLeftY = statusPanel.y + 11;
        
        // Health bar and shadow
        this.drawStatusBar("health", "health_statusBar", upperLeftX, upperLeftY, 0x005522, 0x005522);
        // Weapon heat bar and shadow
        this. drawStatusBar("weaponHeat", "weaponHeat_statusBar", upperLeftX, upperLeftY, 0x440055, 0x440055);
    },
    
    /**==========================================================================================================================
    * @name DRAW STATUS BAR
    * 
    * @param {string} statusBarKey - The key specified for the status bar sprite (see class variables above)
    * @param {string} statusBarSpriteName - Name of the sprite from the ui-atlas for the status bar
    * @param {float} upperLeftX - Upperleft x position of the status bar
    * @param {float} upperLeftY - Upperleft y position of the status bar
    * @param {hexidecimal} borderColor - Color of the status bar shadow's border
    * @param {hexidecimal} fillColor - Color of the status bar shadow's fill
    * 
    * @description Generic function to draw a status bar and its shadow in the status panel
    *///=========================================================================================================================
    drawStatusBar: function(statusBarKey, statusBarSpriteName, upperLeftX, upperLeftY, borderColor, fillColor)
    {
        // Status bar constants
        var ulx = upperLeftX;
        var uly = upperLeftY + (this.numStatusBars * 38);
        var width = 195;
        var height = 25.95;
        var cornerRadius = 5;
        
        // SHADOW
        // ------------------------------------------------------------------------------------
        
        // Fill bar
        this.graphics.beginFill(fillColor);
        this.graphics.drawRect(ulx, uly, width, height);
        
        // Border
        this.graphics.beginFill(borderColor);
        
        // Left vertical bar
        this.graphics.drawRect(ulx - cornerRadius, uly, cornerRadius, height);
        // Right vertical bar
        this.graphics.drawRect(ulx + width, uly, cornerRadius, height);
        // Top horizontal bar
        this.graphics.drawRect(ulx, uly - cornerRadius, width, cornerRadius);
        // Bottom horizontal bar
        this.graphics.drawRect(ulx, uly + height, width, cornerRadius);
        
        // Upper left corner
        this.graphics.arc(ulx, uly, cornerRadius, game.math.degToRad(180), game.math.degToRad(270), false);
        this.graphics.drawPolygon( new Phaser.Polygon([ulx, uly, ulx, uly - cornerRadius, ulx - cornerRadius, uly]) );
        // Lower left corner
        this.graphics.arc(ulx, uly + height, cornerRadius,game.math.degToRad(90), game.math.degToRad(180), false);
        this.graphics.drawPolygon( new Phaser.Polygon([ulx, uly + height, ulx, uly + height + cornerRadius, ulx - cornerRadius, uly + height]) );
        // Upper right corner
        this.graphics.arc(ulx + width, uly, cornerRadius, game.math.degToRad(270), game.math.degToRad(0), false);
        this.graphics.drawPolygon( new Phaser.Polygon([ulx + width, uly, ulx + width + cornerRadius, uly, ulx + width, uly - cornerRadius]) );
        // Lower right corner
        this.graphics.arc(ulx + width, uly + height, cornerRadius, game.math.degToRad(0), game.math.degToRad(90), false);
        this.graphics.drawPolygon( new Phaser.Polygon([ulx + width, uly + height, ulx + width + cornerRadius, uly + height, ulx + width, uly + height + cornerRadius]) );
        
        // STATUS BAR
        // ------------------------------------------------------------------------------------

        // Add status bar sprite
        var statusBar = game.add.sprite(ulx, uly, 'ui-atlas', statusBarSpriteName, this.hud);
        
        // Enable cropping on the status bar and add cropping rectangle
        statusBar.cropEnabled = true;
        statusBar.cropRect = new Phaser.Rectangle(0, 0, statusBar.width, statusBar.height);
        
        // Add status bar to object
        statusBars[statusBarKey] = statusBar;
        
        this.numStatusBars++;
    },
    
    /**==========================================================================================================================
    * @name UPDATE STATUS BAR
    * 
    * @description Crops the status bar according to its current and max values
    * 
    * @param {string} statusBarKey - The key specified for the status bar sprite (see class variables above)
    * @param {float} current - Current value to use as a percentage of the crop
    * @param {float} max - Max value to use as a percentage of the crop
    * 
    * @return {Phaser.NinePatchImage} - A Phaser Nine Patch Image Sprite
    *///=========================================================================================================================
    updateStatusBar : function(statusBarKey, current, max)
    {
        // Get status bar
        var statusBar = statusBars[statusBarKey];
        
        // Update crop width based on current and max
        statusBar.cropRect.width = (current / max) * statusBar.width;
        
        // Update crop to change status bar
        statusBar.updateCrop();
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////