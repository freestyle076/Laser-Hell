// ================================================================================================================================
// playerShip.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Player ship
// ===============================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**=========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {string} mainSprite - key for ship sprite image
* @param {string} explosionSprite - key for explosion sprite image
* @param {float} maxHealth - maximum and starting health for ship
* @param {float} maxWeaponHeat - maximum weaponheat for player ship (heat inits to 0)
* @param {float} speed - movement speed of ship
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
*
* @description PlayerShip constructor
*///=========================================================================================================================
PlayerShip = function (game, x, y, mainSprite, explosionSprite, maxHealth, maxWeaponHeat, speed, skills, group) {
    // base class constructor
    Ship.call(this, game, x, y, mainSprite, explosionSprite, maxHealth, speed, skills, group);
    this.scale.setTo(0.8, 0.8);
    // weaponheat members
    this.weaponHeat = 0;
    this.maxWeaponHeat = maxWeaponHeat;
};
PlayerShip.prototype = Object.create(Ship.prototype);
PlayerShip.prototype.constructor = PlayerShip;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// SHIP FUNCTIONS
// --------------------------------------------------------------------------------------------------------------------------

    /**==========================================================================================================================
    * @name UPDATE
    *  
    * @description OVERRIDE called automatically by World.update
    *///=========================================================================================================================
/*    PlayerShip.prototype.update = function () {
        // this functions is called automatically on the game's update function
    };
    */
    /**==========================================================================================================================
    * @name HEAL
    *  
    * @param {float} howMuch - amount to modify ships health by
    *
    * @description adds howMuch to the ship's health member
    *///=========================================================================================================================
    PlayerShip.prototype.heal = function (howMuch) {
        this.health += howMuch;
    };

    /**==========================================================================================================================
    * @name COOL WEAPON
    *  
    * @param {float} howMuch - amount to modify ships health by
    *
    * @description adds howMuch param to the ship's weaponheat member
    *///=========================================================================================================================
    PlayerShip.prototype.heat = function (howMuch) {
        this.weaponHeat += howMuch;
    };