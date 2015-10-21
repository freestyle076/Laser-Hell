// ================================================================================================================================
// gamemenu.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// 
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var GameMenu = function () {};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

GameMenu.prototype = 
{
    // ===========================================================================================================================
    // ADD MENU OPTION
    // --------------------------------------------------------------------------------------------------------------------------
    // Menu option factory
    // ===========================================================================================================================
    addMenuOption: function(text, callback) 
    {
        // Menu style
        var menuStyle =
        {
            font: "35px Tron", 
            fill: '#ffffff', 
            align: 'left', 
            stroke: 'rgba(0,0,0,0)', 
            strokeThickness: 4
        };
        
        // Add menu text to game
        var menuText = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, menuStyle);
        
        // Add onInputOver function to change menu text
        var onOver = function(target) 
        {
            target.fill = "#D6BBF0";
            target.stroke = "rgba(200,200,200,0.5)";
        };
        
        // Add onInputOutfunction to change menu text
        var onOut = function(target) 
        {
            target.fill = "#FFFFFF";
            target.stroke = "rgba(0,0,0,0)";
        };
        
        // Add these functions to the menu text
        menuText.inputEnabled = true;
        menuText.events.onInputUp.add(callback);
        menuText.events.onInputOver.add(onOver);
        menuText.events.onInputOut.add(onOut);
        
        // Increment the number of menu options
        this.optionCount++;
    },
    
    // ===========================================================================================================================
    // INIT
    // --------------------------------------------------------------------------------------------------------------------------
    // Initialize game menu
    // ===========================================================================================================================
    init: function()
    {   
        // Create title text
        this.titleText = game.make.text(game.world.centerX, 100, "Xeinax: \nSpace Warrior", 
        { 
            font: "55px Tron", 
            fill: '#B17BE3', 
            align: 'left'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        
        this.optionCount = 1;
    },
    
    // ===========================================================================================================================
    // PRELOAD
    // --------------------------------------------------------------------------------------------------------------------------
    // Pre-loads the game menu's assets.
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
        // Add background image
        game.add.sprite(0, 0, 'game-menu');
        
        // Add title 
        game.add.existing(this.titleText);
        
        // Create launch menu option
        this.addMenuOption("Launch", function (target) 
        {
            console.log('You clicked Launch!!');
            game.state.start("Game");
            
        });
        
        // Create options menu option
        this.addMenuOption("Options and Controls", function (target) 
        {
            console.log('You clicked Options!');
        });
        
        // Disallow game to pause
        game.stage.disableVisibilityChange = true;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////