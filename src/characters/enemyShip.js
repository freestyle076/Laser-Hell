// ================================================================================================================================
// enemyShip.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// EnemyShip class extension for enemy ships
// ===============================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**==========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {string} mainSprite - key for ship sprite image
* @param {string} explosionSprite - key for explosion sprite image
* @param {float} maxHealth - maximum and starting health for ship
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
*
* @description EnemyShip constructor does not need to be overriden
*///=========================================================================================================================
EnemyShip = Ship.prototype.call;

EnemyShip.prototype = Object.create(Ship.prototype);
EnemyShip.prototype.constructor = EnemyShip;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ENEMY SHIP FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**==========================================================================================================================
    * @name ACT
    *  
    * @description ABSTRACT performs the enemies behavior
    *///=========================================================================================================================
    EnemyShip.prototype.act = function () {
        //override
    };
    EnemyShip.prototype.destroyerHealth = 75;
    EnemyShip.prototype.tankerHealth = 250;
    EnemyShip.prototype.slasherHealth = 100;


