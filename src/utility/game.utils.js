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
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // USER INTERFACE
    // --------------------------------------------------------------------------------------------------------------------------
    
    /**==========================================================================================================================
    * @name CENTER GAME OBJECTS
    * 
    * @description Centers passed in game objects by setting anchor accordingly
    * 
    * @param {array} objects - Array of phaser game objects
    *///=========================================================================================================================
    centerGameObjects : function(objects)
    {
        objects.forEach(function (object) 
        {
           object.anchor.setTo(0.5);
        });
    },
    
    /**==========================================================================================================================
    * @name GET OBJECT CENTER
    * 
    * @description Returns the center of the object
    * 
    * @param {Object} object - Phaser game object we we want the center of
    * 
    * @return {Object} - "x" and "y" center of the sprite 
    *///=========================================================================================================================
    getObjectCenter : function(object)
    {
        return { "x" : Math.floor(object.x + object.width / 2), "y" : Math.floor(object.y + object.height / 2) };
    },
    
    /**==========================================================================================================================
    * @name GET CANVAS SCREENSHOT
    * 
    * @description Creates Image object with a photo of the canvas added to it.
    * 
    * @return {Image} - Image object containing a picture of the canvas
    *///=========================================================================================================================
    getCanvasScreenshot : function()
    {
        var canvasImage = new Image();
        canvasImage.src = game.canvas.toDataURL("image/png");
        
        return canvasImage;
    },
    
    /**==========================================================================================================================
     * @name lIGHTEN DARKEN COLOR
     *
     * @description Lightens or darkens a hexadecimal color (0xABCDEF). Positive lightens, negative darkens.
     * 
     * @param {hex} col - RGB hex color code 0xABCDEF
     * @param {int} amt - positive lightens, negative darkens
     *
     * @returns {hex} - adjusted color in hex
     * 
     * Accreditation:
     * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
     *///=========================================================================================================================    
    lightenDarkenColor: function(col,amt) 
    {
        var num = parseInt(col,16);
        var r = (num >> 16) + amt;
        var b = ((num >> 8) & 0x00FF) + amt;
        var g = (num & 0x0000FF) + amt;
        var newColor = g | (b << 8) | (r << 16);
        return newColor.toString(16);
    },
    
    /**==========================================================================================================================
    * @name MAKE NINE PATCH PANEL
    * 
    * @description Creates a Nine Patch image with the given information.
    * 
    * @param {string} ninePatchKey - The key specified for the cached NinePatch object 
    * @param {float} x - x position of panel
    * @param {float} y - y position of panel
    * @param {float} width - Width of panel
    * @param {float} height - Height of panel
    * @param {float} anchorX -  x anchor 
    * @param {float} anchorY - y anchor
    * 
    * @return {Phaser.NinePatchImage} - A Phaser Nine Patch Image Sprite
    *///=========================================================================================================================
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
    },
    
    /**==========================================================================================================================
    * @name ADD MENU ITEM
    * 
    * @description Menu item factory
    * 
    * @param {string} text - Text to be displayed 
    * @param {int} x - x coordinate of the text
    * @param {int} y - y coordinate of the text
    * @param {Object} optionStyle - Style of the text
    * @param {function} onOver - Function called when text is hovered over
    * @param {function} onOut - Function called after text is hovered over
    * @param {function} callback - Callback function to be called when the menu option is clicked
    *///=========================================================================================================================
    addMenuItem: function(text, x, y, optionStyle, onOver, onOut, callback) 
    {
        // Add menu text to game
        var menuText = game.add.text(x, y, text, optionStyle);

        // Add these functions to the menu text
        menuText.inputEnabled = true;
        menuText.events.onInputUp.add(callback);
        menuText.events.onInputOver.add(onOver);
        menuText.events.onInputOut.add(onOut);
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ANIMATIONS
    // --------------------------------------------------------------------------------------------------------------------------
    
    
    /**==========================================================================================================================
    * @name FRAMES INFO
    * 
    * @description Stores relevant information to generate key frames with Phaser.
    * 
    * @param {string} prefix - The start of the filename
    * @param {int} start - Number to start sequentilally counting from
    * @param {int} stop - The number to count to
    * @param {string} suffix - The end of the filename
    * @param {int} zeroPad - The number of zeroes to pad the min and max values with
    *///=========================================================================================================================
    FramesInfo: function(prefix, start, stop, suffix, zeroPad)
    {
        this.prefix = prefix;
        this.start = start;
        this.stop = stop;
        this.suffix = suffix;
        this.zeroPad = zeroPad;
    },


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // MATH
    // --------------------------------------------------------------------------------------------------------------------------

    /**==========================================================================================================================
    * @name PYTHAG THEOREM
    * 
    * @description Classic pythagorean theorem
    * 
    * @param {float} a - side a length
    * @param {float} b - side b length
    * 
    * @return I'll let your middle school math do the rest
    *///=========================================================================================================================
    pythagTheorem: function (a, b)
    {
        return Math.sqrt(a * a + b * b);
    },
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // DIRECTIONS
    // --------------------------------------------------------------------------------------------------------------------------

    /**==========================================================================================================================
    * @name DIRECTIONS
    * 
    * @description Enumeration of directions to move for enemy ship AI
    *///=========================================================================================================================
    DIRECTIONS: {
        RIGHT: 0,
        UPRIGHT: 1,
        UP: 2,
        UPLEFT: 3,
        LEFT: 4,
        DOWNLEFT: 5,
        DOWN: 6,
        DOWNRIGHT: 7
    },

    /**==========================================================================================================================
    * @name GET START DIRECTION
    * 
    * @description Gets a good start direction for an enemy ship
    *///=========================================================================================================================
    getStartDirection: function ()
    {
        var choice = Math.floor(Math.random() * 3);
        return (5 + choice);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    


};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////