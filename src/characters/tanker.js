// ================================================================================================================================
// tanker.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Tanker enemy ship
// ===============================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**=========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
*
* @description Tanker constructor
*///=========================================================================================================================
Tanker = function (game, x, y,skills, group) {

    var mainSprite = 'red_ship_01';
    var explosionSprite = 'expl_01_0021';
    var maxHealth = 100;
    var speed = 5;

    EnemyShip.call(this, game, x, y, mainSprite, explosionSprite, EnemyShip.tankerHealth, speed, skills, group);
}
Tanker.prototype = Object.create(EnemyShip.prototype);
Tanker.prototype.constructor = Tanker;