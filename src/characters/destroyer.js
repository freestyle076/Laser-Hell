// ================================================================================================================================
// destroyer.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Destroyer enemy ship
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
* @description Destroyer constructor
*///=========================================================================================================================

Destroyer = function (game, x, y, skills, group) {

    var mainSprite = 'red_ship_03';
    var explosionSprite = 'expl_02_0021';
    var maxHealth = 50;
    var speed = 2;

    EnemyShip.call(this, game, x, y, mainSprite, explosionSprite, EnemyShip.destroyerHealth, speed, skills, group);

    this.scale.setTo(0.7, 0.7);
}
Destroyer.prototype = Object.create(EnemyShip.prototype);
Destroyer.prototype.constructor = Destroyer;
