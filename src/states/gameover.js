// ================================================================================================================================
// gameover.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Screen that emulates a pop-up window and allows the player to play again or go back to the menu.
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var GameOver = function () {},
        canvasImage;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

GameOver.prototype = 
{
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    // MAIN PHASER FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name PRELOAD
    * 
    * @description Preloads game over menu's assets
    *///=========================================================================================================================
    preload: function() 
    {
        // Load canvas image
        game.load.image('canvas-image', this.canvasImage.src, this.canvasImage);
    },
    
    /**==========================================================================================================================
    * @name CREATE
    * 
    * @description Creates the game over menu
    *///=========================================================================================================================
    create: function() 
    {
        // Add background image
        game.add.sprite(0, 0, 'canvas-image');
        
        // Add game menu panel
       var gameOverMenuPanel = gameUtils.makeNinePatchPanel('metalPanel_redCorner', game.width/2, game.height/2, 500, 500, 0.5, 0.5);
       gameOverMenuPanel.alpha = 0.80;
       var gameOverMenuPanelCenter = gameUtils.getObjectCenter(gameOverMenuPanel);

       // Add game over text
       this.addGameOverText(gameOverMenuPanelCenter);
       
       // Add menu items for music, sound, and going back
       this.addMenuItems(gameOverMenuPanelCenter);
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CREATE HELPERS
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name ADD MENU ITEMS
    * 
    * @description Creates a "Play Sound" and "Play Music" menu items on this menu screen.
    * 
    * @param {Object} gameOverMenuPanelCenter - "x" and "y" center of the panel 
    *///=========================================================================================================================
    addGameOverText: function(gameOverMenuPanelCenter) 
    {
        var textX = gameOverMenuPanelCenter.x - 160;
        var textY = gameOverMenuPanelCenter.y - 200;
        
        var itemStyle =
        { 
            font: "60px Tron", 
            fill: '#B17BE3', 
            align: 'center',
            stroke: 'rgba(0,0,0,0.5)', 
            strokeThickness: 2
        };
        
        var gameOverText = game.add.text(textX, textY, "Game \nOver!", itemStyle);
        gameOverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    },
    
    /**==========================================================================================================================
    * @name ADD MENU ITEMS
    * 
    * @description Creates a "Play Sound" and "Play Music" menu items on this menu screen.
    * 
    * @param {Object} gameOverMenuPanelCenter - "x" and "y" center of the panel 
    *///=========================================================================================================================
    addMenuItems: function(gameOverMenuPanelCenter) 
    {
        var textX = gameOverMenuPanelCenter.x - 175;
        var textY = gameOverMenuPanelCenter.y;
        
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
        gameUtils.addMenuItem("Play Again", textX, textY, itemStyle, onOver, onOut, function(target) { game.state.start('Game'); });
        
        // Move down for next item
        textY += 80;
        
        // Create music menu item
        gameUtils.addMenuItem("Game Menu", textX, textY, itemStyle, onOver, onOut, function(target) { game.state.start('GameMenu'); });
       
    }

    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////