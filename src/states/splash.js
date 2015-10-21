// ================================================================================================================================
// splash.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Class that implements methods for the splash screen, or the screen that loads all of the game's necessary assets and uses a 
// loading bar to notify the user of its progress.
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Splash = function () {},
    playSound = true,
    playMusic = true,
    music;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Splash.prototype = 
{
    // ===========================================================================================================================
    // LOAD SCRIPTS
    // --------------------------------------------------------------------------------------------------------------------------
    // Loads source scripts
    // ===========================================================================================================================
    loadScripts: function() 
    {
        // Vendor libraries
        
        // Game States
        game.load.script('gamemenu','src/states/gamemenu.js');
        game.load.script('game', 'src/states/game.js');
        game.load.script('gameover','src/states/gameover.js');
        game.load.script('options', 'src/states/options.js');
        
        // Objects
        
        // Ships
        
    },

    // ===========================================================================================================================
    // LOAD SOUNDS
    // --------------------------------------------------------------------------------------------------------------------------
    // Loads game sounds
    // ===========================================================================================================================
    loadSounds: function() 
    {
        // Music
        game.load.audio('game-music', 'assets/sounds/music/game-music.ogg');
        game.load.audio('menu-music', 'assets/sounds/music/menu-music.ogg');
        
        // UI Sounds
        
        
        // Combat Sounds
    },

    // ===========================================================================================================================
    // LOAD IMAGES
    // --------------------------------------------------------------------------------------------------------------------------
    // Loads game images
    // ===========================================================================================================================
    loadImages: function() 
    {
        // UI
        game.load.image('menu-icon','assets/images/ui/menu-icon.png');
        game.load.image('primary-icon','assets/images/ui/primary.png');
        game.load.image('secondary-icon','assets/images/ui/secondary.png');
        
        
        // Backgrounds
        game.load.image('game', 'assets/backgrounds/game.png');
        game.load.image('game-menu', 'assets/backgrounds/main-screen.png');
        
        
        // Objects
        
        // Ships
    },

    // ===========================================================================================================================
    // LOAD FONTS
    // --------------------------------------------------------------------------------------------------------------------------
    // Loads game fonts
    // ===========================================================================================================================
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
    
    // ===========================================================================================================================
    // INIT
    // --------------------------------------------------------------------------------------------------------------------------
    // Initialize splash screen
    // ===========================================================================================================================
    init: function()
    {
        // Make loading bar, logo, and status text objects
        this.loadingBar = game.make.sprite(game.world.centerX-(256/2), 400, "loading");
        this.logo = game.make.sprite(game.world.centerX, 100, 'brand');
        this.status = game.make.text(game.world.centerX, 380, 'Loading Assets...', {fill: "white", font:"30px Audiowide" });
        
        // Center these objects (loading bar doesn't need it or it will load from center)
        gameUtils.centerGameObjects([this.logo, this.status]);
    },

    // ===========================================================================================================================
    // PRELOAD
    // --------------------------------------------------------------------------------------------------------------------------
    // Pre-loads all of the game's assets
    // ===========================================================================================================================
    preload: function() 
    {
        // Add pre-load sprites
        game.add.existing(this.logo);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        
        // Set loading bar to be the preload sprite
        this.load.setPreloadSprite(this.loadingBar);

        // Load everything
        this.loadScripts();
        this.loadImages();
        this.loadSounds();
        this.loadFonts();
        
    },
    
    // ===========================================================================================================================
    // CREATE
    // --------------------------------------------------------------------------------------------------------------------------
    // Called after everything is ready. Changes label, adds other states, and starts music.
    // ===========================================================================================================================
    create: function() 
    {
        // Change loading to decoding
        this.status.setText('Decoding Music...');
        
        // Add game states
        this.addGameStates();
        
        // Start music
        this.addGameMusic();
    },
   
    // ===========================================================================================================================
    // UPDATE
    // --------------------------------------------------------------------------------------------------------------------------
    // Method that's called over and over again that will make the game stay on this screen until the music is decoded.
    // ===========================================================================================================================
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
    
    // ===========================================================================================================================
    // ADD GAME STATES
    // --------------------------------------------------------------------------------------------------------------------------
    // Add the remaining game states for the game
    // ===========================================================================================================================
    addGameStates: function() 
    {
        game.state.add("GameMenu", GameMenu);
        game.state.add("Game", Game);
        game.state.add("GameOver", GameOver);
        game.state.add("Options", Options);
    },
   
    // ===========================================================================================================================
    // ADD GAME MUSIC
    // --------------------------------------------------------------------------------------------------------------------------
    // Add the loaded game audio and play the menu music
    // ===========================================================================================================================
    addGameMusic: function() 
    {
        music = game.add.audio('menu-music');
        music.loop = true;
        music.play();
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////