// ================================================================================================================================
// slasher.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Slasher enemy ship
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
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
* @param {float} speed - ship's movement speed
*
* @description Destroyer constructor
*///=========================================================================================================================
Slasher = function (game, x, y, mainSprite, explosionSprite, maxHealth, speed, skills, group) {
    EnemyShip.prototype.call(game, x, y, mainSprite, explosionSprite, EnemyShip.slasherHealth, skills, group);
}
Slasher.prototype = Object.create(EnemyShip.prototype);
Slasher.prototype.constructor = Slasher;