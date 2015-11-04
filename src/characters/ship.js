// ================================================================================================================================
// ship.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Base class for game ships, extends Phaser.Sprite
// ===============================================================================================================================

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**=========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {string} mainSprite - key for ship sprite image
* @param {[string]} explosionFrames - frames for explosion animation
* @param {float} maxHealth - maximum and starting health for ship
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
* @param {float} speed - ship's movement speed
*
* @description Ship constructor
*///=========================================================================================================================
Ship = function (game, x, y, mainSprite, explosionFrames, maxHealth, speed, skills, group) {

    // Calls Phaser.Sprite constructor
    // Requires existing loaded image with key: spriteKey
    Phaser.Sprite.call(this, game, x, y, 'ships-atlas', mainSprite);

    // Health values
    this.health = this.maxHealth = maxHealth;

    // add explosion animation created from frames
    this.animations.add('explosion', explosionFrames);

    // kill ship on explosion animation completion
    this.animations.getAnimation('explosion').killOnComplete = true;

    // ship's speed
    this.speed = speed;

    // Ship's skill
    this.skills = skills;

    // List of projectiles
    this.projectiles = [];

};
Ship.prototype = Object.create(Phaser.Sprite.prototype);
Ship.prototype.constructor = Ship;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // SHIP FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------

    /**==========================================================================================================================
    * @name IS DEAD
    *
    * @description Checks if the ship is dead
    *
    * @return {bool} - true if health is above 0, false otherwise
    *///=========================================================================================================================
    Ship.prototype.isDead = function () {
        if (health <= 0.0) {
            return true;
        }
        else {
            return false;
        }
    };

    /**==========================================================================================================================
    * @name MOVE
    *
    * @description Moves the ship in the signaled direction
    *
    * @return {bool} - true if health is above 0, false otherwise
    *///=========================================================================================================================
    Ship.prototype.move = function (isUp, isRight, isDown, isLeft) {

        // check all 8 directions, most complex (hard to satisfy) first
        if (isUp && isRight) {
            this.x += this.speed / 1.5;
            this.y -= this.speed / 1.5;
        }
        else if (isUp && isLeft) {
            this.x -= this.speed / 1.5;
            this.y -= this.speed / 1.5;
        }
        else if (isDown && isLeft) {
            this.x -= this.speed / 1.5;
            this.y += this.speed / 1.5;
        }
        else if (isDown && isRight) {
            this.x += this.speed / 1.5;
            this.y += this.speed / 1.5;
        }
        else if (isRight) {
            this.x += this.speed;
        }
        else if (isUp) {
            this.y -= this.speed;
        }
        else if (isLeft) {
            this.x -= this.speed;
        }
        else if (isDown) {
            this.y += this.speed;
        }
    };


    /**==========================================================================================================================
    * @name TAKE DAMAGE
    *
    * @description Reduces the ship's health
    *
    * @param {float} damage - amount by which to lower ship's health
    *///=========================================================================================================================
    Ship.prototype.takeDamage = function (damage) {
        this.health -= damage;
    };


    /**==========================================================================================================================
    * @name DIE
    *
    * @description Displays ship's explosion sprite, frees resources
    *///=========================================================================================================================
    Ship.prototype.die = function () {
        this.animations.play('explosion');
    };

    /**==========================================================================================================================
    * @name FIRE
    *
    * @description Triggers the skill's fire method, collects projectile
    *
    * @param {Skill} skill - skill to fire
    *///=========================================================================================================================
    Ship.prototype.fire = function (skill) {
        // fire skill
        var projectile = skill.fire();

        // collect projectile sprite
        this.projectiles.push(projectile);
    };


    