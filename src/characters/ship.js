// ================================================================================================================================
// ship.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// Base class for game ships and player ship class
// ===============================================================================================================================

// SHIP
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**=========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {string} mainSprite - key for ship sprite image
* @param {float} maxHealth - maximum and starting health for ship
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
* @param {float} speed - ship's movement speed
*
* @description Ship constructor
*///=========================================================================================================================
Ship = function (game, x, y, mainSprite, maxHealth, speed, skills, group) {

    // Calls Phaser.Sprite constructor
    // Requires existing loaded image with key: spriteKey
    Phaser.Sprite.call(this, game, x, y, 'ships-atlas', mainSprite);

    this.anchor.setTo(0.5, 0.5);

    // Health values
    this.health = this.maxHealth = maxHealth;

    // player ship explosion animation
    var explosionFramePrefix = 'expl_11_';    
    var explosionFrames = Phaser.Animation.generateFrameNames(explosionFramePrefix, 0, 23, "", 4);

    // add explosion animation created from frames
    var explosionAnim = this.animations.add('explosion', explosionFrames);

    // kill ship on explosion animation completion
    explosionAnim.killOnComplete = true;

    // ship's speed
    this.speed = speed;

    // Ship's skill
    this.skills = skills;

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
    Ship.prototype.isDead = function ()
    {
        if (this.health <= 0.0) {
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
    Ship.prototype.move = function (isUp, isRight, isDown, isLeft)
    {
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
    Ship.prototype.takeDamage = function (damage)
    {
        this.health -= damage;
    };


    /**==========================================================================================================================
    * @name DIE
    *
    * @description Displays ship's explosion sprite, frees resources
    *///=========================================================================================================================
    Ship.prototype.die = function ()
    {
        this.animations.play('explosion');
    };

// PLAYER SHIP
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CONSTRUCTOR
    // --------------------------------------------------------------------------------------------------------------------------

    /**=========================================================================================================================
    * @param {Phaser.Game} game - game that sprite will be added to
    * @param {float} x - horizontal (x) location of sprite
    * @param {float} y - vertical (y) location of sprite
    * @param {string} mainSprite - key for ship sprite image
    * @param {float} maxHealth - maximum and starting health for ship
    * @param {float} maxWeaponHeat - maximum weaponheat for player ship (heat inits to 0)
    * @param {float} speed - movement speed of ship
    * @param {Skill[]} skills - list of skill objects for ship
    * @param {Phaser.Group} group - physics group to add ship to
    *
    * @description PlayerShip constructor
    *///=========================================================================================================================
    PlayerShip = function (game, x, y, mainSprite, maxHealth, maxWeaponHeat, speed, skills, group)
    {

        // base class constructor
        Ship.call(this, game, x, y, mainSprite, maxHealth, speed, skills, group);
        this.scale.setTo(0.6, 0.6);

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
    PlayerShip.prototype.heal = function (howMuch)
    {
        this.health += howMuch;
    };

    /**==========================================================================================================================
    * @name COOL WEAPON
    *  
    * @param {float} howMuch - amount to modify ships health by
    *
    * @description adds howMuch param to the ship's weaponheat member
    *///=========================================================================================================================
    PlayerShip.prototype.heat = function (howMuch)
    {
        this.weaponHeat += howMuch;
    };