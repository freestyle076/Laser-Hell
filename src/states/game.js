// ================================================================================================================================
// game.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Screen that allows the player to play the game.
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
        this.gameScore = 0;
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
        this.addPlayerShip();
        this.setKeyBindings();
    },

    /**==========================================================================================================================
    * @name UPDATE
    * 
    * @description Performs frame updates to game elements before render
    *///=========================================================================================================================
    update: function()
    {
        // update status bars
        statusBars['health'].updateCrop();
        statusBars['weaponHeat'].updateCrop();

        // move player ship
        this.playerShip.move(this.wKey.isDown, this.dKey.isDown, this.sKey.isDown, this.aKey.isDown);
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
        // ESC -> Pause Menu
        var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escKey.onDown.add(this.optionsMenuCallback, this);

        // W -> Up
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        
        // A -> Left
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);

        // S -> Down 
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

        // D -> Right
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        // graphics module for skill icons
        this.skillGraphics = game.add.graphics(0, 0);

        // SPACE -> Primary Fire
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.primaryFireKeyOnDown, this);
        spaceKey.onUp.add(this.primaryFireKeyOnUp, this);

        // ALT -> Secondary Fire
        var altKey = game.input.keyboard.addKey(Phaser.Keyboard.ALT);
        altKey.onDown.add(this.secondaryFireKeyOnDown, this);
        altKey.onUp.add(this.secondaryFireKeyOnUp, this);
    },

    /**==========================================================================================================================
    * @name OPTIONS MENU CALLBACK
    * 
    * @description Takes screenshot of game and transitions to options state
    *///=========================================================================================================================
    optionsMenuCallback: function () {
        // Take a screenshot of the screen to "fake" a pop-up and pass this to the options state
        game.state.states['Options'].canvasImage = gameUtils.getCanvasScreenshot();

        // Add state that it will go back to
        game.state.states['Options'].backState = 'Game';

        // Go to the options state
        game.state.start("Options");
    },

    /**==========================================================================================================================
    * @name PRIMARY FIRE KEY ON DOWN
    * 
    * @description Primary fire key on down callback
    *///=========================================================================================================================
    primaryFireKeyOnDown: function () {
        this.skillGraphics.alpha = 0.5;
        this.skillGraphics.beginFill(0x00FFFF);
        this.skillGraphics.drawRoundedRect(this.primaryGlassPanel.x, this.primaryGlassPanel.y, this.primaryGlassPanel.targetWidth, this.primaryGlassPanel.targetHeight, 4);
    },

    /**==========================================================================================================================
    * @name PRIMARY FIRE KEY ON UP
    * 
    * @description Primary fire key on up callback
    *///=========================================================================================================================
    primaryFireKeyOnUp: function () {
        this.skillGraphics.clear();
    },

    /**==========================================================================================================================
    * @name SECONDARY FIRE KEY ON DOWN
    * 
    * @description Secondary fire key on down callback
    *///=========================================================================================================================
    secondaryFireKeyOnDown: function () {
        this.skillGraphics.alpha = 0.5;
        this.skillGraphics.beginFill(0x00FFFF);
        this.skillGraphics.drawRoundedRect(this.secondaryGlassPanel.x, this.secondaryGlassPanel.y, this.secondaryGlassPanel.targetWidth, this.secondaryGlassPanel.targetHeight, 4);
    },

    /**==========================================================================================================================
    * @name SECONDARY FIRE KEY ON UP
    * 
    * @description Secondary fire key on up callback
    *///=========================================================================================================================
    secondaryFireKeyOnUp: function () {
        this.skillGraphics.clear();
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
        
        // Add score display
        this.addScoreDisplay();
        
    },
    
    /**==========================================================================================================================
    * @name ADD PLAYER SHIP
    * 
    * @description Adds the player's ship to the game
    *///=========================================================================================================================
    addPlayerShip: function () {

        // visible parameters
        var playerMaxHealth = 100;
        var playerSpeed = 7;
        var skills = null;

        // create ship
        this.playerShip = new PlayerShip(game, 400, 400, 'blue_ship_01', 'expl_02_0021', playerMaxHealth, playerSpeed, skills, this.hud);

        // add to game
        game.add.existing(this.playerShip);
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
        this.primaryGlassPanel = gameUtils.makeNinePatchPanel('glassPanel', game.width - 85, game.height - 180, 80, 80, 0, 0);
        this.primaryGlassPanel.alpha = 0.5;
        game.add.sprite(this.primaryGlassPanel.x + 3, this.primaryGlassPanel.y + 3, 'ui-atlas', 'primary-icon', this.hud).scale.setTo(0.75, 0.75);
        
        // Secondary icon and backing glasspanel
        this.secondaryGlassPanel = gameUtils.makeNinePatchPanel('glassPanel', game.width - 85, game.height - 90, 80, 80, 0, 0);
        this.secondaryGlassPanel.alpha = 0.5;
        game.add.sprite(this.secondaryGlassPanel.x + 3, this.secondaryGlassPanel.y + 3, 'ui-atlas', 'secondary-icon', this.hud).scale.setTo(0.75, 0.75);
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
    * @name ADD SCORE DISPLAY
    * 
    * @description Creates and adds the score display panel with current gamescore
    *///=========================================================================================================================
    addScoreDisplay: function()
    {
        var scorePanel = game.add.sprite(10,10,'ui-atlas','metalPanel_purpleCorner',this.hud);
        scorePanel.scale.setTo(.7,.7);
        
        this.scoreDisplay = game.add.text(35, 35, this.gameScore.toString(), { fill: "#AA00D4", font: "30px Tron" }, this.hud);
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
        this.statusBarGraphics = game.add.graphics(0, 0, this.hud);
        this.numStatusBars = 0;
        var upperLeftX = statusPanel.x + 10;
        var upperLeftY = statusPanel.y + 11;
        
        // Health bar and shadow
        this.drawStatusBar("health", "health_statusBar", upperLeftX, upperLeftY, 0x005522, 0x005522);
        // Weapon heat bar and shadow
        this.drawStatusBar("weaponHeat", "weaponHeat_statusBar", upperLeftX, upperLeftY, 0x440055, 0x440055);
        this.updateStatusBar("weaponHeat", 0, 100)
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
        statusBarWidth = 195;
        var height = 25.95;
        var borderThickness = 3;
        
        // SHADOW
        // ------------------------------------------------------------------------------------
        
        // Fill bar
        this.statusBarGraphics.beginFill(fillColor);
        this.statusBarGraphics.drawRect(ulx, uly, statusBarWidth, height);
        
        // Border
        this.statusBarGraphics.beginFill(borderColor);
        
        // left vertical bar
        this.statusBarGraphics.drawRect(ulx - borderThickness, uly, borderThickness, height);
        // right vertical bar
        this.statusBarGraphics.drawRect(ulx + statusBarWidth, uly, borderThickness, height);
        // top horizontal bar
        this.statusBarGraphics.drawRect(ulx, uly - borderThickness, statusBarWidth, borderThickness);
        // bottom horizontal bar
        this.statusBarGraphics.drawRect(ulx, uly + height, statusBarWidth, borderThickness);
        
        // upper left corner
        this.statusBarGraphics.arc(ulx, uly, borderThickness, game.math.degToRad(180), game.math.degToRad(270), false);
        this.statusBarGraphics.drawPolygon(new Phaser.Polygon([ulx, uly, ulx, uly - borderThickness, ulx - borderThickness, uly]));
        // lower left corner
        this.statusBarGraphics.arc(ulx, uly + height, borderThickness, game.math.degToRad(90), game.math.degToRad(180), false);
        this.statusBarGraphics.drawPolygon(new Phaser.Polygon([ulx, uly + height, ulx, uly + height + borderThickness, ulx - borderThickness, uly + height]));
        // upper right corner
        this.statusBarGraphics.arc(ulx + statusBarWidth, uly, borderThickness, game.math.degToRad(270), game.math.degToRad(0), false);
        this.statusBarGraphics.drawPolygon(new Phaser.Polygon([ulx + statusBarWidth, uly, ulx + statusBarWidth + borderThickness, uly, ulx + statusBarWidth, uly - borderThickness]));
        // lower right corner
        this.statusBarGraphics.arc(ulx + statusBarWidth, uly + height, borderThickness, game.math.degToRad(0), game.math.degToRad(90), false);
        this.statusBarGraphics.drawPolygon(new Phaser.Polygon([ulx + statusBarWidth, uly + height, ulx + statusBarWidth + borderThickness, uly + height, ulx + statusBarWidth, uly + height + borderThickness]));

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
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // UPDATE HELPERS
    // --------------------------------------------------------------------------------------------------------------------------

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
    updateStatusBar: function (statusBarKey, current, max) {
        // Get status bar
        var statusBar = statusBars[statusBarKey];

        var animation = game.add.tween(statusBar.cropRect).to({ 'width': (current / max) * statusBarWidth }, 200);

        animation.start();

    },

    /**==========================================================================================================================
    * @name UPDATE SCORE
    * 
    * @description Sets the gameScore value and updates the score display
    * 
    * @param {int} newScore - The new score value
    * @param {bool} isReset - If true gameScore is newScore, else gameScore is gameScore + newScore
    *///=========================================================================================================================
    updateScore: function (newScore, isReset) {
        if (isReset) {
            this.gameScore = newScore;
        }
        else {
            this.gameScore += newScore;
        }
        this.scoreDisplay.setText(this.gameScore.toString());
    },


};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////