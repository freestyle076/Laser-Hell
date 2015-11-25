// ================================================================================================================================
// splash.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Screen that loads all of the game's necessary assets and uses a loading bar to notify the user of its progress.
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Splash = function () {};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Splash.prototype = 
{   
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // MAIN PHASER FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------

    /**==========================================================================================================================
    * @name INIT
    * 
    * @description Initialize splash screen
    *///=========================================================================================================================
    init: function()
    {
        // Make loading bar, logo, and status text objects
        this.loadingBar = game.make.sprite(game.world.centerX-(256/2), 400, "loading");
        this.logo = game.make.sprite(game.world.centerX, 100, 'brand');
        this.status = game.make.text(game.world.centerX, 380, 'Loading Assets...', {fill: "white", font:"30px Audiowide" });
        
        // Center these objects (loading bar doesn't need it or it will load from center)
        gameUtils.centerGameObjects([this.logo, this.status]);
    },

    /**==========================================================================================================================
    * @name PRELOAD
    * 
    * @description Preload all of the game's assets
    *///=========================================================================================================================
    preload: function() 
    {
        // Add pre-load sprites
        game.add.existing(this.logo);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        
        // Set loading bar to be the preload sprite
        this.load.setPreloadSprite(this.loadingBar);

        // Load everything
        this.status.setText('Loading Scripts...'); this.loadScripts();
        this.status.setText('Loading Images...'); this.loadImages();
        this.status.setText('Decoding Sounds...'); this.loadSounds();
        this.status.setText('Decoding Fonts...'); this.loadFonts();
    },
    
    /**==========================================================================================================================
    * @name CREATE
    * 
    * @description Called after everything is ready. Changes label, adds other states, and starts music.
    *///=========================================================================================================================
    create: function() 
    {
        // Load nine patches (have to make sure that the atlas is loaded before doing this)
        this.status.setText('Loading NinePatches...'); this.loadNinePatches();
        
        // Change loading to decoding
        this.status.setText('Decoding Music...');
        
        // Add game states
        this.addGameStates();
        
        // Start music
        this.addMenuMusic();
    },
   
    /**==========================================================================================================================
    * @name UPDATE
    * 
    * @description 
    *  Method that's called over and over again that will make the game stay on this screen until the music is decoded.
    *///=========================================================================================================================
    update: function()
    {
        // Only move to the next state when the music is decoded
        if(this.cache.isSoundDecoded('menu-music'))
        {
            // Set status to ready
            this.status.setText('Ready!');
            
            // Set a small timeout so you see the label being changed
            setTimeout(function() 
            {
                game.state.start("GameMenu");
            }, 500);
        }
    },

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // PRELOAD HELPERS
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name LOAD SCRIPTS
    * 
    * @description Loads all of the source scripts
    *///=========================================================================================================================
    loadScripts: function() 
    {   
        // Game States
        game.load.script('gamemenu', 'src/states/gamemenu.js');
        game.load.script('game', 'src/states/game.js');
        game.load.script('gameover', 'src/states/gameover.js');
        game.load.script('options', 'src/states/options.js');
        
        // Game helpers
        game.load.script('collision', 'src/states/game_lib/collision.js');
        game.load.script('spawning', 'src/states/game_lib/spawning.js');
        
        // Objects
        game.load.script('projectile', 'src/objects/projectile.js');
        game.load.script('powerups', 'src/objects/powerup.js');
        game.load.script('skills', 'src/objects/skill.js');
        
        // Ships
        game.load.script('ship', 'src/characters/ship.js');
        game.load.script('enemyShip', 'src/characters/enemyShip.js');
    },

    /**==========================================================================================================================
    * @name LOAD SOUNDS
    * 
    * @description Loads all of the game's music, UI, and combat sounds
    *///=========================================================================================================================
    loadSounds: function() 
    {
        // Music
        game.load.audio('game-music', 'assets/sounds/music/game-music.ogg');
        game.load.audio('menu-music', 'assets/sounds/music/menu-music.ogg');
        
        // Combat Sounds
    },

    /**==========================================================================================================================
    * @name LOAD IMAGES
    * 
    * @description Loads all of the game's images and atlases.
    *///=========================================================================================================================
    loadImages: function() 
    {
        // Backgrounds
        game.load.image('game', 'assets/backgrounds/game.png');
        game.load.image('game-menu', 'assets/backgrounds/main-screen.png');
        
        // UI
        game.load.atlasJSONHash('ui-atlas', 'assets/images/game/ui.png', 'assets/images/game/ui.json');
        
        // Asteroids
        game.load.atlasJSONHash('asteroids-atlas', 'assets/images/game/asteroids.png', 'assets/images/game/asteroids.json');
        
        // Pickups
        game.load.atlasJSONHash('powerups-atlas', 'assets/images/game/powerups.png', 'assets/images/game/powerups.json');
        
        // Ships and Projectiles
        game.load.atlasJSONHash('ships-and-projectiles-atlas', 'assets/images/game/ships-and-projectiles.png', 'assets/images/game/ships-and-projectiles.json');
        
        // Explosion
        game.load.spritesheet('kaboom', 'assets/images/game/explode.png', 96, 96);
    },
    
    /**==========================================================================================================================
    * @name LOAD FONTS
    * 
    * @description Loads all of the game fonts using google's web font loader
    *///=========================================================================================================================
    loadFonts: function() 
    {
        WebFont.load
        ({ 
            custom: 
            {
              families: ['Tron']
            }
        });
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE HELPERS
    // --------------------------------------------------------------------------------------------------------------------------
   
    /**==========================================================================================================================
    * @name LOAD NINE PATCHES
    * 
    * @description 
    *  Adds all of the nine patch images for the game. Needs to be called after PRELOAD because we must be sure that the atlas
    *  is loaded.
    *///=========================================================================================================================
    loadNinePatches : function()
    {
        // Note: The last four arguments are left, right, top and bottom points in the nine patch image
        game.cache.addNinePatch('metalPanel_purpleCorner', 'ui-atlas', 'metalPanel_purpleCorner', 36, 18, 24, 24);
        game.cache.addNinePatch('metalPanel_redCorner', 'ui-atlas', 'metalPanel_redCorner', 36, 18, 24, 24);
        game.cache.addNinePatch('glassPanel', 'ui-atlas', 'glassPanel', 6, 6, 6, 12);
    },
    
    /**==========================================================================================================================
    * @name ADD GAME STATES
    * 
    * @description Add the remaining game states for the game
    *///=========================================================================================================================
    addGameStates: function() 
    {
        game.state.add("GameMenu", GameMenu);
        game.state.add("Game", Game);
        game.state.add("GameOver", GameOver);
        game.state.add("Options", Options);
    },
   
    /**==========================================================================================================================
    * @name ADD MENU MUSIC
    * 
    * @description Sets up the music player, adds the loaded game audio, and plays the menu music
    *///=========================================================================================================================
    addMenuMusic: function() 
    {
        musicPlayer = game.sound;
        musicPlayer.play('menu-music', 1, true);
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////