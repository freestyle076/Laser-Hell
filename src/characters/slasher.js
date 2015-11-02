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
* @param {float} speed - ship's movement speed
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
*
* @description Slasher constructor
*///=========================================================================================================================
Slasher = function (game, x, y, speed, skills, group) {

    var mainSprite = 'red_ship_02';
    var explosionSprite = 'expl_01_0021';
    var maxHealth = 20;
    var speed = 10;

    EnemyShip.call(this, game, x, y, mainSprite, explosionSprite, maxHealth, speed, skills, group);
    this.scale.setTo(0.4, 0.4);
}
Slasher.prototype = Object.create(EnemyShip.prototype);
Slasher.prototype.constructor = Slasher;