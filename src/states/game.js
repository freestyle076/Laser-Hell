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
        gameScore = 0,
        statusBars = { "health" : null, "weaponHeat" : null },
        playerShip = null;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Game.prototype = 
{
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // MAIN PHASER FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------

    /**==========================================================================================================================
    * @name CREATE
    * 
    * @description Adds tile background, HUD, and sets key bindings.
    *///=========================================================================================================================
    init: function() 
    {
        // Background and HUD
        this.addBackground();
        this.addHUD();

        // Graphics modules for skill icons
        this.primarySkillGraphics = game.add.graphics(0, 0);
        this.secondarySkillGraphics = game.add.graphics(0, 0);

        // Key bindings
        this.setKeyBindings();
        
        // Create and add main ship
        this.addPlayerShip();
        
        // Create and add enemies and objects
        this.addEnemiesAndObjects();
    },

    /**==========================================================================================================================
    * @name UPDATE
    * 
    * @description Performs frame updates to game elements before render
    *///=========================================================================================================================
    update: function()
    {
        // Make enemies act
        spawningGroups.enemies.callAllExists('act', true);
        
        // Get player ship so we can still get it out of scope
        var thisPlayerShip = this.playerShip;
        
        // Enemy collision
        spawningGroups.enemies.forEachExists(function(enemy)
        {
            // Player projectiles
            game.physics.arcade.overlap(enemy, thisPlayerShip.skills[0], collision.enemyShip_projectile, null, this);
            game.physics.arcade.overlap(enemy, thisPlayerShip.skills[1], collision.enemyShip_projectile, null, this);
            
            // Enemy projectiles
            game.physics.arcade.overlap(thisPlayerShip, enemy.skills[0], collision.playerShip_projectile, null, this);
            
            // Player
            game.physics.arcade.overlap(enemy, thisPlayerShip, collision.enemyShip_playerShip, null, this);
        });
        
        // Powerup collision
        spawningGroups.powerups.forEachExists(function(powerup)
        {
           game.physics.arcade.overlap(thisPlayerShip, powerup, collision.playerShip_powerup, null, this);
        });

        // Asteroid collision
        spawningGroups.asteroids.forEachExists(function(asteroid)
        {
            // Player projectiles
            game.physics.arcade.overlap(thisPlayerShip.skills[0], asteroid, collision.projectile_projectile, null, this);
            game.physics.arcade.overlap(thisPlayerShip.skills[1], asteroid, collision.projectile_projectile, null, this);
            
            // Player
            game.physics.arcade.overlap(thisPlayerShip, asteroid, collision.playerShip_projectile, null, this);
        });
    },
        
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE HELPERS
    // --------------------------------------------------------------------------------------------------------------------------
    
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

        // SPACE -> Primary Fire
        var primaryKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        primaryKey.onDown.add(this.primaryFireKeyOnDown, this);

        // ALT -> Secondary Fire
        var secondaryKey = game.input.keyboard.addKey(Phaser.Keyboard.ALT);
        secondaryKey.onDown.add(this.secondaryFireKeyOnDown, this);
    },

    /**==========================================================================================================================
    * @name OPTIONS MENU CALLBACK
    * 
    * @description Takes screenshot of game and transitions to options state
    *///=========================================================================================================================
    optionsMenuCallback: function () 
    {
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
    primaryFireKeyOnDown: function ()
    {
        // fire skill, respond to sucess or failure
        if (this.playerShip.fire(0))
        {
            // light up primary weapon panel - BLUE
            this.primarySkillGraphics.alpha = 0.5;
            this.primarySkillGraphics.beginFill(0x00FFFF);
            this.primarySkillGraphics.drawRoundedRect(this.primaryGlassPanel.x, this.primaryGlassPanel.y, this.primaryGlassPanel.targetWidth, this.primaryGlassPanel.targetHeight, 4);

            // increase weapon heat
            this.playerShip.heat(9);
        }
        else
        {
            // light up secondary skill panel - RED
            this.primarySkillGraphics.alpha = 0.5;
            this.primarySkillGraphics.beginFill(0xFF0000);
            this.primarySkillGraphics.drawRoundedRect(this.primaryGlassPanel.x, this.primaryGlassPanel.y, this.primaryGlassPanel.targetWidth, this.primaryGlassPanel.targetHeight, 4);
        }

        // clear timeout
        var g = this.primarySkillGraphics;
        setTimeout(function () { g.clear(); }, 100);
    },

    /**==========================================================================================================================
    * @name SECONDARY FIRE KEY ON DOWN
    * 
    * @description Secondary fire key on down callback
    *///=========================================================================================================================
    secondaryFireKeyOnDown: function ()
    {
        if (this.playerShip.fire(1))
        {
            // light up secondary skill panel
            this.secondarySkillGraphics.alpha = 0.5;
            this.secondarySkillGraphics.beginFill(0x00FFFF);
            this.secondarySkillGraphics.drawRoundedRect(this.secondaryGlassPanel.x, this.secondaryGlassPanel.y, this.secondaryGlassPanel.targetWidth, this.secondaryGlassPanel.targetHeight, 4);

            // weapon timer
            // this.playerShip.skills[1].fireRate
            // light up secondary skill panel
            this.secondarySkillGraphics.alpha = 0.5;
            this.secondarySkillGraphics.beginFill(0xFFBB00);
            this.secondarySkillGraphics.drawRoundedRect(this.secondaryGlassPanel.x, this.secondaryGlassPanel.y, this.secondaryGlassPanel.targetWidth, this.secondaryGlassPanel.targetHeight, 4);

            // set timeout to clear the red after fireRate
            var g = this.secondarySkillGraphics;
            setTimeout(function ()
            {
                g.clear();
            }, this.playerShip.skills[1].fireRate);

        }
    },
    
    /**==========================================================================================================================
    * @name ADD PLAYER SHIP
    * 
    * @description Adds the player's ship to the game
    *///=========================================================================================================================
    addPlayerShip: function () 
    {
        // visible parameters
        var playerMaxHealth = 100;
        var playerMaxWeaponHeat = 100;
        var playerSpeed = 7;
        var startX = 400;
        var startY = 400;

        // create ship
        this.playerShip = new PlayerShip(game, this, startX, startY, 'blue_ship_01', playerMaxHealth, playerMaxWeaponHeat, playerSpeed);

        // add to game
        game.add.existing(this.playerShip);
    },
    
    /**==========================================================================================================================
    * @name ADD ENEMIES AND OBJECTS
    * 
    * @description Adds enemy ships, asteroids, and powerups to the game along with enabling their spawn methods.
    *///=========================================================================================================================
    addEnemiesAndObjects: function ()
    {
        // Helper variables to make and spawn enemies and objects
        var maxEnemies = 20;
        var enemySpawnRate = 2000;
        var maxAsteroids = 15;
        var asteroidSpawnRate = 500;
        var maxPowerups = 20;
        var powerupSpawnRate = 2000;
        var healingAmount = 100;
        var coolingAmount = 100;
         
        // Create pool of these different enemies/objects and set a spawn timer and method for spawn
        spawning.makeEnemies(maxEnemies, enemySpawnRate, this);
        spawning.makeAsteroids(maxAsteroids, asteroidSpawnRate, this);
        spawning.makePowerups(maxPowerups, powerupSpawnRate, this, healingAmount, coolingAmount);
        spawning.makeExplosions(this);
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
        this.primaryGlassPanel = gameUtils.makeNinePatchPanel('glassPanel', game.width - 55, game.height - 106, 50, 50, 0, 0);
        this.primaryGlassPanel.alpha = 0.5;
        game.add.sprite(this.primaryGlassPanel.x + 3, this.primaryGlassPanel.y + 3, 'ui-atlas', 'primary-icon', this.hud).scale.setTo(0.75, 0.75);
        
        // Secondary icon and backing glasspanel
        this.secondaryGlassPanel = gameUtils.makeNinePatchPanel('glassPanel', game.width - 55, game.height - 54, 50, 50, 0, 0);
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
        var options = game.add.sprite(game.width - 52, 5, 'ui-atlas', 'options-icon', this.hud);
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
        // create scorePanel nine patch
        this.scorePanel = gameUtils.makeNinePatchPanel('metalPanel_purpleCorner', 5, 5, 78, 48, 0, 0);
        this.scorePanel.alpha = 0.7;

        // text component to display game score, empty string init
        this.scoreDisplay = game.add.text(0, 25, "", { fill: "#AA00D4", font: "14px Audiowide" });

        // allow update function to set game score to 0
        this.updateScore(0, true);
    },
    
    /**==========================================================================================================================
    * @name ADD STATUS PANEL
    * 
    * @description Creates and adds the status panel sprites: panel, health bar, and weapon heat bar 
    *///=========================================================================================================================
    addStatusPanel: function()
    {
        // Glass status panel
        var statusPanel = gameUtils.makeNinePatchPanel('glassPanel', 5, game.height - 56, 129, 51, 0, 0);
        statusPanel.alpha = 0.5;
        
        // Status bar helpers
        this.statusBarGraphics = game.add.graphics(0, 0, this.hud);
        this.numStatusBars = 0;
        var upperLeftX = statusPanel.x + 6;
        var upperLeftY = statusPanel.y + 7;
        
        // Health bar and shadow
        this.drawStatusBar("health", "health_statusBar", upperLeftX, upperLeftY, 0x005522, 0x005522);
        // Weapon heat bar and shadow
        this.drawStatusBar("weaponHeat", "weaponHeat_statusBar", upperLeftX, upperLeftY, 0x440055, 0x440055);
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
        var uly = upperLeftY + (this.numStatusBars * 22.8);
        statusBarWidth = 117;
        var height = 16;
        var borderThickness = 2;
        
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
    updateStatusBar: function (statusBarKey, current, max)
    {
        // Get status bar
        var statusBar = statusBars[statusBarKey];

        // static cropping
        statusBar.cropRect.width = (current / max) * statusBarWidth;

        // update the crop
        statusBar.updateCrop();
    },

    /**==========================================================================================================================
    * @name UPDATE SCORE
    * 
    * @description Sets the gameScore value and updates the score display
    * 
    * @param {int} newScore - The new score value
    * @param {bool} isReset - If true gameScore is newScore, else gameScore is gameScore + newScore
    *///=========================================================================================================================
    updateScore: function (newScore, isReset)
    {
        // sets game score
        if (isReset) 
        {
            this.gameScore = newScore;
        }
        // adds to game score
        else 
        {
            this.gameScore += newScore;
        }

        // update text
        this.scoreDisplay.setText(this.gameScore.toString());
        
        // update x position of text
        this.scoreDisplay.x = (this.scorePanel.targetWidth - 5) - this.scoreDisplay.width;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////