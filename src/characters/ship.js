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
* @param {string} explosionSprite - key for explosion sprite image
* @param {float} maxHealth - maximum and starting health for ship
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
* @param {float} speed - ship's movement speed
*
* @description Ship constructor
*///=========================================================================================================================
Ship = function (game, x, y, mainSprite, explosionSprite, maxHealth, speed, skills, group) {

    // Calls Phaser.Sprite constructor
    // Requires existing loaded image with key: spriteKey
    Phaser.Sprite.call(this, game, x, y, 'ships-atlas', mainSprite);
    // Health values
    this.health = this.maxHealth = maxHealth;

    // Explosion sprite key
    this.explosionSprite = explosionSprite;

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

        // fun tidbet, to achieve proportionate (same radius) horizontal movement
        // change x and y by speed/2

        // check all 8 directions, most complex (hard to satisfy) first
        if (isUp && isRight) {
            this.x -= this.speed / 2;
            this.y += this.speed / 2;
        }
        else if (isUp && isLeft) {
            this.x -= this.speed / 2;
            this.y -= this.speed / 2;
        }
        else if (isDown && isLeft) {
            this.x -= this.speed / 2;
            this.y += this.pseed / 2;
        }
        else if (isDown && isRight) {
            this.x += this.speed / 2;
            this.y += this.speed / 2;
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

        // spawn explosionSprite by switching textures
        //this.loadTexture('projectiles-atlas',this.explosionSprite); //doesn't replce

        //TODO: Could add some motion/scaling to explosion
        this.kill();
        /*
        // dissapear timeout for explosion
        var animation = game.add.tween(this).to({ 'alpha': 0 }, 1000);
        animation.onComplete.add(this.kill);

        setTimeout(function () {
            animation.start();
        }, 200);*/
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


    