// ================================================================================================================================
// game.utils.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Game utility class
// ================================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var gameUtils = 
{
    // ===========================================================================================================================
    // CENTER GAME OBJECTS
    // --------------------------------------------------------------------------------------------------------------------------
    // Centers passed in game objects by setting anchor accordingly
    // 
    // @param {array} objects
    //  Array of phaser game objects
    // ===========================================================================================================================
    centerGameObjects : function(objects)
    {
        objects.forEach(function (object) 
        {
           object.anchor.setTo(0.5);
        });
    },
    
    // ===========================================================================================================================
    // GET CANVAS SCREENSHOT
    // --------------------------------------------------------------------------------------------------------------------------
    // Creates Image object with a photo of the canvas added to it.
    // 
    // @return {Image} 
    //  Image object containing a picture of the canvas
    // ===========================================================================================================================
    getCanvasScreenshot : function()
    {
        var canvasImage = new Image();
        canvasImage.src = game.canvas.toDataURL("image/png");
        
        return canvasImage;
    },
    
    // ===========================================================================================================================
    // MAKE GLASS PANEL
    // --------------------------------------------------------------------------------------------------------------------------
    // Creates Image object with a photo of the canvas added to it.
    // 
    // @param {string} ninePatchKey
    //  The key specified for the cached NinePatch object 
    // 
    // @param {float} x
    //  x position of panel
    //  
    // @param {float} y
    //  y position of panel
    //   
    // @param {float} width
    //  Width of panel
    //  
    // @param {float} height
    //  Height of panel
    // 
    // @param {float} anchorX
    //  x anchor 
    // 
    // @param {float} anchorY
    //  y anchor
    // 
    // @return {Phaser.NinePatchImage} 
    //  A Phaser Nine Patch Image Sprite
    // ===========================================================================================================================
    makeNinePatchPanel : function(ninePatchKey, x, y, width, height, anchorX, anchorY)
    {
        // Nine patch panel sprite
        var ninePatchPanel = new Phaser.NinePatchImage(game, x, y, ninePatchKey);
        
        // Set the measures for image - [AUTOMATICALLY UPDATED]
        ninePatchPanel.targetWidth  = width;
        ninePatchPanel.targetHeight = height;
        
        // Set anchor for image - [NEEDS MANUAL UPDATE] 
        ninePatchPanel.anchor.setTo(anchorX, anchorY);
        ninePatchPanel.UpdateImageSizes();
        
        return ninePatchPanel;
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////