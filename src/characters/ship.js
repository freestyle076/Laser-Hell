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
    Phaser.Sprite.call(this, game, x, y, 'ships-and-projectiles-atlas', mainSprite);

    this.anchor.setTo(0.5, 0.5);

    // add to group if one given
    if (group)
    {
        group.add(this);
    }

    // Health values
    this.shipHealth = this.maxHealth = maxHealth;

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
    * @name HEAL
    *  
    * @param {float} howMuch - amount to modify ship's shipHealth by
    *
    * @description adds howMuch to the ship's shipHealth member
    *///=========================================================================================================================
    Ship.prototype.heal = function (howMuch)
    {
        console.log("ship being healed: " + howMuch);
        // modify ship's health
        this.shipHealth += howMuch;

        // if below or at zero die 
        if (this.shipHealth <= 0)
        {
            this.shipHealth = 0;
        }

        // if above max health set to max health
        if (this.shipHealth > this.maxHealth)
        {
            this.shipHealth = this.maxHealth;
        }

    };

    /**==========================================================================================================================
    * @name IS DEAD
    *
    * @description Checks if the ship is dead
    *
    * @return {bool} - true if shipHealth is above 0, false otherwise
    *///=========================================================================================================================
    Ship.prototype.isDead = function ()
    {
        if (this.shipHealth <= 0.0)
        {
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
    *///=========================================================================================================================
    Ship.prototype.move = function (isUp, isRight, isDown, isLeft)
    {
        // check all 8 directions, most complex (hard to satisfy) first
        if (isUp && isRight) {
            this.body.x += this.speed / 1.5;
            this.body.y -= this.speed / 1.5;

            this.x += this.speed / 1.5;
            this.y -= this.speed / 1.5;
        }
        else if (isUp && isLeft) {
            this.body.x -= this.speed / 1.5;
            this.body.y -= this.speed / 1.5;

            this.x -= this.speed / 1.5;
            this.y -= this.speed / 1.5;
        }
        else if (isDown && isLeft) {
            this.body.x -= this.speed / 1.5;
            this.body.y += this.speed / 1.5;

            this.x -= this.speed / 1.5;
            this.y += this.speed / 1.5;
        }
        else if (isDown && isRight) {
            this.body.x += this.speed / 1.5;
            this.body.y += this.speed / 1.5;

            this.x += this.speed / 1.5;
            this.y += this.speed / 1.5;
        }
        else if (isRight) {
            this.body.x += this.speed;
            this.x += this.speed;
        }
        else if (isUp) {
            this.body.y -= this.speed;
            this.y -= this.speed;
        }
        else if (isLeft) {
            this.body.x -= this.speed;
            this.x -= this.speed;
        }
        else if (isDown) {
            this.body.y += this.speed;
            this.y += this.speed;
        }
    };

    /**==========================================================================================================================
    * @name DIE
    *
    * @description Displays ship's explosion sprite, removes from game world
    *///=========================================================================================================================
    Ship.prototype.die = function ()
    {
        // Spawn explosion
        var explosion = spawningGroups.explosions.getFirstExists(false);
        explosion.reset(this.body.x, this.body.y);
        explosion.play('kaboom', 30, false, true);
        musicPlayer.play('explosion-sound', soundPlayer.volume, false);

        // Kill ship
        this.kill();

        // reset health in case this ship object is recycled
        this.shipHealth = this.maxHealth;
    };

// PLAYER SHIP
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // CONSTRUCTOR
    // --------------------------------------------------------------------------------------------------------------------------

    /**=========================================================================================================================
    * @param {Phaser.Game} game - game that sprite will be added to
    * @param {Game} gameState - the Game state tracking keys/HUD
    * @param {float} x - horizontal (x) location of sprite
    * @param {float} y - vertical (y) location of sprite
    * @param {string} mainSprite - key for ship sprite image
    * @param {float} maxHealth - maximum and starting health for ship
    * @param {float} maxWeaponHeat - maximum weaponheat for player ship (heat inits to 0)
    * @param {float} speed - movement speed of ship
    * @param {Phaser.Group} group - physics group to add ship to
    *
    * @description PlayerShip constructor
    *///=========================================================================================================================
    PlayerShip = function (game, gameState, x, y, mainSprite, maxHealth, maxWeaponHeat, speed, group)
    {
        
        // primary player ship skill
        var primaryDamage = 20;
        var primaryMaxProjectiles = 200;
        var primaryBulletSpeed = 400;
        var primaryFireRate = 1;
        var explosionFrames = new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4);
        var playerPrimarySkill = new PlayerPrimarySkill(
            "blue_laser_01",
            "playerPrimaryProjectiles",
            primaryDamage,
            primaryMaxProjectiles,
            primaryBulletSpeed,
            primaryFireRate,
            explosionFrames
        );
        
        // secondary player ship skill
        var secondaryDamage = 60;
        var secondaryMaxProjectiles = 30;
        var secondaryBulletSpeed = 200;
        var secondaryFireRate = 2000;
        var playerSecondarySkill = new PlayerSecondarySkill(
            "large_ball_yellow_laser",
            "playerSecondaryProjectiles",
            secondaryDamage,
            secondaryMaxProjectiles,
            secondaryBulletSpeed,
            secondaryFireRate,
            explosionFrames
        );

        // base class constructor
        Ship.call(this, game, x, y, mainSprite, maxHealth, speed, [playerPrimarySkill, playerSecondarySkill], group);
        this.scale.setTo(0.6, 0.6);

        // player ship's reference to game state
        this.gameState = gameState;

        // weaponheat members
        this.weaponHeat = 0;
        this.maxWeaponHeat = maxWeaponHeat;

        // set physics type, construct physics body
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // player ship can't leave screen
        this.body.collideWorldBounds = true;
        
    };
    PlayerShip.prototype = Object.create(Ship.prototype);
    PlayerShip.prototype.constructor = PlayerShip;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // PLAYER SHIP FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------

    /**==========================================================================================================================
    * @name UPDATE
    *  
    * @description OVERRIDE called automatically by World.update
    *///=========================================================================================================================
    PlayerShip.prototype.update = function ()
    {
        
        // move ship
        this.move(this.gameState.wKey.isDown, this.gameState.dKey.isDown, this.gameState.sKey.isDown, this.gameState.aKey.isDown);

        // cool weapon
        this.heat(-0.3);
    };

    /**==========================================================================================================================
    * @name COOL WEAPON
    *  
    * @param {float} howMuch - amount to modify ships shipHealth by
    *
    * @description adds howMuch param to the ship's weaponheat member
    *///=========================================================================================================================
    PlayerShip.prototype.heat = function (howMuch)
    {
        this.weaponHeat += howMuch;
        
        if(this.weaponHeat < 0)
        {
            this.weaponHeat = 0;
        }

        if (this.weaponHeat > this.maxWeaponHeat)
        {
            this.weaponHeat = this.maxWeaponHeat;
        }

        this.gameState.updateStatusBar('weaponHeat', this.weaponHeat, this.maxWeaponHeat);
    };

    /**==========================================================================================================================
    * @name FIRE
    *  
    * @param {int} skillIndex - index of the skill to fire
    *
    * @description fires the skill at skillIndex in skills list
    * @return {bool} - true if skill fired, false otherwise
    *///=========================================================================================================================
    PlayerShip.prototype.fire = function (skillIndex)
    {
        return this.skills[skillIndex].fire(this);
    }