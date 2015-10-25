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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // MAIN PHASER FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name INIT
    * 
    * @description Initialize game menu
    *///=========================================================================================================================
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

    /**==========================================================================================================================
    * @name CREATE
    * 
    * @description Called after everything is ready. Adds background, title, and menu options.
    *///=========================================================================================================================
    create: function() 
    {
        // Add background image
        game.add.sprite(0, 0, 'game-menu');
        
        // Add title 
        game.add.existing(this.titleText);
        
        // Add menu items
        this.addMenuItems();

        // Disallow game to pause
        game.stage.disableVisibilityChange = true;
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE HELPERS
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name ADD MENU ITEMS
    * 
    * @description Creates a "launch" and "options" menu items on this menu screen.
    *///=========================================================================================================================
    addMenuItems: function() 
    {
        var textX = game.world.centerX;
        var textY = 280;
        
        var itemStyle =
        {
            font: '35px Tron', 
            fill: '#ffffff',
            align: 'left', 
            stroke: 'rgba(0,0,0,0.5)', 
            strokeThickness: 2
        };
        
        // Add onInputOver function to change menu text
        var onOver = function(target) 
        {
            target.fill = "#D6BBF0";
            target.stroke = "rgba(255,255,255,1)";
        };
        
        // Add onInputOutfunction to change menu text
        var onOut = function(target) 
        {
            target.fill = "#FFFFFF";
            target.stroke = "rgba(0,0,0,0.5)";
        };
        
        // Create launch menu item
        gameUtils.addMenuItem("Launch", textX, textY, itemStyle, onOver, onOut, function (target) { game.state.start("Game"); });
        
        // Move down for next item
        textY += 80;
        
        // Create options menu item
        gameUtils.addMenuItem("Options", textX, textY, itemStyle, onOver, onOut, this.optionsCallback);
    },

    /**==========================================================================================================================
    * @name OPTIONS CALL BACK
    * 
    * @description What is called after the options sprite is clicked
    *///=========================================================================================================================
    optionsCallback: function()
    {
        // Take a screenshot of the screen to "fake" a pop-up and pass this to the options state
        game.state.states['Options'].canvasImage = gameUtils.getCanvasScreenshot();
        
        // Add state that it will go back to
        game.state.states['Options'].backState = 'GameMenu';
        
        // Go to the options state
        game.state.start("Options");
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////