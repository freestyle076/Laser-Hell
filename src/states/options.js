// ================================================================================================================================
// options.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Screen that emulates a pop-up window and allows the player to see the game's controls and mute the sound/music.
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Options = function () {},
        canvasImage,
        backState;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Options.prototype = 
{
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    // MAIN PHASER FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name PRELOAD
    * 
    * @description Preloads option menu's assets
    *///=========================================================================================================================
    preload: function() 
    {
        // Load canvas image
        game.load.image('canvas-image', this.canvasImage.src, this.canvasImage);
    },
    
    /**==========================================================================================================================
    * @name CREATE
    * 
    * @description Creates the options menu
    *///=========================================================================================================================
    create: function() 
    {
        // Add background image
        game.add.sprite(0, 0, 'canvas-image');
        
        // Add options panel
       var optionsPanel = gameUtils.makeNinePatchPanel('metalPanel_purpleCorner', game.width/2, game.height/2, 500, 500, 0.5, 0.5);
       optionsPanel.alpha = 0.80;
       var optionsPanelCenter = gameUtils.getObjectCenter(optionsPanel);

       // Add game controls
       this.addControlKeys(optionsPanelCenter);
       
       // Add menu items for music, sound, and going back
       this.addMenuItems(optionsPanelCenter);
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE HELPERS
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name ADD CONTROL KEYS
    * 
    * @description Adds control key sprites that change to what key they correspond to when hovered over
    * 
    * @param {Object} optionsPanelCenter - "x" and "y" center of the panel 
    *///=========================================================================================================================
    addControlKeys : function(optionsPanelCenter)
    {
        // WASD Key Sprite
       var wasdKeys = game.add.sprite(0, 0, 'ui-atlas', 'wasd-keys', this.hud);
       wasdKeys.anchor.setTo(0.5);
       wasdKeys.x = optionsPanelCenter.x;
       wasdKeys.y = optionsPanelCenter.y - 200;
       
       // ALT and Space Key Sprite
       var altSpaceKeys = game.add.sprite(0, 0, 'ui-atlas', 'alt-space-keys', this.hud);
       altSpaceKeys.anchor.setTo(0.5);
       altSpaceKeys.x = optionsPanelCenter.x;
       altSpaceKeys.y = optionsPanelCenter.y - 200 + wasdKeys.height;
       
       // Key hover animations
       this.addControlKeyBehavior(wasdKeys, ['wasd-keys', 'wasd-keys_hover']);
       this.addControlKeyBehavior(altSpaceKeys, ['alt-space-keys', 'alt-space-keys_hover']);
    },

    /**==========================================================================================================================
    * @name ADD CONTROL KEY BEHAVIOR
    * 
    * @description 
    *  Adds an animation with the given textures so the first frame is shown "onOut" and the second is shown "onOver"
    * 
    * @param {Phaser.Sprite} controlKey - Sprite to add hover animations to
    * @param {string[]} textureHoverArray - A string array of frame names from a texture atlas
    *///=========================================================================================================================
    addControlKeyBehavior : function(controlKey, textureHoverArray)
    {
        // Add "animation" (or hover behavior) to the control key sprite
        var hoverAnim = controlKey.animations.add('hover_' + textureHoverArray[0], [textureHoverArray[0], textureHoverArray[1]], 30, false);
        hoverAnim.enableUpdate = true;
        hoverAnim.frame = 0;
        
        // Add onInputOver function to change texture to hover
        var onOver = function(target) { hoverAnim.frame = 1; };
        
        // Add onInputOutfunction to change texture to normal
        var onOut = function(target) { hoverAnim.frame = 0; };
        
        // Add these functions to the control key sprite
        controlKey.inputEnabled = true;
        controlKey.events.onInputOver.add(onOver);
        controlKey.events.onInputOut.add(onOut);
    },
    
    /**==========================================================================================================================
    * @name ADD MENU ITEMS
    * 
    * @description Creates a "Play Sound" and "Play Music" menu items on this menu screen.
    * 
    * @param {Object} optionsPanelCenter - "x" and "y" center of the panel 
    *///=========================================================================================================================
    addMenuItems: function(optionsPanelCenter) 
    {
        var textX = optionsPanelCenter.x - 175;
        var textY = optionsPanelCenter.y;
        
        var itemStyle =
        {
            font: '35px Tron', 
            fill: '#333333',
            align: 'left', 
            stroke: 'rgba(255,255,255,1)', 
            strokeThickness: 4
        };
        
        // Add onInputOver function to change menu text
        var onOver = function(target) 
        {
            target.fill = "#8E3EAD";
            target.stroke = "rgba(0,0,0,1)";
        };
        
        // Add onInputOutfunction to change menu text
        var onOut = function(target) 
        {
            target.fill = "#333333";
            target.stroke = "rgba(255,255,255,1)";
        };
        
        // Create sound menu item
        gameUtils.addMenuItem(gameOptions.playSound ? 'Mute Sound' : 'Play Sound', textX, textY, itemStyle, onOver, onOut, this.soundCallback);
        
        // Move down for next item
        textY += 80;
        
        // Create music menu item
        gameUtils.addMenuItem(gameOptions.playMusic ? 'Mute Music' : 'Play Music', textX, textY, itemStyle, onOver, onOut, this.musicCallback);
       
        // Move down for next item
        textY += 80;

        // Create back menu item
        var myBackState = this.backState;
        gameUtils.addMenuItem('<- Back', textX, textY, itemStyle, onOver, onOut, function(target) { game.state.start(myBackState); });
       
    },
    
    /**==========================================================================================================================
    * @name SOUND CALLBACK
    * 
    * @description Callback function for game option that controls sound
    * 
    * @param {Phaser.Sprite} target - Target of the callback event
    *///=========================================================================================================================
    soundCallback : function(target)
    {
        // Toggle sound option
        gameOptions.playSound = !gameOptions.playSound;

        // Change menu text and corresponding volume
        if(gameOptions.playSound)
        {
            target.text = 'Mute Sound';
        }
        else
        {
            target.text = 'Play Sound';
        }
    },
    
    /**==========================================================================================================================
    * @name MUSIC CALLBACK
    * 
    * @description Callback function for game option that controls music
    * 
    * @param {Phaser.Sprite} target - Target of the callback event
    *///=========================================================================================================================
    musicCallback : function(target)
    {
        // Toggle music option
        gameOptions.playMusic = !gameOptions.playMusic;

        // Change menu text and corresponding volume
        if(gameOptions.playMusic)
        {
            target.text = 'Mute Music';
            musicPlayer.volume = 1;
        }
        else
        {
            target.text = 'Play Music';
            musicPlayer.volume = 0;
        }
    }

    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////